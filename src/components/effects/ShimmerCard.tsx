'use client';

import { cn } from '@/lib/utils';

interface ShimmerCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerCard({ children, className }: ShimmerCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden group',
        'after:absolute after:inset-0',
        'after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent',
        'after:translate-x-[-100%] after:rotate-45',
        'group-hover:after:animate-shimmer-sweep',
        className
      )}
    >
      {children}
    </div>
  );
}
