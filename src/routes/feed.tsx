import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { WipPage } from "@/components/wip-page";

export const Route = createFileRoute("/feed")({
  component: FeedPage,
});

function FeedPage() {
  const { t } = useI18n();
  return (
    <WipPage
      comingSoon={t.wip.comingSoon}
      title={t.wip.underConstruction}
      description={t.feed.wipDescription}
      backLabel={t.ui.backToHome}
    />
  );
}
