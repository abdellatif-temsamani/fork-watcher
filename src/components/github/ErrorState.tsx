'use client';

import { useEffect, useState } from 'react';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { GlowButton } from '@/components/y2k/GlowButton';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { AlertTriangle, ArrowLeft, RefreshCcw, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  message: string;
  retryAfter?: number; // milliseconds until retry is allowed
}

export function ErrorState({ message, retryAfter }: ErrorStateProps) {
  const [countdown, setCountdown] = useState(Math.ceil((retryAfter || 0) / 1000));

  useEffect(() => {
    if (!retryAfter || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfter, countdown]);

  const isRateLimit = message.toLowerCase().includes('rate limit') || 
                      message.toLowerCase().includes('403') ||
                      retryAfter !== undefined;

  return (
    <WindowPanel
      variant="elevated"
      showWindowControls
      className="w-full max-w-lg mx-auto"
    >
      <div className="p-8">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative group">
            <div className={cn(
              "h-20 w-20 rounded-2xl flex items-center justify-center border shadow-[0_0_30px_oklch(0.55_0.2_25/0.3)] transition-all duration-300",
              isRateLimit 
                ? "bg-amber-500/10 border-amber-500/30" 
                : "bg-destructive/10 border-destructive/30"
            )}>
              <AlertTriangle className={cn(
                "h-10 w-10 transition-colors",
                isRateLimit ? "text-amber-500" : "text-destructive"
              )} />
            </div>
            {/* Glow effect */}
            <div className={cn(
              "absolute inset-0 -z-10 h-20 w-20 rounded-2xl blur-xl transition-colors",
              isRateLimit ? "bg-amber-500/20" : "bg-destructive/20"
            )} />
          </div>
        </div>

        <div className="text-center mb-6">
          <StatusBadge 
            variant={isRateLimit ? 'default' : 'destructive'} 
            className="mb-4"
            glow={!isRateLimit}
          >
            {isRateLimit ? 'RATE LIMITED' : 'ERROR'}
          </StatusBadge>
          <h2 className="mb-2 text-xl font-bold text-foreground">
            {isRateLimit ? 'Too Many Requests' : 'Something went wrong'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isRateLimit 
              ? 'GitHub API rate limit exceeded. Please wait before trying again.'
              : 'We encountered an error while fetching the data'}
          </p>
        </div>

        {/* Countdown timer for rate limit */}
        {isRateLimit && countdown > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center justify-center gap-2 text-amber-500">
              <Clock className="h-5 w-5 animate-pulse" />
              <span className="font-mono text-lg font-bold">
                {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
              </span>
              <span className="text-sm">until retry</span>
            </div>
          </div>
        )}

        {/* Error Details */}
        <TerminalBlock
          showPrompt
          className={cn(
            "mb-8",
            isRateLimit ? "border-amber-500/30" : "border-destructive/30"
          )}
        >
          <span className={isRateLimit ? "text-amber-500" : "text-destructive"}>
            {message}
          </span>
        </TerminalBlock>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/github" className="w-full sm:w-auto">
            <GlowButton variant="outline" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Try Another User
            </GlowButton>
          </Link>
          
          <ChromeButton
            variant="default"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto gap-2"
            disabled={countdown > 0}
          >
            <RefreshCcw className={cn(
              "h-4 w-4",
              countdown === 0 && "group-hover:rotate-180 transition-transform"
            )} />
            {countdown > 0 ? `Retry (${countdown}s)` : 'Retry Now'}
          </ChromeButton>
        </div>
      </div>
    </WindowPanel>
  );
}
