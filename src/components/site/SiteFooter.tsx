import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const COLS = [
  { title: "Product", items: ["Editor", "Gallery", "Pricing", "Changelog"] },
  { title: "Resources", items: ["Docs", "Blog", "Tutorials", "API"] },
  { title: "Company", items: ["About", "Careers", "Contact", "Press"] },
];

const SOCIAL = ["Twitter", "GitHub", "Discord", "Instagram"];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-surface-0">
      {/* glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[1200px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="site-container pt-20 pb-8 relative">
        {/* Top: link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16">
          <div className="col-span-2 md:col-span-2 max-w-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
              Studio
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              An AI-native 3D sculpting & rendering studio. Generate, sculpt,
              light and ship — entirely in your browser.
            </p>
            <Link
              to="/edit"
              data-cursor="Open"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              Open the editor <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((i) => (
                  <li key={i}>
                    <Link
                      to="#"
                      data-cursor="Open"
                      className="group inline-flex items-center gap-1 text-sm text-foreground/85 hover:text-primary transition-colors"
                    >
                      {i}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big-type wordmark */}
        <div className="relative py-10 border-t border-border/60">
          <div
            aria-hidden
            className="leading-[0.85] font-extrabold tracking-tighter select-none break-all"
            style={{ fontSize: "clamp(80px, 18vw, 280px)" }}
          >
            <span className="bg-gradient-to-b from-foreground to-foreground/10 bg-clip-text text-transparent">
              CRUDE
            </span>
            <span className="text-primary">3D</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 CRUDE 3D Studio</span>
            <span className="hidden md:inline opacity-50">·</span>
            <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s}
                href="#"
                data-cursor="Visit"
                className="hover:text-primary transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
          <span className="font-mono opacity-70">v0.1 — preview build</span>
        </div>
      </div>
    </footer>
  );
}
