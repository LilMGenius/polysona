---
name: status
description: Show current persona health and content pipeline status
---

!`ls personas/ 2>/dev/null && echo "---" && cat personas/default/persona.md 2>/dev/null | head -20 && echo "---" && ls personas/default/published/ 2>/dev/null | wc -l && echo "published pieces"`

# Status Skill Protocol

Display a quick system status snapshot:
- Active personas count
- Last interview footprint from persona context
- Published content count
- Pipeline readiness status (interview -> trend -> content -> qa -> publish)
