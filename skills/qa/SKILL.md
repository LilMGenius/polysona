---
name: qa
description: Evaluate content drafts with virtual followers and get TOP 5 recommendations
context: fork
agent: virtual-follower
---

!`cat personas/default/accounts.md 2>/dev/null || echo "No accounts. Run /interview first."`

# QA Skill Protocol

- Run in `context: fork` for isolated evaluation.
- Trigger `virtual-follower` to execute the QA pipeline.
- Return TOP 5 recommendations with scores and concise rationale.
