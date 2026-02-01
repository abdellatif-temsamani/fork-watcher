import RepoCard from './RepoCard';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { fetchUserRepos, fetchRepoForks } from '@/lib/github-api';
import { formatNumber } from '@/lib/utils';
import { Database, GitFork } from 'lucide-react';
import type { GitHubRepo, GitHubFork } from '@/types/github';

interface RepoWithForks {
  repo: GitHubRepo;
  forks: GitHubFork[];
}

interface RepoForksListProps {
  username: string;
}

// Separate data fetching function that doesn't render JSX
async function fetchRepoData(username: string): Promise<
  | { type: 'success'; repos: GitHubRepo[]; reposWithForks: RepoWithForks[]; totalForks: number }
  | { type: 'error'; message: string; retryAfter?: number }
  | { type: 'empty'; reason: 'no-repos' | 'no-forks'; repos?: GitHubRepo[] }
> {
  try {
    const repos = await fetchUserRepos(username);

    if (repos.length === 0) {
      return { type: 'empty', reason: 'no-repos', repos: [] };
    }

    // Fetch forks for repos that have them
    const reposWithForks: RepoWithForks[] = await Promise.all(
      repos
        .filter((repo: GitHubRepo) => repo.forks_count > 0)
        .map(async (repo: GitHubRepo) => {
          const forks: GitHubFork[] = await fetchRepoForks(username, repo.name);
          return { repo, forks };
        })
    );

    if (reposWithForks.length === 0) {
      return { type: 'empty', reason: 'no-forks', repos };
    }

    const totalForks = reposWithForks.reduce(
      (acc: number, item: RepoWithForks) => acc + item.forks.length,
      0
    );

    return { type: 'success', repos, reposWithForks, totalForks };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch repositories';
    
    // Check if it's a rate limit error
    const isRateLimit = errorMessage.toLowerCase().includes('rate limit') || 
                        errorMessage.toLowerCase().includes('403');
    
    // Estimate retry after (default 60 seconds for rate limits)
    const retryAfter = isRateLimit ? 60000 : undefined;
    
    return { type: 'error', message: errorMessage, retryAfter };
  }
}

export async function RepoForksList({ username }: RepoForksListProps) {
  const result = await fetchRepoData(username);

  // Handle error state
  if (result.type === 'error') {
    return <ErrorState message={result.message} retryAfter={result.retryAfter} />;
  }

  // Handle empty states
  if (result.type === 'empty') {
    if (result.reason === 'no-repos') {
      return (
        <div className="space-y-6">
          <WindowPanel variant="default" showWindowControls>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <StatusBadge variant="default">NO REPOSITORIES</StatusBadge>
                <span className="text-xs text-muted-foreground font-mono">
                  status: completed
                </span>
              </div>
            </div>
          </WindowPanel>
          
          <TerminalBlock showPrompt className="text-sm">
            <span className="text-muted-foreground">
              User has no public repositories or all repositories are private.
            </span>
          </TerminalBlock>

          <EmptyState username={username} />
        </div>
      );
    }

    // no-forks
    return (
      <div className="space-y-6">
        <WindowPanel variant="default" showWindowControls>
          <div className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <Database className="h-4 w-4 text-primary" />
                <StatusBadge variant="chrome">
                  {result.repos?.length || 0} REPOS
                </StatusBadge>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                status: completed
              </span>
            </div>
          </div>
        </WindowPanel>
        
        <TerminalBlock showPrompt className="text-sm">
          <span className="text-muted-foreground">
            Found {result.repos?.length || 0} repositories, but none have public forks yet.
          </span>
        </TerminalBlock>

        <EmptyState username={username} />
      </div>
    );
  }

  // Handle success state
  const { repos, reposWithForks, totalForks } = result;

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <WindowPanel variant="default" showWindowControls>
        <div className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <StatusBadge variant="jungle" glow>
                  {repos.length} REPOS
                </StatusBadge>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="h-4 w-4 text-primary" />
                <StatusBadge variant="chrome">
                  {formatNumber(totalForks)} FORKS
                </StatusBadge>
              </div>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              status: online
            </span>
          </div>
        </div>
      </WindowPanel>

      {/* Repo Cards */}
      <div className="grid gap-6">
        {reposWithForks.map(({ repo, forks }, index) => (
          <RepoCard 
            key={repo.id} 
            repo={repo} 
            forks={forks} 
            index={index}
          />
        ))}
      </div>

      {/* Footer info */}
      <TerminalBlock showPrompt className="text-sm">
        <span className="text-muted-foreground">
          Showing {reposWithForks.length} repositories with forks from {repos.length} total repositories.
        </span>
      </TerminalBlock>
    </div>
  );
}
