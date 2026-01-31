import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GitFork,
  Eye,
  Telescope,
  ArrowRight,
  Sparkles,
  Github,
  Search,
  Bird,
  GitBranch,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,oklch(0.9_0.05_250/0.15),transparent)]" />
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-20">
            <GitFork className="h-96 w-96 text-primary" strokeWidth={0.5} />
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
          >
            <Bird className="mr-1 h-3 w-3" />
            Now in beta
          </Badge>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Spot forks in the{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              wild
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Like bird watching, but for code. Discover interesting GitHub forks,
            track how projects evolve, and find hidden gems in the open source
            ecosystem.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/github">
              <Button size="lg" className="group min-w-[180px]">
                <Telescope className="mr-2 h-4 w-4" />
                Start Watching
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="min-w-[180px]" asChild>
              <a href="#how-it-works">
                <Eye className="mr-2 h-4 w-4" />
                How it Works
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your fork watching toolkit
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to explore the GitHub ecosystem and discover
              interesting repositories
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
                <GitBranch className="h-24 w-24" />
              </div>
              <CardHeader>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <GitBranch className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Track Nesting Sites</CardTitle>
                <CardDescription>
                  Follow your favorite repositories and watch their forks grow
                  in real-time. Never miss an interesting branch-off.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Watch any GitHub user&apos;s repos</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
                <Search className="h-24 w-24" />
              </div>
              <CardHeader>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Spot Rare Species</CardTitle>
                <CardDescription>
                  Discover unique forks and contributions before they become
                  mainstream. Find the next big thing early.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Sort by stars, forks, and activity</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transition-all hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
                <Eye className="h-24 w-24" />
              </div>
              <CardHeader>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Study Migration Patterns</CardTitle>
                <CardDescription>
                  Understand how ideas flow through the open source ecosystem.
                  See which forks are gaining traction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Visualize fork relationships</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How fork watching works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Three simple steps to start exploring the GitHub ecosystem
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter a Username",
                description:
                  "Type in any GitHub username to see all their public repositories",
                icon: Github,
              },
              {
                step: "02",
                title: "Explore Repos",
                description:
                  "Browse their repos and see which ones have been forked by others",
                icon: GitFork,
              },
              {
                step: "03",
                title: "Discover Forks",
                description:
                  "Dive into fork details and find interesting contributions",
                icon: Telescope,
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative text-center">
                {idx < 2 && (
                  <div className="absolute left-1/2 top-12 hidden h-px w-full -translate-y-1/2 bg-border md:block" />
                )}
                <div className="relative z-10 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-sm">
                  <span className="text-2xl font-bold text-primary">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
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
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
            <div className="relative p-8 text-center sm:p-12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Bird className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Start your fork watching journey
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-primary-foreground/90">
                Join thousands of developers exploring the open source ecosystem.
                Your next discovery is just a username away.
              </p>
              <Link href="/github">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group min-w-[200px] bg-background text-foreground hover:bg-background/90"
                >
                  <Telescope className="mr-2 h-4 w-4" />
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <GitFork className="h-5 w-5 text-primary" />
            <span className="font-semibold">ForkSpotting</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Bird watching for the GitHub ecosystem
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with</span>
            <Github className="h-4 w-4" />
            <span>+ Next.js</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
