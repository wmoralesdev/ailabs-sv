import { useEffect, useRef, useState } from "react";
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
  const phraseIndexRef = useRef(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayedText, setDisplayedText] = useState(() => phrases?.[0] ?? "");

  useEffect(() => {
    phraseIndexRef.current = 0;
    setDisplayedText(phrases?.[0] ?? "");
    setIsGlitching(false);
  }, [phrases]);

  useEffect(() => {
    if (!phrases || phrases.length <= 1) return;

    const interval = setInterval(() => {
      // Start glitch effect
      setIsGlitching(true);

      // Change text mid-glitch
      setTimeout(() => {
        const nextIndex = (phraseIndexRef.current + 1) % phrases.length;
        phraseIndexRef.current = nextIndex;
        setDisplayedText(phrases[nextIndex]);
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
