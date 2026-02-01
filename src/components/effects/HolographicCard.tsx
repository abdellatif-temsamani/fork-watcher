"use client";

import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicCard({ children, className }: HolographicCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:z-10 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-gradient-to-br before:from-cyan-500/20 before:via-purple-500/20 before:to-pink-500/20",
        "hover:before:opacity-100",
        "after:absolute after:inset-0 after:z-20 after:opacity-0 after:transition-opacity after:duration-500",
        "after:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)]",
        "after:translate-x-[-100%] hover:after:translate-x-[100%]",
        "after:transition-transform after:duration-700",
        className
      )}
    >
      {children}
    </div>
  );
}
