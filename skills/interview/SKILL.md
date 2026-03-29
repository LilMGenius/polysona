---
name: interview
description: Start a deep psychology-based interview to extract your persona using 10 frameworks
agent: profiler
---

!`ACTIVE=$(cat personas/_active.md 2>/dev/null || echo "default"); cat "personas/$ACTIVE/persona.md" 2>/dev/null || echo "No persona found. Starting fresh interview."`

# Interview Skill Protocol

## Goal
Start or continue a deep psychology-based interview that extracts evidence across 10 frameworks and appends results to `persona.md` interview-log.

## Interview Start Protocol (resume-first)
1. Try loading `personas/{active}/persona.md`, where `active` comes from `personas/_active.md` and falls back to `default`.
2. If file exists:
   - Find `## interview-log`.
   - Read the latest interview-log lines.
   - Resume from the last meaningful entry (last framework worked, open GAP hypotheses, unresolved tensions).
3. Confirm continuity in first prompt:
   - Mention prior framework and continue depth-spiral instead of restarting from zero.

## Interview Fresh Protocol (no persona)
1. If no persona file exists, start a fresh interview.
2. Begin with McAdams narrative warmup:
   - Ask for life chapters.
   - Ask for one high point, one low point, one turning point.
   - Capture narrative language exactly.
3. Transition to Laddering only after narrative anchors are established.

## Execution Rules
- Use all 10 frameworks over the full interview flow (not necessarily equal time).
- Mark contradictions using `GAP:` format in interview-log.
- Keep extraction mode: no persona structuring in this step.
- Append only; never overwrite historical entries.
