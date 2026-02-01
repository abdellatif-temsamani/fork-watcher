'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  color?: string;
}

let idCounter = 0;

export function ParticleField({
  className,
  particleCount = 25,
  color = 'oklch(0.65 0.18 145)',
}: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesDataRef = useRef<Particle[]>([]);

  // Initialize particles on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInitialized) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const initialParticles = Array.from({ length: particleCount }, () => {
      idCounter += 1;
      return {
        id: `particle-${idCounter}-${Math.random().toString(36).substr(2, 9)}`,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      };
    });

    setParticles(initialParticles);
    particlesDataRef.current = initialParticles;
    setIsInitialized(true);
  }, [particleCount, isInitialized]);

  // Animation loop - separate from render
  useEffect(() => {
    if (!isInitialized || particles.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      // Throttle to ~30fps
      if (currentTime - lastTime < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Update particle positions in ref
      particlesDataRef.current = particlesDataRef.current.map((particle) => {
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;

        // Wrap around edges
        if (newX < 0) newX = width;
        if (newX > width) newX = 0;
        if (newY < 0) newY = height;
        if (newY > height) newY = 0;

        return { ...particle, x: newX, y: newY };
      });

      // Update state to trigger re-render with new positions
      setParticles(particlesDataRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized, particles.length]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      style={{ opacity: 'var(--fx-particles-opacity, 0)' }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
