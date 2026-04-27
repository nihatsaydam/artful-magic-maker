import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — CRUDE 3D" },
      { name: "description", content: "Engineering deep-dives, tutorials and release notes from the CRUDE 3D studio." },
      { property: "og:title", content: "Journal — CRUDE 3D" },
      { property: "og:description", content: "Engineering deep-dives, tutorials and release notes." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { cat: "Engineering", title: "Inside the CRUDE engine: real-time PBR in the browser", excerpt: "How we squeezed a deferred renderer with screen-space reflections into a 600 KB WASM bundle.", read: "8 min", date: "Apr 22, 2026", author: "Lev Marchetti" },
  { cat: "Tutorial", title: "From prompt to printable: a stylized creature workflow", excerpt: "A complete walk-through using AI Sculpt, Retopology and our new Voxel Remesh.", read: "12 min", date: "Apr 18, 2026", author: "Mira Okonkwo" },
  { cat: "Release Notes", title: "v0.9 — Layers, masking and the new node graph", excerpt: "Non-destructive sculpting is finally here. Plus: a totally redesigned material graph.", read: "5 min", date: "Apr 11, 2026", author: "CRUDE Team" },
  { cat: "Case Study", title: "How Studio Fenrir shipped a mobile game in 11 weeks", excerpt: "Full asset pipeline using CRUDE's batch generator, retopo and texture baker. Numbers inside.", read: "9 min", date: "Apr 03, 2026", author: "Ada Vinter" },
  { cat: "Design", title: "Designing for sculptors: lessons from 3 years of UX research", excerpt: "Why we abandoned floating panels and adopted a single command bar. With user-test footage.", read: "7 min", date: "Mar 28, 2026", author: "Tomasz Halász" },
  { cat: "Engineering", title: "WebGPU is finally fast enough — here's our migration log", excerpt: "We rewrote our compositor from WebGL2 to WebGPU. The good, the bad, the segfaults.", read: "11 min", date: "Mar 22, 2026", author: "Renan Ortiz" },
];

function Blog() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-surface-0/40 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.18),transparent_55%)]" />
        <div className="site-container py-20 relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">/ journal</span>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">From the studio</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">Engineering deep-dives, tutorials and release notes from the people building CRUDE 3D.</p>
          </motion.div>
        </div>
      </section>

      <section className="site-container py-12">
        <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="group rounded-3xl border border-border bg-gradient-to-br from-surface-1 to-surface-0 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <span className="text-[10px] uppercase tracking-widest font-mono text-primary">{POSTS[0].cat} · Featured</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl group-hover:text-primary transition-colors">{POSTS[0].title}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-lg">{POSTS[0].excerpt}</p>
          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-xs font-bold text-primary-foreground">{POSTS[0].author[0]}</div>
            <span className="text-foreground">{POSTS[0].author}</span>
            <span>·</span><span>{POSTS[0].date}</span><span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {POSTS[0].read}</span>
            <a href="#" className="ml-auto inline-flex items-center gap-1 text-primary hover:underline">Read article <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </motion.article>
      </section>

      <section className="site-container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.slice(1).map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ y: -4 }} className="group rounded-2xl border border-border bg-surface-1 p-6 hover:border-primary/40 transition-colors">
              <span className="text-[10px] uppercase tracking-widest font-mono text-primary">{p.cat}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.author} · {p.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
