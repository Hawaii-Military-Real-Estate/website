#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const content = require("../src/content.js");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const buildDir = path.join(root, "build");

const phoneDisplay = "(808) 123-4567";
const phoneHref = "tel:8081234567";

const icons = {
  arrowLeft:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>',
  arrowRight:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>',
  phone:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>',
  shieldCheck:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>',
  home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>',
  hand: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 12V4a2 2 0 1 1 4 0v8" /><path d="M11 12V4a2 2 0 0 0-4 0v10" /><path d="M3 14v3a4 4 0 0 0 4 4h2" /><path d="M21 12a9 9 0 0 1-9 9" /></svg>',
  users:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>',
  award:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>',
  heart:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>',
};

// Domain policies
function sortAgents(agents) {
  return agents.slice().sort(function (a, b) {
    const aHasSort = typeof a.sort === "number";
    const bHasSort = typeof b.sort === "number";

    if (aHasSort && bHasSort) {
      return a.sort - b.sort || a.name.localeCompare(b.name);
    }

    if (aHasSort) return -1;
    if (bHasSort) return 1;

    return a.name.localeCompare(b.name);
  });
}

// Application use cases
function getTeamPageModel() {
  return {
    team: content.team,
    agents: sortAgents(content.agents),
  };
}

function getAgentPageModels() {
  return content.agents.map(function (agent) {
    return { agent: agent };
  });
}

function getFeaturedAgent() {
  return (
    sortAgents(content.agents).find(function (agent) {
      return agent.featured === true;
    }) || sortAgents(content.agents)[0]
  );
}

function getAboutPageModel() {
  return {
    about: content.about,
    featuredAgent: getFeaturedAgent(),
  };
}

function getStaticPageModels() {
  return content.pages || [];
}

// Presentation helpers
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attr(value) {
  return escapeHtml(value);
}

function htmlList(items) {
  return (items || []).join("\n");
}

function renderHead(options) {
  const prefix = options.prefix || "";
  return `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(options.title)}</title>
  <meta name="description" content="${attr(options.description)}" />
  <meta property="og:title" content="${attr(options.title)}" />
  <meta property="og:description" content="${attr(options.description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="${prefix}css/styles.css" />
</head>`;
}

function renderGeneratedComment() {
  return "<!-- Generated into build/ from src/content.js by scripts/build-content.js. Do not edit generated output directly. -->";
}

function renderEyebrow(label) {
  return `<span class="eyebrow-pill"><span style="
                width: 6px;
                height: 6px;
                border-radius: 999px;
                background: #fff;
                display: inline-block;
                opacity: 0.7;
              "></span>
          ${escapeHtml(label)}</span>`;
}

function renderTeamCard(agent) {
  const sortAttr =
    typeof agent.sort === "number" ? ` data-sort="${attr(agent.sort)}"` : "";

  return `<div class="agent-card reveal" data-agent-card data-agent-name="${attr(agent.name)}"${sortAttr}>
  <div class="media">
    <img src="assets/${attr(agent.image)}" alt="${attr(agent.name)}" loading="lazy" />
    <div class="overlay">
      <h3>${escapeHtml(agent.name)}</h3>
      <div class="yr">${escapeHtml(agent.cardMeta)}</div>
    </div>
  </div>
  <div class="body">
    <div class="role">${escapeHtml(agent.cardRole)}</div>
    <a href="agents/${attr(agent.slug)}.html">View Profile -></a>
  </div>
</div>`;
}

function renderTeamPage(model) {
  return `<!doctype html>
<html lang="en">

${renderHead({
  title: model.team.title,
  description: model.team.description,
  prefix: "",
})}

<body>
  ${renderGeneratedComment()}
  <div id="header-mount"></div>

  <section class="page-hero">
    <img class="bg" src="assets/hero-bg-team.jpg" alt="" />
    <div class="ovr"></div>
    <div class="ovr2"></div>
    <div class="container">
      <div class="inner reveal">
        ${renderEyebrow(model.team.eyebrow)}
        <h1>${escapeHtml(model.team.heading)}</h1>
        ${model.team.introHtml}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="team-grid" data-team-grid>
        ${model.agents.map(renderTeamCard).join("\n")}
      </div>
    </div>
  </section>

  <div data-cta data-title="${attr(model.team.cta.title)}"
    data-subtitle="${attr(model.team.cta.subtitle)}"
    data-note="${attr(model.team.cta.note)}"></div>

  <div id="footer-mount"></div>
  <script src="js/site.js"></script>
  <script>
    mountChrome("team.html", "");
  </script>
</body>

</html>`;
}

