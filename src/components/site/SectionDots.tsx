import { useEffect, useState } from "react";

/**
 * SectionDots — Apple-style sticky dot navigation.
 * Lives on the right edge, shows the user where they are in the page,
 * and lets them jump between sections with a click.
 *
 * Sections are auto-discovered from any <section id="..."> on the page,
 * with optional data-label="Display Name" for the tooltip.
 */
type SectionMeta = { id: string; label: string; top: number };

export default function SectionDots() {
  const [sections, setSections] = useState<SectionMeta[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Discover sections on mount + on resize.
  useEffect(() => {
    const collect = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
      );
      const list: SectionMeta[] = nodes.map((n) => ({
        id: n.id,
        label:
          n.dataset.label ??
          n.id
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        top: n.offsetTop,
      }));
      setSections(list);
    };
    collect();
    const onResize = () => collect();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <ul className="flex flex-col items-center gap-3 px-2 py-3 rounded-full border border-border/50 bg-background/40 backdrop-blur-md">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id} className="group relative">
              <button
                onClick={() => jumpTo(s.id)}
                aria-label={`Jump to ${s.label}`}
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
              {/* tooltip */}
              <span
                className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded-md bg-surface-2 border border-border text-xs text-foreground whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
