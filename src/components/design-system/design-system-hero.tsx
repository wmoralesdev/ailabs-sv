import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { AnimatedGrid } from "@/components/ui/animated-grid";

export function DesignSystemHero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-[64dvh] items-center overflow-hidden border-b border-border pb-14 pt-24 md:pb-16 md:pt-28"
    >
      <AnimatedGrid className="opacity-70" />
      <div className="hero-radial-field pointer-events-none absolute inset-0 opacity-80" />
      <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 text-left">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 shadow-sm backdrop-blur motion-safe:animate-hero-in [animation-delay:80ms]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="eyebrow-label text-foreground/80">
            Design System
          </span>
        </div>

        <h1 className="text-display-hero mb-7 max-w-3xl font-medium motion-safe:animate-hero-in [animation-delay:140ms]">
          <span className="block text-foreground">Component</span>
          <span className="block text-primary">reference</span>
        </h1>

        <p className="text-body-lead mb-8 max-w-2xl text-pretty font-light text-foreground/65 motion-safe:animate-hero-in [animation-delay:220ms]">
          Browse and copy UI patterns. Use this when adding new elements or
          checking existing components.
        </p>

        <a
          href="#components"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30 motion-safe:animate-hero-in motion-reduce:transform-none [animation-delay:300ms]"
        >
          Browse components
          <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
        </a>
      </div>
    </section>
  );
}
