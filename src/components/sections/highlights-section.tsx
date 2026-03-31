import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  CURSOR_PARTNER_IMG,
  V0_PARTNER_IMG,
  partnerRasterMarkClasses,
} from "@/lib/partner-image-paths";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
            const linkProps = {
              href: partner.url,
              target: "_blank" as const,
              rel: "noopener noreferrer",
              "aria-label": partner.name,
              className:
                "group flex items-center grayscale text-muted-foreground transition-all duration-300 hover:grayscale-0 hover:text-primary",
            };

            if (partner.name === "Cursor") {
              return (
                <a key={partner.name} {...linkProps}>
                  <img
                    src={CURSOR_PARTNER_IMG.light}
                    alt=""
                    aria-hidden
                    className={cn(
                      partnerRasterMarkClasses.base,
                      partnerRasterMarkClasses.cursorLight,
                    )}
                  />
                  <img
                    src={CURSOR_PARTNER_IMG.dark}
                    alt=""
                    aria-hidden
                    className={cn(
                      partnerRasterMarkClasses.base,
                      partnerRasterMarkClasses.cursorDark,
                    )}
                  />
                </a>
              );
            }

            if (partner.name === "v0") {
              return (
                <a key={partner.name} {...linkProps}>
                  <img
                    src={V0_PARTNER_IMG.light}
                    alt=""
                    aria-hidden
                    className={cn(
                      partnerRasterMarkClasses.base,
                      partnerRasterMarkClasses.v0Light,
                    )}
                  />
                  <img
                    src={V0_PARTNER_IMG.dark}
                    alt=""
                    aria-hidden
                    className={cn(
                      partnerRasterMarkClasses.base,
                      partnerRasterMarkClasses.v0Dark,
                    )}
                  />
                </a>
              );
            }

            return (
              <a key={partner.name} {...linkProps}>
                <span className="text-lg font-semibold opacity-80 transition-opacity group-hover:opacity-100 md:text-xl">
                  {partner.name}
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outlinePrimary"
            size="lg"
            render={<Link to="/partners" />}
          >
            {t.ecosystem.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
