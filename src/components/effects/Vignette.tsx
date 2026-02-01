import { cn } from "@/lib/utils";

interface VignetteProps {
  className?: string;
  intensity?: number;
  color?: string;
}

export function Vignette({ 
  className, 
  intensity = 0.4,
  color = "oklch(0.02 0.01 145)"
}: VignetteProps) {
  return (
    <div 
      className={cn(
        "pointer-events-none fixed inset-0 z-50",
        className
      )}
      style={{
        background: `radial-gradient(
          ellipse at center,
          transparent 40%,
          ${color} 100%
        )`,
        opacity: intensity,
      }}
    />
  );
}
