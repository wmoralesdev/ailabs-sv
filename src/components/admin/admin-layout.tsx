import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { GlitchText } from "@/components/ui/glitch-text";

function AdminTabLink({
  to,
  pathname,
  children,
}: {
  to: "/admin/events" | "/admin/lab";
  pathname: string;
  children: React.ReactNode;
}) {
  const active = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center rounded-md border border-transparent px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-border bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();
  const h = t.adminPage.hero;

  return (
    <div className="overflow-x-hidden motion-safe:animate-page-in">
      <section
        id="overview"
        className="relative overflow-hidden border-b border-border pb-6 pt-6 md:pb-8 md:pt-8"
      >
        <AnimatedGrid />
        <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/80">
              {h.badge}
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-medium leading-tight tracking-tight motion-safe:animate-hero-in [animation-delay:140ms] md:text-3xl">
            <span className="block text-foreground">{h.headlineLine1}</span>
            <GlitchText phrases={h.headlinePhrases} className="block text-primary" />
          </h1>

          <p className="mx-auto mb-4 max-w-xl text-pretty text-sm font-light leading-snug text-foreground/60 motion-safe:animate-hero-in [animation-delay:220ms]">
            {h.subheadline}
          </p>

          <div className="flex flex-col items-center justify-center gap-2 motion-safe:animate-hero-in [animation-delay:300ms] sm:flex-row sm:gap-3">
            <Link
              to="/showcase"
              search={{ event: undefined, tool: undefined, status: undefined }}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md shadow-primary/15 transition-colors hover:bg-primary/90 sm:w-auto"
            >
              {h.primaryCta}
              <HugeiconsIcon icon={ArrowRightIcon} size={14} />
            </Link>
            <Link
              to="/"
              className="flex h-9 w-full items-center justify-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent/50 sm:w-auto"
            >
              {h.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-none px-4 pb-12 pt-6 sm:px-6 lg:px-8 xl:px-10">
        <nav
          className="mb-6 flex flex-wrap gap-2 rounded-lg bg-muted p-1"
          aria-label="Admin sections"
        >
          <AdminTabLink to="/admin/events" pathname={pathname}>
            Events
          </AdminTabLink>
          <AdminTabLink to="/admin/lab" pathname={pathname}>
            From the Lab
          </AdminTabLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
