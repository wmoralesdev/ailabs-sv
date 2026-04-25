import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function JoinCtaSection() {
  const { t } = useI18n();

  return (
    <section
      id="join"
      className="section-contrast py-20 md:py-28"
    >
      <div
        className="absolute inset-0 z-0 animate-pulse-slow motion-reduce:animate-none bg-join-cta-gradient opacity-70"
        aria-hidden
      />
      <div
        className="dotted-field absolute inset-0 z-0 opacity-20"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <SectionHeader
          eyebrow={t.joinCta.badge}
          title={t.joinCta.heading}
          description={t.joinCta.subtext}
          align="center"
          size="lg"
          className="[&_h2]:text-background [&_p:last-child]:text-background/70"
        />
        <Link
          to={t.site.whatsappLink as any}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary-foreground px-10 text-lg font-medium text-primary shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-black/25 motion-reduce:transform-none dark:bg-primary dark:text-primary-foreground"
        >
          {t.joinCta.cta}
          <HugeiconsIcon icon={ArrowRightIcon} size={22} />
        </Link>
        <p className="mt-6 text-sm font-light text-background/65 dark:text-foreground/65">
          {t.joinCta.finePrint}
        </p>
      </div>
    </section>
  );
}
