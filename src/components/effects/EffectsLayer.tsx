import { cn } from "@/lib/utils";
import { Scanlines } from "./Scanlines";
import { NoiseTexture } from "./NoiseTexture";
import { Vignette } from "./Vignette";
import { RetroGrid } from "./RetroGrid";
import { LaserScan } from "./LaserScan";
import { UIModeConfig, generateCSSVariables, getIntensityScale, getAnimationSpeed } from "@/lib/ui-mode";

interface EffectsLayerProps {
  children: React.ReactNode;
  className?: string;
  mode?: UIModeConfig;
  intensityScale?: number;
  animationSpeed?: number;
  // Legacy props for backward compatibility
  scanlines?: boolean;
  noise?: boolean;
  vignette?: boolean;
  crtLines?: boolean;
  chromaticAberration?: boolean;
  flicker?: boolean;
  scanlinesOpacity?: number;
  noiseOpacity?: number;
  vignetteIntensity?: number;
}

export function EffectsLayer({
  children,
  className,
  mode,
  intensityScale = 0.7,
  animationSpeed = 1,
  // Legacy props
  scanlines: legacyScanlines = false,
  noise: legacyNoise = false,
  vignette: legacyVignette = false,
  crtLines = false,
  chromaticAberration = false,
  flicker = false,
  scanlinesOpacity = 0.015,
  noiseOpacity = 0.02,
  vignetteIntensity = 0.4,
}: EffectsLayerProps) {
  // Determine which effects to show
  const showScanlines = mode ? mode.enableScanlines : legacyScanlines;
  const showNoise = mode ? mode.enableNoise : legacyNoise;
  const showVignette = mode ? mode.enableVignette : legacyVignette;
  const showGrid = mode?.enableGrid ?? false;
  const showLaser = mode?.enableLaser ?? false;
  const showChromatic = mode ? mode.enableChromatic : chromaticAberration;

  // Calculate opacity values based on mode or legacy props
  const effectiveIntensityScale = mode ? getIntensityScale(mode.effectsIntensity) : intensityScale;
  const effectiveAnimationSpeed = mode ? getAnimationSpeed(mode.effectsIntensity) : animationSpeed;

  const finalScanlinesOpacity = mode 
    ? 0.03 * effectiveIntensityScale 
    : scanlinesOpacity;
  const finalNoiseOpacity = mode 
    ? 0.04 * effectiveIntensityScale 
    : noiseOpacity;
  const finalVignetteIntensity = mode 
    ? 0.15 * effectiveIntensityScale 
    : vignetteIntensity;

  // Generate CSS variables for child components
  const cssVariables = mode 
    ? generateCSSVariables(mode, effectiveIntensityScale, effectiveAnimationSpeed)
    : {};

  return (
    <div 
      className={cn(
        "relative",
        crtLines && "crt-lines",
        showChromatic && "chromatic-aberration",
        flicker && "screen-flicker",
        className
      )}
      style={cssVariables as React.CSSProperties}
    >
      {/* Background Effects */}
      {showGrid && (
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ opacity: 'var(--fx-grid-opacity, 0)' }}
        >
          <RetroGrid className="w-full h-full opacity-30" />
        </div>
      )}
      
      {/* Overlay Effects */}
      {showVignette && (
        <Vignette 
          intensity={finalVignetteIntensity} 
        />
      )}
      {showScanlines && (
        <Scanlines 
          opacity={finalScanlinesOpacity} 
        />
      )}
      {showNoise && (
        <NoiseTexture 
          opacity={finalNoiseOpacity} 
        />
      )}
      {showLaser && (
        <div style={{ opacity: 'var(--fx-laser-opacity, 0)' }}>
          <LaserScan className="pointer-events-none" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
