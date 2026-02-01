import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showPrompt?: boolean;
  glow?: boolean;
}

export function TerminalBlock({
  children,
  className,
  title,
  showPrompt = true,
  glow = false,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "relative border border-primary/20 bg-background/80 overflow-hidden",
        glow && "shadow-[0_0_30px_oklch(0.75_0.25_145/0.1)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-primary/10 bg-primary/5 px-4 py-2">
        {title ? (
          <span className="font-mono text-xs text-matrix">{title}</span>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </div>
        )}
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          Terminal
        </span>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm">
        {showPrompt && (
          <div className="flex items-start gap-2">
            <span className="text-matrix shrink-0">$</span>
            <div className="flex-1 text-foreground/90">{children}</div>
          </div>
        )}
        {!showPrompt && children}
      </div>
    </div>
  );
}
