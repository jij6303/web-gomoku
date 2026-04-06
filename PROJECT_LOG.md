# web-gomoku

## 📌 프로젝트 개요
- 목적: 두 플레이어가 15x15 격자에서 번갈아 돌을 놓아 5개를 먼저 연결하면 이기는 웹 기반 오목 게임
- 시작일: 2026-04-05
- 기술 스택: HTML5, CSS3, JavaScript (Canvas API), Python (GitHub 자동화)

---

## 🗂️ 코드 구조

```
web-gomoku/
├── index.html           # 진입점. canvas와 리셋 버튼 등 UI 구조 정의
├── game.js              # 핵심 게임 로직 (보드 상태, 승리 판정, Canvas 렌더링, 클릭 이벤트)
├── style.css            # UI 스타일링 (배경색, 버튼, canvas 레이아웃)
├── main.py              # PyCharm 기본 생성 파일 (미사용)
├── github_bot.json      # GitHub App 자격증명 설정 (버전 관리 제외)
├── .gitignore           # github_bot.json 제외 설정
├── CLAUDE.md            # Claude Code 규칙 파일 진입점
└── github/
    ├── auth.py          # GitHub App 인증 (JWT 생성, 설치 토큰 발급)
    ├── create_issue.py  # GitHub 이슈 생성 CLI 스크립트
    ├── create_branch.py # GitHub 브랜치 생성 CLI 스크립트
    ├── create_pr.py     # GitHub PR 생성 CLI 스크립트
    └── request_review.py # GitHub 리뷰 요청 CLI 스크립트
```

---

## ✅ 기능 목록

| 기능 | 설명 | 상태 |
|------|------|------|
| 15x15 보드 렌더링 | Canvas 기반 격자 + 호점(star point) 5개 표시 | ✅ 완료 |
| 흑/백 돌 그래픽 | radial gradient로 입체감 있는 돌 표현 | ✅ 완료 |
| 플레이어 턴 관리 | 흑(1) → 백(2) 번갈아 두기 | ✅ 완료 |
| 클릭으로 돌 놓기 | DPI 보정된 정확한 보드 좌표 계산 | ✅ 완료 |
| 승리 판정 | 4방향(가로/세로/대각 2개) 5연속 체크 | ✅ 완료 |
| 게임 리셋 버튼 | 보드 초기화 및 첫 화면으로 복귀 | ✅ 완료 |
| 상태 표시 | 현재 차례 및 승리 메시지 실시간 출력 | ✅ 완료 |
| GitHub 자동화 | 이슈/브랜치/PR/리뷰 GitHub API 자동 처리 | ✅ 완료 |

---

## 📋 개발 일지

### #0 초기 설정 — GitHub 자동화 인프라 구축 (2026-04-05)
**왜 이 작업을 했나**
> 본격 개발 전 GitHub 워크플로우 자동화 도구를 먼저 세팅하기 위해

**뭘 했나**
> `github/` 모듈 5개 생성 (auth, create_issue, create_branch, create_pr, request_review)
> `github_bot.json` 설정 및 `.gitignore` 추가

**어떤 구조를 선택했고 왜**
> 각 GitHub 작업(이슈/브랜치/PR/리뷰)을 독립 CLI 스크립트로 분리.
> 공통 인증 로직은 `auth.py`에 집중해 재사용성 확보.
> GitHub API 직접 호출 방식으로 로컬 git 상태 없이도 원격 작업 가능.

**배운 것 / 몰랐던 것**
> GitHub App 인증은 JWT 생성 후 installation access token 발급 2단계 필요.
> JWT 유효기간(10분) 안에 토큰 발급을 완료해야 함.
> owner/repo는 git remote origin URL에서 자동 파싱 가능.

**에러 & 해결**
> 에러: 없음
> 원인: -
> 해결: -

---

### #1 오목 웹 게임 UI 구현 (2026-04-05)
**왜 이 작업을 했나**
> 프로젝트의 핵심 기능인 웹 기반 오목 게임 플레이 화면을 만들기 위해

**뭘 했나**
> `index.html`: canvas 엘리먼트와 리셋 버튼으로 구성된 최소 HTML 구조
> `game.js`: 151줄 — 보드 초기화, Canvas 렌더링, 승리 판정, 클릭 이벤트 처리
> `style.css`: 62줄 — 한국 전통 느낌의 배색, 반응형 레이아웃

**어떤 구조를 선택했고 왜**
> Canvas 기반 렌더링 선택 — 돌마다 DOM 노드를 만들지 않아 성능이 좋고, radial gradient로 입체 돌 표현이 가능.
> 플레이어 상태를 1(흑)/2(백) 숫자로 관리해 로직을 단순하게 유지.
> 승리 판정은 방향 벡터 `[dr, dc]` 4개로 양방향 탐색해 코드 중복 최소화.

**배운 것 / 몰랐던 것**
> Canvas 클릭 좌표는 `getBoundingClientRect()`로 DPI 보정 필요.
> 호점(star point) 5개는 `[3,7,11]` 인덱스 조합으로 배치.
> 승리 판정 시 배열 경계 체크를 먼저 해야 런타임 에러 없음.

**에러 & 해결**
> 에러: 없음
> 원인: -
> 해결: -

---

## 🐛 에러 모음

| 에러 | 원인 | 해결 |
|------|------|------|
| feature-#1 브랜치 미병합 | 게임 UI가 feature 브랜치에만 존재 | main에 머지 필요 |
| main.py 미사용 파일 잔존 | PyCharm 초기 생성 파일 | 삭제 또는 실제 진입점으로 교체 |
