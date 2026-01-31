import Image from 'next/image';
import { GitHubFork } from '@/types/github';
import { Star, GitFork } from 'lucide-react';

interface ForkItemProps {
  fork: GitHubFork;
}

export default function ForkItem({ fork }: ForkItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <a
        href={fork.owner.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <Image
          src={fork.owner.avatar_url}
          alt={fork.owner.login}
          width={40}
          height={40}
          className="rounded-full"
        />
      </a>

      <div className="flex-1 min-w-0">
        <a
          href={fork.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-medium text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 transition-colors truncate"
        >
          {fork.owner.login}/{fork.name}
        </a>
        {fork.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
            {fork.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 flex-shrink-0">
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          {fork.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          {fork.forks_count}
        </span>
      </div>
    </div>
  );
}
