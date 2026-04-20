#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-../copy-cod}"

if [[ ! -d "$TARGET_DIR/.git" ]]; then
  echo "Target repository not found at: $TARGET_DIR"
  echo "Usage: ./transfer-to-copy-cod.sh /path/to/copy-cod"
  exit 1
fi

cp -f index.html "$TARGET_DIR/index.html"
cp -f style.css "$TARGET_DIR/style.css"
cp -f script.js "$TARGET_DIR/script.js"

echo "Copied website files to $TARGET_DIR"
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  git add index.html style.css script.js"
echo "  git commit -m 'Import birthday website clone in English'"
echo "  git push"

