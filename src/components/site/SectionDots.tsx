import { useEffect, useState } from "react";

/**
 * SectionDots — Apple-style sticky dot navigation on the right edge.
 *
 * Discovers <section id="..."> nodes, exposes a tooltip with their data-label
 * (or a humanized id), and keeps the label LIVE — re-reading data-label
 * via a MutationObserver so callers like the Gallery can reflect their
 * currently active category in the side nav.
 *
 * The label of the active section is also rendered inline (always visible)
 * so the user instantly sees the current context without hovering.
 */
type SectionMeta = { id: string; label: string; top: number };

function readLabel(n: HTMLElement): string {
  return (
    n.dataset.label ??
    n.id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function SectionDots() {
  const [sections, setSections] = useState<SectionMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Discover sections + observe label changes.
  useEffect(() => {
    const collect = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
      );
      setSections(
        nodes.map((n) => ({ id: n.id, label: readLabel(n), top: n.offsetTop }))
      );
    };
    collect();

    const onResize = () => collect();
    window.addEventListener("resize", onResize);

    // Watch for data-label changes on any section (e.g. Gallery category switch).
    const observer = new MutationObserver(() => collect());
    document.querySelectorAll<HTMLElement>("section[id]").forEach((n) => {
      observer.observe(n, { attributes: true, attributeFilter: ["data-label"] });
    });

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  // Track which section is in view.
  useEffect(() => {
    if (sections.length === 0) return;
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const s of sections) {
        if (y >= s.top) current = s.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  if (sections.length < 2) return null;

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = sections.find((s) => s.id === activeId)?.label;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center gap-3"
    >
      {/* Persistent active-label pill */}
      {activeLabel && (
        <div
          key={activeLabel}
          className="px-3 py-1.5 rounded-full bg-surface-2/90 border border-border backdrop-blur-md text-xs font-medium text-foreground whitespace-nowrap shadow-lg animate-fade-in"
        >
          <span className="font-mono text-primary mr-1.5">›</span>
          {activeLabel}
        </div>
      )}

      <ul className="flex flex-col items-center gap-3 px-2 py-3 rounded-full border border-border/50 bg-background/40 backdrop-blur-md">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id} className="group relative">
              <button
                onClick={() => jumpTo(s.id)}
                aria-label={`Jump to ${s.label}`}
                data-cursor="Jump"
                className="relative grid place-items-center h-6 w-6"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
                      : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/70"
                  }`}
                />
              </button>
              <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded-md bg-surface-2 border border-border text-xs text-foreground whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
