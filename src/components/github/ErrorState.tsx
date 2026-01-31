'use client';

import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        Error
      </h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
        {error}
      </p>
      <Link
        href="/github"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </Link>
    </div>
  );
}
