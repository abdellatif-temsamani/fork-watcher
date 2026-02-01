import Image from 'next/image';
import type { GitHubFork } from '@/types/github';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { ExternalLink, GitFork, Star } from 'lucide-react';

interface ForkItemProps {
  fork: GitHubFork;
}

export default function ForkItem({ fork }: ForkItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border/30 bg-muted/30 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50 hover:shadow-[0_0_20px_oklch(0.75_0.25_145/0.1)]">
      {/* Avatar */}
      <div className="relative shrink-0">
        <Image
          src={fork.owner.avatar_url}
          alt={fork.owner.login}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-border/50 object-cover"
        />
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary/20 border border-primary/30" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground truncate">
            {fork.owner.login}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary font-mono text-sm truncate">
            {fork.name}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1 font-mono">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {fork.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {fork.forks_count}
          </span>
          <span>
            Updated: {new Date(fork.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action */}
      <a
        href={fork.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChromeButton variant="ghost" size="icon">
          <ExternalLink className="h-4 w-4" />
        </ChromeButton>
      </a>
    </div>
  );
}
