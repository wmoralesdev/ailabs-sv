import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

interface WipPageProps {
  comingSoon: string;
  title: string;
  description: string;
  backLabel?: string;
}

export function WipPage({
  comingSoon,
  title,
  description,
  backLabel,
}: WipPageProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24">
        <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
          <AnimatedGrid />
          <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
          <div className="container relative z-10 mx-auto px-6">
            <article
              className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm motion-safe:animate-hero-in [animation-delay:80ms] md:p-10"
              data-slot="card"
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-medium tracking-wide text-foreground/80">
                  {comingSoon}
                </span>
              </div>
              {/* Title */}
              <h1 className="mb-4 text-2xl font-medium tracking-tighter md:text-3xl">
                {title}
              </h1>
              {/* Description */}
              <p className="mb-8 text-base font-light leading-relaxed text-muted-foreground">
                {description}
              </p>
              {/* Back button */}
              {backLabel && (
                <Button
                  variant="default"
                  size="lg"
                  className="gap-2"
                  render={<Link to="/" />}
                >
                  <HugeiconsIcon icon={ArrowLeft02Icon} size={18} data-icon="inline-start" />
                  {backLabel}
                </Button>
              )}
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
