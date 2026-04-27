import { useEffect, useRef, useState } from "react";

/**
 * ContextualCursor — global custom cursor. Reads `data-cursor="View"` (or any text)
 * from the nearest matching ancestor of whatever element the pointer is over,
 * and shows a floating pill with that label. Hidden on touch devices.
 *
 * Usage: add `data-cursor="View"` (or "Click", "Open"...) to any element.
 */
export default function ContextualCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let rx = 0, ry = 0; // ring (eased) position
    let tx = 0, ty = 0; // target position
    let raf = 0;

    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      if (dot.current) dot.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const ctxEl = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(ctxEl?.dataset.cursor ?? null);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-primary transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center transition-[width,height,background,opacity] duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        } ${label ? "h-12 w-12 bg-primary text-primary-foreground" : "h-8 w-8 bg-transparent border border-foreground/40"}`}
        style={{ borderRadius: 9999 }}
      >
        {label && (
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
