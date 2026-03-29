#!/usr/bin/env bash
# Polysona pre-tool-use hook — guard against PLOON overwrite
# Warns when Write tool is about to touch a persona file without prior Read
set -euo pipefail

TOOL_NAME="${TOOL_NAME:-}"
FILE_PATH="${FILE_PATH:-}"

if [[ "$TOOL_NAME" == "Write" ]] && [[ "$FILE_PATH" == personas/* ]]; then
  echo "WARNING: Writing to persona file $FILE_PATH"
  echo "Ensure you have Read this file first to avoid overwriting PLOON data."
  echo "Append to interview-log section only. Never overwrite compressed core."
fi
