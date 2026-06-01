#!/usr/bin/env node
"use strict";

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const files = process.argv.slice(2).filter((arg) => arg !== "--check");

const htmlSettings = {
  format: {
    enable: true,
    indentInnerHtml: false,
    wrapLineLength: 120,
    wrapAttributes: "auto",
    preserveNewLines: true,
    maxPreserveNewLines: null,
    indentHandlebars: false,
    extraLiners: "head, body, /html",
    templating: false,
    unformatted: "wbr",
    contentUnformatted: "pre,code,textarea",
    unformattedContentDelimiter: "",
    wrapAttributesIndentSize: null,
  },
  validate: {
    scripts: true,
    styles: true,
  },
};

function findCodeExe() {
  const candidates = [
    process.env.VSCODE_CODE_EXE,
    "/mnt/c/Program Files/Microsoft VS Code/Code.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error("Could not find VS Code's Code.exe.");
}

function findHtmlServer() {
  const base = "/mnt/c/Program Files/Microsoft VS Code";
  const direct = path.join(
    base,
    "resources/app/extensions/html-language-features/server/dist/node/htmlServerMain.js",
  );

  if (fs.existsSync(direct)) {
    return direct;
  }

  const builds = fs.existsSync(base)
    ? fs
        .readdirSync(base)
        .map((entry) =>
          path.join(
            base,
            entry,
            "resources/app/extensions/html-language-features/server/dist/node/htmlServerMain.js",
          ),
        )
        .filter((candidate) => fs.existsSync(candidate))
        .sort()
    : [];

  if (builds.length > 0) {
    return builds[builds.length - 1];
  }

  throw new Error("Could not find VS Code's HTML language server.");
}

function toFileUri(file) {
  const absolute = path.resolve(root, file);
  const windowsMatch = absolute.match(/^\/mnt\/([a-z])\/(.*)$/i);
  if (!windowsMatch) {
    return `file://${absolute.split("/").map(encodeURIComponent).join("/")}`;
  }

  const drive = windowsMatch[1].toUpperCase();
  const rest = windowsMatch[2].split("/").map(encodeURIComponent).join("/");
  return `file:///${drive}:/${rest}`;
}

function toWindowsPath(file) {
  const absolute = path.resolve(file);
  const windowsMatch = absolute.match(/^\/mnt\/([a-z])\/(.*)$/i);
  if (!windowsMatch) {
    return absolute;
  }

  return `${windowsMatch[1].toUpperCase()}:\\${windowsMatch[2].replace(/\//g, "\\")}`;
}

function createHtmlServerProcess() {
  const codeExe = findCodeExe();
  const htmlServer = findHtmlServer();
  const cmdExe = "/mnt/c/Windows/System32/cmd.exe";

  if (codeExe.startsWith("/mnt/") && fs.existsSync(cmdExe)) {
    const windowsTemp = root.match(/^\/mnt\/c\/Users\/([^/]+)/i)
      ? `/mnt/c/Users/${root.match(/^\/mnt\/c\/Users\/([^/]+)/i)[1]}/AppData/Local/Temp`
      : root;
    const wrapper = path.join(
      windowsTemp,
      `format-html-vscode-${process.pid}.cmd`,
    );

    fs.writeFileSync(
      wrapper,
      [
        "@echo off",
        "set ELECTRON_RUN_AS_NODE=1",
        `"${toWindowsPath(codeExe)}" "${toWindowsPath(htmlServer)}" --stdio`,
        "",
      ].join("\r\n"),
    );

    const child = spawn(cmdExe, ["/d", "/c", toWindowsPath(wrapper)], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    child.on("exit", () => {
      try {
        fs.unlinkSync(wrapper);
      } catch (_) {
        // Best-effort cleanup only.
      }
    });
    return child;
  }

  return spawn(codeExe, [toWindowsPath(htmlServer), "--stdio"], {
    env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" },
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function lineOffsets(text) {
  const offsets = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) {
      offsets.push(i + 1);
    }
  }
  return offsets;
}

function offsetAt(offsets, position) {
  const line = Math.min(position.line, offsets.length - 1);
  return offsets[line] + position.character;
}

function applyEdits(text, edits) {
  const offsets = lineOffsets(text);
  return edits
    .slice()
    .sort((a, b) => {
      const aStart = offsetAt(offsets, a.range.start);
      const bStart = offsetAt(offsets, b.range.start);
      return bStart - aStart;
    })
    .reduce((current, edit) => {
      const currentOffsets = lineOffsets(current);
      const start = offsetAt(currentOffsets, edit.range.start);
      const end = offsetAt(currentOffsets, edit.range.end);
      return current.slice(0, start) + edit.newText + current.slice(end);
    }, text);
}

class LanguageServerClient {
  constructor() {
    this.nextId = 1;
    this.pending = new Map();
    this.buffer = Buffer.alloc(0);

    this.server = createHtmlServerProcess();

    this.server.stdout.on("data", (chunk) => this.onData(chunk));
    this.server.stderr.on("data", (chunk) => process.stderr.write(chunk));
    this.server.on("exit", (code) => {
      if (code && this.pending.size > 0) {
        for (const { reject } of this.pending.values()) {
          reject(new Error(`HTML language server exited with code ${code}.`));
        }
        this.pending.clear();
      }
    });
  }

  send(message) {
    const body = JSON.stringify(message);
    this.server.stdin.write(
      `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`,
    );
  }

  request(method, params) {
    const id = this.nextId;
    this.nextId += 1;

    const promise = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });

    this.send({ jsonrpc: "2.0", id, method, params });
    return promise;
  }

  notify(method, params) {
    this.send({ jsonrpc: "2.0", method, params });
  }

  onData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);

    while (true) {
      const headerEnd = this.buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) {
        return;
      }

      const header = this.buffer.slice(0, headerEnd).toString("utf8");
      const match = header.match(/Content-Length: (\d+)/i);
      if (!match) {
        throw new Error(`Malformed LSP header: ${header}`);
      }

      const length = Number(match[1]);
      const messageStart = headerEnd + 4;
      const messageEnd = messageStart + length;
      if (this.buffer.length < messageEnd) {
        return;
      }

      const raw = this.buffer.slice(messageStart, messageEnd).toString("utf8");
      this.buffer = this.buffer.slice(messageEnd);
      this.onMessage(JSON.parse(raw));
    }
  }

  onMessage(message) {
    if (Object.prototype.hasOwnProperty.call(message, "id") && message.method) {
      this.onRequest(message);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(message, "id")) {
      const pending = this.pending.get(message.id);
      if (!pending) {
        return;
      }
      this.pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(message.error.message));
      } else {
        pending.resolve(message.result);
      }
    }
  }

  onRequest(message) {
    if (message.method === "workspace/configuration") {
      const items =
        message.params && message.params.items ? message.params.items : [];
      this.send({
        jsonrpc: "2.0",
        id: message.id,
        result: items.map((item) => {
          if (item.section === "html") {
            return htmlSettings;
          }
          return {};
        }),
      });
      return;
    }

    this.send({ jsonrpc: "2.0", id: message.id, result: null });
  }

  async start() {
    await this.request("initialize", {
      processId: process.pid,
      rootUri: toFileUri(root),
      capabilities: {
        workspace: {
          configuration: true,
        },
        textDocument: {
          formatting: {},
          rangeFormatting: {},
        },
      },
      initializationOptions: {
        provideFormatter: true,
        embeddedLanguages: {
          css: true,
          javascript: true,
        },
      },
      workspaceFolders: [{ name: path.basename(root), uri: toFileUri(root) }],
    });
    this.notify("initialized", {});
  }

  async formatFile(file) {
    const uri = toFileUri(file);
    const text = fs.readFileSync(file, "utf8");

    this.notify("textDocument/didOpen", {
      textDocument: {
        uri,
        languageId: "html",
        version: 1,
        text,
      },
    });

    const edits = await this.request("textDocument/formatting", {
      textDocument: { uri },
      options: {
        tabSize: 2,
        insertSpaces: true,
        trimTrailingWhitespace: false,
        insertFinalNewline: false,
        trimFinalNewlines: false,
      },
    });

    this.notify("textDocument/didClose", {
      textDocument: { uri },
    });

    const formatted = applyEdits(text, edits || []);
    if (formatted === text) {
      return false;
    }

    if (!checkOnly) {
      fs.writeFileSync(file, formatted);
    }
    return true;
  }

  async stop() {
    await this.request("shutdown", null).catch(() => {});
    this.notify("exit");
    this.server.stdin.end();
  }
}

(async () => {
  if (files.length === 0) {
    process.exit(0);
  }

  const client = new LanguageServerClient();
  await client.start();

  const changed = [];
  try {
    for (const file of files) {
      if (await client.formatFile(file)) {
        changed.push(file);
      }
    }
  } finally {
    await client.stop();
  }

  if (checkOnly && changed.length > 0) {
    for (const file of changed) {
      console.log(file);
    }
    process.exit(1);
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
