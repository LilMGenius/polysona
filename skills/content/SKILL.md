---
name: content
description: Generate platform-specific content drafts conditioned on your persona
agent: content-writer
---

!`ACTIVE=$(cat personas/_active.md 2>/dev/null || echo "default"); cat "personas/$ACTIVE/persona.md" 2>/dev/null && cat "personas/$ACTIVE/nuance.md" 2>/dev/null && cat "personas/$ACTIVE/accounts.md" 2>/dev/null || echo "No persona. Run /interview first."`

# Content Skill Protocol

- `$ARGUMENTS`: target platform (`x`, `threads`, `linkedin`, `naver-blog`, `brunch`).
- Pass the platform argument and topic context to `content-writer`.
- Return 3 platform-native draft variations (`Draft 1/2/3`).
- The content-writer MUST save the generated drafts into `content/drafts/` before answering.
- The content-writer MUST re-read the saved draft file and include the confirmed saved path in the response.
- If no file was actually written, the content-writer must report failure instead of claiming draft persistence.
