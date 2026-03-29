import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { ShowcaseDetail } from "@/components/showcase/showcase-detail";
import { Spinner } from "@/components/ui/spinner";
import { createConvexHttpClient } from "@/lib/convex-http";
import { buildSeoMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/showcase/$slug")({
  loader: async ({ params }) => {
    const client = createConvexHttpClient();
    const seo = await client.query(api.showcase.getShowcaseSeoBySlug, {
      slug: params.slug,
    });
    return { seo };
  },
  head: ({ loaderData, params }) => {
    const seo = loaderData?.seo;
    const path = `/showcase/${params.slug}`;
    const title = seo
      ? `${seo.title} | Ai /abs Showcase`
      : `${params.slug} | Ai /abs Showcase`;
    const description =
      seo?.description ??
      "Proyecto y experimento compartido por la comunidad Ai /abs.";
    const { meta, links } = buildSeoMeta({
      path,
      title,
      description,
      imageUrl: seo?.imageUrl,
      imageAlt: seo ? `${seo.title} — Showcase Ai /abs` : title,
      ogType: "article",
    });
    return { meta, links };
  },
  component: ShowcaseDetailPage,
});

function ShowcaseDetailPage() {
  const { slug } = Route.useParams();
  const entry = useQuery(api.showcase.getBySlug, { slug });

  if (entry === undefined) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (entry === null) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-medium text-foreground">
          Project not found
        </h1>
        <p className="max-w-md text-muted-foreground">
          No showcase entry with that slug exists.
        </p>
        <Link
          to="/showcase"
          search={{ event: undefined, tool: undefined, status: undefined }}
          className="rounded-lg border border-border bg-transparent px-6 py-2 font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent/50"
        >
          Back to showcase
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-6">
      <ShowcaseDetail entry={entry} />
    </div>
  );
}
