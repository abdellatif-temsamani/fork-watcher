import { cn } from "@/lib/utils";
import { Scanlines } from "./Scanlines";
import { NoiseTexture } from "./NoiseTexture";
import { Vignette } from "./Vignette";

interface EffectsLayerProps {
  children: React.ReactNode;
  className?: string;
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
  scanlines = false,
  noise = false,
  vignette = false,
  crtLines = false,
  chromaticAberration = false,
  flicker = false,
  scanlinesOpacity = 0.015,
  noiseOpacity = 0.02,
  vignetteIntensity = 0.4,
}: EffectsLayerProps) {
  return (
    <div 
      className={cn(
        "relative",
        crtLines && "crt-lines",
        chromaticAberration && "chromatic-aberration",
        flicker && "screen-flicker",
        className
      )}
    >
      {vignette && <Vignette intensity={vignetteIntensity} />}
      {scanlines && <Scanlines opacity={scanlinesOpacity} />}
      {noise && <NoiseTexture opacity={noiseOpacity} />}
      {children}
    </div>
  );
}
