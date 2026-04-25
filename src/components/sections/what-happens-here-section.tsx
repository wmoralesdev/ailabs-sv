import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  Presentation01Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function WhatHappensHereSection() {
  const { t } = useI18n();

  const ICONS = [FlashIcon, Wrench01Icon, Presentation01Icon];

  return (
    <section className="section-panel py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.lab.label}
          title={t.lab.heading}
          align="left"
        />
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {t.lab.cards.map((card, index) => {
            const Icon = ICONS[index % ICONS.length];
            const featured = index === 0;
            return (
              <article
                key={card.title}
                className={[
                  "group editorial-card interactive-lift relative overflow-hidden rounded-[1.75rem] p-7",
                  featured
                    ? "lg:row-span-2 lg:min-h-[360px] lg:p-9"
                    : "lg:min-h-[172px]",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 mb-6 inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <HugeiconsIcon icon={Icon} className="size-6 marching-ants" />
                </div>
                <h3
                  className={[
                    "relative z-10 mb-4 font-display font-semibold tracking-tight",
                    featured ? "text-3xl md:text-4xl" : "text-2xl",
                  ].join(" ")}
                >
                  {card.title}
                </h3>
                <p className="relative z-10 max-w-xl text-pretty text-base font-light leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
