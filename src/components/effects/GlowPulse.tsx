'use client';

import { cn } from '@/lib/utils';

interface GlowPulseProps {
  children: React.ReactNode;
  className?: string;
  color?: 'jungle' | 'chrome';
}

export function GlowPulse({
  children,
  className,
  color = 'jungle',
}: GlowPulseProps) {
  const glowColors = {
    jungle: 'oklch(0.65 0.18 145)',
    chrome: 'oklch(0.75 0.01 260)',
  };

  return (
    <div
      className={cn(
        'relative animate-glow-pulse',
        className
      )}
      style={
        {
          '--glow-color': glowColors[color],
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
