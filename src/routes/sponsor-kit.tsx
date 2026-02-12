import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sponsor-kit")({
  component: SponsorKit,
});

function SponsorKit() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in">
        <main className="pt-24">
        <section className="py-20 md:py-32 container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 border-primary/20 text-primary bg-primary/5">
              {t.sponsorKit.title}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] text-balance mb-8">
              {t.sponsorKit.subtitle}
            </h1>
            <ul className="space-y-4 mb-10">
              {t.sponsorKit.valueProp.map((prop) => (
                <li key={prop} className="flex items-start gap-3 text-xl md:text-2xl text-muted-foreground">
                  <HugeiconsIcon icon={Tick02Icon} className="size-6 text-primary mt-1 shrink-0" />
                  <span className="text-pretty">{prop}</span>
                </li>
              ))}
            </ul>
            
            <div className="grid grid-cols-3 gap-8 p-6 bg-muted/30 rounded-2xl border border-border/50 max-w-2xl">
              <div>
                <div className="text-3xl font-bold tabular-nums">{t.stats.members}</div>
                <div className="text-xs text-muted-foreground uppercase font-medium">{t.ui.stats.members}</div>
              </div>
              <div>
                <div className="text-3xl font-bold tabular-nums">{t.stats.eventsHeld}</div>
                <div className="text-xs text-muted-foreground uppercase font-medium">{t.ui.stats.events}</div>
              </div>
              <div>
                <div className="text-3xl font-bold tabular-nums">{t.stats.partners}</div>
                <div className="text-xs text-muted-foreground uppercase font-medium">{t.ui.stats.partners}</div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-20 container mx-auto px-4 bg-muted/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sponsorKit.audienceTitle}</h2>
            <p className="text-xl text-muted-foreground text-pretty mb-12">
              {t.sponsorKit.audienceDescription}
            </p>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">{t.sponsorKit.packagesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.sponsorKit.packages.map((pkg, i) => (
              <Card key={pkg.name} className={`flex flex-col ${i === 1 ? 'border-primary shadow-lg scale-105 z-10' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  {pkg.price && <CardDescription className="text-lg font-semibold text-primary">{pkg.price}</CardDescription>}
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <HugeiconsIcon icon={Tick02Icon} className="size-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a
                    href={`mailto:${t.partner.email}?subject=Sponsorship: ${pkg.name}`}
                    className={cn(
                      buttonVariants({ variant: i === 1 ? "default" : "outline" }),
                      "w-full"
                    )}
                  >
                    {t.sponsorKit.contactCta}
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 container mx-auto px-4 text-center bg-primary/5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sponsorKit.contactTitle}</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              {t.sponsorKit.contactDescription}
            </p>
            <a
              href={`mailto:${t.partner.email}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 rounded-full px-8 text-lg"
              )}
            >
              {t.partner.cta}
              <HugeiconsIcon icon={ArrowRightIcon} className="ml-2 size-5" />
            </a>
          </div>
        </section>
      </main>

        <SiteFooter />
      </div>
    </>
  );
}
