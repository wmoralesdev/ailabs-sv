import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function WhySection() {
  const { t } = useI18n();

  return (
    <section className="section-spacing border-y border-border/50 bg-muted/10">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.why.badge}
          title={t.why.heading}
          description={t.why.subtext}
          align="center"
        />
      </div>
    </section>
  );
}
