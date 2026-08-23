#!/usr/bin/env bash
# Polysona pre-tool-use hook — guard against PLOON overwrite
# Warns when Write tool is about to touch a persona file without prior Read
set -euo pipefail

# Claude Code delivers hook input as a JSON object on stdin, not as environment
# variables. Read it once, then pull the fields out of that object.
INPUT="$(cat)"
eval "$(printf '%s' "$INPUT" | node -e '
let raw = ""
process.stdin.on("data", (chunk) => { raw += chunk })
process.stdin.on("end", () => {
  let parsed = {}
  try { parsed = JSON.parse(raw) } catch { parsed = {} }
  const quote = (value) => "'"'"'" + String(value ?? "").replace(/'"'"'/g, "'"'"'\\'"'"''"'"'") + "'"'"'"
  process.stdout.write("TOOL_NAME=" + quote(parsed.tool_name) + "\n")
  process.stdout.write("FILE_PATH=" + quote(parsed.tool_input && parsed.tool_input.file_path) + "\n")
})
')"

if [[ "$TOOL_NAME" == "Write" ]] && [[ "$FILE_PATH" == *personas/* ]]; then
  echo "WARNING: Writing to persona file $FILE_PATH"
  echo "Ensure you have Read this file first to avoid overwriting PLOON data."
  echo "Append to interview-log section only. Never overwrite compressed core."
fi
