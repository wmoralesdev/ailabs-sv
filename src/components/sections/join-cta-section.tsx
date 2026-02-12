import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function JoinCtaSection() {
  const { t } = useI18n();

  return (
    <section
      id="join"
      className="relative overflow-hidden border-y border-primary/20 bg-muted/30 py-20 md:py-28 dark:bg-muted/20"
    >
      <div
        className="absolute inset-0 -z-10 animate-pulse-slow motion-reduce:animate-none bg-join-cta-gradient"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-foreground/5 dark:bg-transparent"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <SectionHeader
          eyebrow={t.joinCta.badge}
          title={t.joinCta.heading}
          description={t.joinCta.subtext}
          align="center"
          size="lg"
        />
        <a
          href={t.site.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-10 text-lg font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/40"
        >
          {t.joinCta.cta}
          <HugeiconsIcon icon={ArrowRightIcon} size={22} />
        </a>
        <p className="mt-6 text-sm font-light text-muted-foreground">
          {t.joinCta.finePrint}
        </p>
      </div>
    </section>
  );
}
