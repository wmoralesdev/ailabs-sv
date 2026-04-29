import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { api } from "convex/_generated/api";
import { buildSeoMeta } from "@/lib/seo-meta";
import { seoCopyEs } from "@/content/seo-copy";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { GlitchText } from "@/components/ui/glitch-text";
import { HackathonGroupsGrid } from "@/components/hackathon-groups/hackathon-groups-grid";
import { useAuthState } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hackathon-groups/")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/hackathon-groups",
      title: seoCopyEs.hackathonGroupsIndex.title,
      description: seoCopyEs.hackathonGroupsIndex.description,
    });
    return { meta, links };
  },
  validateSearch: (search: Record<string, unknown>) => ({
    status: (search.status as string) || undefined,
  }),
  component: HackathonGroupsIndexPage,
});

function HackathonGroupsIndexPage() {
  const search = Route.useSearch();
  const { isAuthenticated } = useAuthState();
  const hasSessionStarted = useQuery(api.hackathon_groups.isSessionStarted);
  const startSession = useMutation(api.hackathon_groups.startSession);
  const [isStartingSession, setIsStartingSession] = useState(false);

  const handleStartSession = async () => {
    if (isStartingSession) return;
    setIsStartingSession(true);
    try {
      await startSession({});
    } finally {
      setIsStartingSession(false);
    }
  };

  return (
    <div className="overflow-x-hidden motion-safe:animate-page-in">
      <section className="relative overflow-hidden border-b border-border pb-16 pt-24 md:pb-24 md:pt-32">
        <AnimatedGrid />
        <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
            <span className="text-xs font-medium uppercase text-primary">
              Hackathon groups
            </span>
          </div>

          <h1 className="text-balance mb-8 text-4xl font-medium leading-[0.95] motion-safe:animate-hero-in [animation-delay:140ms] md:text-6xl lg:text-7xl">
            <span className="block text-foreground">Build with your</span>
            <GlitchText
              phrases={["group in real time.", "session, team, ship."]}
              className="block text-primary"
            />
          </h1>

          <p className="text-pretty mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:220ms] md:text-lg">
            Start your hackathon session, upload group projects at any time, and
            keep a visible history of progress and updates.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 motion-safe:animate-hero-in [animation-delay:300ms] sm:flex-row">
            {isAuthenticated ? hasSessionStarted ? (
              <Link
                to="/hackathon-groups/submit"
                search={{ edit: undefined }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 sm:w-auto"
              >
                Submit group project
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </Link>
            ) : (
              <Button
                type="button"
                disabled={isStartingSession}
                className="h-12 w-full px-8 sm:w-auto"
                onClick={() => {
                  void handleStartSession();
                }}
              >
                {isStartingSession ? "Starting session..." : "Start session"}
              </Button>
            ) : (
              <Link
                to="/sign-in"
                search={{ returnTo: "/hackathon-groups" }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 sm:w-auto"
              >
                Sign in to start session
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </Link>
            )}
            <Link
              to="/showcase"
              search={{ event: undefined, tool: undefined, status: undefined }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border bg-muted px-8 font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-accent hover:text-accent-foreground sm:w-auto"
            >
              View main showcase
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-16 pt-12">
        <HackathonGroupsGrid search={search} />
      </div>
    </div>
  );
}
