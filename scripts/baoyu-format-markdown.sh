#!/usr/bin/env sh
set -eu

SKILL_DIR="${BAOYU_FORMAT_MARKDOWN_DIR:-/Users/happyboy/.codex/skills/baoyu-format-markdown}"
SCRIPT_ENTRY="$SKILL_DIR/scripts/main.ts"
CODEX_RUNTIME_DIR="${CODEX_RUNTIME_DIR:-/Users/happyboy/.cache/codex-runtimes/codex-primary-runtime/dependencies}"

if [ ! -f "$SCRIPT_ENTRY" ]; then
  echo "baoyu-format-markdown script not found: $SCRIPT_ENTRY" >&2
  echo "Set BAOYU_FORMAT_MARKDOWN_DIR to the skill directory if it lives elsewhere." >&2
  exit 1
fi

if command -v bun >/dev/null 2>&1; then
  exec bun "$SCRIPT_ENTRY" "$@"
fi

if command -v npx >/dev/null 2>&1; then
  exec npx -y bun "$SCRIPT_ENTRY" "$@"
fi

if command -v pnpm >/dev/null 2>&1; then
  exec pnpm dlx bun "$SCRIPT_ENTRY" "$@"
fi

if [ -x "$CODEX_RUNTIME_DIR/bin/pnpm" ]; then
  export PATH="$CODEX_RUNTIME_DIR/node/bin:$CODEX_RUNTIME_DIR/bin:$PATH"
  exec "$CODEX_RUNTIME_DIR/bin/pnpm" dlx bun "$SCRIPT_ENTRY" "$@"
fi

echo "Cannot run baoyu-format-markdown: no bun, npx, or pnpm runtime was found." >&2
echo "Install bun, install npm/npx, or set CODEX_RUNTIME_DIR to a bundled Codex runtime." >&2
exit 1
