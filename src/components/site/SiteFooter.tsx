import { Link } from "@tanstack/react-router";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface-0/60">
      <div className="site-container py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-baseline gap-1">
            <span className="text-primary font-bold text-xl tracking-tight">CRUDE</span>
            <span className="text-foreground font-bold text-xl tracking-tight">3D</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            AI-native 3D sculpting & rendering studio. Generate, sculpt, light and ship — all in your browser.
          </p>
        </div>
        {[
          { title: "Product", items: ["Editor", "Gallery", "Pricing", "Changelog"] },
          { title: "Resources", items: ["Docs", "Blog", "Tutorials", "API"] },
          { title: "Company", items: ["About", "Careers", "Contact", "Press"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((i) => (
                <li key={i}>
                  <Link to="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="site-container py-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} CRUDE 3D Studio. All rights reserved.</span>
          <span className="font-mono">v0.1 — preview build</span>
        </div>
      </div>
    </footer>
  );
}
