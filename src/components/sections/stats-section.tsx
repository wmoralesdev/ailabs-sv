import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

function useCountUp(value: string, enabled: boolean, duration = 1000): string {
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setDisplay(value);
      return;
    }
    if (hasAnimated.current) return;

    const match = value.match(/^(\d+)(\+?)$/);
    if (!match) {
      setDisplay(value);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";

    setDisplay(`0${suffix}`);
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.floor(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, enabled, duration]);

  return display;
}

function StatCell({
  value,
  label,
  badge,
  animate,
}: {
  value: string;
  label: string;
  badge?: string;
  animate: boolean;
}) {
  const display = useCountUp(value, animate, 1000);

  return (
    <div className="flex min-w-0 flex-col items-center justify-center gap-1 border-border/50 px-4 py-6 text-center md:border-r md:last:border-r-0">
      <div className="flex w-full max-w-full flex-wrap items-baseline justify-center gap-2">
        <span className="font-mono text-2xl font-medium tabular-nums text-foreground md:text-3xl">
          {display}
        </span>
        {badge ? (
          <span className="rounded-full bg-primary/20 px-2 py-0.5 font-mono text-xs font-medium text-primary">
            {badge}
          </span>
        ) : null}
      </div>
      <span className="text-xs font-medium uppercase leading-snug tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  const { t } = useI18n();
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAnimate(false);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setAnimate(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: t.stats.members,
      label: t.ui.stats.membersDetail,
      badge: t.stats.membersBadge,
    },
    {
      value: t.stats.eventsHeld,
      label: t.ui.stats.eventsDetail,
    },
    {
      value: t.stats.projectsShipped,
      label: t.ui.stats.projectsShippedDetail,
    },
    {
      value: t.stats.partners,
      label: t.ui.stats.partnersDetail,
    },
  ];

  return (
    <section ref={sectionRef} className="section-spacing">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.ui.stats.badge}
          title={t.ui.stats.sectionTitle}
          description={t.ui.stats.sectionDesc}
          align="left"
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCell
                key={stat.label}
                value={stat.value}
                label={stat.label}
                badge={stat.badge}
                animate={animate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
