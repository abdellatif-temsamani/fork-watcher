import { cn } from "@/lib/utils";

interface ChromeTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
}

export function ChromeText({
  children,
  className,
  as: Component = "span",
}: ChromeTextProps) {
  return (
    <Component
      className={cn(
        "bg-gradient-to-b from-chrome via-chrome-dark to-chrome bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Component>
  );
}
