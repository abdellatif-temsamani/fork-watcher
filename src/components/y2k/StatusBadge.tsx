import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        jungle:
          "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_oklch(0.75_0.25_145/0.2)]",
        chrome:
          "bg-chrome/10 text-chrome border border-chrome/30",
        matrix:
          "bg-matrix/15 text-matrix border border-matrix/30 shadow-[0_0_10px_oklch(0.7_0.22_145/0.2)]",
        default:
          "bg-muted text-muted-foreground border border-border",
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/30",
      },
      glow: {
        true: "animate-pulse-glow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      glow: false,
    },
  }
);

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  showDot?: boolean;
}

export function StatusBadge({
  children,
  className,
  variant,
  glow,
  showDot = true,
  ...props
}: StatusBadgeProps) {
  const dotColors = {
    jungle: "bg-primary",
    chrome: "bg-chrome",
    matrix: "bg-matrix",
    default: "bg-muted-foreground",
    destructive: "bg-destructive",
  };

  return (
    <span
      className={cn(statusBadgeVariants({ variant, glow }), className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dotColors[variant || "default"],
            variant === "jungle" && "shadow-[0_0_6px_oklch(0.75_0.25_145/0.8)]"
          )}
        />
      )}
      {children}
    </span>
  );
}
