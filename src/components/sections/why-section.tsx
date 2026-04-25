import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function WhySection() {
  const { t } = useI18n();

  return (
    <section className="section-editorial py-20 md:py-28">
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl">
          <SectionHeader
            eyebrow={t.why.badge}
            title={t.why.heading}
            description={t.why.subtext}
            align="left"
            size="lg"
            className="[&_p:last-child]:max-w-3xl"
          />
        </div>
      </div>
    </section>
  );
}
