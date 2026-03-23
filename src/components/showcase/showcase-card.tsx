import { Link } from "@tanstack/react-router";
import { DisplayChip } from "@/components/ui/toggle-chip";
import { toolIcons } from "@/components/onboarding/tool-icons";
import { idsToLabels } from "@/lib/onboarding-interests";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const CARD_BASE =
  "rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 overflow-hidden";

const STATUS_LABELS: Record<string, string> = {
  shipped: "Shipped",
  in_progress: "In progress",
  concept: "Concept",
};

export type ShowcaseCardEntry = {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  coverImageUrl: string;
  event?: string;
  toolsUsed?: Array<string>;
  status: "shipped" | "in_progress" | "concept";
  author: {
    name: string;
    slug: string;
    avatarUrl?: string;
  } | null;
};

interface ShowcaseCardProps {
  entry: ShowcaseCardEntry;
  featured?: boolean;
}

export function ShowcaseCard({ entry, featured }: ShowcaseCardProps) {
  const { t } = useI18n();
  const toolsLabels = idsToLabels(
    entry.toolsUsed ?? [],
    t.onboarding.interests.tools
  );

  return (
    <Link
      to="/showcase/$slug"
      params={{ slug: entry.slug }}
      className={cn(
        CARD_BASE,
        "block",
        featured && "ring-2 ring-primary/30"
      )}
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={entry.coverImageUrl}
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-medium leading-tight">
            {entry.title}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
              entry.status === "shipped" && "bg-green-500/10 text-green-600 dark:text-green-400",
              entry.status === "in_progress" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              entry.status === "concept" && "bg-muted text-muted-foreground"
            )}
          >
            {STATUS_LABELS[entry.status] ?? entry.status}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {entry.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {toolsLabels.slice(0, 4).map((label, i) => {
            const toolId = entry.toolsUsed?.[i];
            const icon = toolId ? toolIcons[toolId] : undefined;
            return (
              <DisplayChip key={label} label={label} icon={icon} />
            );
          })}
          {entry.toolsUsed && entry.toolsUsed.length > 4 && (
            <DisplayChip label={`+${entry.toolsUsed.length - 4}`} />
          )}
        </div>
        {entry.event && (
          <span className="text-xs text-muted-foreground">{entry.event}</span>
        )}
        {entry.author && (
          <div className="flex items-center gap-2 pt-1">
            <div className="flex size-7 shrink-0 overflow-hidden rounded-full bg-muted">
              {entry.author.avatarUrl ? (
                <img
                  src={entry.author.avatarUrl}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                  {entry.author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">
              {entry.author.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
