import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { ShowcaseDetail } from "@/components/showcase/showcase-detail";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/showcase/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} | ailabs.sv Showcase` },
    ],
  }),
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
          to="/feed"
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
