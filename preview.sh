#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

node scripts/build-content.js

host="${PREVIEW_HOST:-0.0.0.0}"
port="$(
  PREVIEW_HOST="$host" python3 - <<'PY'
import os
import socket

host = os.environ.get("PREVIEW_HOST", "0.0.0.0")

for port in range(8080, 8181):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        try:
            sock.bind((host, port))
        except OSError:
            continue
        print(port)
        break
else:
    raise SystemExit("No available preview port found between 8080 and 8180.")
PY
)"

echo "Serving build/ at http://${host}:${port}"
echo "Local URL: http://localhost:${port}"
exec python3 -m http.server "$port" --bind "$host" --directory build
