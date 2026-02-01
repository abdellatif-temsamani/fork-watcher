import { WindowPanel } from "@/components/y2k/WindowPanel";
import { GlowButton } from "@/components/y2k/GlowButton";
import { ChromeButton } from "@/components/y2k/ChromeButton";
import { StatusBadge } from "@/components/y2k/StatusBadge";
import { TerminalBlock } from "@/components/y2k/TerminalBlock";
import { Y2KFooter } from "@/components/y2k/Y2KFooter";
import { GradientText } from "@/components/y2k/GradientText";
import { EffectsLayer } from "@/components/effects/EffectsLayer";
import {
  GitFork,
  Eye,
  Telescope,
  ArrowRight,
  Search,
  Bird,
  GitBranch,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <EffectsLayer scanlines noise>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-32 pb-24 sm:px-6 lg:px-8">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,oklch(0.75_0.25_145/0.08),transparent)]" />
            <div className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <GitFork className="h-64 w-64 text-primary animate-float" strokeWidth={0.5} />
            </div>
            <div className="absolute right-1/4 top-1/2 translate-x-1/4 -translate-y-1/4 opacity-5">
              <GitFork className="h-96 w-96 text-primary animate-float-delayed" strokeWidth={0.3} />
            </div>
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <StatusBadge
              variant="jungle"
              glow
              className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              BETA v0.1.0
            </StatusBadge>

            <h1 className="mb-8 text-6xl font-bold tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              FORK{" "}
              <GradientText className="drop-shadow-[0_0_30px_oklch(0.75_0.25_145/0.4)]">
                WATCHER
              </GradientText>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Like bird watching, but for code. Discover interesting GitHub forks,
              track how projects evolve, and find hidden gems in the open source
              ecosystem.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/github">
                <GlowButton size="lg" className="min-w-[200px] group">
                  <Telescope className="mr-2 h-4 w-4" />
                  Start Watching
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <ChromeButton size="lg" className="min-w-[200px]" asChild>
                <a href="#how-it-works">
                  <Eye className="mr-2 h-4 w-4" />
                  How it Works
                </a>
              </ChromeButton>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <StatusBadge variant="chrome" className="mb-4">
                FEATURES
              </StatusBadge>
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your fork watching toolkit
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                Everything you need to explore the GitHub ecosystem and discover
                interesting repositories
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <WindowPanel
                variant="elevated"
                interactive
                showWindowControls
                className="group"
              >
                <div className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 shadow-[0_0_20px_oklch(0.75_0.25_145/0.2)]">
                    <GitBranch className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Track Nesting Sites
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Follow your favorite repositories and watch their forks grow
                    in real-time. Never miss an interesting branch-off.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    <Star className="h-4 w-4" />
                    <span>Watch any GitHub user&apos;s repos</span>
                  </div>
                </div>
              </WindowPanel>

              {/* Feature 2 */}
              <WindowPanel
                variant="elevated"
                interactive
                showWindowControls
                className="group"
              >
                <div className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 shadow-[0_0_20px_oklch(0.75_0.25_145/0.2)]">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Spot Rare Species
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Discover unique forks and contributions before they become
                    mainstream. Find the next big thing early.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    <Star className="h-4 w-4" />
                    <span>Sort by stars, forks, and activity</span>
                  </div>
                </div>
              </WindowPanel>

              {/* Feature 3 */}
              <WindowPanel
                variant="elevated"
                interactive
                showWindowControls
                className="group sm:col-span-2 lg:col-span-1"
              >
                <div className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 shadow-[0_0_20px_oklch(0.75_0.25_145/0.2)]">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Study Migration Patterns
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Understand how ideas flow through the open source ecosystem.
                    See which forks are gaining traction.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    <Star className="h-4 w-4" />
                    <span>Visualize fork relationships</span>
                  </div>
                </div>
              </WindowPanel>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-4 py-24 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <StatusBadge variant="matrix" className="mb-4">
                PROCESS
              </StatusBadge>
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                How fork watching works
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                Three simple steps to start exploring the GitHub ecosystem
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Enter a Username",
                  description: "Type in any GitHub username to see all their public repositories",
                  command: "github fetch --user octocat",
                },
                {
                  step: "02",
                  title: "Explore Repos",
                  description: "Browse their repos and see which ones have been forked by others",
                  command: "repos list --with-forks",
                },
                {
                  step: "03",
                  title: "Discover Forks",
                  description: "Dive into fork details and find interesting contributions",
                  command: "forks inspect --deep",
                },
              ].map((item, idx) => (
                <div key={item.step} className="relative">
                  {idx < 2 && (
                    <div className="absolute left-1/2 top-16 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent md:block" />
                  )}
                  
                  {/* Step Number */}
                  <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-primary/30 shadow-[0_0_30px_oklch(0.75_0.25_145/0.2)]">
                    <span className="text-3xl font-bold text-primary font-mono">
                      {item.step}
                    </span>
                  </div>

                  {/* Terminal Block */}
                  <TerminalBlock
                    title={`step_${item.step}.sh`}
                    className="mb-6"
                  >
                    {item.command}
                  </TerminalBlock>

                  <h3 className="mb-2 text-lg font-semibold text-center text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <WindowPanel
              variant="elevated"
              showWindowControls
              className="relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
              
              {/* Floating elements */}
              <div className="absolute right-8 top-8 opacity-20">
                <Bird className="h-32 w-32 text-primary animate-float" />
              </div>

              <div className="relative p-12 text-center">
                <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_0_40px_oklch(0.75_0.25_145/0.3)]">
                  <Bird className="h-10 w-10 text-primary" />
                </div>
                
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Start your fork watching journey
                </h2>
                <p className="mx-auto mb-10 max-w-lg text-muted-foreground text-lg">
                  Join thousands of developers exploring the open source ecosystem.
                  Your next discovery is just a username away.
                </p>
                
                <Link href="/github">
                  <GlowButton
                    size="lg"
                    className="min-w-[220px] group animate-pulse-glow"
                  >
                    <Telescope className="mr-2 h-4 w-4" />
                    Start Exploring
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </WindowPanel>
          </div>
        </section>

        {/* Footer */}
        <Y2KFooter />
      </EffectsLayer>
    </div>
  );
}
