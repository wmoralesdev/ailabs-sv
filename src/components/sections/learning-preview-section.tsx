import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CodeIcon,
  FlashIcon,
  Presentation01Icon,
} from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { Spinner } from "@/components/ui/spinner";

const LAB_PREVIEW_ICONS = [CodeIcon, FlashIcon, Presentation01Icon];
const LAB_PREVIEW_GRADIENTS = [
  "bg-linear-to-br from-primary/20 via-primary/5 to-transparent",
  "bg-linear-to-br from-blue-500/20 via-blue-500/5 to-transparent",
  "bg-linear-to-br from-purple-500/20 via-purple-500/5 to-transparent",
];

export function LearningPreviewSection() {
  const { t, language } = useI18n();
  const cards = useQuery(api.learning_lab.listPublic, { language });

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
        {cards === undefined ? (
          <div className="flex min-h-[200px] items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : cards.length === 0 ? (
          <p className="py-8 text-sm text-muted-foreground">
            {t.learningPreview.empty}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = LAB_PREVIEW_ICONS[index % LAB_PREVIEW_ICONS.length];
              const gradientClass =
                LAB_PREVIEW_GRADIENTS[index % LAB_PREVIEW_GRADIENTS.length];

              return (
                <article
                  key={card.id}
                  className="group cursor-default overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                >
                  <div
                    className={`flex h-32 items-center justify-center ${gradientClass}`}
                  >
                    <div className="rounded-full bg-background/50 p-3 backdrop-blur-sm">
                      <HugeiconsIcon
                        icon={Icon}
                        className="size-8 text-foreground/80 marching-ants"
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
        )}
      </div>
    </section>
  );
}
