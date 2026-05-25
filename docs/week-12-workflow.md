# 12주차 AI 개발 Workflow

## 미션 핵심

12주차 미션은 스마트블로그 서비스를 완성형 제품으로 크게 확장하기보다, AI를 활용한 개발 흐름을 설명 가능하게 만들고 서비스 구조를 스스로 이해하는 데 초점을 둔다.

PDF에서 확인한 요구사항:

- 이번 주 기능 개발 리스트를 먼저 계획한다.
- 이슈별로 하나씩 개발한다.
- 기능 완성보다 분석과 설계 단계를 더 집중해서 진행한다.
- 나만의 AI 개발 흐름을 정립한다.
- 분석과 설계를 꼼꼼하게 하기 위한 장치나 방법을 적용한다.
- Skill, hook 개념을 찾아서 1개 이상 적용한다.
- workflow에서 생긴 문제점과 개선사항을 발견하고 조정한다.
- PR에서 본인의 workflow 단계와 절차를 표현한다.
- 구현한 서비스의 FE, BE, API 호출 구조를 설명할 수 있어야 한다.

## 이번 주 작업 이슈

### Issue 1. 12주차 미션 재정리

- PDF 요구사항을 `Mission.md`와 `checklist.md`에 반영한다.
- 11주차 구현 결과 위에 12주차 작업 범위를 이어 붙인다.
- 커밋 메시지 규칙은 기존처럼 `No.{번호}: {concise English message}`를 유지한다.

### Issue 2. 분석/설계 게이트 적용

- `docs/analysis-design-gate.md`를 만들어 구현 전 점검 질문을 고정한다.
- 기능 목표, 사용자 흐름, 모듈 책임, 데이터/API, 보안 경계, 검증 계획을 먼저 확인한다.
- 목적은 AI에게 바로 구현을 맡기기 전에 설계 누락을 줄이는 것이다.

### Issue 3. Frontend hook 적용

- `CreateBlogPage`에 몰려 있던 요청 상태 관리와 커밋 선택 로직을 custom hook으로 분리한다.
- `useRequestState`: API 요청별 `idle | loading | success | error` 상태와 오류 메시지를 관리한다.
- `useCommitSelection`: 선택된 commit sha 목록과 선택된 commit 객체 목록을 관리한다.
- 목적은 "React hook 개념 적용"과 동시에 page 컴포넌트의 책임을 줄이는 것이다.

### Issue 4. 서비스 구조 설명 문서화

- React, Express, GitHub API, LLM API, 저장소가 어떤 책임을 갖는지 `docs/architecture-map.md`에 정리한다.
- PR에서 그대로 설명할 수 있도록 데이터 흐름과 모듈 책임을 짧은 단위로 작성한다.

### Issue 5. Skill 기반 검증 루프 강화

- `skills/mission-verifier.md`에 12주차 검증 기준을 추가한다.
- 문서, hook 적용, PR workflow 표현, 보안 검증이 빠지지 않도록 확인한다.
- `docs/skill-hook-application.md`에 실제로 활용한 skill과 적용한 hook을 정리한다.

### Issue 6. PR 작성 흐름 보강

- `.github/pull_request_template.md`에 AI workflow와 서비스 구조 설명 항목을 추가한다.
- PR 본문에서 이번 주 workflow와 절차를 표현하라는 요구사항을 놓치지 않게 한다.

### Issue 7. 검증과 회고 기록

- `npm.cmd run typecheck`
- `npm.cmd run build`
- 보안 문자열 검색
- 변경 내용과 남은 제약사항을 `docs/week-12-verification.md`에 기록한다.

## 반복 Workflow

1. PDF 요구사항을 읽고 미션 키워드를 추출한다.
2. 요구사항을 작은 이슈로 나눈다.
3. `docs/analysis-design-gate.md`의 질문으로 구현 전 분석/설계를 점검한다.
4. 각 이슈마다 관련 skill이나 기존 문서를 먼저 읽는다.
5. 코드 수정 전 책임 위치를 결정한다.
6. 구현은 작게 진행하고 문서를 함께 갱신한다.
7. typecheck/build로 기본 검증을 한다.
8. 누락된 요구사항을 `mission-verifier` 기준으로 다시 점검한다.
9. PR 템플릿에 workflow, 서비스 구조, 막혔던 점, 개선점을 작성한다.

## 이번 주에 적용한 Skill과 Hook

### Skill

- `skills/project-structure-architect.md`: 새 hook과 문서 위치를 정할 때 기준으로 사용한다.
- `skills/mission-verifier.md`: 최종 검증과 보안 점검 기준으로 사용한다.
- `docs/skill-hook-application.md`: 어떤 skill과 hook을 실제로 적용했는지 PR 설명용 근거로 사용한다.

### Analysis Gate

- `docs/analysis-design-gate.md`: 구현 전에 문제 정의, 사용자 흐름, 모듈 책임, 데이터/API, 보안 경계, 검증 계획을 먼저 확인하는 체크 장치로 사용한다.

### Hook

- `src/hooks/useRequestState.ts`: API 요청 상태와 오류 메시지를 reusable hook으로 분리한다.
- `src/hooks/useCommitSelection.ts`: commit 선택/해제 로직과 선택된 commit 계산을 reusable hook으로 분리한다.

## Workflow에서 발견한 문제와 조정

문제:

- 11주차 구현은 기능 단위로는 정리되어 있었지만, PR에서 "내 workflow가 어떻게 발전했는지"를 바로 설명하기에는 근거 문서가 분산되어 있었다.
- `CreateBlogPage`가 API 상태, commit 선택, 저장/발행 흐름을 모두 들고 있어서 hook 적용 근거가 약했다.
- AI에게 바로 구현을 맡기면 문제 정의, 실패 상태, 보안 경계 같은 설계 질문이 뒤로 밀릴 수 있었다.

조정:

- 12주차 전용 workflow 문서를 추가해 PDF 요구사항과 실제 작업 이슈를 연결했다.
- 구현 전 분석/설계 게이트를 추가해 기능 목표와 검증 계획을 먼저 확인하도록 했다.
- page 컴포넌트의 일부 상태 로직을 custom hook으로 분리해 hook 개념 적용을 코드로 남겼다.
- PR 템플릿에 workflow와 서비스 구조 항목을 추가해 제출 단계에서 요구사항이 드러나게 했다.
