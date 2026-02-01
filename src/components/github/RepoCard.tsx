import { WindowPanel } from '@/components/y2k/WindowPanel';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import ForkItem from './ForkItem';
import type { GitHubRepo, GitHubFork } from '@/types/github';
import { GitFork, Star, GitBranch, ExternalLink } from 'lucide-react';

interface RepoCardProps {
  repo: GitHubRepo;
  forks: GitHubFork[];
}

export default function RepoCard({ repo, forks }: RepoCardProps) {
  return (
    <WindowPanel variant="elevated" showWindowControls className="overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-foreground truncate">
                {repo.name}
              </h3>
              <StatusBadge variant="jungle" glow>
                {forks.length} FORKS
              </StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {repo.description || 'No description available'}
            </p>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <ChromeButton variant="filled" size="sm">
              View
              <ExternalLink className="ml-2 h-3 w-3" />
            </ChromeButton>
          </a>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mb-6 text-sm font-mono">
          <div className="flex items-center gap-2 text-primary">
            <GitFork className="h-4 w-4" />
            <span>{repo.forks_count}</span>
          </div>
          <div className="flex items-center gap-2 text-chrome">
            <Star className="h-4 w-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            <span>{repo.language || 'N/A'}</span>
          </div>
          <div className="text-muted-foreground">
            Updated: {new Date(repo.updated_at || '2026-01-01').toLocaleDateString()}
          </div>
        </div>

        {/* Forks List */}
        <div className="border-t border-border/30 pt-6">
          <h4 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Forks
          </h4>
          <div className="space-y-3">
            {forks.slice(0, 5).map((fork) => (
              <ForkItem key={fork.id} fork={fork} />
            ))}
            {forks.length > 5 && (
              <TerminalBlock className="text-xs" showPrompt={false}>
                <span className="text-muted-foreground">
                  ... and {forks.length - 5} more forks
                </span>
              </TerminalBlock>
            )}
          </div>
        </div>
      </div>
    </WindowPanel>
  );
}
