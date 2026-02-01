import * as React from "react";
import { cn } from "@/lib/utils";

export interface NeoInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  glowOnFocus?: boolean;
}

const NeoInput = React.forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, type, glowOnFocus = true, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border border-border bg-input px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          glowOnFocus
            ? "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:shadow-[0_0_20px_oklch(0.75_0.25_145/0.3)] transition-all duration-300"
            : "focus-visible:ring-ring",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
NeoInput.displayName = "NeoInput";

export { NeoInput };
