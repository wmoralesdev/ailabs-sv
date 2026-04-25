import gsap from "gsap";
import { useEffect, useLayoutEffect } from "react";
import type { RefObject } from "react";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useGsapHeroIntro(rootRef: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-intro]",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          clearProps: "opacity,transform,visibility",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.fromTo(
        "[data-hero-orbit]",
        { autoAlpha: 0, scale: 0.96, y: 12 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          clearProps: "opacity,transform,visibility",
          delay: 0.18,
          duration: 0.82,
          ease: "power3.out",
        },
      );
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
