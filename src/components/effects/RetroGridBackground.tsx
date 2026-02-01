'use client';

import { cn } from '@/lib/utils';
import { RetroGrid } from './RetroGrid';

interface RetroGridBackgroundProps {
  className?: string;
  opacity?: number;
  animated?: boolean;
}

export function RetroGridBackground({
  className,
  opacity = 0.1,
  animated = true,
}: RetroGridBackgroundProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
      style={{ opacity }}
    >
      <div
        className={cn(
          'absolute inset-0',
          animated && 'animate-pulse-glow'
        )}
        style={{ animationDuration: '8s' }}
      >
        <RetroGrid className="w-full h-full" />
      </div>
    </div>
  );
}
