import { Suspense } from 'react';
import Link from 'next/link';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { GlowButton } from '@/components/y2k/GlowButton';
import { ChromeText } from '@/components/y2k/ChromeText';
import { EffectsLayer } from '@/components/effects/EffectsLayer';
import { UIModeControl } from '@/components/effects/UIModeControl';
import { RepoForksList } from '@/components/github/RepoForksList';
import { LoadingState } from '@/components/github/LoadingState';
import { Y2KFooter } from '@/components/y2k/Y2KFooter';
import { Github, ArrowLeft, ExternalLink, GitFork, Users, Loader2 } from 'lucide-react';
import type { GitHubUser } from '@/types/github';

// Force dynamic rendering since this page fetches data from GitHub API
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ username: string }>;
}

async function getUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function UserHeader({ username }: { username: string }) {
  const user = await getUser(username);
  const displayName = user?.name || username;
  const displayBio = user?.bio || 'GitHub user';

  return (
    <div className="mb-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/github">
          <ChromeButton variant="ghost" className="gap-2 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to search
          </ChromeButton>
        </Link>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlowButton variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Profile
          </GlowButton>
        </a>
      </div>

      {/* User info card */}
      <WindowPanel variant="elevated" className="border-gradient overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Avatar or Icon */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-primary-glow to-chrome rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative p-4 bg-card border border-border rounded-xl">
                <Github className="h-10 w-10 text-primary" />
              </div>
            </div>

            {/* User details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <ChromeText as="h1" className="text-2xl sm:text-3xl font-bold">
                  {displayName}
                </ChromeText>
                <StatusBadge variant="jungle">USER</StatusBadge>
              </div>

              <p className="text-muted-foreground mt-1">@{username}</p>

              {displayBio && (
                <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                  {displayBio}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                {user?.public_repos !== undefined && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <GitFork className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{user.public_repos}</span>
                    <span>repos</span>
                  </div>
                )}
                {user?.followers !== undefined && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{user.followers}</span>
                    <span>followers</span>
                  </div>
                )}
                {user?.following !== undefined && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{user.following}</span>
                    <span>following</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </WindowPanel>
    </div>
  );
}

function UserHeaderSkeleton() {
  return (
    <div className="mb-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/github">
          <ChromeButton variant="ghost" className="gap-2 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to search
          </ChromeButton>
        </Link>

        <GlowButton variant="outline" size="sm" className="gap-2" disabled>
          <ExternalLink className="h-4 w-4" />
          View Profile
        </GlowButton>
      </div>

      {/* Skeleton card */}
      <WindowPanel variant="elevated" className="overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="p-4 bg-card border border-border rounded-xl">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </WindowPanel>
    </div>
  );
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  return (
    <EffectsLayer
      scanlines
      noise
      vignette
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.25_145/0.08),transparent_50%)]" />
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Suspense fallback={<UserHeaderSkeleton />}>
          <UserHeader username={decodedUsername} />
        </Suspense>

        <Suspense fallback={<LoadingState />}>
          <RepoForksList username={decodedUsername} />
        </Suspense>
      </main>

      <Y2KFooter />

      <UIModeControl />
    </EffectsLayer>
  );
}
