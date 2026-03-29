#!/usr/bin/env bash
# Polysona post-tool-use hook — detect AI slop patterns
set -euo pipefail

OUTPUT="${TOOL_OUTPUT:-}"

# Detect verbose/repetitive patterns
if echo "$OUTPUT" | grep -qiE "certainly|absolutely|of course|as an AI|I understand that|I'd be happy to"; then
  echo "WARNING: AI slop pattern detected in output. Review for verbosity."
fi
