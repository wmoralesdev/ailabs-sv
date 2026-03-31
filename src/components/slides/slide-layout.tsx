import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SlideLayoutProps = {
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** When true, direct slide content children get a light staggered entrance (see `.slides-stagger-children`). */
  staggerChildren?: boolean;
};

export function SlideLayout({
  eyebrow,
  title,
  children,
  className,
  contentClassName,
  staggerChildren,
}: SlideLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col justify-center px-8 py-12 md:px-16 md:py-16",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-5xl space-y-6", contentClassName)}>
        {eyebrow ? (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="flex flex-wrap items-center gap-3 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
        ) : null}
        {staggerChildren ? (
          <div className="slides-stagger-children flex flex-col gap-6">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
