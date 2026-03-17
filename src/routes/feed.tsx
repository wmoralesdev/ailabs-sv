import { createFileRoute, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShowcaseGrid } from "@/components/showcase/showcase-grid";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { useAuthState } from "@/components/auth/auth-context";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/feed")({
  validateSearch: (search: Record<string, unknown>) => ({
    event: (search.event as string) || undefined,
    tool: (search.tool as string) || undefined,
    status: (search.status as string) || undefined,
  }),
  component: FeedPage,
});

function FeedPage() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const { isAuthenticated } = useAuthState();

  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
        <main className="pt-24">
          <section
            id="overview"
            className="relative overflow-hidden border-b border-border pb-16 pt-24 md:pb-24 md:pt-32"
          >
            <AnimatedGrid />
            <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

            <div className="container relative z-10 mx-auto px-6 text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-medium tracking-wide text-foreground/80">
                  {t.feed?.heroBadge ?? "COMMUNITY"}
                </span>
              </div>

              <h1 className="mb-8 text-4xl font-medium leading-[0.95] tracking-tighter motion-safe:animate-hero-in [animation-delay:140ms] md:text-6xl lg:text-7xl">
                <span className="block text-foreground">
                  {t.feed?.title ?? "Community Showcase"}
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-pretty text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:220ms] md:text-lg">
                {t.feed?.heroSubtitle ??
                  "Projects built by the community. Hackathons, workshops, and experiments."}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 motion-safe:animate-hero-in [animation-delay:300ms] sm:flex-row">
                {isAuthenticated ? (
                  <Link
                    to="/showcase/submit"
                    search={{ edit: undefined }}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 sm:w-auto"
                  >
                    {t.ui?.header?.submitProject ?? "Submit project"}
                    <HugeiconsIcon icon={ArrowRightIcon} size={18} />
                  </Link>
                ) : (
                  <Link
                    to="/sign-in"
                    search={{ returnTo: "/feed" }}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 sm:w-auto"
                  >
                    {t.feed?.joinCta ?? "Sign in"}
                    <HugeiconsIcon icon={ArrowRightIcon} size={18} />
                  </Link>
                )}
              </div>
            </div>
          </section>

          <div className="container mx-auto px-6 pb-16 pt-12">
            <ShowcaseGrid search={search} />
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
