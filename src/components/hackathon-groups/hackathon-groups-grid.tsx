import { useQuery } from "convex/react";
import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon, RocketIcon } from "@hugeicons/core-free-icons";
import { api } from "convex/_generated/api";
import { HackathonGroupsCard } from "./hackathon-groups-card";
import { HackathonGroupsFilters } from "./hackathon-groups-filters";
import { useAuthState } from "@/components/auth/auth-context";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type HackathonGroupsSearch = {
  status?: string;
};

interface HackathonGroupsGridProps {
  search: HackathonGroupsSearch;
  className?: string;
}

export function HackathonGroupsGrid({
  search,
  className,
}: HackathonGroupsGridProps) {
  const { isAuthenticated } = useAuthState();
  const result = useQuery(api.hackathon_groups.list, {
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

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <HackathonGroupsFilters search={search} />

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/10 px-6 py-20 text-center md:px-12">
          <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
            <HugeiconsIcon icon={RocketIcon} size={32} className="text-primary" />
          </div>
          <h2 className="mb-2 text-balance text-xl font-medium text-foreground md:text-2xl">
            No hay proyectos de grupos aún
          </h2>
          <p className="mb-8 max-w-md text-pretty text-sm text-muted-foreground md:text-base">
            Inicia tu sesión de hackathon y sube el primer proyecto de tu grupo.
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Link
                to="/hackathon-groups/submit"
                search={{ edit: undefined }}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:shadow-primary/25 sm:flex-initial sm:min-w-[220px]"
              >
                Subir proyecto de grupo
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </Link>
            ) : (
              <Link
                to="/sign-in"
                search={{ returnTo: "/hackathon-groups" }}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:shadow-primary/25 sm:flex-initial sm:min-w-[220px]"
              >
                Iniciar sesión
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((entry) => (
              <HackathonGroupsCard key={entry._id} entry={entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
