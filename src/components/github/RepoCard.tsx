import { GitHubRepo, GitHubFork } from '@/types/github';
import ForkItem from './ForkItem';
import { GitFork, Star, Code } from 'lucide-react';

interface RepoCardProps {
  repo: GitHubRepo;
  forks: GitHubFork[];
}

export default function RepoCard({ repo, forks }: RepoCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
              {repo.name}
            </h3>
            {repo.description && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {repo.description}
              </p>
            )}
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            View Repo →
          </a>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
          {repo.language && (
            <span className="flex items-center gap-1">
              <Code className="w-4 h-4" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {repo.stargazers_count} stars
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {repo.forks_count} forks
          </span>
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
          {forks.length} Fork{forks.length !== 1 ? 's' : ''}
        </h4>
        <div className="space-y-3">
          {forks.map((fork) => (
            <ForkItem key={fork.id} fork={fork} />
          ))}
        </div>
      </div>
    </div>
  );
}
