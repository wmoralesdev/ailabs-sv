import { useCallback, useEffect, useRef, useState } from "react";

export function useDragScroll<T extends HTMLElement>(speed = 0.6) {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      if (ref.current && !isDraggingRef.current) {
        const el = ref.current;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        el.scrollLeft += speed;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startX.current = e.pageX - ref.current.offsetLeft;
    startScrollLeft.current = ref.current.scrollLeft;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.5;
  }, []);

  const stop = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  return { ref, isDragging, onMouseDown, onMouseMove, onMouseUp: stop, onMouseLeave: stop };
}
