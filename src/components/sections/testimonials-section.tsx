import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function TestimonialsSection() {
  const { t } = useI18n();

  return (
    <section className="section-spacing border-y border-border/50 bg-muted/10">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.ui.testimonials.badge}
          title={t.ui.testimonials.title}
          align="left"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {t.testimonials.map((item, index) => (
            <blockquote
              key={index}
              className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            >
              <p className="mb-6 text-balance text-lg font-medium leading-relaxed text-foreground/90 md:text-xl">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 motion-safe:group-hover:scale-105">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-foreground">
                    {item.author}
                  </cite>
                  {item.role && (
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  )}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
