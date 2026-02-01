"use client";

import { cn } from "@/lib/utils";

interface NeonBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function NeonBorder({ children, className, color = "oklch(0.65 0.18 145)" }: NeonBorderProps) {
  return (
    <div 
      className={cn(
        "relative p-[2px]",
        className
      )}
      style={{
        background: `linear-gradient(90deg, ${color}, oklch(0.7 0.22 180), ${color})`,
        backgroundSize: '200% 100%',
        animation: 'gradient-shift 3s linear infinite',
      }}
    >
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
      <div className="bg-card h-full w-full">
        {children}
      </div>
    </div>
  );
}
