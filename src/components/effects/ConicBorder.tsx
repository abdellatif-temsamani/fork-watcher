'use client';

import { cn } from '@/lib/utils';

interface ConicBorderProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  hoverOnly?: boolean;
}

export function ConicBorder({
  children,
  className,
  animated = true,
  hoverOnly = false,
}: ConicBorderProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl',
        'before:absolute before:inset-0 before:p-[1.5px] before:rounded-[inherit]',
        'before:bg-[conic-gradient(from_var(--conic-angle),oklch(0.65_0.18_145),oklch(0.7_0.22_145),oklch(0.75_0.01_260),oklch(0.65_0.18_145))]',
        'before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
        'before:[mask-composite:exclude]',
        animated && 'before:animate-[conic-rotate_3s_linear_infinite]',
        hoverOnly && 'before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        className
      )}
    >
      <div className="relative z-10 bg-card rounded-[inherit] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
