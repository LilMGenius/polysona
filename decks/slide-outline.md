# Polysona - Ralphthon Seoul Presentation

## Meta
- **Topic**: Polysona 최종 발표
- **Target Audience**: 랄프톤 서울 심사자, 동료 빌더, 잠재 고객
- **Tone/Mood**: 날카롭고 실전적인 피치, 문제의 고통과 실행력을 짧고 강하게 전달
- **Slide Count**: 5 slides
- **Aspect Ratio**: 16:9

## Slide Composition

### Slide 1 - Cover
- **Type**: Cover
- **Title**: Polysona
- **Subtitle**: Polygon + Persona
- **Oneliner**: Build and run multiple personas across any AI agent
- **Details**:
  - 팀: Polysona
  - 팀원: 이선민 (@LilMGenius), CEO/CAIO @ defytheodd
  - GitHub: https://github.com/LilMGenius/polysona

### Slide 2 - Problem
- **Type**: Content
- **Title**: 에이전트는 일을 하지만, "나"를 모른다
- **Key Message**: 기존 에이전트 스택은 맥락은 처리해도 화자의 심리, 말투, 가면, 관계 맥락까지는 재현하지 못한다.
- **Details**:
  - 타깃: 여러 플랫폼에서 AI 인플루언서 계정을 동시에 운영하려는 개인/에이전시
  - 문제: 잘 정리된 문서가 있어도 에이전트가 무시하거나 평평하게 소비해 실제 말투와 페르소나가 붕괴됨
  - 빈도/고통: 콘텐츠 생성, 댓글, 답글, 운영 의사결정 전 과정에서 매 분매초 반복
  - 비교 포인트: OpenClaw, oh-my-* 계열, 일반 agent stack은 "나"가 아니라 generic assistant에 가깝다

### Slide 3 - Why Now / Evidence
- **Type**: Content
- **Title**: 이 문제는 바로 돈과 반응으로 연결된다
- **Key Message**: 페르소나가 맞는 콘텐츠는 실제 반응을 만들고, 고객은 이미 자동화 구매 의사를 보였다.
- **Details**:
  - 개인 사례: 내 말투로 남의 글에 답글을 달았더니 팔로워가 50명 증가
  - 제품 계기: 이후 나 대신 답글 다니는 에이전트를 만들었고, 상황별 여러 가면까지 핸들링하고 싶어짐
  - 고객 신호: AX 컨설팅 고객사(뷰티, 패션, F&B, 마케팅 에이전시)가 AI 인플루언서 운영 자동화를 직접 원함
  - 사업성 근거: 단가를 포함한 구매 의사를 명확히 밝힌 고객이 있음

### Slide 4 - Solution
- **Type**: Content
- **Title**: 심리학적 Agent Harness 기반 멀티 페르소나 운영 시스템
- **Key Message**: Polysona는 인터뷰와 메타인지를 통해 사용자를 구조화하고, 그 사람에 맞는 멀티 페르소나 콘텐츠 운영 루프를 만든다.
- **Details**:
  - 한 줄 정의: Build and run multiple personas across any AI agent with psychological agent harness
  - 핵심 흐름 1: 사용자를 인터뷰하고 심리학적/철학적 근간으로 persona structuring
  - 핵심 흐름 2: 가장 "나"를 잘 투영한 콘텐츠 생성
  - 핵심 흐름 3: virtual follower가 평가하고 콘텐츠 QA
  - MVP 데모 포인트: 인터뷰 -> 메타인지 기반 페르소나화 -> 콘텐츠 생성 -> QA

### Slide 5 - Ralph Setup / Progress
- **Type**: Content
- **Title**: 랄프 역량 = 멀티 에이전트 운영력
- **Key Message**: Polysona는 이미 agent-native하게 만들어지고 있고, 팀의 운영 방식 자체가 곧 제품의 실행력이다.
- **Details**:
  - 사용 스택: oh-my-openagent, Codex, Claude Code 등
  - 운영 방식: ralph-loop with ulw
  - 메시지 포인트: 단순히 AI를 붙인 것이 아니라 persona-aware agent harness를 직접 설계/운영함
  - 현재 상태: MVP는 돌아가고 있으며, 실제 사용성과 사업화 신호를 함께 검증 중
