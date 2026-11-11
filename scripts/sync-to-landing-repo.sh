#!/usr/bin/env bash
# Mirrors this folder into a clone of avnerfr/ansora-landing-page (the repo
# Vercel deploys from) and stages the result there for review. It does not
# commit or push — check `git status` in the clone, then commit and push.
#
# Usage: landing/scripts/sync-to-landing-repo.sh [path-to-clone]
#        default clone path: <monorepo>/../ansora-landing-page (cloned if missing)
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:-$SRC/../../ansora-landing-page}"

if [ ! -d "$DEST/.git" ]; then
  git clone https://github.com/avnerfr/ansora-landing-page.git "$DEST"
fi
DEST="$(cd "$DEST" && pwd)"
git -C "$DEST" pull --ff-only

# What gets published: files git tracks here or would track (not ignored),
# minus build output and local caches (Vercel builds dist/ itself) and files
# deleted locally.
LIST="$(mktemp)"
trap 'rm -f "$LIST"' EXIT
(cd "$SRC" && git ls-files --cached --others --exclude-standard) \
  | grep -Ev '^(dist/|\.vite/|tsconfig\.node\.tsbuildinfo$|vite\.config\.(js|d\.ts)$)' \
  | while IFS= read -r f; do [ -f "$SRC/$f" ] && printf '%s\n' "$f"; done \
  | sort -u > "$LIST"

# Files the clone has that this folder no longer publishes. `umami` is a
# submodule pointer to the analytics server's repo, not part of this site.
(cd "$DEST" && git ls-files) | while IFS= read -r f; do
  [ "$f" = "umami" ] && continue
  grep -Fxq -- "$f" "$LIST" || git -C "$DEST" rm -q -- "$f"
done

while IFS= read -r f; do
  mkdir -p "$DEST/$(dirname "$f")"
  cp "$SRC/$f" "$DEST/$f"
done < "$LIST"

git -C "$DEST" add -A
echo
echo "Staged in $DEST:"
git -C "$DEST" status --short
