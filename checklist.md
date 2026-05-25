# AI-Blog 미션 진행 체크리스트

상세 요구사항은 `Mission.md`를 기준으로 확인한다.  
이 파일은 실제 진행 상황을 빠르게 확인하기 위한 7개 단위 작업 체크리스트다.

## 12주차 추가 미션 체크리스트

12주차 PDF는 기능을 많이 추가하기보다 AI 개발 workflow 완성, Skill/hook 적용, 서비스 구조 설명을 요구한다.

### 1. 12주차 미션 분석과 작업 이슈 분리

- [x] 12주차 PDF에서 학습 목표와 프로그래밍 요구사항을 추출한다.
- [x] `Mission.md`에 12주차 추가 요구사항을 반영한다.
- [x] 이번 주 작업을 작은 이슈 단위로 나눈다.
- [x] 기능 완성보다 설계와 workflow 정리에 집중한다는 기준을 문서화한다.

완료 근거:

- `Mission.md`
- `docs/week-12-workflow.md`

### 2. 나만의 AI 개발 workflow 정립

- [x] 분석, 설계, 구현, 검증, 회고 순서의 반복 workflow를 정리한다.
- [x] 분석/설계를 꼼꼼하게 하기 위한 게이트 문서를 만든다.
- [x] workflow에서 발견한 문제와 조정 내용을 기록한다.
- [x] PR에서 workflow 단계와 절차를 설명할 수 있도록 정리한다.

완료 근거:

- `docs/week-12-workflow.md`
- `docs/analysis-design-gate.md`
- `.github/pull_request_template.md`

### 3. 서비스 구조 설명 문서화

- [x] Frontend, Backend, API 호출, 저장소의 역할을 구분한다.
- [x] Repository -> Branch -> Commit -> Draft -> Post 데이터 흐름을 설명한다.
- [x] GitHub token과 OpenAI API key가 서버에만 머무르는 보안 경계를 설명한다.

완료 근거:

- `docs/architecture-map.md`
- `docs/service-design.md`

### 4. Skill과 hook 적용

- [x] 12주차 검증 기준을 프로젝트 skill에 반영한다.
- [x] 활용한 skill과 적용한 hook을 별도 문서로 설명한다.
- [x] React custom hook을 1개 이상 구현한다.
- [x] 기존 page 컴포넌트에서 hook을 실제로 사용한다.

완료 근거:

- `skills/mission-verifier.md`
- `docs/skill-hook-application.md`
- `src/hooks/useRequestState.ts`
- `src/hooks/useCommitSelection.ts`
- `src/pages/CreateBlogPage.tsx`

### 5. PR 제출 준비 문서 보강

- [x] PR 템플릿에 완료 작업, AI workflow, 서비스 구조, 막혔던 점, 새로 알게 된 점, 개선점을 작성할 수 있게 한다.
- [x] README에서 12주차 문서 위치를 찾을 수 있게 한다.

완료 근거:

- `.github/pull_request_template.md`
- `README.md`

### 6. 검증과 회고 기록

- [x] `npm.cmd run typecheck`를 실행한다.
- [x] `npm.cmd run build`를 실행한다.
- [x] secret이 코드에 노출되지 않았는지 확인한다.
- [x] 검증 결과와 남은 제약사항을 문서화한다.

완료 근거:

- `docs/week-12-verification.md`

## 1. 미션 분석과 주차별 계획

- [x] `Mission.md`를 읽고 이번 미션의 핵심 목표를 다시 확인한다.
- [x] 1주차 목표와 2주차 목표를 나눈다.
- [x] 이번 주에 반드시 구현할 MVP 범위를 정한다.
- [x] 다음 주로 미룰 수 있는 기능을 구분한다.
- [x] 기술 스택 선택 이유를 문서화한다.
- [x] 주차별 계획 `.md` 파일을 작성하고 commit 대상에 포함한다.

완료 근거:

- `docs/week-1-plan.md`
- `docs/week-2-plan.md`
- `docs/tech-stack.md`
- `README.md`

## 2. 서비스 설계

- [x] GitHub 활동 데이터에서 블로그 초안이 만들어지는 전체 사용자 흐름을 정의한다.
- [x] Repository, Branch, Commit, BlogPost 데이터 구조를 정의한다.
- [x] React 컴포넌트 구조를 설계한다.
- [x] Express 서버 라우터와 서비스 구조를 설계한다.
- [x] 프론트엔드 상태 흐름을 정리한다.
- [x] 저장된 포스트를 어디에 보관할지 결정한다.

완료 근거:

- `docs/service-design.md`

## 3. GitHub 연동

