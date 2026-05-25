# Skill과 Hook 적용 기록

## 요구사항

12주차 미션 요구사항:

- Skill, hook 개념을 찾아서 적용해봅니다.
- Skill을 1개 이상 활용해보세요.

## 적용한 Skill

### `skills/mission-verifier.md`

역할:

- 미션 요구사항 누락 여부를 점검한다.
- workflow, 서비스 구조, Skill/hook 적용, 보안 검증, PR 작성 근거를 확인한다.
- 구현 후 `typecheck`, `build`, secret 노출 점검 같은 검증 기준을 정리한다.

이번 주 활용 방식:

1. 12주차 PDF 요구사항을 `Mission.md`와 `checklist.md`에 옮겼다.
2. `mission-verifier`에 12주차 전용 검증 기준을 추가했다.
3. `docs/analysis-design-gate.md`, `docs/week-12-workflow.md`, `docs/architecture-map.md`가 요구사항을 설명하는지 점검했다.
4. 구현 후 `npm.cmd run typecheck`, `npm.cmd run build`, secret 검색을 수행했다.
5. 검증 결과를 `docs/week-12-verification.md`에 기록했다.

적용 근거 파일:

- `skills/mission-verifier.md`
- `docs/week-12-workflow.md`
- `docs/week-12-verification.md`
- `docs/analysis-design-gate.md`

## 적용한 Hook

### `src/hooks/useRequestState.ts`

역할:

- API 요청별 상태를 `idle`, `loading`, `success`, `error`로 관리한다.
- 요청별 오류 메시지를 한 곳에서 관리한다.
- `CreateBlogPage`가 상태 관리 세부 구현을 직접 들고 있지 않도록 분리한다.

적용 전:

- `CreateBlogPage`가 `statuses`, `errors`, `setStatus`, `setError` 로직을 모두 직접 가지고 있었다.

적용 후:

- `useRequestState`가 요청 상태와 오류 메시지 로직을 담당한다.
- page 컴포넌트는 사용자 흐름 조율에 더 집중한다.

### `src/hooks/useCommitSelection.ts`

역할:

- 선택된 commit sha 목록을 관리한다.
- commit 선택/해제 로직을 분리한다.
- 선택된 commit 객체 목록을 계산한다.

적용 전:

- `CreateBlogPage`가 `selectedCommitShas`, `toggleCommit`, `selectedCommits` 계산을 모두 직접 처리했다.

적용 후:

- `useCommitSelection`이 commit 선택 상태와 계산을 담당한다.
- `CreateBlogPage`는 hook이 제공하는 값과 함수를 사용한다.

적용 근거 파일:

- `src/hooks/useRequestState.ts`
- `src/hooks/useCommitSelection.ts`
- `src/pages/CreateBlogPage.tsx`
- `docs/architecture-map.md`
- `docs/service-design.md`

## PR에 적을 수 있는 문장

이번 주에는 프로젝트 Skill인 `mission-verifier`를 12주차 기준에 맞게 보강하고 검증 루프에 활용했습니다. Hook 개념은 `useRequestState`, `useCommitSelection` custom hook으로 적용해 `CreateBlogPage`의 요청 상태 관리와 commit 선택 로직을 분리했습니다.
