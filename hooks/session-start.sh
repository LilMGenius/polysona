#!/usr/bin/env bash
# Polysona session start hook — auto-loads active persona summary
set -euo pipefail

ACTIVE_PERSONA="$(cat personas/_active.md 2>/dev/null || echo "default")"
PERSONA_DIR="personas/$ACTIVE_PERSONA"

if [ -d "$PERSONA_DIR" ]; then
  echo "=== Polysona: Active Persona ==="
  if [ -f "$PERSONA_DIR/persona.md" ]; then
    head -10 "$PERSONA_DIR/persona.md"
    echo "..."
  fi
  echo "=== Polysona: Core Rules ==="
  echo "- No speculation. Facts first."
  echo "- PLOON format for all data writes."
  echo "- Append to interview-log, never overwrite."
  echo "- 10 psychology frameworks, 5 ego layers."
  echo "================================"
else
  echo "=== Polysona: No persona found. Run /interview to start. ==="
fi
