---
name: export
description: Extract your persona into CLAUDE.md or AGENTS.md for use in any AI agent
---

!`ACTIVE=$(cat personas/_active.md 2>/dev/null || echo "default"); cat "personas/$ACTIVE/persona.md" 2>/dev/null && cat "personas/$ACTIVE/nuance.md" 2>/dev/null || echo "No persona. Run /interview first."`

# Export Skill Protocol

`$ARGUMENTS`:
- `target` — `claude`, `agents`, or `both`

Parse `target` first:
- `claude` → write only `personas/{active}/generated/CLAUDE.generated.md`
- `agents` → write only `personas/{active}/generated/AGENTS.generated.md`
- `both` or empty → write both generated files

## Export to CLAUDE.md template (target=claude or both)

Build `personas/{active}/generated/CLAUDE.generated.md` from persona + nuance sources:
- Work philosophy section: infer priority, approach, and risk stance from `persona.md`
- Decision-making priorities: infer ordering + energy bias from `persona.md`
- Tone rules: map `nuance.md` voice into register rules and avoid-list
- Context loading protocol: derive startup context from `persona.md` core tags
- Anti-patterns to avoid: convert `persona.md` anti field into explicit do-not rules
- Add a header note that this file was generated and should be reviewed before copying into a project root.

## Export to AGENTS.md template (target=agents or both)

Build Codex/OpenCode-compatible agent definitions:
- Include agent name, description, and invocation method
- Ground role split in persona domain expertise from `persona.md` core tags
- Keep entries portable across Codex/OpenCode style `AGENTS.md`
- Write the result to `personas/{active}/generated/AGENTS.generated.md` and add a generated-file header note.

## Output

Write generated files to `personas/{active}/generated/`:
- `CLAUDE.generated.md`
- `AGENTS.generated.md`
- Create the directory first if it does not exist.
- Re-read the saved file(s) and return the confirmed generated path(s).

Note: This persona is now portable. Drop it into any project.
