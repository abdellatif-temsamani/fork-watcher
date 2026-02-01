'use client';

import { WindowPanel } from '@/components/y2k/WindowPanel';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { GlowButton } from '@/components/y2k/GlowButton';
import { cn } from '@/lib/utils';
import { ArrowLeft, GitFork, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  username: string;
  className?: string;
}

export function EmptyState({ username, className }: EmptyStateProps) {
  return (
    <div className={cn('max-w-2xl mx-auto', className)}>
      <WindowPanel variant="elevated" className="overflow-hidden">
        <div className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-glow" />
            <div className="relative p-4 bg-card border border-border rounded-full">
              <GitFork className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">No forks found</h2>
            <p className="text-muted-foreground">
              <span className="text-primary font-medium">{username}</span> either has no repositories with forks, 
              or their forks are private.
            </p>
          </div>

          {/* Terminal hint */}
          <TerminalBlock showPrompt className="text-left text-sm max-w-md mx-auto">
            <span className="text-muted-foreground">Try these popular users:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {['vercel', 'facebook', 'microsoft', 'google'].map((user) => (
                <Link key={user} href={`/github/${user}`}>
                  <StatusBadge variant="chrome" className="cursor-pointer hover:bg-primary/20">
                    {user}
                  </StatusBadge>
                </Link>
              ))}
            </div>
          </TerminalBlock>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/github">
              <GlowButton variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Search another user
              </GlowButton>
            </Link>
            
            <a 
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChromeButton variant="ghost" className="gap-2">
                <Sparkles className="h-4 w-4" />
                View on GitHub
              </ChromeButton>
            </a>
          </div>
        </div>
      </WindowPanel>
    </div>
  );
}
