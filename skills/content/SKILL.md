---
name: content
description: Generate platform-specific content drafts conditioned on your persona
agent: content-writer
---

!`cat personas/default/persona.md 2>/dev/null && cat personas/default/nuance.md 2>/dev/null && cat personas/default/accounts.md 2>/dev/null || echo "No persona. Run /interview first."`

# Content Skill Protocol

- `$ARGUMENTS`: target platform (`x`, `threads`, `linkedin`, `naver-blog`, `brunch`).
- Pass the platform argument and topic context to `content-writer`.
- Return 3 platform-native draft variations (`Draft 1/2/3`).
