import { useNavigate } from "@tanstack/react-router";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { cn } from "@/lib/utils";

type HackathonGroupsSearch = {
  status?: string;
};

interface HackathonGroupsFiltersProps {
  search: HackathonGroupsSearch;
  className?: string;
}

const statusOptions = [
  { value: "shipped", label: "Shipped" },
  { value: "in_progress", label: "In progress" },
  { value: "concept", label: "Concept" },
] as const;

export function HackathonGroupsFilters({
  search,
  className,
}: HackathonGroupsFiltersProps) {
  const navigate = useNavigate();

  const updateFilter = (status: string | undefined) => {
    navigate({
      to: "/hackathon-groups",
      search: {
        status,
      },
      replace: true,
    });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-xs font-medium uppercase text-muted-foreground">
        Status
      </span>
      {statusOptions.map((option) => (
        <ToggleChip
          key={option.value}
          label={option.label}
          selected={search.status === option.value}
          onToggle={() =>
            updateFilter(search.status === option.value ? undefined : option.value)
          }
        />
      ))}
    </div>
  );
}
