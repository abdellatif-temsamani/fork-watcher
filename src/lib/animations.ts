/**
 * Animation configuration for fork-watcher
 * 
 * These are CSS-based animation timings and delays for staggered effects.
 * All animations respect reduced motion preferences via CSS media queries.
 */

export const animationConfig = {
  // Entrance animations
  entrance: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  // Stagger delays for list items
  stagger: {
    fast: 50,
    normal: 100,
    slow: 150,
  },
  
  // Hover transitions
  hover: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  
  // Effect durations
  effects: {
    glowPulse: '2s',
    shimmerSweep: '0.8s',
    conicRotate: '3s',
    scanSweep: '4s',
    float: '6s',
  },
};

/**
 * Generate stagger delay for a list of items
 */
export function getStaggerDelay(
  index: number,
  baseDelay: number = 100,
  maxDelay: number = 2000
): string {
  const delay = Math.min(index * baseDelay, maxDelay);
  return `${delay}ms`;
}

/**
 * CSS class names for animations
 */
export const animationClasses = {
  // Entrance
  fadeIn: 'animate-in fade-in',
  slideInFromBottom: 'animate-in slide-in-from-bottom-4',
  slideInFromTop: 'animate-in slide-in-from-top-4',
  slideInFromLeft: 'animate-in slide-in-from-left-4',
  slideInFromRight: 'animate-in slide-in-from-right-4',
  zoomIn: 'animate-in zoom-in',
  
  // Exit
  fadeOut: 'animate-out fade-out',
  slideOutToBottom: 'animate-out slide-out-to-bottom-4',
  
  // Effects
  glowPulse: 'animate-glow-pulse',
  shimmerSweep: 'after:animate-shimmer-sweep',
  conicRotate: 'before:animate-[conic-rotate_3s_linear_infinite]',
  skeleton: 'skeleton',
  float: 'animate-float',
  
  // Reduced motion fallback
  reducedMotion: 'motion-reduce:animate-none motion-reduce:transition-none',
};

/**
 * Compose animation classes with reduced motion support
 */
export function withReducedMotion(...classes: string[]): string {
  return [...classes, 'motion-reduce:animate-none motion-reduce:transition-none'].join(' ');
}
