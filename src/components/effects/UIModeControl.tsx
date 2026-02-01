'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { 
  useUIMode, 
  EffectsIntensity,
  defaultUIMode 
} from '@/lib/ui-mode';
import { cn } from '@/lib/utils';
import { 
  Settings, 
  X, 
  Zap, 
  ZapOff, 
  Grid3X3, 
  ScanLine, 
  Waves, 
  CircleDot,
  Sparkles,
  Monitor,
  Maximize2
} from 'lucide-react';

const intensityLabels: Record<EffectsIntensity, { label: string; icon: React.ReactNode }> = {
  low: { label: 'Minimal', icon: <ZapOff className="h-4 w-4" /> },
  med: { label: 'Balanced', icon: <Zap className="h-4 w-4" /> },
  high: { label: 'Maximum', icon: <Sparkles className="h-4 w-4" /> },
};

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}

function ToggleSwitch({ checked, onChange, icon, label, disabled }: ToggleSwitchProps) {
  const uniqueId = React.useId();
  
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200",
        "hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        disabled && "opacity-40 cursor-not-allowed"
      )}
      aria-pressed={checked}
      aria-label={`Toggle ${label}`}
    >
      <span className={cn(
        "p-1.5 rounded-md transition-colors",
        checked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      )}>
        {icon}
      </span>
      <span id={uniqueId} className="flex-1 text-sm text-left">{label}</span>
      <div 
        className={cn(
          "w-10 h-5 rounded-full relative transition-colors duration-200",
          checked ? "bg-primary" : "bg-muted-foreground/30"
        )}
        aria-hidden="true"
      >
        <div className={cn(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5"
        )} />
      </div>
    </button>
  );
}

export function UIModeControl() {
  const { 
    mode, 
    setIntensity, 
    toggleEffect, 
    isHydrated,
    prefersReducedMotion,
    setMode
  } = useUIMode();
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Keyboard shortcut: Ctrl/Cmd + E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        togglePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePanel]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <ChromeButton
        variant="ghost"
        size="icon"
        onClick={togglePanel}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "bg-card/90 backdrop-blur-md border border-border/50",
          "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5",
          "transition-all duration-300"
        )}
        aria-label="Toggle UI effects settings"
        aria-expanded={isOpen}
        aria-controls="ui-mode-panel"
      >
        <Settings className={cn(
          "h-5 w-5 transition-transform duration-500",
          isOpen && "rotate-90"
        )} />
      </ChromeButton>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Control Panel */}
          <div 
            id="ui-mode-panel"
            className="fixed bottom-20 right-6 z-50 w-80 animate-in slide-in-from-bottom-4 fade-in duration-300"
            role="dialog"
            aria-label="UI Effects Settings"
          >
            <WindowPanel 
              variant="elevated" 
              showWindowControls
              header={
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Visual Effects</span>
                  <ChromeButton
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6"
                    aria-label="Close settings panel"
                  >
                    <X className="h-4 w-4" />
                  </ChromeButton>
                </div>
              }
              footer={
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ctrl/Cmd + E to toggle</span>
                  <ChromeButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setMode(defaultUIMode)}
                    className="h-6 text-xs"
                  >
                    Reset defaults
                  </ChromeButton>
                </div>
              }
            >
              <div className="p-4 space-y-4">
                {/* Intensity Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Intensity
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {(Object.keys(intensityLabels) as EffectsIntensity[]).map((intensity) => (
                      <button
                        type="button"
                        key={intensity}
                        onClick={() => setIntensity(intensity)}
                        disabled={prefersReducedMotion}
                        className={cn(
                          "flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                          mode.effectsIntensity === intensity
                            ? "bg-primary/20 text-primary ring-1 ring-primary/50"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted",
                          prefersReducedMotion && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {intensityLabels[intensity].icon}
                        <span>{intensityLabels[intensity].label}</span>
                      </button>
                    ))}
                  </div>
                  {prefersReducedMotion && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Monitor className="h-3 w-3" />
                      Reduced motion preference active
                    </p>
                  )}
                </div>

                {/* Effect Toggles */}
                <div className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Effect Layers
                  </span>
                  
                  <ToggleSwitch
                    checked={mode.enableScanlines}
                    onChange={() => toggleEffect('enableScanlines')}
                    icon={<ScanLine className="h-4 w-4" />}
                    label="Scanlines"
                  />
                  
                  <ToggleSwitch
                    checked={mode.enableNoise}
                    onChange={() => toggleEffect('enableNoise')}
                    icon={<Waves className="h-4 w-4" />}
                    label="Noise Texture"
                  />
                  
                  <ToggleSwitch
                    checked={mode.enableVignette}
                    onChange={() => toggleEffect('enableVignette')}
                    icon={<CircleDot className="h-4 w-4" />}
                    label="Vignette"
                  />
                  
                  <ToggleSwitch
                    checked={mode.enableGrid}
                    onChange={() => toggleEffect('enableGrid')}
                    icon={<Grid3X3 className="h-4 w-4" />}
                    label="Retro Grid"
                  />
                  
                  <ToggleSwitch
                    checked={mode.enableLaser}
                    onChange={() => toggleEffect('enableLaser')}
                    icon={<Maximize2 className="h-4 w-4" />}
                    label="Laser Scan"
                    disabled={prefersReducedMotion}
                  />
                  
                  <ToggleSwitch
                    checked={mode.enableChromatic}
                    onChange={() => toggleEffect('enableChromatic')}
                    icon={<ScanLine className="h-4 w-4 rotate-90" />}
                    label="Chromatic"
                    disabled={prefersReducedMotion}
                  />
                  
                  <ToggleSwitch
                    checked={mode.enableParticles}
                    onChange={() => toggleEffect('enableParticles')}
                    icon={<Sparkles className="h-4 w-4" />}
                    label="Particles"
                    disabled={prefersReducedMotion || mode.effectsIntensity !== 'high'}
                  />
                </div>
              </div>
            </WindowPanel>
          </div>
        </>
      )}
    </>
  );
}
