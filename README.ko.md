<p align="center">
  <img src="assets/banner.svg" width="100%">
</p>

<h3 align="center">모든 AI 에이전트 위에서 다중 페르소나를 구축하고 운영하세요.</h3>

<p align="center">
  <img alt="version" src="https://img.shields.io/badge/version-1.2.1-blue">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="stars" src="https://img.shields.io/github/stars/LilMGenius/polysona?style=social">
</p>

## STOP THINKING LIKE A TEMPLATE

모든 AI 에이전트 도구는 똑같은 문제를 가지고 있습니다. **다른 사람의 정답을 주거나, 당신을 모릅니다.**

gstack은 개리 탄(Garry Tan)의 뇌를 줍니다. **polysona는 당신의 뇌를 넣습니다.**

## Why Polysona

- **10-framework interview**: 칼 융(Carl Jung)의 페르소나/그림자, IFS, 선불교 화두 등 10가지 심리학 프레임워크를 사용하여 의식적인 목표와 무의식적인 패턴, 그리고 그 사이의 간극을 추출합니다.
- **다중 페르소나 엔진**: 인간은 하나의 자아로만 이루어져 있지 않습니다. Polysona는 임원, 크리에이터, 게이머 등 여러 도메인에 걸친 다중 페르소나를 구축하고 관리합니다.
- **이식성(Portability)**: 추출된 페르소나는 특정 도구에 종속되지 않습니다. 모든 AI 에이전트(Codex, Claude Code, OpenCode)에서 실행할 수 있습니다.

## 아키텍처 (Architecture)

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    POLYSONA (오케스트레이터)                │
│     Build and run multiple personas across any AI agent.    │
│          모든 페르소나 데이터와 에이전트를 관리             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 SETUP (최초 1회)                     │    │
│  │                                                     │    │
│  │  ① Profiler (프로파일러)                             │    │
│  │     인터뷰 → 로그 추출                               │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  [Polysona 로그 구조화]                              │    │
│  │     → persona.md + nuance.md + accounts.md           │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                        │ persona data                       │
│                        ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LOOP (콘텐츠 발행 시마다 반복)          │    │
│  │                                                     │    │
│  │  ② Trendsetter (트렌드세터)                          │    │
│  │     트렌드 소재 수집                                 │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ③ Content-Writer (콘텐츠라이터)                     │    │
│  │     persona + trend → 플랫폼별 초안                  │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ④ Virtual-Follower (QA 버추얼 팔로워)               │    │
│  │     롤모델 기준 평가 → TOP 5 추천 → 유저 선택        │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  ⑤ Admin (어드민)                                    │    │
│  │     게시 → 인게이지먼트 추적 → 피드백                │    │
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
# 1. 로컬 마켓플레이스 추가
claude plugin marketplace add ./.claude-plugin/marketplace.json
# 2. 플러그인 설치
claude plugin install polysona
# 3. 세션 시작 (Hooks 자동 실행)
# Then: /interview → /content x → /qa → /publish
```

## 5 Agents

| 이름 | 역할 | 명령어 |
|---|---|---|
| **profiler** | 심층 심리 인터뷰어 | `$interview` / `/interview` |
| **trendsetter** | 트렌드 탐지 및 추천 | `$trend` / `/trend` |
| **content-writer** | 플랫폼별 콘텐츠 생성 | `$content` / `/content` |
| **virtual-follower** | 가상 팔로워 QA 시뮬레이터 | `$qa` / `/qa` |
| **admin** | 게시, 스케줄링 및 성과 추적 | `$publish` / `/publish` |

<!-- demo screenshots will be added -->

## 확장 로드맵 (Roadmap)

**— v1: 핵심 기능 + 국내 플랫폼 우선 —**
- **v1.0** 텍스트 콘텐츠 생성 (X, Threads, LinkedIn, 네이버 블로그, 브런치)
- **v1.1** 페르소나 → CLAUDE.md/AGENTS.md 추출 + 멀티 CLI 마켓플레이스 지원
- **v1.2** 로컬 퍼스트 풀스택 대시보드 (Bun+Hono+Vite+React)
- **v1.3** 카드뉴스 생성 (이미지 + 텍스트)
- **v1.4** 숏폼 영상 스크립트 (Reels, Shorts, TikTok)
- **v1.5** 롱폼 영상 스크립트 (YouTube, Podcast)
- **v1.6** 외부 SaaS 연동 (MCP 지원)

**— v2: 글로벌 확장 —**
- **v2.0** 영어 텍스트 콘텐츠 (X, Threads, LinkedIn, Medium, Substack, Reddit)
- **v2.1** 영어 카드뉴스
- **v2.2** 영어 숏폼 스크립트
- **v2.3** 영어 롱폼 스크립트

## 기여 및 라이선스 (Contributing & License)

Polysona는 오픈소스 프로젝트입니다. 모든 기여를 환영합니다. 라이선스 관련 정보는 `LICENSE` 파일(MIT License)을 참조해 주세요.
