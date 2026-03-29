---
name: qa
description: Evaluate content drafts with virtual followers and get TOP 5 recommendations
context: fork
agent: virtual-follower
---

!`ACTIVE=$(cat personas/_active.md 2>/dev/null || echo "default"); LATEST_DRAFT=$(ls content/drafts/*.md 2>/dev/null | sort | tail -n 1); cat "personas/$ACTIVE/accounts.md" 2>/dev/null || echo "No accounts. Run /interview first."; echo "---"; if [ -n "$LATEST_DRAFT" ]; then cat "$LATEST_DRAFT"; else echo "No drafts found. Run /content first."; fi`

# QA Skill Protocol

- Run in `context: fork` for isolated evaluation.
- Trigger `virtual-follower` to execute the QA pipeline.
- Return TOP 5 recommendations with scores and concise rationale.
- Use the latest saved file in `content/drafts/` as the default evaluation source when no explicit draft is provided.
- Save the QA report to `content/qa/` before answering.
- Re-read the saved QA report and include the confirmed saved path in the response.
- If no draft file exists, report that QA is blocked instead of inventing an evaluation.
