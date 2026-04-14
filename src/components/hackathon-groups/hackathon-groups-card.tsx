import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  shipped: "Shipped",
  in_progress: "In progress",
  concept: "Concept",
};

const CARD_BASE =
  "overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-lg shadow-black/5 transition-all duration-200 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5";

export type HackathonGroupsCardEntry = {
  _id: string;
  slug: string;
  groupName: string;
  title: string;
  tagline: string;
  coverImageUrl: string;
  status: "shipped" | "in_progress" | "concept";
  author: {
    name: string;
    slug: string;
    avatarUrl?: string;
  } | null;
};

interface HackathonGroupsCardProps {
  entry: HackathonGroupsCardEntry;
}

export function HackathonGroupsCard({ entry }: HackathonGroupsCardProps) {
  return (
    <Link
      to="/hackathon-groups/$slug"
      params={{ slug: entry.slug }}
      className={cn(CARD_BASE, "block")}
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
        <img src={entry.coverImageUrl} alt="" className="size-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {entry.groupName}
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              entry.status === "shipped" &&
                "bg-green-500/10 text-green-600 dark:text-green-400",
              entry.status === "in_progress" &&
                "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              entry.status === "concept" && "bg-muted text-muted-foreground"
            )}
          >
            {STATUS_LABELS[entry.status] ?? entry.status}
          </span>
        </div>
        <h3 className="line-clamp-2 text-balance text-lg font-medium leading-tight">
          {entry.title}
        </h3>
        <p className="line-clamp-2 text-pretty text-sm text-muted-foreground">
          {entry.tagline}
        </p>
        {entry.author && (
          <div className="flex items-center gap-2 pt-1">
            <div className="flex size-7 shrink-0 overflow-hidden rounded-full bg-muted">
              {entry.author.avatarUrl ? (
                <img src={entry.author.avatarUrl} alt="" className="size-full object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                  {entry.author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">{entry.author.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
