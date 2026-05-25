import { useMemo, useState } from "react";
import type { CommitSummary } from "../types/github";

export const useCommitSelection = (commits: CommitSummary[]) => {
  const [selectedCommitShas, setSelectedCommitShas] = useState<string[]>([]);

  const selectedCommits = useMemo(
    () => commits.filter((commit) => selectedCommitShas.includes(commit.sha)),
    [commits, selectedCommitShas],
  );

  const toggleCommit = (sha: string) => {
    setSelectedCommitShas((current) => (
      current.includes(sha)
        ? current.filter((selectedSha) => selectedSha !== sha)
        : [...current, sha]
    ));
  };

  const clearSelectedCommits = () => {
    setSelectedCommitShas([]);
  };

  return {
    clearSelectedCommits,
    selectedCommits,
    selectedCommitShas,
    toggleCommit,
  };
};
