import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  phrases: string[];
  className?: string;
  intervalMs?: number;
  glitchDurationMs?: number;
}

export function GlitchText({
  phrases,
  className,
  intervalMs = 3500,
  glitchDurationMs = 500,
}: GlitchTextProps) {
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayedText, setDisplayedText] = useState(phrases[0]);

  useEffect(() => {
    if (!phrases || phrases.length <= 1) return;

    const interval = setInterval(() => {
      // Start glitch effect
      setIsGlitching(true);

      // Change text mid-glitch
      setTimeout(() => {
        setIndex((prev) => {
          const nextIndex = (prev + 1) % phrases.length;
          setDisplayedText(phrases[nextIndex]);
          return nextIndex;
        });
      }, glitchDurationMs / 2);

      // End glitch effect
      setTimeout(() => {
        setIsGlitching(false);
      }, glitchDurationMs);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [phrases, intervalMs, glitchDurationMs]);

  return (
    <span
      className={cn("inline-block", className, isGlitching && "glitch")}
      data-text={displayedText}
    >
      {displayedText}
    </span>
  );
}
