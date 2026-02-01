import Image from 'next/image';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { CopyButton } from '@/components/github/CopyButton';
import { cn, formatRelativeTime } from '@/lib/utils';
import { ExternalLink, GitFork, Star, User } from 'lucide-react';
import type { GitHubFork } from '@/types/github';

interface ForkItemProps {
  fork: GitHubFork;
  index?: number;
}

export default function ForkItem({ fork, index = 0 }: ForkItemProps) {
  const forkDate = new Date(fork.created_at);
  const relativeTime = formatRelativeTime(forkDate);

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg",
        "bg-muted/30 hover:bg-muted/50",
        "border border-transparent hover:border-border/50",
        "transition-all duration-200",
        "animate-in slide-in-from-left-2 fade-in duration-300"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {fork.owner?.avatar_url ? (
          <Image
            src={fork.owner.avatar_url}
            alt={fork.owner.login}
            width={40}
            height={40}
            className="rounded-full border border-border/50"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">
            {fork.owner?.login || 'Unknown'}
          </span>
          <span className="text-xs text-muted-foreground">
            {relativeTime}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
          {fork.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {fork.stargazers_count}
            </span>
          )}
          {fork.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {fork.forks_count}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton
          text={`https://github.com/${fork.full_name}`}
          size="icon"
          variant="ghost"
          className="h-8 w-8"
        />
        
        <ChromeButton
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <a
            href={fork.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${fork.owner?.login}'s fork`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </ChromeButton>
      </div>
    </div>
  );
}
