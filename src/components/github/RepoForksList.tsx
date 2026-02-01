import RepoCard from './RepoCard';
import { ErrorState } from './ErrorState';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { fetchUserRepos, fetchRepoForks } from '@/lib/github-api';
import { Github } from 'lucide-react';
import type { GitHubRepo, GitHubFork } from '@/types/github';

interface RepoForksListProps {
  username: string;
}

export async function RepoForksList({ username }: RepoForksListProps) {
  try {
    const repos = await fetchUserRepos(username);

    if (repos.length === 0) {
      return (
        <WindowPanel variant="elevated" showWindowControls>
          <div className="p-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-muted shadow-[0_0_30px_oklch(0.75_0.25_145/0.1)]">
              <Github className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">
              No Repositories Found
            </h2>
            <p className="text-muted-foreground mb-6">
              {username} doesn&apos;t have any public repositories, or their repos don&apos;t have forks.
            </p>
            <TerminalBlock title="info.txt">
              User may have private repos or no forks on public repos
            </TerminalBlock>
          </div>
        </WindowPanel>
      );
    }

    // Fetch forks for repos that have them
    const reposWithForks = await Promise.all(
      repos
        .filter((repo: GitHubRepo) => repo.forks_count > 0)
        .map(async (repo: GitHubRepo) => {
          const forks: GitHubFork[] = await fetchRepoForks(username, repo.name);
          return { repo, forks };
        })
    );

    if (reposWithForks.length === 0) {
      return (
        <WindowPanel variant="elevated" showWindowControls>
          <div className="p-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-muted shadow-[0_0_30px_oklch(0.75_0.25_145/0.1)]">
              <Github className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">
              No Forked Repositories
            </h2>
            <p className="text-muted-foreground mb-6">
              {username} has {repos.length} repositories, but none have been forked yet.
            </p>
            <TerminalBlock title="info.txt">
              Repositories exist but no forks detected
            </TerminalBlock>
          </div>
        </WindowPanel>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats Header */}
        <WindowPanel variant="default" showWindowControls>
          <div className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <StatusBadge variant="jungle" glow>
                  {repos.length} REPOS
                </StatusBadge>
                <StatusBadge variant="chrome">
                  {reposWithForks.reduce((acc: number, item: { forks: GitHubFork[] }) => acc + item.forks.length, 0)} TOTAL FORKS
                </StatusBadge>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                status: online
              </span>
            </div>
          </div>
        </WindowPanel>

        {/* Repo Cards */}
        <div className="grid gap-6">
          {reposWithForks.map(({ repo, forks }) => (
            <RepoCard key={repo.id} repo={repo} forks={forks} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch repositories';
    return <ErrorState message={errorMessage} />;
  }
}
