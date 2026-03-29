---
name: publish
description: Save final content and get platform-specific publishing guidance
agent: admin
---

# Publish Skill Protocol

- Trigger `admin` to save final content into `content/published/`.
- Generate a platform-specific publishing checklist step by step.
- Include metadata fields for follow-up performance tracking.
- The admin MUST create the file before answering.
- The admin MUST re-read the saved file and include the confirmed saved path in the response.
- If no file was actually written, the admin must report failure instead of claiming success.
