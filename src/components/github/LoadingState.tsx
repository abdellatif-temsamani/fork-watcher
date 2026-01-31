import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-slate-600 dark:text-slate-400 mb-4" />
      <p className="text-slate-600 dark:text-slate-400">
        Loading repositories and forks...
      </p>
    </div>
  );
}
