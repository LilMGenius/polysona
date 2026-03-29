---
name: trend
description: Scan trending topics in your domains and get content recommendations
agent: trendsetter
---

!`cat personas/default/persona.md 2>/dev/null || echo "No persona. Run /interview first."`

# Trend Skill Protocol

- Trigger the `trendsetter` agent.
- Scan current trends and return a ranked topic list matched to persona domains.
- Include platform-fit tags for x, threads, linkedin, naver-blog, and brunch.
- If live search is slow or unavailable, the trendsetter must immediately fall back to persona-driven topic ranking from local files and still return usable results.
- The trendsetter MUST save the ranked scan to `content/trends/` before answering.
- The trendsetter MUST re-read the saved trend file and include the confirmed saved path in the response.
- If no file was actually written, the trendsetter must report failure instead of claiming success.
