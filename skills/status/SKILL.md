---
name: status
description: Show current persona health and content pipeline status
---

!`ls personas/ 2>/dev/null && echo "---" && cat personas/default/persona.md 2>/dev/null && echo "---" && cat personas/default/nuance.md 2>/dev/null && echo "---" && cat personas/default/accounts.md 2>/dev/null && echo "---" && ls content/trends/ 2>/dev/null | wc -l && echo "trend files" && echo "---" && ls content/drafts/ 2>/dev/null | wc -l && echo "draft files" && echo "---" && ls content/published/ 2>/dev/null | wc -l && echo "published files"`

# Status Skill Protocol

Display a quick system status snapshot:
- Active personas count
- Last interview footprint from persona context
- Trends, drafts, and published content counts
- Pipeline readiness status (interview -> trend -> content -> qa -> publish)

## Guardrails
- Only report facts grounded in the loaded files.
- Do not invent psychology frameworks, audience segments, or pipeline components that are not explicitly present.
- If framework coverage is partial, list only the exact framework names that appear in `interview-log`.
- If the missing frameworks are not explicitly named in the files, report only the missing count.
- Treat GAP or summary rows as log entries, not as substitute names for missing psychology frameworks.
- If a section is missing, say it is missing instead of inferring completion.
- Prefer exact counts from `content/trends/`, `content/drafts/`, and `content/published/` over assumptions.
