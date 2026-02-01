import { cn } from "@/lib/utils";

interface JungleTextProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
}

export function JungleText({
  children,
  className,
  glow = false,
  as: Component = "span",
}: JungleTextProps) {
  return (
    <Component
      className={cn(
        "text-primary",
        glow && "drop-shadow-[0_0_10px_oklch(0.75_0.25_145/0.5)]",
        className
      )}
    >
      {children}
    </Component>
  );
}
