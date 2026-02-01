"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  opacity?: number;
}

export function RetroGrid({ className, opacity = 0.1 }: RetroGridProps) {
  return (
    <div 
      className={cn(
        "fixed inset-0 pointer-events-none z-0",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity,
        perspective: '1000px',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}
