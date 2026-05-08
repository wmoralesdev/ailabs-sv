import { ArrowRightIcon, SparklesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { AnimatedGrid } from '@/components/ui/animated-grid'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type HeroAction = {
  label: ReactNode
  render: ReactElement
  variant?: ComponentProps<typeof Button>['variant']
  showArrow?: boolean
}

type ProofCard = {
  eyebrow: ReactNode
  title: ReactNode
  items: Array<{
    value: ReactNode
    label: ReactNode
  }>
}

interface InnerPageHeroProps {
  id?: string
  badge?: ReactNode
  headlineLine1: ReactNode
  headlinePhrases: Array<string>
  subheadline: ReactNode
  note?: ReactNode
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  proofCard?: ProofCard
  aside?: ReactNode
  variant?: 'default' | 'compact'
  className?: string
}

export function InnerPageHero({
  id = 'overview',
  badge,
  headlineLine1,
  headlinePhrases,
  subheadline,
  note,
  primaryAction,
  secondaryAction,
  proofCard,
  aside,
  variant = 'default',
  className,
}: InnerPageHeroProps) {
  const actions = [primaryAction, secondaryAction].filter(
    Boolean,
  ) as Array<HeroAction>
  const asideContent =
    aside ?? (proofCard ? <ProofCardAside proofCard={proofCard} /> : null)

  return (
    <section
      id={id}
      className={cn(
        'border-border relative flex items-center overflow-hidden border-b pt-28 pb-14 md:pt-28 md:pb-16',
        variant === 'default' ? 'min-h-dvh' : 'min-h-[68vh]',
        className,
      )}
    >
      <AnimatedGrid className="opacity-70" />
      <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-80" />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t to-transparent" />

      <div
        className={cn(
          'relative z-10 container mx-auto grid items-center gap-8 px-6 lg:gap-12',
          asideContent
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.58fr)]'
            : 'lg:grid-cols-1',
        )}
      >
        <div className="max-w-3xl text-left">
          {badge ? (
            <div className="border-primary/25 bg-primary/10 motion-safe:animate-hero-in mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 shadow-sm backdrop-blur [animation-delay:80ms]">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
              </span>
              <span className="eyebrow-label text-foreground/80">{badge}</span>
            </div>
          ) : null}

          <h1 className="text-display-hero motion-safe:animate-hero-in mb-7 font-medium [animation-delay:140ms]">
            <span className="text-foreground block max-w-4xl">
              {headlineLine1}
            </span>
            <span className="text-primary block">
              {headlinePhrases[0]}
            </span>
          </h1>

          <p className="text-body-lead text-foreground/65 motion-safe:animate-hero-in mb-8 max-w-2xl font-light text-pretty [animation-delay:220ms]">
            {subheadline}
          </p>

          {actions.length > 0 ? (
            <div className="motion-safe:animate-hero-in flex flex-col items-start gap-4 [animation-delay:300ms] sm:flex-row">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={
                    action.variant ?? (index === 0 ? 'default' : 'outline')
                  }
                  size="2xl"
                  className={cn(
                    'w-full rounded-full px-6 sm:w-auto',
                    (action.variant ??
                      (index === 0 ? 'default' : 'outline')) === 'outline' &&
                      'border-border/70 bg-background/65 backdrop-blur',
                  )}
                  render={action.render}
                >
                  {action.label}
                  {action.showArrow === false ? null : (
                    <HugeiconsIcon
                      icon={ArrowRightIcon}
                      size={18}
                      data-icon="inline-end"
                    />
                  )}
                </Button>
              ))}
            </div>
          ) : null}

          {note ? (
            <p className="text-muted-foreground motion-safe:animate-hero-in mt-6 text-sm font-light [animation-delay:380ms]">
              {note}
            </p>
          ) : null}
        </div>

        {asideContent}
      </div>
    </section>
  )
}

function ProofCardAside({ proofCard }: { proofCard: ProofCard }) {
  return (
    <aside className="interactive-lift border-border/70 bg-background/55 motion-safe:animate-hero-in hidden rounded-[1.35rem] border p-4 backdrop-blur [animation-delay:220ms] md:block">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow-label text-primary mb-2">{proofCard.eyebrow}</p>
          <h2 className="text-foreground font-display max-w-xs text-xl leading-none font-medium tracking-[-0.04em] md:text-2xl">
            {proofCard.title}
          </h2>
        </div>
        <span className="border-primary/20 bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full border">
          <HugeiconsIcon icon={SparklesIcon} size={18} />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {proofCard.items.map((stat) => (
          <div
            key={`${stat.value}-${stat.label}`}
            className="border-border/70 bg-card/75 rounded-2xl border p-3.5"
          >
            <p className="text-foreground font-mono text-xl font-semibold tabular-nums">
              {stat.value}
            </p>
            <p className="text-muted-foreground mt-1 text-xs leading-snug font-medium tracking-[0.12em] uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </aside>
  )
}
