#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -d src ]]; then
  echo "Error: src/ directory not found." >&2
  exit 1
fi

echo "Serving src/ at http://localhost:8080"
exec python3 -m http.server 8080 --bind 127.0.0.1 --directory src
