# 서비스 구조 설명

## 전체 구조

스마트블로그 서비스는 GitHub 활동 데이터를 가져와 LLM 초안으로 바꾸고, 사용자가 편집한 뒤 저장/발행 상태로 관리하는 구조다.

```txt
React UI
  -> Express API
    -> GitHub REST API
    -> OpenAI API
    -> in-memory post store
```

## Frontend 책임

위치:

- `src/app/App.tsx`
- `src/pages/CreateBlogPage.tsx`
- `src/components/*`
- `src/hooks/*`
- `src/services/*`
- `src/types/*`

역할:

- 사용자가 Repository, Branch, Commit을 단계적으로 선택하게 한다.
- 선택된 commit sha를 바탕으로 AI 초안 생성 요청을 보낸다.
- 생성된 제목, 요약, 본문을 편집 가능한 입력 필드로 보여준다.
- 저장된 포스트 목록을 카드로 보여주고 다시 열어 수정하게 한다.
- API key나 GitHub token을 직접 다루지 않고 `/api/*`만 호출한다.

## Frontend Hook 구조

### `useRequestState`

역할:

- API 요청별 상태를 `idle`, `loading`, `success`, `error`로 관리한다.
- 요청별 오류 메시지를 같은 위치에서 관리한다.
- page 컴포넌트가 상태 객체를 직접 조작하는 코드를 줄인다.

사용 위치:

- `src/pages/CreateBlogPage.tsx`

### `useCommitSelection`

역할:

- 선택된 commit sha 목록을 관리한다.
- commit 선택/해제 로직을 캡슐화한다.
- 현재 commit 목록에서 선택된 commit 객체를 계산한다.

사용 위치:

- `src/pages/CreateBlogPage.tsx`

## Backend 책임

위치:

- `server/index.ts`
- `server/routes/*`
- `server/services/*`
- `server/types/*`
- `server/config/env.ts`

역할:

- React가 요청하는 `/api/*` endpoint를 제공한다.
- GitHub token과 OpenAI API key를 서버 환경 변수에서만 읽는다.
- GitHub API 호출 결과를 프론트엔드가 쓰기 쉬운 DTO로 변환한다.
- LLM에 보낼 commit evidence bundle을 만든다.
- 저장된 포스트를 메모리 저장소에 관리한다.

## API 호출 흐름

### Repository 조회

```txt
RepositorySelector
  -> fetchRepositories()
    -> GET /api/github/repositories
      -> githubService.fetchRepositories()
        -> GitHub REST API
```

### Branch 조회

```txt
BranchSelector
  -> fetchBranches(repositoryFullName)
    -> GET /api/github/repositories/:owner/:repo/branches
      -> githubService.fetchBranches()
        -> GitHub REST API
```

### Commit 조회

```txt
CommitSelector
  -> fetchCommits(repositoryFullName, branchName)
    -> GET /api/github/repositories/:owner/:repo/commits
      -> githubService.fetchCommits()
        -> GitHub REST API
```

### LLM 초안 생성

```txt
CreateBlogPage
  -> createDraft({ repositoryFullName, branchName, commitShas })
    -> POST /api/llm/drafts
      -> llmService.createBlogDraft()
        -> githubService.fetchCommitDetail()
        -> OpenAI API
```

### 포스트 저장과 발행

```txt
BlogEditor
  -> createPost() / updatePost() / updatePostStatus()
    -> /api/posts
      -> postStore
```

## 데이터 흐름

1. 사용자가 Repository를 선택한다.
2. 선택된 Repository를 기준으로 Branch 목록을 불러온다.
3. 사용자가 Branch를 선택한다.
4. 선택된 Branch를 기준으로 Commit 목록을 불러온다.
5. 사용자가 하나 이상의 Commit을 선택한다.
6. 서버가 Commit 상세 정보와 변경 파일 정보를 수집한다.
7. 서버가 LLM에 개발 블로그 초안 생성을 요청한다.
8. 프론트엔드가 초안을 편집기에 표시한다.
9. 사용자가 내용을 수정한다.
10. 서버가 수정된 포스트를 저장한다.
11. 사용자가 저장된 포스트를 다시 열거나 발행 상태로 바꾼다.

## 보안 경계

- GitHub token은 `server/config/env.ts`에서만 읽는다.
- OpenAI API key는 `server/config/env.ts`에서만 읽는다.
- React 코드에는 실제 secret이 들어가지 않는다.
- `.env.example`은 변수 이름만 제공한다.
- 저장소에는 실제 `.env` 파일을 커밋하지 않는다.

## 현재 한계

- 저장소는 메모리 기반이므로 서버 재시작 시 저장된 포스트가 사라진다.
- 실제 GitHub/LLM live 검증은 `.env`에 개인 token과 API key를 넣은 뒤 가능하다.
- 인증 사용자가 여러 명인 상황은 아직 고려하지 않았다.
