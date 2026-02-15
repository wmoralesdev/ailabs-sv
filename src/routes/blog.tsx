import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { WipPage } from "@/components/wip-page";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

function BlogPage() {
  const { t } = useI18n();
  return (
    <WipPage
      comingSoon={t.wip.comingSoon}
      title={t.wip.underConstruction}
      description={t.blog.wipDescription}
      backLabel={t.ui.backToHome}
    />
  );
}
