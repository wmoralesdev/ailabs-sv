import { useMemo } from "react";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.135 5.015C5.52 6.723 3.18 9.97 3.18 13.665c0 2.79 1.845 4.86 4.26 4.86 2.205 0 3.93-1.755 3.93-3.885 0-2.04-1.365-3.6-3.18-3.885.48-2.295 2.175-4.38 4.44-5.505L9.135 5.015zm10.62 0C16.14 6.723 13.8 9.97 13.8 13.665c0 2.79 1.845 4.86 4.26 4.86 2.205 0 3.93-1.755 3.93-3.885 0-2.04-1.365-3.6-3.18-3.885.48-2.295 2.175-4.38 4.44-5.505l-3.495-.235z" />
    </svg>
  );
}

export function TestimonialsSection() {
  const { t } = useI18n();

  const shuffled = useMemo(
    () => [...t.testimonials].sort(() => Math.random() - 0.5),
    [t.testimonials]
  );

  const items = [...shuffled, ...shuffled];

  return (
    <section className="section-spacing border-y border-border/50 bg-muted/10">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.ui.testimonials.badge}
          title={t.ui.testimonials.title}
          align="left"
        />
      </div>

      <div className="mt-12 overflow-hidden py-4">
        <div className="flex items-stretch gap-6 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none motion-reduce:scrollbar-hide animate-marquee hover:paused">
          {items.map((item, index) => (
            <blockquote
              key={`${item.name}-${index}`}
              className="group relative flex w-[440px] shrink-0 flex-col justify-between rounded-2xl border border-border/60 bg-card p-8 pt-10 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            >
              <div>
                <QuoteIcon className="mb-3 size-7 text-primary/80" />
                <p className="text-pretty text-lg leading-relaxed text-foreground/85 md:text-xl">
                  {item.testimonial}
                </p>
              </div>
              <footer className="mt-8 flex items-center gap-4 border-t border-border/40 pt-6">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="size-14 shrink-0 rounded-full border-2 border-primary/20 object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 text-base font-bold text-primary transition-transform duration-300 motion-safe:group-hover:scale-105">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <cite className="block truncate not-italic font-semibold text-foreground">
                    {item.name}
                  </cite>
                  {item.title && (
                    <p className="truncate text-sm text-muted-foreground">
                      {item.title}
                    </p>
                  )}
                </div>
                {(item.twitter || item.linkedin) && (
                  <div className="flex shrink-0 items-center gap-2">
                    {item.twitter && (
                      <a
                        href={item.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.name} on X`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-primary hover:text-primary hover:opacity-100"
                      >
                        <XIcon className="size-4" />
                      </a>
                    )}
                    {item.linkedin && (
                      <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.name} on LinkedIn`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-primary hover:text-primary hover:opacity-100"
                      >
                        <LinkedinIcon className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
