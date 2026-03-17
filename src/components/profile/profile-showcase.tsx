import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { RocketIcon } from "@hugeicons/core-free-icons";
import { ShowcaseCard } from "@/components/showcase/showcase-card";
import { useI18n } from "@/lib/i18n";

interface ProfileShowcaseProps {
  ownerId: string;
  isOwner?: boolean;
}

export function ProfileShowcase({ ownerId, isOwner }: ProfileShowcaseProps) {
  const { t } = useI18n();
  const entries = useQuery(api.showcase.listByOwner, { ownerId, limit: 6 });

  if (entries === undefined) return null;
  if (entries.length === 0) {
    if (isOwner) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 px-8 py-12 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted/50">
            <HugeiconsIcon
              icon={RocketIcon}
              size={28}
              className="text-muted-foreground"
            />
          </div>
          <p className="mb-1 text-base font-medium text-foreground">
            {t.profile?.showcaseEmpty ?? "You haven't submitted any projects yet."}
          </p>
          <p className="mb-6 text-sm text-muted-foreground">
            {t.profile?.showcaseEmptySubtext ??
              "Share what you're building with the community."}
          </p>
          <Link
            to="/showcase/submit"
            search={{ edit: undefined }}
            className="inline-flex items-center justify-center rounded-lg border border-primary bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            {t.ui?.header?.submitProject ?? "Submit project"}
          </Link>
        </div>
      );
    }
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {t.profile?.projects ?? "Projects"}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <ShowcaseCard
            key={entry._id}
            entry={{
              _id: entry._id,
              slug: entry.slug,
              title: entry.title,
              tagline: entry.tagline,
              coverImageUrl: entry.coverImageUrl,
              event: entry.event,
              toolsUsed: entry.toolsUsed,
              status: entry.status,
              author: entry.author,
            }}
          />
        ))}
      </div>
    </section>
  );
}
