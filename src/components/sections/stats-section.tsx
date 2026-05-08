import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { SectionHeader } from '@/components/section-header'
import { cn } from '@/lib/utils'

function useCountUp(value: string, enabled: boolean, duration = 1000): string {
  const [display, setDisplay] = useState(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!enabled) {
      setDisplay(value)
      return
    }
    if (hasAnimated.current) return

    const match = value.match(/^(\d+)(\+?)$/)
    if (!match) {
      setDisplay(value)
      hasAnimated.current = true
      return
    }

    hasAnimated.current = true
    const target = parseInt(match[1], 10)
    const suffix = match[2] || ''

    setDisplay(`0${suffix}`)
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      const current = Math.floor(eased * target)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value, enabled, duration])

  return display
}

function StatCell({
  value,
  label,
  badge,
  animate,
}: {
  value: string
  label: string
  badge?: string
  animate: boolean
}) {
  const display = useCountUp(value, animate, 1000)

  return (
    <div className="interactive-lift border-border/70 bg-background/55 flex min-w-0 flex-col items-start justify-between gap-4 rounded-2xl border p-5 text-left">
      <div className="flex w-full max-w-full flex-wrap items-baseline justify-start gap-2">
        <span className="text-foreground font-mono text-3xl leading-none font-semibold tracking-[-0.04em] tabular-nums md:text-4xl">
          {display}
        </span>
        {badge ? (
          <span className="border-primary/20 bg-primary/10 text-primary rounded-full border px-2 py-0.5 font-mono text-[0.68rem] font-semibold">
            {badge}
          </span>
        ) : null}
      </div>
      <span className="eyebrow-label text-muted-foreground">{label}</span>
    </div>
  )
}

export function StatsSection() {
  const { t } = useI18n()
  const [hasEntered, setHasEntered] = useState(false)
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) {
      setHasEntered(true)
      setAnimate(false)
      return
    }

    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasEntered(true)
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      value: t.stats.members,
      label: t.ui.stats.membersDetail,
      badge: t.stats.membersBadge,
    },
    {
      value: t.stats.eventsHeld,
      label: t.ui.stats.eventsDetail,
    },
    {
      value: t.stats.partners,
      label: t.ui.stats.partnersDetail,
    },
  ]

  return (
    <section ref={sectionRef} className="section-spacing">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.ui.stats.badge}
          title={t.ui.stats.sectionTitle}
          description={t.ui.stats.sectionDesc}
          align="left"
        />
        <div
          className={cn(
            'reveal-on-scroll grid grid-cols-1 gap-3 sm:grid-cols-3',
            hasEntered && 'is-visible',
          )}
        >
          {stats.map((stat) => (
            <StatCell
              key={stat.label}
              value={stat.value}
              label={stat.label}
              badge={stat.badge}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
