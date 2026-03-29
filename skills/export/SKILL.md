---
name: export
description: Extract your persona into CLAUDE.md or AGENTS.md for use in any AI agent
---

!`cat personas/default/persona.md 2>/dev/null && cat personas/default/nuance.md 2>/dev/null || echo "No persona. Run /interview first."`

# Export Skill Protocol

`$ARGUMENTS`:
- `target` — `claude`, `agents`, or `both`

Parse `target` first:
- `claude` → write only `CLAUDE.md`
- `agents` → write only `AGENTS.md`
- `both` or empty → write both files

## Export to CLAUDE.md template (target=claude or both)

Build `CLAUDE.md` from persona + nuance sources:
- Work philosophy section: infer priority, approach, and risk stance from `persona.md`
- Decision-making priorities: infer ordering + energy bias from `persona.md`
- Tone rules: map `nuance.md` voice into register rules and avoid-list
- Context loading protocol: derive startup context from `persona.md` core tags
- Anti-patterns to avoid: convert `persona.md` anti field into explicit do-not rules

## Export to AGENTS.md template (target=agents or both)

Build Codex/OpenCode-compatible agent definitions:
- Include agent name, description, and invocation method
- Ground role split in persona domain expertise from `persona.md` core tags
- Keep entries portable across Codex/OpenCode style `AGENTS.md`

## Output

Write generated files to the current working directory:
- `CLAUDE.md` and/or `AGENTS.md` (based on `target`)

Note: This persona is now portable. Drop it into any project.
