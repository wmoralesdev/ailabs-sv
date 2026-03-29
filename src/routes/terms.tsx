import { createFileRoute } from "@tanstack/react-router";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";
import { useI18n } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatWithBrandText } from "@/components/brand-text";

export const Route = createFileRoute("/terms")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/terms",
      title: seoCopyEs.terms.title,
      description: seoCopyEs.terms.description,
    });
    return { meta, links };
  },
  component: TermsPage,
});

function TermsPage() {
  const { t } = useI18n();
  const terms = t.terms;

  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">{terms.title}</h1>
          <p className="text-sm text-muted-foreground mb-12">{terms.lastUpdated}</p>
          <div className="prose prose-invert max-w-none space-y-10">
            {terms.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{formatWithBrandText(section.body)}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