function renderBackgroundCard(card) {
  return `<div class="bg-card reveal">
  <div class="icon-box">
    ${icons[card.icon] || icons.star}
  </div>
  <h3>${escapeHtml(card.title)}</h3>
  <p>${escapeHtml(card.text)}</p>
</div>`;
}

function renderAboutPage(model) {
  const about = model.about;
  const agent = model.featuredAgent;
  const featuredHtml = agent.featuredAboutHtml || agent.aboutHtml || [];

  return `<!doctype html>
<html lang="en">

${renderHead({
  title: about.title,
  description: about.description,
  prefix: "",
})}

<body>
  ${renderGeneratedComment()}
  <div id="header-mount"></div>

  <section class="page-hero">
    <img class="bg" src="assets/hero-bg-about.jpg" alt="" />
    <div class="ovr"></div>
    <div class="ovr2"></div>
    <div class="container">
      <div class="inner reveal">
        ${renderEyebrow(about.eyebrow)}
        <h1>${escapeHtml(about.heading)}</h1>
        ${about.introHtml}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="reveal">
          <img src="assets/${attr(agent.image)}" alt="${attr(agent.name)}" loading="lazy" />
        </div>
        <div class="reveal">
          <div class="eyebrow-mini">${escapeHtml(about.featuredEyebrow)}</div>
          <h2 class="mt-4" style="font-size: clamp(1.75rem, 3vw, 2.25rem)">
            ${escapeHtml(agent.name)}
          </h2>
          <div class="mt-6 muted" style="
                display: flex;
                flex-direction: column;
                gap: 1.1rem;
                line-height: 1.7;
              ">
            ${htmlList(featuredHtml)}
          </div>
          <a class="btn btn-dark mt-6" href="agents/${attr(agent.slug)}.html">${escapeHtml(about.featuredCtaLabel)}
            ${icons.arrowRight}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section alt">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow-mini">${escapeHtml(about.backgroundEyebrow)}</div>
        <h2>${escapeHtml(about.backgroundHeading)}</h2>
      </div>
      <div class="bg-cards">
        ${about.cards.map(renderBackgroundCard).join("\n")}
      </div>
    </div>
  </section>

  <div data-cta data-title="${attr(about.cta.title)}"
    data-subtitle="${attr(about.cta.subtitle)}"
    data-note="${attr(about.cta.note)}"></div>

  <div id="footer-mount"></div>
  <script src="js/site.js"></script>
  <script>
    mountChrome("about.html", "");
  </script>
</body>

</html>`;
}

function renderBadge(badge) {
  return `<div class="badge-item reveal">
  <div class="icon-box">
    ${icons[badge.icon] || icons.star}
  </div>
  <h3>${escapeHtml(badge.title)}</h3>
  <p>${escapeHtml(badge.text)}</p>
</div>`;
}

function renderPills(pills) {
  if (!pills || !pills.length) return "";

  return `<div class="pills">
  ${pills
    .map(function (pill) {
      return `<span>${escapeHtml(pill)}</span>`;
    })
    .join("")}
</div>`;
}

function renderContentSection(section) {
  return `<div class="reveal">
  <h2>${escapeHtml(section.title)}</h2>
  <div class="ul"></div>
  ${htmlList(section.html)}
  ${renderPills(section.pills)}
</div>`;
}

function renderSectionRows(sections) {
  const rows = [];

  for (let index = 0; index < sections.length; index += 2) {
    rows.push(`<section class="container">
  <div class="two-col">
    ${sections
      .slice(index, index + 2)
      .map(renderContentSection)
      .join("\n")}
  </div>
</section>`);
  }

  return rows.join("\n\n");
}

