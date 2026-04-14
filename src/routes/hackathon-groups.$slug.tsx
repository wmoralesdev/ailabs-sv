import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { HackathonGroupsDetail } from "@/components/hackathon-groups/hackathon-groups-detail";
import { Spinner } from "@/components/ui/spinner";
import { createConvexHttpClient } from "@/lib/convex-http";
import { buildSeoMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/hackathon-groups/$slug")({
  loader: async ({ params }) => {
    const client = createConvexHttpClient();
    const seo = await client.query(api.hackathon_groups.getHackathonGroupSeoBySlug, {
      slug: params.slug,
    });
    return { seo };
  },
  head: ({ loaderData, params }) => {
    const seo = loaderData?.seo;
    const path = `/hackathon-groups/${params.slug}`;
    const title = seo
      ? `${seo.title} | Ai /abs Hackathon Groups`
      : `${params.slug} | Ai /abs Hackathon Groups`;
    const description =
      seo?.description ?? "Proyecto de grupo compartido durante sesión de hackathon.";
    const { meta, links } = buildSeoMeta({
      path,
      title,
      description,
      imageUrl: seo?.imageUrl,
      imageAlt: seo ? `${seo.title} — Hackathon Groups` : title,
      ogType: "article",
    });
    return { meta, links };
  },
  component: HackathonGroupDetailPage,
});

function HackathonGroupDetailPage() {
  const { slug } = Route.useParams();
  const entry = useQuery(api.hackathon_groups.getBySlug, { slug });

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
        <h1 className="text-balance text-2xl font-medium text-foreground">
          Group project not found
        </h1>
        <p className="max-w-md text-pretty text-muted-foreground">
          No hackathon group project with that slug exists.
        </p>
        <Link
          to="/hackathon-groups"
          search={{ status: undefined }}
          className="rounded-lg border border-border bg-transparent px-6 py-2 font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-accent/50"
        >
          Back to hackathon groups
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <HackathonGroupsDetail entry={entry} />
    </div>
  );
}
