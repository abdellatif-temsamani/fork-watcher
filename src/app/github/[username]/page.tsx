import { Suspense } from 'react';
import RepoForksList from '@/components/github/RepoForksList';
import LoadingState from '@/components/github/LoadingState';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  return {
    title: `${username}'s GitHub Forks`,
    description: `View all repositories and forks for ${username}`,
  };
}

export default async function UserForksPage({ params }: PageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/github"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800">
              <Github className="w-6 h-6 text-slate-900 dark:text-slate-100" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                {decodedUsername}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                GitHub Repositories and Forks
              </p>
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingState />}>
          <RepoForksList username={decodedUsername} />
        </Suspense>
      </div>
    </main>
  );
}
