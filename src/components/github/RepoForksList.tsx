import { fetchUserRepos, fetchRepoForks } from '@/lib/github-api';
import { RepoWithForks } from '@/types/github';
import RepoCard from './RepoCard';
import ErrorState from './ErrorState';

interface RepoForksListProps {
  username: string;
}

export default async function RepoForksList({ username }: RepoForksListProps) {
  try {
    const repos = await fetchUserRepos(username);
    
    if (repos.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No repositories found for user <strong>{username}</strong>
          </p>
        </div>
      );
    }

    // Only fetch forks for repos that actually have forks (forks_count > 0)
    // This reduces API calls significantly
    const reposWithForksCount = repos.filter(repo => repo.forks_count > 0);

    if (reposWithForksCount.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No repositories with forks found for <strong>{username}</strong>
          </p>
        </div>
      );
    }

    const reposWithForks: RepoWithForks[] = await Promise.all(
      reposWithForksCount.map(async (repo) => {
        const forks = await fetchRepoForks(repo.owner.login, repo.name);
        return { repo, forks };
      })
    );

    const reposWithForksList = reposWithForks.filter((item) => item.forks.length > 0);

    if (reposWithForksList.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No forks found for any repositories of <strong>{username}</strong>
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Repositories with Forks
          </h2>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {reposWithForksList.length} repos with forks
          </span>
        </div>

        <div className="grid gap-6">
          {reposWithForksList.map((item) => (
            <RepoCard key={item.repo.id} repo={item.repo} forks={item.forks} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorState error={error instanceof Error ? error.message : 'An error occurred'} />;
  }
}
