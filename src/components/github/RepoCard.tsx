import { WindowPanel } from '@/components/y2k/WindowPanel';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { CopyButton } from '@/components/github/CopyButton';
import ForkItem from '@/components/github/ForkItem';
import { cn, formatRelativeTime, formatNumber } from '@/lib/utils';
import { GitFork, Star, GitBranch, Clock, ExternalLink } from 'lucide-react';
import type { GitHubRepo, GitHubFork } from '@/types/github';

interface RepoCardProps {
  repo: GitHubRepo;
  forks: GitHubFork[];
  index?: number;
}

export default function RepoCard({ repo, forks, index = 0 }: RepoCardProps) {
  const hasForks = forks.length > 0;
  const displayForks = forks.slice(0, 5);
  const remainingCount = forks.length - displayForks.length;

  return (
    <div 
      className={cn(
        "group relative",
        "animate-in slide-in-from-bottom-4 fade-in duration-500"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Conic gradient border on hover */}
      <div className="absolute -inset-[1.5px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-xl p-[1.5px] bg-[conic-gradient(from_var(--conic-angle),oklch(0.65_0.18_145),oklch(0.7_0.22_145),oklch(0.75_0.01_260),oklch(0.65_0.18_145))]"
          style={{ 
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            animation: 'conic-rotate 3s linear infinite',
          }}
        />
      </div>

      <WindowPanel variant="elevated" className="relative overflow-hidden">
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          />
        </div>

        <div className="p-5 sm:p-6 space-y-4 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold truncate">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {repo.name}
                  </a>
                </h3>
                <StatusBadge variant={hasForks ? 'jungle' : 'default'}>
                  {hasForks ? `${formatNumber(forks.length)} forks` : 'No forks'}
                </StatusBadge>
                {repo.private && (
                  <StatusBadge variant="destructive">Private</StatusBadge>
                )}
              </div>
              
              {repo.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <CopyButton 
                text={repo.html_url} 
                label="Copy URL" 
                size="icon"
                variant="ghost"
              />
              <ChromeButton 
                variant="ghost" 
                size="icon"
                asChild
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Open repository"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </ChromeButton>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <span>{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-primary" />
              <span>{formatNumber(repo.stargazers_count)}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <GitFork className="h-4 w-4 text-primary" />
              <span>{formatNumber(repo.forks_count)}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatRelativeTime(repo.updated_at)}</span>
            </div>
          </div>

          {/* Forks list */}
          {hasForks && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  Recent Forks
                </h4>
                {remainingCount > 0 && (
                  <ChromeButton variant="ghost" size="sm" asChild>
                    <a 
                      href={`${repo.html_url}/network/members`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +{remainingCount} more
                    </a>
                  </ChromeButton>
                )}
              </div>

              <div className="space-y-2">
                {displayForks.map((fork, forkIndex) => (
                  <ForkItem 
                    key={fork.id} 
                    fork={fork} 
                    index={forkIndex}
                  />
                ))}
              </div>
            </div>
          )}

          {!hasForks && (
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center py-4">
                No public forks of this repository yet.
              </p>
            </div>
          )}
        </div>
      </WindowPanel>
    </div>
  );
}
