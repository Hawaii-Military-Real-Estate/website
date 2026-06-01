#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [[ "${1:-}" == "--check" ]]; then
  check_mode=1
  prettier_mode="--check"
else
  check_mode=0
  prettier_mode="--write"
fi

prettier_path_style="wsl"

find_prettier() {
  if [[ -x ./node_modules/.bin/prettier ]]; then
    prettier=(./node_modules/.bin/prettier)
  elif command -v npx >/dev/null 2>&1 && npx --no-install prettier --version >/dev/null 2>&1; then
    prettier=(npx --no-install prettier)
  elif command -v prettier >/dev/null 2>&1; then
    prettier=(prettier)
  else
    vscode_extensions=()
    if [[ "$PWD" == /mnt/c/Users/* ]]; then
      windows_user="${PWD#/mnt/c/Users/}"
      windows_user="${windows_user%%/*}"
      vscode_extensions+=("/mnt/c/Users/$windows_user/.vscode/extensions")
    fi
    vscode_extensions+=("$HOME/.vscode/extensions")

    vscode_prettier=""
    for extension_dir in "${vscode_extensions[@]}"; do
      [[ -d "$extension_dir" ]] || continue
      vscode_prettier="$(
        find "$extension_dir" -maxdepth 6 \
          -path '*/esbenp.prettier-vscode-*/node_modules/prettier/bin/prettier.cjs' \
          -type f 2>/dev/null \
          | sort -V \
          | tail -n 1
      )"
      [[ -n "$vscode_prettier" ]] && break
    done

    node_major=0
    if command -v node >/dev/null 2>&1; then
      node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
    fi

    if [[ -n "$vscode_prettier" && "$node_major" -ge 14 ]]; then
      prettier=(node "$vscode_prettier")
    elif [[ -n "$vscode_prettier" && -x "/mnt/c/Program Files/Microsoft VS Code/Code.exe" ]] && command -v wslpath >/dev/null 2>&1; then
      prettier=(env ELECTRON_RUN_AS_NODE=1 "/mnt/c/Program Files/Microsoft VS Code/Code.exe" "$(wslpath -w "$vscode_prettier")")
      prettier_path_style="windows"
    else
      cat >&2 <<'EOF'
No Prettier executable was found.

Install it for this project with:
  npm install --save-dev prettier

Or install it globally if that is how VS Code is configured:
  npm install --global prettier
EOF
      exit 1
    fi
  fi
}

is_supported_extension() {
  case "${1##*.}" in
    astro|css|graphql|gql|htm|html|js|json|json5|jsx|less|md|mdx|mjs|cjs|scss|ts|tsx|vue|yaml|yml)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

files=()
while IFS= read -r -d '' file; do
  [[ -f "$file" ]] || continue
  [[ "$file" == *.* ]] || continue
  is_supported_extension "$file" || continue

  if command -v file >/dev/null 2>&1 && ! file --brief --mime "$file" | grep -q '^text/'; then
    case "$file" in
      *.json|*.json5) ;;
      *) continue ;;
    esac
  fi

  files+=("$file")
done < <(
  {
    git diff --name-only -z --diff-filter=ACMRTUXB
    git diff --name-only -z --cached --diff-filter=ACMRTUXB
    git ls-files --others --exclude-standard -z
  } | sort -zu
)

if (( ${#files[@]} == 0 )); then
  echo "No modified text files with supported extensions found."
  exit 0
fi

printf 'Formatting %d file(s):\n' "${#files[@]}"
printf '  %s\n' "${files[@]}"

html_files=()
prettier_files=()
for file in "${files[@]}"; do
  case "${file##*.}" in
    htm|html)
      html_files+=("$file")
      ;;
    *)
      prettier_files+=("$file")
      ;;
  esac
done

format_failed=0

if (( ${#html_files[@]} > 0 )); then
  html_args=()
  if (( check_mode == 1 )); then
    html_args+=(--check)
  fi
  if ! node scripts/format-html-vscode.js "${html_args[@]}" "${html_files[@]}"; then
    format_failed=1
  fi
fi

if (( ${#prettier_files[@]} > 0 )); then
  find_prettier

  formatter_files=("${prettier_files[@]}")
  if [[ "$prettier_path_style" == "windows" ]]; then
    formatter_files=()
    for file in "${prettier_files[@]}"; do
      formatter_files+=("$(wslpath -w "$file")")
    done
  fi

  if ! "${prettier[@]}" "$prettier_mode" --ignore-unknown -- "${formatter_files[@]}"; then
    format_failed=1
  fi
fi

exit "$format_failed"
