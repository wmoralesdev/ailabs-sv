import { useNavigate } from "@tanstack/react-router";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { toolIcons } from "@/components/onboarding/tool-icons";
import { TOOL_IDS } from "@/content/onboarding-interest-ids";
import { idsToLabels } from "@/lib/onboarding-interests";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "shipped", label: "Shipped" },
  { value: "in_progress", label: "In progress" },
  { value: "concept", label: "Concept" },
] as const;

type ShowcaseSearch = {
  event?: string;
  tool?: string;
  status?: string;
};

interface ShowcaseFiltersProps {
  search: ShowcaseSearch;
  eventOptions?: string[];
  className?: string;
}

export function ShowcaseFilters({
  search,
  eventOptions = [],
  className,
}: ShowcaseFiltersProps) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const toolLabels = idsToLabels(TOOL_IDS as unknown as string[], t.onboarding.interests.tools);

  const updateFilter = (key: keyof ShowcaseSearch, value: string | undefined) => {
    const next = { ...search };
    if (value) next[key] = value;
    else delete next[key];
    navigate({
      to: "/feed",
      search: {
        event: next.event ?? undefined,
        tool: next.tool ?? undefined,
        status: next.status ?? undefined,
      },
      replace: true,
    });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Status
      </span>
      {STATUS_OPTIONS.map((opt) => (
        <ToggleChip
          key={opt.value}
          label={opt.label}
          selected={search.status === opt.value}
          onToggle={() =>
            updateFilter("status", search.status === opt.value ? undefined : opt.value)
          }
        />
      ))}
      <span className="ml-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Tools
      </span>
      {TOOL_IDS.slice(0, 8).map((id, i) => {
        const label = toolLabels[i] ?? String(id);
        const icon = toolIcons[id];
        return (
          <ToggleChip
            key={id}
            label={label}
            selected={search.tool === id}
            onToggle={() =>
              updateFilter("tool", search.tool === id ? undefined : id)
            }
            icon={icon}
          />
        );
      })}
      {eventOptions.length > 0 && (
        <>
          <span className="ml-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Event
          </span>
          {eventOptions.map((ev) => (
            <ToggleChip
              key={ev}
              label={ev}
              selected={search.event === ev}
              onToggle={() =>
                updateFilter("event", search.event === ev ? undefined : ev)
              }
            />
          ))}
        </>
      )}
    </div>
  );
}
