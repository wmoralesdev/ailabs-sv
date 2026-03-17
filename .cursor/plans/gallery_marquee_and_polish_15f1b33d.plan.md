---
name: Gallery Marquee And Polish
overview: Combine auto-marquee with drag scrolling, add grayscale-to-color card hover effect, and polish the past events card UI.
todos:
  - id: update-drag-scroll-hook
    content: Rewrite useDragScroll with rAF auto-scroll and seamless loop support
    status: pending
  - id: update-gallery-section
    content: "Update events-section.tsx: restore item duplication, grayscale effect, card UI polish"
    status: pending
isProject: false
---

# Gallery Marquee and Polish

## Changes

### 1. Update `useDragScroll` hook — add auto-scroll with seamless loop

Replace the current passive hook with one that drives auto-scroll via `requestAnimationFrame`. Drag pauses it.

Key additions to `[src/hooks/use-drag-scroll.ts](src/hooks/use-drag-scroll.ts)`:

- `isDraggingRef` (a ref, not just state) so the rAF callback can read it without stale closures
- `tick` loop: increments `scrollLeft` by `speed` each frame; when `scrollLeft >= scrollWidth / 2`, jump back to `0` for seamless loop (requires duplicated items)
- `useEffect` to start/stop the rAF

```ts
import { useRef, useState, useCallback, useEffect } from "react";

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
```

### 2. Update `events-section.tsx` — marquee container + card UI polish

**Container**: restore `[...past, ...past]` for seamless loop (rAF resets at halfway). Remove `overflow-hidden py-4` wrapper (no longer needed), keep `overflow-x-auto scrollbar-hide`.

**Grayscale effect on cards**: Add to each `<article>`:

```
grayscale transition-[filter] duration-500 hover:grayscale-0
```

**Card UI restructure**:

- **Top-left overlay** (absolute, z-10): partner + virtual badges with a subtle `bg-linear-to-b from-black/50 to-transparent` for readability
- **Bottom overlay**: stronger gradient `from-black/90 via-black/60 to-transparent`
- **Date row**: date on the left as `text-[11px] font-medium text-white/60 uppercase tracking-widest`
- **Country badge**: cleaner — white background/10, white border, small caps — moved to sit beside the date
- **Title**: `text-base font-semibold leading-snug` (slightly smaller for more breathing room)
- **Action links**: styled with a dot separator, same size

Rough card structure:

```tsx
<article className="group relative ... grayscale transition-[filter] duration-500 hover:grayscale-0">
  <img ... />
  {/* Top gradient for badge area */}
  <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/60 to-transparent" />
  {/* Bottom gradient */}
  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
  {/* Top badges */}
  <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
    {event.partner && <span className="...partner badge...">{event.partner}</span>}
    {event.isVirtual && <span className="...virtual badge...">Virtual</span>}
  </div>
  {/* Bottom content */}
  <div className="absolute bottom-0 left-0 w-full p-4 z-10">
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-[11px] font-medium text-white/60 uppercase tracking-widest">{event.date}</span>
      {event.country && <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">{event.country}</span>}
    </div>
    <h4 className="text-base font-semibold leading-snug text-white mb-2">{...}</h4>
    <div className="flex gap-3">
      {/* recap + album links */}
    </div>
  </div>
</article>
```

