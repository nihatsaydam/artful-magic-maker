import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import GradientMesh from "@/components/site/GradientMesh";
import BlogCardSkeleton from "@/components/site/BlogCardSkeleton";

const POSTS = [
  {
    cat: "Engineering",
    title: "Inside the CRUDE engine: real-time PBR in the browser",
    excerpt: "How we squeezed a deferred renderer with screen-space reflections into a 600 KB WASM bundle.",
    read: "8 min",
    date: "Apr 22, 2026",
  },
  {
    cat: "Tutorial",
    title: "From prompt to printable: a stylized creature workflow",
    excerpt: "A complete walk-through using AI Sculpt, Retopology and our new Voxel Remesh.",
    read: "12 min",
    date: "Apr 18, 2026",
  },
  {
    cat: "Release Notes",
    title: "v0.9 — Layers, masking and the new node graph",
    excerpt: "Non-destructive sculpting is finally here. Plus: a totally redesigned material graph.",
    read: "5 min",
    date: "Apr 11, 2026",
  },
];

export default function BlogSection() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-surface-0/40 border-y border-border/60 overflow-hidden">
      <GradientMesh variant="b" />
      <div className="site-container py-20 relative">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">/ journal</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">From the studio</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            All articles <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={`bsk-${i}`} />)
            : POSTS.map((p, i) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="group rounded-xl border border-border bg-surface-1 p-6 hover:border-primary/40 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest font-mono text-primary">{p.cat}</span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read}</span>
                  </div>
                </motion.article>
              ))}
        </div>
      </div>
    </section>
  );
}
