'use client';

import { cn } from '@/lib/utils';

interface ChromaticAccentProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function ChromaticAccent({
  children,
  className,
  intensity = 0.3,
}: ChromaticAccentProps) {
  return (
    <div
      className={cn(
        'relative',
        'hover:[text-shadow:_-2px_0_oklch(0.5_0.15_0),_2px_0_oklch(0.5_0.15_200)]',
        'transition-all duration-200',
        className
      )}
      style={
        {
          '--chromatic-intensity': intensity,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
