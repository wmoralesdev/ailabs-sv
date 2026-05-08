import type { ReactNode } from 'react'
import { AnimatedGrid } from '@/components/ui/animated-grid'
import { cn } from '@/lib/utils'

type SlideCanvasProps = {
  children: ReactNode
  className?: string
}

/**
 * Landing-page style backdrop for deck slides: grid + radial field (hero-like).
 * Slides compose their own layout inside.
 */
export function SlideCanvas({ children, className }: SlideCanvasProps) {
  return (
    <div
      className={cn(
        'border-border/60 bg-background text-foreground relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm',
        className,
      )}
    >
      <AnimatedGrid className="opacity-70" />
      <div
        className="hero-radial-field pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
      />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-linear-to-t to-transparent" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