function renderAgentPage(model) {
  const agent = model.agent;

  return `<!doctype html>
<html lang="en">

${renderHead({
  title: agent.title,
  description: agent.description,
  prefix: "../",
})}

<body>
  ${renderGeneratedComment()}
  <div id="header-mount"></div>

  <section class="agent-hero">
    <img class="bg" src="../assets/hero-bg-team.jpg" alt="" />
    <div class="ovr"></div>
    <div class="container">
      <div class="wrap">
        <a class="back-link" href="../team.html">${icons.arrowLeft}
          Back to Team</a>
        <div class="agent-hero-grid">
          <div class="avatar-circle">
            <div class="photo">
              <img src="../assets/${attr(agent.image)}" alt="${attr(agent.name)}" />
            </div>
          </div>
          <div>
            <div class="role-tag">${escapeHtml(agent.roleTag)}</div>
            <h1>${escapeHtml(agent.name)}</h1>
            <div class="underline"></div>
            <p class="tagline">
              ${escapeHtml(agent.tagline)}
            </p>
            <a class="cta" href="${phoneHref}">${icons.phone}
              ${phoneDisplay}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container">
    <div class="about-split">
      <div class="reveal">
        <h2>${escapeHtml(agent.aboutTitle)}</h2>
        <div class="ul"></div>
        <div class="text">
          ${htmlList(agent.aboutHtml)}
        </div>
        <span class="sig">${escapeHtml(agent.shortName)}</span>
      </div>
      <div class="reveal">
        <div class="photo-frame">
          <img src="../assets/${attr(agent.image)}" alt="${attr(agent.name)}" />
        </div>
      </div>
    </div>
  </section>

  <section class="container">
    <div class="badges-card">
      <div class="badges-grid">
        ${agent.badges.map(renderBadge).join("\n")}
      </div>
    </div>
  </section>

  ${renderSectionRows(agent.sections)}

  <div data-cta data-title="${attr(agent.cta.title)}"
    data-subtitle="${attr(agent.cta.subtitle)}"
    data-note="${attr(agent.cta.note)}"></div>

  <div id="footer-mount"></div>
  <script src="../js/site.js"></script>
  <script>
    mountChrome("team.html", "../");
  </script>
</body>

</html>`;
}

// Infrastructure
function writeFile(relativePath, html) {
  const target = path.join(buildDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html + "\n", "utf8");
}

function shouldCopySourceFile(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized === "content.js") return false;
  if (normalized === "README.md") return false;
  if (/\.html$/i.test(normalized)) return false;
  if (/^agents\/.*\.html$/i.test(normalized)) return false;

  return true;
}

function copyDirectory(sourceDir, targetDir, relativeBase) {
  fs.mkdirSync(targetDir, { recursive: true });

  fs.readdirSync(sourceDir).forEach(function (name) {
    const source = path.join(sourceDir, name);
    const target = path.join(targetDir, name);
    const relativePath = path.join(relativeBase || "", name);
    const stat = fs.statSync(source);

    if (stat.isDirectory()) {
      copyDirectory(source, target, relativePath);
      return;
    }

    if (!shouldCopySourceFile(relativePath)) return;

    fs.copyFileSync(source, target);
  });
}

function removeDirectory(targetDir) {
  if (!fs.existsSync(targetDir)) return;

  fs.readdirSync(targetDir).forEach(function (name) {
    const current = path.join(targetDir, name);
    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      removeDirectory(current);
      return;
    }

    fs.unlinkSync(current);
  });

  fs.rmdirSync(targetDir);
}

function prepareBuildDirectory() {
  removeDirectory(buildDir);
  fs.mkdirSync(buildDir, { recursive: true });
  copyDirectory(srcDir, buildDir, "");
}

function main() {
  const aboutModel = getAboutPageModel();
  const teamModel = getTeamPageModel();
  const agentModels = getAgentPageModels();
  const staticPageModels = getStaticPageModels();

  prepareBuildDirectory();

  staticPageModels.forEach(function (page) {
    writeFile(page.path, page.html);
  });
  writeFile("about.html", renderAboutPage(aboutModel));
  writeFile("team.html", renderTeamPage(teamModel));
  agentModels.forEach(function (model) {
    writeFile(
      path.join("agents", model.agent.slug + ".html"),
      renderAgentPage(model),
    );
  });

  console.log(
    "Rendered " +
      staticPageModels.length +
      " static build pages, build/team.html, " +
      "build/about.html and " +
      agentModels.length +
      " build/agents profile pages.",
  );
}

main();
