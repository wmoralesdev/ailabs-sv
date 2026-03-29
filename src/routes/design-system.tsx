import { createFileRoute } from "@tanstack/react-router";
import { DesignSystemPage } from "@/components/design-system/design-system-page";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/design-system")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/design-system",
      title: seoCopyEs.designSystem.title,
      description: seoCopyEs.designSystem.description,
      noIndex: true,
    });
    return { meta, links };
  },
  component: DesignSystemRoute,
});

function DesignSystemRoute() {
  return <DesignSystemPage />;
}
