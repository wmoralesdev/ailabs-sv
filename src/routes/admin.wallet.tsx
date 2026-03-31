import { createFileRoute } from "@tanstack/react-router";
import { AdminFounderPassPage } from "@/components/admin/admin-founder-pass-page";
import { buildSeoMeta } from "@/lib/seo-meta";
import { seoCopyEs } from "@/content/seo-copy";

export const Route = createFileRoute("/admin/wallet")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/admin/wallet",
      title: `${seoCopyEs.admin.title} · Wallet`,
      description: "Generate Apple Wallet founder ticket pass.",
      noIndex: true,
    });
    return { meta, links };
  },
  component: AdminFounderPassPage,
});
