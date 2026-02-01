import { cn } from "@/lib/utils";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  color?: "jungle" | "chrome";
}

export function GlowEffect({
  children,
  className,
  intensity = "medium",
  color = "jungle",
}: GlowEffectProps) {
  const intensityClasses = {
    subtle: "shadow-[0_0_15px_oklch(0.75_0.25_145/0.2)]",
    medium: "shadow-[0_0_25px_oklch(0.75_0.25_145/0.35)]",
    strong: "shadow-[0_0_40px_oklch(0.75_0.25_145/0.5),0_0_60px_oklch(0.75_0.25_145/0.2)]",
  };

  const chromeIntensity = {
    subtle: "shadow-[0_0_15px_oklch(0.85_0.01_260/0.2)]",
    medium: "shadow-[0_0_25px_oklch(0.85_0.01_260/0.35)]",
    strong: "shadow-[0_0_40px_oklch(0.85_0.01_260/0.5),0_0_60px_oklch(0.85_0.01_260/0.2)]",
  };

  return (
    <div
      className={cn(
        "transition-shadow duration-300",
        color === "jungle" ? intensityClasses[intensity] : chromeIntensity[intensity],
        className
      )}
    >
      {children}
    </div>
  );
}
