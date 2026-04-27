import { Link, useLocation } from "@tanstack/react-router";
import { Coins, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/site/ThemeToggle";

export default function SiteHeader({ credits = 1280 }: { credits?: number }) {
  const pathname = useLocation({ select: (l) => l.pathname });
  const nav = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
    { to: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="site-container h-16 flex items-center gap-8">
        <Link to="/" className="flex items-baseline gap-1 shrink-0">
          <span className="text-primary font-bold text-xl tracking-tight">CRUDE</span>
          <span className="text-foreground font-bold text-xl tracking-tight">3D</span>
          <span className="ml-1 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">studio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? "text-foreground bg-surface-2"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-1"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />

          {/* Credits */}
          <div className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-full border border-border bg-surface-1/80">
            <Coins className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono tabular-nums text-foreground">{credits.toLocaleString()}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">credits</span>
          </div>

          <Link to="/edit" className="hidden sm:inline-flex">
            <Button
              variant="ghost"
              className="h-9 gap-2 text-foreground hover:bg-surface-2"
            >
              <Sparkles className="h-4 w-4 text-neon" />
              Open Editor
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="ghost" className="h-9 text-muted-foreground hover:text-foreground hover:bg-surface-2">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
