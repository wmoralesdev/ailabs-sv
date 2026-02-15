import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Convex } from "@/components/ui/svgs/convex";
import { CursorLight } from "@/components/ui/svgs/cursor-light";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Vercel } from "@/components/ui/svgs/vercel";
import { V0Light } from "@/components/ui/svgs/v0-light";

const PARTNER_ICONS: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Cursor: CursorLight,
  Vercel,
  Supabase,
  Convex,
  v0: V0Light,
};

export function HighlightsSection() {
  const { t } = useI18n();

  return (
    <section
      id="partners"
      className="section-spacing relative overflow-hidden border-y border-border/50 bg-muted/25"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.ecosystem.label}
          title={t.ecosystem.heading}
          align="left"
        />
        <div className="mb-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {t.ecosystem.partners.map((partner) => {
            const Icon = PARTNER_ICONS[partner.name];
            return (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="group flex items-center grayscale text-muted-foreground transition-all duration-300 hover:grayscale-0 hover:text-primary"
              >
                {Icon ? (
                  <Icon
                    aria-hidden
                    className="size-10 opacity-80 transition-opacity group-hover:opacity-100 md:size-12"
                  />
                ) : (
                  <span className="text-lg font-semibold opacity-80 transition-opacity group-hover:opacity-100 md:text-xl">
                    {partner.name}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link
            to="/partners"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 rounded-full border-primary/20 px-6 text-sm text-primary hover:bg-primary/10 hover:border-primary/30"
            )}
          >
            {t.ecosystem.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
