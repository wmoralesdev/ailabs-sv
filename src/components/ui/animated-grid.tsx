import { useEffect, useState } from "react";
import { useMotionValue, motion, useTransform } from "motion/react";

interface AnimatedGridProps {
  /** Grid cell size in pixels (default: 40) */
  gridSize?: number;
  /** Drift velocity { x, y } (default: subtle rightward) */
  velocity?: { x: number; y: number };
  /** Additional className for the grid container */
  className?: string;
}

export function AnimatedGrid({
  gridSize = 40,
  velocity = { x: 0.3, y: 0 },
  className = "",
}: AnimatedGridProps) {
  const [isClient, setIsClient] = useState(false);

  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);

  const backgroundPosition = useTransform(
    [positionX, positionY],
    ([x, y]) => `${x}px ${y}px`
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let rafId: number | null = null;

    const tick = () => {
      let newX = positionX.get() + velocity.x;
      let newY = positionY.get() + velocity.y;

      newX = ((newX % gridSize) + gridSize) % gridSize;
      newY = ((newY % gridSize) + gridSize) % gridSize;

      positionX.set(newX);
      positionY.set(newY);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClient, gridSize, velocity.x, velocity.y, positionX, positionY]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <motion.div
        className="bg-grid-pattern pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
        style={{ backgroundPosition }}
      />
    </div>
  );
}
