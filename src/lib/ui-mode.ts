'use client';

import { useState, useEffect, useCallback } from 'react';

export type EffectsIntensity = 'low' | 'med' | 'high';

export interface UIModeConfig {
  effectsIntensity: EffectsIntensity;
  enableScanlines: boolean;
  enableNoise: boolean;
  enableVignette: boolean;
  enableGrid: boolean;
  enableLaser: boolean;
  enableChromatic: boolean;
  enableParticles: boolean;
}

export const defaultUIMode: UIModeConfig = {
  effectsIntensity: 'med',
  enableScanlines: true,
  enableNoise: true,
  enableVignette: true,
  enableGrid: false,
  enableLaser: false,
  enableChromatic: false,
  enableParticles: false,
};

const STORAGE_KEY = 'fork-watcher-ui-mode';

export function getIntensityScale(intensity: EffectsIntensity): number {
  const scales = {
    low: 0.4,
    med: 0.7,
    high: 1.0,
  };
  return scales[intensity];
}

export function getAnimationSpeed(intensity: EffectsIntensity): number {
  const speeds = {
    low: 0.5,
    med: 1,
    high: 1.5,
  };
  return speeds[intensity];
}

export function loadUIMode(): UIModeConfig {
  if (typeof window === 'undefined') return defaultUIMode;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultUIMode, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load UI mode from localStorage', e);
  }
  
  return defaultUIMode;
}

export function saveUIMode(mode: UIModeConfig): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mode));
  } catch (e) {
    console.warn('Failed to save UI mode to localStorage', e);
  }
}

export function useUIMode() {
  // Initialize with default, then hydrate from localStorage
  const [mode, setModeState] = useState<UIModeConfig>(defaultUIMode);
  const [isHydrated, setIsHydrated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Hydration effect - loads from localStorage once on mount
  useEffect(() => {
    // Use a microtask to avoid synchronous setState during render
    const hydrate = () => {
      const loaded = loadUIMode();
      setModeState(loaded);
      setIsHydrated(true);
    };
    
    // Defer hydration to next tick
    Promise.resolve().then(hydrate);
  }, []);

  // Separate effect for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Defer initial state set to avoid synchronous setState in effect
    Promise.resolve().then(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    });

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setMode = useCallback((newMode: UIModeConfig | ((prev: UIModeConfig) => UIModeConfig)) => {
    setModeState(prev => {
      const updated = typeof newMode === 'function' ? newMode(prev) : newMode;
      saveUIMode(updated);
      return updated;
    });
  }, []);

  const toggleEffect = useCallback((key: keyof Omit<UIModeConfig, 'effectsIntensity'>) => {
    setMode(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, [setMode]);

  const setIntensity = useCallback((intensity: EffectsIntensity) => {
    setMode(prev => ({
      ...prev,
      effectsIntensity: intensity,
    }));
  }, [setMode]);

  const intensityScale = getIntensityScale(mode.effectsIntensity);
  const animationSpeed = getAnimationSpeed(mode.effectsIntensity);

  const effectiveMode: UIModeConfig = prefersReducedMotion
    ? {
        ...mode,
        effectsIntensity: 'low',
        enableLaser: false,
        enableParticles: false,
        enableChromatic: false,
      }
    : mode;

  return {
    mode: effectiveMode,
    setMode,
    toggleEffect,
    setIntensity,
    isHydrated,
    prefersReducedMotion,
    intensityScale,
    animationSpeed,
    rawMode: mode,
  };
}

export function generateCSSVariables(
  mode: UIModeConfig,
  intensityScale: number,
  animationSpeed: number
): Record<string, string> {
  return {
    '--fx-intensity': intensityScale.toString(),
    '--fx-animation-speed': animationSpeed.toString(),
    '--fx-scanlines-opacity': mode.enableScanlines ? String(0.03 * intensityScale) : '0',
    '--fx-noise-opacity': mode.enableNoise ? String(0.04 * intensityScale) : '0',
    '--fx-vignette-opacity': mode.enableVignette ? String(0.15 * intensityScale) : '0',
    '--fx-grid-opacity': mode.enableGrid ? String(0.1 * intensityScale) : '0',
    '--fx-laser-opacity': mode.enableLaser ? String(0.6 * intensityScale) : '0',
    '--fx-chromatic-opacity': mode.enableChromatic ? String(0.3 * intensityScale) : '0',
    '--fx-particles-opacity': mode.enableParticles ? String(0.5 * intensityScale) : '0',
  };
}
