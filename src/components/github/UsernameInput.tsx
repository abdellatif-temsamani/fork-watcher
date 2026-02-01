"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { WindowPanel } from "@/components/y2k/WindowPanel";
import { GlowButton } from "@/components/y2k/GlowButton";
import { NeoInput } from "@/components/y2k/NeoInput";
import { TerminalBlock } from "@/components/y2k/TerminalBlock";
import { StatusBadge } from "@/components/y2k/StatusBadge";
import { Github, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { validateGitHubUsername } from "@/lib/validation";
import { searchRateLimiter } from "@/lib/rate-limiter";

export default function UsernameInput() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Check rate limiting
    const rateLimit = searchRateLimiter.isAllowed("search");
    if (!rateLimit.allowed) {
      const seconds = Math.ceil(searchRateLimiter.getTimeUntilReset("search") / 1000);
      setError(`Too many searches. Please wait ${seconds} seconds.`);
      return;
    }

    // Validate username
    const validation = validateGitHubUsername(username);
    if (!validation.valid) {
      setError(validation.error || "Invalid username");
      return;
    }

    setIsLoading(true);
    router.push(`/github/${encodeURIComponent(username.trim())}`);
  };

  return (
    <WindowPanel variant="elevated" showWindowControls className="w-full max-w-lg">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_0_30px_oklch(0.75_0.25_145/0.3)]">
            <Github className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Enter GitHub Username
          </h1>
          <p className="text-muted-foreground text-sm">
            Type in any GitHub username to explore their forks
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-foreground"
            >
              GitHub Username
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <NeoInput
                id="username"
                type="text"
                placeholder="e.g., octocat, torvalds..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-11"
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                {error}
              </div>
            )}
          </div>

          <GlowButton
            type="submit"
            className="w-full group"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Loading...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Watch Forks
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </GlowButton>
        </form>

        {/* Terminal Tip */}
        <div className="mt-8">
          <TerminalBlock title="tip.txt" className="text-xs">
            Try usernames like: torvalds, octocat, or your own!
          </TerminalBlock>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </WindowPanel>
  );
}
