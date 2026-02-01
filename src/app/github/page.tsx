import UsernameInput from '@/components/github/UsernameInput';
import { EffectsLayer } from '@/components/effects/EffectsLayer';
import { Y2KFooter } from '@/components/y2k/Y2KFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enter GitHub Username | Fork Watcher',
  description: 'Enter a GitHub username to explore their forked repositories',
};

export default function GitHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EffectsLayer scanlines noise className="flex-1">
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          {/* Background effects */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_50%,oklch(0.75_0.25_145/0.08),transparent)]" />
          </div>

          <UsernameInput />
        </main>

        <Y2KFooter />
      </EffectsLayer>
    </div>
  );
}
