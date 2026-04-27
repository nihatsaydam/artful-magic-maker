import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import SiteShell from "@/components/site/SiteShell";
import GallerySection from "@/components/site/GallerySection";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CRUDE 3D" },
      { name: "description", content: "Browse a curated showcase of recent works made in CRUDE 3D." },
      { property: "og:title", content: "Gallery — CRUDE 3D" },
      { property: "og:description", content: "Curated 3D works from the CRUDE community." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-surface-0/40">
        <div className="site-container py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">/ community</span>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Made in CRUDE 3D</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Browse a curated showcase of recent works — characters, creatures, vehicles, props and prints from
              our global community.
            </p>
          </motion.div>
        </div>
      </section>
      <GallerySection />
    </SiteShell>
  );
}
