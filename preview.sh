#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

node scripts/build-content.js

port="$(
  python3 - <<'PY'
import socket

for port in range(8080, 8181):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        try:
            sock.bind(("127.0.0.1", port))
        except OSError:
            continue
        print(port)
        break
else:
    raise SystemExit("No available preview port found between 8080 and 8180.")
PY
)"

echo "Serving build/ at http://localhost:${port}"
exec python3 -m http.server "$port" --bind 127.0.0.1 --directory build
