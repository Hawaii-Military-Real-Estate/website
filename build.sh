#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

node scripts/build-content.js
