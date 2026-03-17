import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { ShowcaseCard, type ShowcaseCardEntry } from "./showcase-card";
import { ShowcaseFilters } from "./showcase-filters";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type ShowcaseSearch = {
  event?: string;
  tool?: string;
  status?: string;
};

interface ShowcaseGridProps {
  search: ShowcaseSearch;
  className?: string;
}

export function ShowcaseGrid({ search, className }: ShowcaseGridProps) {
  const result = useQuery(api.showcase.list, {
    event: search.event,
    tool: search.tool,
    status: search.status as "shipped" | "in_progress" | "concept" | undefined,
    limit: 24,
  });

  if (result === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const items = result.items;
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);

  const eventOptions = [...new Set(items.map((i) => i.event).filter(Boolean))] as string[];

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <ShowcaseFilters
        search={search}
        eventOptions={eventOptions}
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 py-16 text-center">
          <p className="text-muted-foreground">
            No projects yet. Be the first to submit one.
          </p>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Featured
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((entry) => (
                  <ShowcaseCard
                    key={entry._id}
                    entry={toCardEntry(entry)}
                    featured
                  />
                ))}
              </div>
            </section>
          )}
          <section>
            {featured.length > 0 && (
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                All projects
              </h2>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((entry) => (
                <ShowcaseCard key={entry._id} entry={toCardEntry(entry)} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function toCardEntry(item: {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  coverImageUrl: string;
  event?: string;
  toolsUsed?: string[];
  status: "shipped" | "in_progress" | "concept";
  author: { name: string; slug: string; avatarUrl?: string } | null;
}): ShowcaseCardEntry {
  return {
    _id: item._id,
    slug: item.slug,
    title: item.title,
    tagline: item.tagline,
    coverImageUrl: item.coverImageUrl,
    event: item.event,
    toolsUsed: item.toolsUsed,
    status: item.status,
    author: item.author,
  };
}
