import { useCallback, useRef, useState } from "react";

/**
 * Horizontal drag-to-scroll. No duplicate DOM required (unlike auto-scroll loop variants).
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

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

  return {
    ref,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp: stop,
    onMouseLeave: stop,
  };
}
