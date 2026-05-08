import { ArrowRightIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { AudiencePath } from '@/content/strategy-content'
import { buttonVariants } from '@/components/ui/button'
import { StrategyLink } from '@/components/strategy-link'
import { cn } from '@/lib/utils'

type StrategyPathCardGridProps = {
  items: Array<AudiencePath>
  columns?: 'two' | 'three' | 'four'
}

export function StrategyPathCardGrid({
  items,
  columns = 'four',
}: StrategyPathCardGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 'two' && 'md:grid-cols-2',
        columns === 'four' && 'md:grid-cols-2 xl:grid-cols-4',
        columns === 'three' && 'md:grid-cols-3',
      )}
    >
      {items.map((item) => (
        <article
          key={item.title}
          className="editorial-card interactive-lift group relative flex min-h-[320px] flex-col overflow-hidden rounded-[1.75rem] p-6"
        >
          <div className="bg-primary/10 pointer-events-none absolute -top-16 -right-12 size-36 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <p className="eyebrow-label text-primary relative z-10 mb-5">
            {item.audience}
          </p>
          <h3 className="font-display text-foreground relative z-10 mb-4 text-2xl font-semibold tracking-tight">
            {item.title}
          </h3>
          <p className="text-muted-foreground relative z-10 text-sm leading-relaxed">
            {item.description}
          </p>
          <p className="border-primary/40 text-foreground/60 relative z-10 mt-5 border-l pl-3 text-xs font-medium tracking-[0.14em] uppercase">
            {item.proof}
          </p>
          <div className="relative z-10 mt-auto pt-7">
            <StrategyLink
              href={item.cta.href}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'xl' }),
                'bg-background/60 w-full justify-between rounded-full',
              )}
            >
              {item.cta.label}
              <HugeiconsIcon icon={ArrowRightIcon} className="size-4" />
            </StrategyLink>
          </div>
        </article>
      ))}
    </div>
  )
}
