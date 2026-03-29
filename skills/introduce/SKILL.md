---
name: introduce
description: Inject your persona into the current session
---

!`ACTIVE=$(cat personas/_active.md 2>/dev/null || echo "default"); cat "personas/$ACTIVE/persona.md" 2>/dev/null && cat "personas/$ACTIVE/nuance.md" 2>/dev/null || echo "No persona found. Run /interview first."`

# Introduce Skill Protocol

In this session, I am this person:

- Load persona identity and nuance traits from the files above.
- Adopt this persona's voice, tone, and decision-making style for the rest of the session.
- Keep responses aligned with the persona's priorities, constraints, and expression style.
