# 12주차 검증 결과

## 검증 대상

12주차 미션의 핵심 요구사항은 기능의 양보다 workflow, Skill/hook 적용, 서비스 구조 설명이다. 이번 검증은 아래 변경 사항을 대상으로 한다.

- 12주차 미션 요구사항 문서화
- AI 개발 workflow 문서화
- 분석/설계 게이트 문서화
- Skill/hook 적용 근거 문서화
- 서비스 구조 설명 문서화
- React custom hook 적용
- PR 템플릿 보강
- `mission-verifier` skill 보강

## 실행한 검증

### TypeScript 검증

```bash
npm.cmd run typecheck
```

결과: 통과

### Production build 검증

```bash
npm.cmd run build
```

결과: 통과

### Secret 노출 점검

```bash
rg -n "<GitHub/OpenAI token prefix pattern>" server src .github
rg -n "(GITHUB_TOKEN|OPENAI_API_KEY|OPENAI_MODEL)\s*=" server src .github
```

결과: 실제 GitHub token, OpenAI key, 환경 변수 값 대입 패턴이 발견되지 않았다.

## 12주차 요구사항 대응표

| 요구사항 | 대응 |
| --- | --- |
| 이번 주 기능 개발 리스트 계획 | `docs/week-12-workflow.md`의 이번 주 작업 이슈 |
| 이슈별로 하나씩 개발 | Issue 1~6으로 작업 단위 분리 |
| 기능보다 설계 단계 집중 | workflow, architecture, PR template 중심 보강 |
| 나만의 AI 개발 흐름 정립 | `docs/week-12-workflow.md`의 반복 Workflow |
| 분석/설계 장치 적용 | `docs/analysis-design-gate.md`의 구현 전 점검 질문 사용 |
| Skill 1개 이상 활용 | `skills/mission-verifier.md` 보강 및 `docs/skill-hook-application.md`에 활용 방식 기록 |
| hook 개념 적용 | `useRequestState`, `useCommitSelection` 구현 및 page 컴포넌트에서 사용 |
| 문제점과 개선사항 조정 | workflow 문서의 문제/조정 항목 기록 |
| PR에서 workflow 표현 | `.github/pull_request_template.md` 보강 |
| 서비스 구조 설명 가능 | `docs/architecture-map.md` 추가 |

## 남은 제약사항

- 실제 GitHub API와 OpenAI API live 검증은 개인 `.env`에 `GITHUB_TOKEN`, `OPENAI_API_KEY`, `OPENAI_MODEL`을 설정한 뒤 가능하다.
- 저장된 포스트는 기존 MVP 기준대로 메모리 저장소를 사용하므로 서버 재시작 시 사라진다.
- 12주차 작업은 workflow와 구조 설명에 집중했기 때문에 새로운 외부 API 기능은 추가하지 않았다.

## 회고

이번 작업에서 가장 중요한 조정은 "기능을 더 추가하는 것"보다 "이미 만든 기능을 설명 가능한 구조로 정리하는 것"이었다. 특히 `CreateBlogPage`에 섞여 있던 요청 상태와 commit 선택 로직을 custom hook으로 분리하면서, hook 적용 요구사항과 코드 구조 개선을 동시에 만족시켰다.
