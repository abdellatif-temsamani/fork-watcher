import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const windowPanelVariants = cva(
  "relative overflow-hidden border border-border/50 bg-card transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-xl shadow-primary/5",
        elevated: "shadow-2xl shadow-primary/10",
        flat: "shadow-none",
      },
      interactive: {
        true: "hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

interface WindowPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof windowPanelVariants> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showWindowControls?: boolean;
}

export function WindowPanel({
  children,
  className,
  variant,
  interactive,
  header,
  footer,
  showWindowControls = false,
  ...props
}: WindowPanelProps) {
  return (
    <div
      className={cn(windowPanelVariants({ variant, interactive }), className)}
      {...props}
    >
      {/* Window Header */}
      {(header || showWindowControls) && (
        <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
          {showWindowControls && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/80" />
              <div className="h-3 w-3 rounded-full bg-secondary" />
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
          )}
          {header && <div className="flex-1">{header}</div>}
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-border/30 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}
