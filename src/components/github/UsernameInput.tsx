'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Github } from 'lucide-react';

export default function UsernameInput() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const [message, formAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData) => {
      const formUsername = String(formData.get('username') ?? '');
      const trimmedUsername = formUsername.trim();
      if (!trimmedUsername) {
        return 'Please enter a GitHub username.';
      }

      router.push(`/github/${encodeURIComponent(trimmedUsername)}`);
      return null;
    },
    null,
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
          <Github className="w-8 h-8 text-slate-900 dark:text-slate-100" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Fork Watcher
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a GitHub username to see all their repos and forks
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="GitHub username (e.g., abdellatif-temsamani)"
            className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
            disabled={isPending}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>

        <button
          type="submit"
          disabled={!username.trim() || isPending}
          className="w-full px-4 py-3 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Loading...' : 'View Forks'}
        </button>

        {message ? (
          <p className="text-sm text-rose-600 dark:text-rose-400">{message}</p>
        ) : null}
      </form>
    </div>
  );
}
