import { useNavigate } from '@tanstack/react-router'
import { ToggleChip } from '@/components/ui/toggle-chip'
import { toolIcons } from '@/components/onboarding/tool-icons'
import { TOOL_IDS } from '@/content/onboarding-interest-ids'
import { idsToLabels } from '@/lib/onboarding-interests'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type ShowcaseSearch = {
  event?: string
  tool?: string
  status?: string
}

interface ShowcaseFiltersProps {
  search: ShowcaseSearch
  eventOptions?: Array<string>
  className?: string
}

export function ShowcaseFilters({
  search,
  eventOptions = [],
  className,
}: ShowcaseFiltersProps) {
  const navigate = useNavigate()
  const { t } = useI18n()
  const L = t.showcaseList
  const toolLabels = idsToLabels(
    TOOL_IDS as unknown as Array<string>,
    t.onboarding.interests.tools,
  )

  const statusOptions = [
    { value: 'shipped' as const, label: L.statusShipped },
    { value: 'in_progress' as const, label: L.statusInProgress },
    { value: 'concept' as const, label: L.statusConcept },
  ]

  const updateFilter = (
    key: keyof ShowcaseSearch,
    value: string | undefined,
  ) => {
    const next = { ...search }
    if (value) next[key] = value
    else delete next[key]
    navigate({
      to: '/showcase',
      search: {
        event: next.event ?? undefined,
        tool: next.tool ?? undefined,
        status: next.status ?? undefined,
      },
      replace: true,
    })
  }

  return (
    <div
      className={cn('flex flex-wrap items-center gap-x-2 gap-y-3', className)}
    >
      <span className="eyebrow-label text-muted-foreground mr-1">
        {L.filterStatusLabel}
      </span>
      {statusOptions.map((opt) => (
        <ToggleChip
          key={opt.value}
          label={opt.label}
          selected={search.status === opt.value}
          onToggle={() =>
            updateFilter(
              'status',
              search.status === opt.value ? undefined : opt.value,
            )
          }
        />
      ))}
      <span className="eyebrow-label text-muted-foreground mr-1 ml-2">
        {L.filterToolsLabel}
      </span>
      {TOOL_IDS.slice(0, 8).map((id, i) => {
        const label = toolLabels[i] ?? String(id)
        const icon = toolIcons[id]
        return (
          <ToggleChip
            key={id}
            label={label}
            selected={search.tool === id}
            onToggle={() =>
              updateFilter('tool', search.tool === id ? undefined : id)
            }
            icon={icon}
          />
        )
      })}
      {eventOptions.length > 0 && (
        <>
          <span className="eyebrow-label text-muted-foreground mr-1 ml-2">
            {L.filterEventLabel}
          </span>
          {eventOptions.map((ev) => (
            <ToggleChip
              key={ev}
              label={ev}
              selected={search.event === ev}
              onToggle={() =>
                updateFilter('event', search.event === ev ? undefined : ev)
              }
            />
          ))}
        </>
      )}
    </div>
  )
}
