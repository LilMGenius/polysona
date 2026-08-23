#!/usr/bin/env bash
# Polysona post-tool-use hook — detect AI slop patterns
set -euo pipefail

# Hook input arrives as a JSON object on stdin. The tool's own text lives in
# tool_response, so read it from there rather than from the environment.
INPUT="$(cat)"
OUTPUT="$(printf '%s' "$INPUT" | node -e '
let raw = ""
process.stdin.on("data", (chunk) => { raw += chunk })
process.stdin.on("end", () => {
  let parsed = {}
  try { parsed = JSON.parse(raw) } catch { parsed = {} }
  const response = parsed.tool_response
  if (typeof response === "string") { process.stdout.write(response); return }
  if (response && typeof response === "object") {
    process.stdout.write(typeof response.content === "string" ? response.content : JSON.stringify(response))
  }
})
')"

# Detect verbose/repetitive patterns
if echo "$OUTPUT" | grep -qiE "certainly|absolutely|of course|as an AI|I understand that|I'd be happy to"; then
  echo "WARNING: AI slop pattern detected in output. Review for verbosity."
fi
