# Polysona

Build and run multiple personas across any AI agent.

## Philosophy (Agent-Enforced)

1. **Execution velocity** — ship visible outcomes quickly and iterate daily.
2. **Data flywheel** — every run should improve persona quality and future outputs.
3. **Extreme pragmatism** — start from minimal working units and avoid overengineering.
4. **Top-down prioritization** — tackle the hardest constraint first, then descend.
5. **Facts first** — verify before deciding; do not guess when data can be checked.
6. **Open-source ecosystem** — build in public for interoperability, trust, and contribution.
7. **No speculation** — uncertain claims are blocked until grounded by evidence.

## Behavioral Rules (No Exceptions)

- **No speculation:** never invent numbers, framework counts, timelines, or capability claims.
- **Single Source of Truth (SSOT):** define each fact in one owner document; reference it elsewhere.
- **Tone consistency:** keep style stable in each file; avoid repetition and verbosity.
- **Immediate feedback loop:** apply user corrections immediately and persist them in the right files.

## Context Loading Protocol

Always read required context before generating outputs.

| Trigger | Mandatory Read |
|---|---|
| Interview session | `personas/{id}/persona.md`, interview skill references, latest interview-log |
| Persona introduction | `personas/{id}/persona.md`, `personas/{id}/nuance.md`, `personas/{id}/accounts.md` |
| Trend detection | relevant domain references + `personas/{id}/accounts.md` rolemodel section |
| Content generation | `persona.md` core/decide/energy/blind + `nuance.md` voice/platform + selected trend input |
| QA simulation | generated drafts + `accounts.md` rolemodel/virtual + platform pattern constraints |
| Publishing and tracking | final selected draft + account mapping + latest performance records |
| System or architecture tasks | `.ref/PLAN_FOR_POLYSONA.md` and this file |

## Data Conventions

- Store operational data in Markdown files only.
- Git is the database and history ledger.
- Use PLOON table format: `[table#N](col1,col2,...)` then pipe-delimited rows.
- Keep persona datasets under `personas/{id}/` (`persona.md`, `nuance.md`, `accounts.md`).
- Prefer compact, parseable tables over prose for machine-readable persona data.

## Key Facts (Must Never Be Wrong)

- Psychology frameworks: **10** total (Western depth 6 + Western supplement 2 + Eastern 2). Not 14.
- Interview principles: **10**.
- Ego layers: **5**.
- MVP platforms: **5** (X, Threads, LinkedIn, Naver Blog, Brunch).
- Codex is the primary integration target; Statement 1 requires mandatory OpenAI Codex integration.
- PLOON format is: `[table#N](col1,col2,...)` with pipe-delimited rows.
