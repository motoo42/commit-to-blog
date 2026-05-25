# 분석/설계 게이트

## 목적

12주차 미션의 "분석/설계를 꼼꼼하게 하기 위한 장치나 방법" 요구사항을 만족하기 위해, 구현 전에 반드시 확인할 질문 목록을 둔다. 이 문서는 기능을 바로 만들기 전에 요구사항, 데이터 흐름, 보안 경계, 실패 상태를 먼저 검토하게 만드는 게이트 역할을 한다.

## 사용 방법

새 이슈나 기능을 시작할 때 아래 순서로 작성한다.

1. 기능 목표를 한 문장으로 적는다.
2. 사용자 흐름을 단계별로 적는다.
3. FE, BE, 외부 API, 저장소 중 어느 모듈이 책임지는지 나눈다.
4. 필요한 데이터 타입과 API 입력/응답을 적는다.
5. 실패하거나 비어 있는 상태를 정리한다.
6. secret이나 `.env` 값이 어디까지 전달되는지 확인한다.
7. 검증 방법을 정한 뒤 구현을 시작한다.

## Gate Checklist

### 1. 문제 정의

- [ ] 이 기능이 해결하는 사용자 문제를 한 문장으로 설명할 수 있는가?
- [ ] 이번 이슈에서 하지 않을 일을 명확히 제외했는가?
- [ ] 기존 11주차/12주차 체크리스트 중 어떤 항목을 만족하는가?

### 2. 사용자 흐름

- [ ] 사용자가 처음 보는 상태가 정의되어 있는가?
- [ ] 성공 흐름이 단계별로 설명되어 있는가?
- [ ] 로딩, 빈 결과, 오류 상태가 빠지지 않았는가?
- [ ] 사용자가 이전 단계로 돌아가거나 다시 시도할 수 있는가?

### 3. 모듈 책임

- [ ] React가 화면 상태와 사용자 입력만 담당하는가?
- [ ] Express가 GitHub/LLM 요청과 secret 처리를 담당하는가?
- [ ] API service 함수가 fetch 세부 사항을 숨기는가?
- [ ] type 파일이 FE/BE 데이터 구조를 명확하게 표현하는가?

### 4. 데이터와 API

- [ ] 필요한 request body와 response shape이 정리되어 있는가?
- [ ] Repository, Branch, Commit, BlogPost 중 어떤 데이터가 필요한지 명확한가?
- [ ] 너무 큰 diff나 불필요한 데이터가 LLM에 그대로 전달되지 않는가?
- [ ] 저장/수정/발행 상태 변화가 예측 가능한가?

### 5. 보안 경계

- [ ] `GITHUB_TOKEN`은 서버에서만 읽는가?
- [ ] `OPENAI_API_KEY`는 서버에서만 읽는가?
- [ ] React 코드와 문서에 실제 secret 값이 들어가지 않았는가?
- [ ] `.env.example`에는 변수 이름만 있고 값은 없는가?

### 6. 검증 계획

- [ ] `npm.cmd run typecheck`가 필요한 변경인가?
- [ ] `npm.cmd run build`가 필요한 변경인가?
- [ ] API endpoint smoke test가 필요한 변경인가?
- [ ] PR에 남길 수 있는 검증 결과가 있는가?

## 이번 12주차 적용 예시

### 기능 목표

AI 개발 workflow를 설명 가능하게 만들고, 서비스 구조와 hook 적용 근거를 코드와 문서에 남긴다.

### 모듈 책임

- React: `CreateBlogPage`가 사용자 흐름을 조율한다.
- Hook: `useRequestState`, `useCommitSelection`이 반복 상태 로직을 분리한다.
- Express: GitHub/LLM 요청과 secret 처리를 담당한다.
- Docs: workflow, architecture, verification 근거를 남긴다.

### 실패 상태

- GitHub/LLM live 검증은 `.env` secret이 없으면 제한된다.
- 저장소는 메모리 기반이라 서버 재시작 후 저장 포스트가 사라진다.

### 검증

- `npm.cmd run typecheck`
- `npm.cmd run build`
- secret prefix와 env assignment 검색

## PR에 적을 수 있는 한 줄

분석/설계 누락을 줄이기 위해 `docs/analysis-design-gate.md`를 만들고, 기능 시작 전 문제 정의, 사용자 흐름, 모듈 책임, 데이터/API, 보안 경계, 검증 계획을 먼저 확인하는 방식으로 workflow를 조정했습니다.
