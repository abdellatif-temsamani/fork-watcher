'use client';

import { Suspense } from 'react';
import { EffectsLayer } from '@/components/effects/EffectsLayer';
import { UIModeControl } from '@/components/effects/UIModeControl';
import { HeroSection } from '@/components/github/HeroSection';
import UsernameInput from '@/components/github/UsernameInput';
import { Y2KFooter } from '@/components/y2k/Y2KFooter';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { useUIMode } from '@/lib/ui-mode';
import { generateCSSVariables } from '@/lib/ui-mode';
import { Github, Sparkles } from 'lucide-react';

function PageContent() {
  const { mode, isHydrated, intensityScale, animationSpeed } = useUIMode();

  // Generate CSS variables for effects
  const cssVars = isHydrated 
    ? generateCSSVariables(mode, intensityScale, animationSpeed)
    : {};

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div style={cssVars as React.CSSProperties}>
      <EffectsLayer 
        mode={mode}
        className="min-h-screen flex flex-col relative overflow-hidden"
      >
        {/* Background grid - visible when enabled */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ opacity: mode.enableGrid ? 'var(--fx-grid-opacity)' : '0' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.2_0.02_145)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.2_0.02_145)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-30" />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="w-full max-w-2xl space-y-12">
            {/* Logo/Icon */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-glow to-chrome rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                <WindowPanel variant="elevated" className="relative p-4">
                  <Github className="h-12 w-12 text-primary" />
                </WindowPanel>
              </div>
            </div>

            {/* Hero Section */}
            <HeroSection />

            {/* Username Input */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-chrome/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative">
                <UsernameInput />
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { id: 'tracking', icon: Sparkles, label: 'Real-time tracking' },
                { id: 'api', icon: Github, label: 'GitHub API powered' },
                { id: 'ui', icon: Sparkles, label: 'Beautiful UI' },
              ].map((feature, i) => (
                <div 
                  key={feature.id} 
                  className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-colors"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <feature.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Y2KFooter />

        {/* UI Mode Control */}
        <UIModeControl />
      </EffectsLayer>
    </div>
  );
}

export default function GitHubPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
