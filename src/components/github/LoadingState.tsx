import { WindowPanel } from '@/components/y2k/WindowPanel';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Skeleton card component
function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-xl border border-border/50 bg-card",
        "animate-in slide-in-from-bottom-2 fade-in duration-500"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header skeleton */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 rounded bg-muted skeleton" />
          <div className="h-4 w-1/2 rounded bg-muted skeleton" />
        </div>
        <div className="h-8 w-8 rounded bg-muted skeleton" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded bg-muted skeleton" />
        <div className="h-4 w-2/3 rounded bg-muted skeleton" />
      </div>

      {/* Stats skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-4 w-16 rounded bg-muted skeleton" />
        <div className="h-4 w-16 rounded bg-muted skeleton" />
        <div className="h-4 w-16 rounded bg-muted skeleton" />
      </div>

      {/* Forks section skeleton */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <div className="h-4 w-24 rounded bg-muted skeleton" />
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="h-10 w-10 rounded-full bg-muted skeleton" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-32 rounded bg-muted skeleton" />
              <div className="h-3 w-20 rounded bg-muted skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Loading Header */}
      <WindowPanel variant="default" showWindowControls>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <StatusBadge variant="jungle" glow>
                FETCHING DATA
              </StatusBadge>
            </div>
            <div className="h-4 w-24 rounded bg-muted skeleton" />
          </div>
        </div>
      </WindowPanel>

      {/* Terminal status */}
      <TerminalBlock showPrompt className="text-sm">
        <span className="text-primary">$</span>{' '}
        <span className="text-muted-foreground">Fetching repositories from GitHub API...</span>
        <br />
        <span className="text-primary">$</span>{' '}
        <span className="text-muted-foreground">Parsing fork data...</span>
        <br />
        <span className="text-primary">$</span>{' '}
        <span className="text-primary animate-pulse">_</span>
      </TerminalBlock>

      {/* Skeleton Cards */}
      <div className="space-y-4">
        {[0, 1, 2].map((index) => (
          <SkeletonCard key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
