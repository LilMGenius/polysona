# Changelog

All notable changes to Polysona are documented here.

## [1.3.0] — 2026-03-29

### Added
- Merged the rebased `dashboard2` workstream into `main`
- Expanded dashboard views with persona visualizations, QA simulation, agent monitoring, and supporting API routes
- Added persisted storage targets for trends, drafts, QA reports, and published outputs under `content/`
- Added demo deck assets under `decks/`

### Changed
- Resolved active persona fallback across hooks, agents, and skills
- Clarified Claude marketplace setup and host-dependent hook expectations
- Grounded status reporting in repo data and persisted pipeline artifacts

## [1.2.0] — 2026-03-29

### Added
- Local-first fullstack dashboard (Hono server + HTML client)
- Persona list API: GET /api/personas
- Status API: GET /api/status
- Dashboard UI with teal/indigo brand palette
- bun run dev for one-command local server

## [1.1.0] — 2026-03-29

### Added
- Export skill: persona → CLAUDE.md/AGENTS.md extraction for any AI agent
- Marketplace registration with full metadata
- Codex compatibility verified (AGENTS.md auto-recognition)

## [1.0.0] — 2026-03-29

### Added
- 5-agent content pipeline: profiler, trendsetter, content-writer, virtual-follower, admin
- 7 skills: interview, introduce, trend, content, qa, publish, status
- 10-framework psychology interview engine (Western depth 6 + supplement 2 + Eastern 2)
- PLOON data format: persona.md, nuance.md, accounts.md
- Lifecycle hooks: SessionStart, PreToolUse, PostToolUse
- Claude Code plugin manifest (plugin.json)
- Codex agent metadata (agents/openai.yaml)
- Sample persona data (personas/default/)
- Viral README with polysona banner (deep teal + indigo palette)
