import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  Wrench01Icon,
  Presentation01Icon,
} from "@hugeicons/core-free-icons";

export function WhatHappensHereSection() {
  const { t } = useI18n();

  const ICONS = [FlashIcon, Wrench01Icon, Presentation01Icon];

  return (
    <section className="section-spacing border-y border-border/50 bg-muted/15">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.lab.label}
          title={t.lab.heading}
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.lab.cards.map((card, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article
                key={card.title}
                className="group rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <HugeiconsIcon icon={Icon} className="size-6 marching-ants" />
                </div>
                <h3 className="mb-4 text-xl font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="text-pretty text-base font-light leading-relaxed text-muted-foreground">
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
