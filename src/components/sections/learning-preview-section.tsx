import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CodeIcon,
  FlashIcon,
  Presentation01Icon,
} from "@hugeicons/core-free-icons";

export function LearningPreviewSection() {
  const { t } = useI18n();

  const ICONS = [CodeIcon, FlashIcon, Presentation01Icon];
  const GRADIENTS = [
    "bg-linear-to-br from-primary/20 via-primary/5 to-transparent",
    "bg-linear-to-br from-blue-500/20 via-blue-500/5 to-transparent",
    "bg-linear-to-br from-purple-500/20 via-purple-500/5 to-transparent",
  ];

  return (
    <section
      id="blog"
      className="section-spacing border-y border-border/50 bg-muted/15"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.learningPreview.badge}
          title={t.learningPreview.heading}
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {t.learningPreview.cards.map((card, index) => {
            const Icon = ICONS[index % ICONS.length];
            const gradientClass = GRADIENTS[index % GRADIENTS.length];

            return (
              <article
                key={card.title}
                className="group cursor-default overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
              >
                <div
                  className={`flex h-32 items-center justify-center ${gradientClass}`}
                >
                  <div className="rounded-full bg-background/50 p-3 backdrop-blur-sm">
                    <HugeiconsIcon
                      icon={Icon}
                      className="size-8 text-foreground/80"
                    />
                  </div>
                </div>
                <div className="p-8 pt-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-primary/70">
                    {card.date}
                  </p>
                  <h3 className="mb-4 text-xl font-semibold leading-tight tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-pretty text-base font-light leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
