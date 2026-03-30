import { createFileRoute } from "@tanstack/react-router";
import { WipPage } from "@/components/wip-page";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/events/$slug")({
  head: ({ params }) => {
    const { meta, links } = buildSeoMeta({
      path: `/events/${params.slug}`,
      title: seoCopyEs.eventDetail.title,
      description: seoCopyEs.eventDetail.description,
      noIndex: true,
    });
    return { meta, links };
  },
  component: EventDetailWipPage,
});

function EventDetailWipPage() {
  const { t } = useI18n();
  return (
    <WipPage
      comingSoon={t.wip.comingSoon}
      title={t.wip.underConstruction}
      description={t.events.detailWip}
      backLabel={t.ui.linksPage.home}
    />
  );
}
