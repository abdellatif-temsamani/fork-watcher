"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LaserScanProps {
  className?: string;
  color?: string;
  speed?: number;
}

export function LaserScan({ 
  className, 
  color = "oklch(0.65 0.18 145)",
  speed = 3 
}: LaserScanProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let position = 0;
    let direction = 1;
    let animationId: number;

    const animate = () => {
      position += direction * 0.5;
      
      if (position >= 100) {
        direction = -1;
      } else if (position <= 0) {
        direction = 1;
      }

      element.style.top = `${position}%`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div 
      ref={ref}
      className={cn(
        "absolute left-0 right-0 h-px pointer-events-none z-40",
        className
      )}
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      }}
    />
  );
}
