'use client';

import { useState, useCallback } from 'react';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { cn, copyToClipboard } from '@/lib/utils';
import { Copy, Check, X } from 'lucide-react';

type CopyState = 'idle' | 'copied' | 'error';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'icon';
  variant?: 'default' | 'ghost';
}

export function CopyButton({
  text,
  label,
  className,
  size = 'sm',
  variant = 'ghost',
}: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle');

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(text);
    setState(success ? 'copied' : 'error');
    
    // Reset after 2 seconds
    setTimeout(() => setState('idle'), 2000);
  }, [text]);

  const icons = {
    idle: Copy,
    copied: Check,
    error: X,
  };

  const Icon = icons[state];

  const baseClasses = cn(
    'transition-all duration-200',
    state === 'copied' && 'text-primary',
    state === 'error' && 'text-destructive',
    className
  );

  if (size === 'icon') {
    return (
      <ChromeButton
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className={cn('h-8 w-8', baseClasses)}
        aria-label={state === 'idle' ? `Copy ${label || 'text'}` : state === 'copied' ? 'Copied!' : 'Failed to copy'}
        title={state === 'idle' ? 'Copy to clipboard' : state === 'copied' ? 'Copied!' : 'Failed to copy'}
      >
        <Icon className="h-4 w-4" />
      </ChromeButton>
    );
  }

  return (
    <ChromeButton
      type="button"
      variant={variant}
      size={size === 'sm' ? 'sm' : 'default'}
      onClick={handleCopy}
      className={baseClasses}
    >
      <Icon className={cn('h-4 w-4', label && 'mr-2')} />
      {label && (
        <span>
          {state === 'idle' ? label : state === 'copied' ? 'Copied!' : 'Error'}
        </span>
      )}
    </ChromeButton>
  );
}
