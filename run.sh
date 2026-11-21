#!/usr/bin/env bash
# Runs the portfolio with Node 22 (Next 12 does not run on newer Node).
#
#   ./run.sh            dev server  → http://localhost:3000
#   ./run.sh build      production build
#   ./run.sh start      build, then serve the production build
#   PORT=4000 ./run.sh  use another port
set -euo pipefail
cd "$(dirname "$0")"

PORT="${PORT:-3000}"

# ── pick Node 22 ─────────────────────────────────────────────
use_node22() {
  if [ "$(node -v 2>/dev/null | cut -d. -f1)" = "v22" ]; then return 0; fi
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck disable=SC1091
    . "$NVM_DIR/nvm.sh"
    nvm use 22 >/dev/null 2>&1 || nvm install 22
    return 0
  fi
  local dir
  dir=$(ls -d "$HOME"/.nvm/versions/node/v22.* 2>/dev/null | sort -V | tail -1 || true)
  if [ -n "$dir" ]; then export PATH="$dir/bin:$PATH"; return 0; fi
  echo "Node 22 not found. Install it with: nvm install 22  (or brew install node@22)"
  exit 1
}
use_node22
echo "▶ node $(node -v)"

# ── install dependencies on first run ────────────────────────
[ -d node_modules ] || npm install

# ── mode info ────────────────────────────────────────────────
if [ -f public/media/film.mp4 ]; then
  echo "▶ film found → scroll-video mode"
else
  echo "▶ no public/media/film.mp4 → still mode (photo preview)"
fi

case "${1:-dev}" in
  dev)
    echo "▶ http://localhost:$PORT   (debug: /?debug · old site: /classic)"
    exec npx next dev -p "$PORT" ;;
  build)
    exec npx next build ;;
  start)
    npx next build
    echo "▶ http://localhost:$PORT"
    exec npx next start -p "$PORT" ;;
  *)
    echo "usage: ./run.sh [dev|build|start]"; exit 1 ;;
esac
