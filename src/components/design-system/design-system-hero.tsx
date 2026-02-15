import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { AnimatedGrid } from "@/components/ui/animated-grid";

export function DesignSystemHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden border-b border-border pb-16 pt-24 md:pb-24 md:pt-32"
    >
      <AnimatedGrid />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium tracking-wide text-foreground/80">
            Design System
          </span>
        </div>

        <h1 className="mb-8 text-4xl font-medium leading-[0.95] tracking-tighter motion-safe:animate-hero-in [animation-delay:140ms] md:text-6xl lg:text-7xl">
          <span className="block text-foreground">Component</span>
          <span className="block text-primary">reference</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:220ms] md:text-lg">
          Browse and copy UI patterns. Use this when adding new elements or
          checking existing components.
        </p>

        <a
          href="#components"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 motion-safe:animate-hero-in [animation-delay:300ms]"
        >
          Browse components
          <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
        </a>
      </div>
    </section>
  );
}
