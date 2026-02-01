import { Suspense, use } from 'react';
import { RepoForksList } from '@/components/github/RepoForksList';
import { LoadingState } from '@/components/github/LoadingState';
import { WindowPanel } from '@/components/y2k/WindowPanel';
import { ChromeButton } from '@/components/y2k/ChromeButton';
import { StatusBadge } from '@/components/y2k/StatusBadge';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { validateGitHubUsername } from '@/lib/validation';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  return {
    title: `${username}'s GitHub Forks | Fork Watcher`,
    description: `View all repositories and forks for ${username} on GitHub`,
  };
}

// Generate static params for common users at build time
export async function generateStaticParams() {
  return [
    { username: 'octocat' },
    { username: 'torvalds' },
  ];
}

// Component for the header that uses params synchronously
function UserHeader({ username }: { username: string }) {
  return (
    <WindowPanel variant="elevated" showWindowControls className="mb-8">
      <div className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/github">
              <ChromeButton variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </ChromeButton>
            </Link>

            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 shadow-[0_0_20px_oklch(0.75_0.25_145/0.2)]">
                <Github className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {username}
                  </h1>
                  <StatusBadge variant="jungle">USER</StatusBadge>
                </div>
                <p className="text-sm text-muted-foreground">
                  GitHub Repositories & Forks
                </p>
              </div>
            </div>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChromeButton variant="filled" size="sm">
              View on GitHub
              <ExternalLink className="ml-2 h-3 w-3" />
            </ChromeButton>
          </a>
        </div>
      </div>
    </WindowPanel>
  );
}

// Wrapper component that handles async data fetching
async function RepoForksListWrapper({ username }: { username: string }) {
  return <RepoForksList username={username} />;
}

export default function UserForksPage({ params }: PageProps) {
  const { username } = use(params);
  const decodedUsername = decodeURIComponent(username);

  // Validate username server-side
  const validation = validateGitHubUsername(decodedUsername);
  if (!validation.valid) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_100px,oklch(0.75_0.25_145/0.05),transparent)]" />

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <UserHeader username={decodedUsername} />

        {/* Content - wrapped in Suspense */}
        <Suspense fallback={<LoadingState />}>
          <RepoForksListWrapper username={decodedUsername} />
        </Suspense>
      </div>
    </main>
  );
}
