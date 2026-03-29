<p align="center">
  <img src="assets/banner.svg" width="100%">
</p>

<h3 align="center">Build and run multiple personas across any AI agent.</h3>

<p align="center">
  <img alt="version" src="https://img.shields.io/badge/version-0.3.0-blue">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="stars" src="https://img.shields.io/github/stars/LilMGenius/polysona?style=social">
</p>

## STOP THINKING LIKE A TEMPLATE

Every AI agent tool has the same problem: **it gives you someone else's answer, or it doesn't know you.**

gstack gives you Garry Tan's brain. **polysona gives you yours.**

## Why Polysona

- **The 10-framework interview**: We use 10 psychology frameworks (including Carl Jung's Persona/Shadow, IFS, and Zen Koan) to extract your conscious goals, unconscious patterns, and the gaps between them.
- **Multi-Persona Engine**: You aren't just one person. Polysona builds and manages multiple personas (the executive, the creator, the gamer) across different domains.
- **Portability**: Your extracted persona isn't locked into one tool. It runs across any AI agent (Codex, Claude Code, OpenCode).

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    POLYSONA (Orchestrator)                  │
│     Build and run multiple personas across any AI agent.    │
│          Manage all persona data and agents                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 SETUP (One-time)                     │    │
│  │                                                     │    │
│  │  ① Profiler                                          │    │
│  │     Interview → Extract logs                         │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  [Polysona structures logs]                          │    │
│  │     → persona.md + nuance.md + accounts.md           │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                        │ persona data                       │
│                        ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LOOP (Per Content)                      │    │
│  │                                                     │    │
│  │  ② Trendsetter                                       │    │
│  │     Trend topics collection                          │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ③ Content-Writer                                    │    │
│  │     persona + trend → Platform-specific drafts       │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ④ Virtual-Follower (QA)                             │    │
│  │     Evaluate by rolemodel → TOP 5 → User picks       │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ⑤ Admin                                             │    │
│  │     Publish → Track engagement → Feedback            │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# Codex (primary)
# AGENTS.md is auto-recognized by Codex
# Use $interview, $content, $qa in your Codex session

# Claude Code
claude plugin install polysona
# Then: /interview → /content x → /qa → /publish
```

## 5 Agents

| Name | Role | Command |
|---|---|---|
| **profiler** | Deep psychology interviewer | `$interview` / `/interview` |
| **trendsetter** | Trend detector | `$trend` / `/trend` |
| **content-writer** | Platform content generator | `$content` / `/content` |
| **virtual-follower** | QA simulator | `$qa` / `/qa` |
| **admin** | Publisher and tracker | `$publish` / `/publish` |

## Dashboard

Run the local-first dashboard to visualize your personas and content pipeline:

```bash
bun run dev
# Open http://localhost:3000
```

Features:
- Persona list from `personas/` directory
- System status and version
- Quick start commands reference

<!-- demo screenshots will be added -->

## Roadmap

**— v1: Core + Local Platforms —**
- **v1.0** Text content generation
- **v1.1** Persona extraction to CLAUDE.md/AGENTS.md + Multi-CLI marketplace support
- **v1.2** Local-first fullstack dashboard (Bun+Hono+Vite+React)
- **v1.3** Card news generation (image + text)
- **v1.4** Short-form video scripts (Reels, Shorts, TikTok)
- **v1.5** Long-form video scripts (YouTube, Podcast)
- **v1.6** External SaaS integration via MCP

**— v2: Global Expansion —**
- **v2.0** English text content (X, Threads, LinkedIn, Medium, Substack, Reddit)
- **v2.1** English card news
- **v2.2** English short-form scripts
- **v2.3** English long-form scripts

## Contributing & License

Polysona is open-source. Contributions are welcome. See `LICENSE` for more information (MIT License).