- [x] GitHub API 요청은 Express 서버에서 처리하도록 구성한다.
- [x] GitHub token은 `.env`로 관리하고 클라이언트에 노출하지 않는다.
- [x] Repository 목록 조회 기능을 구현한다.
- [x] 선택한 Repository의 Branch 목록 조회 기능을 구현한다.
- [x] 선택한 Branch의 Commit 목록 조회 기능을 구현한다.
- [x] 선택한 Commit의 상세 정보 또는 변경 파일 정보를 수집한다.
- [x] 인증 실패, 빈 목록, API 오류 상태를 처리한다.

완료 근거:

- `server/index.ts`
- `server/routes/githubRoutes.ts`
- `server/services/githubService.ts`
- `server/config/env.ts`
- `.env.example`
- `docs/github-api.md`

## 4. LLM 블로그 초안 생성

- [x] 선택한 커밋 데이터를 LLM 요청에 적합한 형태로 정리한다.
- [x] 너무 긴 diff를 그대로 보내지 않도록 요약 또는 제한 전략을 정한다.
- [x] 개발 블로그 형식을 유도하는 프롬프트를 작성한다.
- [x] LLM API 요청은 Express 서버에서 처리하도록 구성한다.
- [x] LLM API key는 `.env`로 관리하고 클라이언트에 노출하지 않는다.
- [x] LLM 응답을 제목, 요약, 본문 형태의 편집 가능한 초안으로 변환한다.
- [x] LLM 실패, 빈 응답, 형식 오류를 처리한다.

완료 근거:

- `server/routes/llmRoutes.ts`
- `server/services/llmService.ts`
- `server/types/blog.ts`
- `server/config/env.ts`
- `.env.example`
- `docs/llm-draft.md`

## 5. 블로그 작성 UI

- [x] Repository 선택 UI를 만든다.
- [x] Branch 선택 UI를 만든다.
- [x] Commit 목록과 선택 UI를 만든다.
- [x] 선택한 Commit이 없을 때 AI 생성 요청을 막는다.
- [x] AI 생성 중 로딩 상태와 중복 요청 방지를 구현한다.
- [x] 생성된 초안을 편집할 수 있는 작성 화면을 만든다.
- [x] 제목, 요약, 본문을 사용자가 직접 수정할 수 있게 한다.

완료 근거:

- `src/pages/CreateBlogPage.tsx`
- `src/components/RepositorySelector.tsx`
- `src/components/BranchSelector.tsx`
- `src/components/CommitSelector.tsx`
- `src/components/BlogEditor.tsx`
- `src/services/githubApi.ts`
- `src/services/llmApi.ts`
- `docs/ui-flow.md`

## 6. 저장된 포스트 관리

- [x] 생성 또는 편집한 글을 저장할 수 있게 한다.
- [x] 저장된 포스트 목록을 카드 형태로 보여준다.
- [x] 카드에 제목, 브랜치 태그, 요약, 날짜를 표시한다.
- [x] 저장된 포스트를 다시 열어 수정할 수 있게 한다.
- [x] 저장 상태와 저장 실패 상태를 사용자에게 보여준다.
- [x] 발행 상태 또는 최종 검토 흐름을 구현한다.

완료 근거:

- `server/routes/postRoutes.ts`
- `server/services/postStore.ts`
- `src/services/postApi.ts`
- `src/components/SavedPostList.tsx`
- `src/components/SavedPostCard.tsx`
- `src/pages/CreateBlogPage.tsx`
- `docs/saved-posts.md`

## 7. AI Workflow, Skill, 검증

- [x] 개발 중 반복되는 좋은 process를 AI workflow로 정리한다.
- [x] 프로젝트용 Skill을 최소 1개 만들거나 기존 Skill을 미션에 맞게 개선한다.
- [x] 구현한 기능이 `Mission.md` 요구사항과 맞는지 점검한다.
- [x] Repository 선택부터 초안 생성, 편집, 저장까지 수동 검증한다.
- [x] API token, key, `.env` 값이 코드와 문서에 노출되지 않았는지 확인한다.
- [x] 테스트 또는 수동 검증 결과를 문서나 최종 보고에 남긴다.

완료 근거:

- `docs/ai-workflow.md`
- `docs/verification-report.md`
- `skills/mission-verifier.md`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- API smoke test: health, posts create/list/publish, invalid draft request
- Browser smoke test: Vite page 200

제약:

- 실제 GitHub Repository 선택과 LLM 초안 생성 live 검증은 `.env`에 `GITHUB_TOKEN`, `OPENAI_API_KEY`, `OPENAI_MODEL`을 설정한 뒤 수행해야 한다.
