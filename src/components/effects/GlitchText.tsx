import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <span 
      className={cn(
        "relative inline-block",
        className
      )}
      data-text={children}
    >
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute left-0 top-0 -z-10 text-red-500/50 animate-pulse"
        style={{ 
          clipPath: 'inset(0 0 50% 0)',
          transform: 'translateX(-2px)'
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute left-0 top-0 -z-10 text-cyan-500/50 animate-pulse"
        style={{ 
          clipPath: 'inset(50% 0 0 0)',
          transform: 'translateX(2px)',
          animationDelay: '0.1s'
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
