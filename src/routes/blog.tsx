import { createFileRoute } from "@tanstack/react-router";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";
import { useI18n } from "@/lib/i18n";
import { WipPage } from "@/components/wip-page";

export const Route = createFileRoute("/blog")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/blog",
      title: seoCopyEs.blog.title,
      description: seoCopyEs.blog.description,
      noIndex: true,
    });
    return { meta, links };
  },
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
