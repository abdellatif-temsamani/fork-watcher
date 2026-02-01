import { cn } from "@/lib/utils";

interface ScanlinesProps {
  className?: string;
  opacity?: number;
}

export function Scanlines({ className, opacity = 0.03 }: ScanlinesProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 overflow-hidden",
        className
      )}
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          oklch(0.75 0.25 145 / ${opacity}) 2px,
          oklch(0.75 0.25 145 / ${opacity}) 4px
        )`,
      }}
    />
  );
}
