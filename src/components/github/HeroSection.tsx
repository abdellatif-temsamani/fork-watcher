'use client';

import { ChromeText } from '@/components/y2k/ChromeText';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={cn('text-center space-y-6', className)}>
      {/* Main Headline */}
      <div className="space-y-2">
        <ChromeText 
          as="h1" 
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
        >
          Track Every Fork
        </ChromeText>
        
        {/* Animated gradient underline */}
        <div className="relative h-1 w-48 mx-auto overflow-hidden rounded-full">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-chrome"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
        Monitor repository forks across the GitHub universe. 
        <span className="text-primary"> Real-time insights.</span>
      </p>

      {/* Command palette hint */}
      <WindowPanel 
        variant="flat" 
        className="inline-block max-w-md mx-auto"
      >
        <TerminalBlock showPrompt className="text-sm">
          <span className="text-muted-foreground">Pro tip:</span>{' '}
          <span className="text-primary font-medium">Press /</span>{' '}
          <span className="text-muted-foreground">to focus input •</span>{' '}
          <span className="text-primary font-medium">Ctrl+E</span>{' '}
          <span className="text-muted-foreground">for effects</span>
        </TerminalBlock>
      </WindowPanel>
    </div>
  );
}
