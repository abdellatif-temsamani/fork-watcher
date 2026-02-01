'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { NeoInput } from '@/components/y2k/NeoInput';
import { GlowButton } from '@/components/y2k/GlowButton';
import { TerminalBlock } from '@/components/y2k/TerminalBlock';
import { cn } from '@/lib/utils';
import { validateGitHubUsername } from '@/lib/validation';
import { searchRateLimiter } from '@/lib/rate-limiter';
import { Search, Loader2, Sparkles, Command } from 'lucide-react';

export default function UsernameInput() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGlowTrail, setShowGlowTrail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: "/" to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      // Validate username
      const validation = validateGitHubUsername(username);
      if (!validation.valid) {
        setError(validation.error || 'Invalid username');
        return;
      }

      // Check rate limit
      const limiterResult = searchRateLimiter.isAllowed('search');
      if (!limiterResult.allowed) {
        const waitSeconds = Math.ceil(searchRateLimiter.getTimeUntilReset('search') / 1000);
        setError(`Rate limit exceeded. Please wait ${waitSeconds}s before searching again.`);
        return;
      }

      // Show glow trail effect
      setShowGlowTrail(true);
      setIsLoading(true);

      // Navigate to user page
      setTimeout(() => {
        router.push(`/github/${username.trim()}`);
      }, 300);
    },
    [username, router]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError('');
  }, [error]);

  return (
    <WindowPanel
      variant="elevated"
      className="w-full max-w-xl mx-auto relative overflow-visible"
    >
      {/* Glow trail effect */}
      {showGlowTrail && (
        <div 
          className={cn(
            "absolute -inset-1 rounded-xl blur-xl transition-all duration-500",
            "bg-gradient-to-r from-primary via-primary-glow to-chrome opacity-50"
          )}
          style={{
            animation: 'glow-pulse 1s ease-in-out 2',
          }}
          onAnimationEnd={() => setShowGlowTrail(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="username-input" 
              className="text-sm font-medium text-muted-foreground flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Enter GitHub username
            </label>
            
            <div className="relative">
              <NeoInput
                id="username-input"
                ref={inputRef}
                type="text"
                placeholder="e.g., octocat, torvalds, vercel"
                value={username}
                onChange={handleInputChange}
                className="h-14 text-lg pr-32"
                disabled={isLoading}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={!!error}
                aria-describedby={error ? 'username-error' : undefined}
              />
              
              {/* Submit button inside input */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <GlowButton 
                  type="submit" 
                  disabled={isLoading || !username.trim()}
                  className="h-10 px-4 gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden sm:inline">Track</span>
                    </>
                  )}
                </GlowButton>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div 
                id="username-error"
                className="text-sm text-destructive animate-in slide-in-from-top-1"
              >
                {error}
              </div>
            )}
          </div>

          {/* Terminal tip */}
          <TerminalBlock showPrompt className="text-sm">
            <span className="text-muted-foreground">
              Enter a GitHub username to see their forked repositories. 
              Try popular accounts like
            </span>{' '}
            <span className="text-primary font-medium">facebook</span>
            <span className="text-muted-foreground">, </span>
            <span className="text-primary font-medium">vercel</span>
            <span className="text-muted-foreground">, or </span>
            <span className="text-primary font-medium">microsoft</span>
            <span className="text-muted-foreground">.</span>
          </TerminalBlock>

          {/* Keyboard hint */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono border border-border">
                /
              </kbd>
              <span>Focus input</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono border border-border flex items-center gap-0.5">
                <Command className="h-2.5 w-2.5" />
                <span>E</span>
              </kbd>
              <span>Effects panel</span>
            </div>
          </div>
        </div>
      </form>
    </WindowPanel>
  );
}
