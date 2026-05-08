import {
  CalendarIcon,
  Location01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps } from 'react'
import { Badge } from '@/components/ui/badge'

type EventMetaStripProps = {
  date: string
  location: string
  type: string
  partner?: string | null
  tags?: Array<string>
}

export function EventMetaStrip({
  date,
  location,
  type,
  partner,
  tags = [],
}: EventMetaStripProps) {
  return (
    <div className="quiet-card grid gap-4 p-5 sm:grid-cols-3">
      <MetaItem icon={CalendarIcon} label="Fecha" value={date} />
      <MetaItem icon={Location01Icon} label="Lugar" value={location} />
      <MetaItem
        icon={UserGroupIcon}
        label="Formato"
        value={[type, partner].filter(Boolean).join(' · ')}
      />
      {tags.length > 0 ? (
        <div className="border-border/60 flex flex-wrap gap-2 border-t pt-4 sm:col-span-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full">
              #{tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: ComponentProps<typeof HugeiconsIcon>['icon']
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <span className="border-primary/20 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-2xl border">
        <HugeiconsIcon icon={icon} className="size-5" />
      </span>
      <div>
        <p className="eyebrow-label text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground text-sm leading-relaxed">{value}</p>
      </div>
    </div>
  )
}
