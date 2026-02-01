import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chromeButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chrome disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-chrome/50 bg-transparent text-chrome hover:bg-chrome/10 hover:shadow-lg hover:shadow-chrome/20",
        filled:
          "bg-chrome/90 text-background hover:bg-chrome hover:shadow-xl hover:shadow-chrome/30",
        ghost:
          "text-chrome hover:bg-chrome/10",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-8 px-4 py-2 text-xs",
        lg: "h-11 px-7 py-2 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChromeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chromeButtonVariants> {
  asChild?: boolean;
}

const ChromeButton = React.forwardRef<HTMLButtonElement, ChromeButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(chromeButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ChromeButton.displayName = "ChromeButton";

export { ChromeButton, chromeButtonVariants };
