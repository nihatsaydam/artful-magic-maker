import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/site/MagneticButton";
import HeroSculpture from "@/components/site/HeroSculpture";
import LiveStats from "@/components/site/LiveStats";
import ScrollIndicator from "@/components/site/ScrollIndicator";
import heroBg from "@/assets/hero-bg.jpg";

const ROTATING = ["worlds", "creatures", "vehicles", "characters", "props"];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative [clip-path:inset(0_0_-30%_0)]">
      {/* BG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Cinematic gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.55)_70%,hsl(var(--background)/0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.22),transparent_55%)]" />

        {/* Floating animated orbs */}
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-[15%] h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-1/4 right-[15%] h-80 w-80 rounded-full bg-neon/10 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]"
        />
      </div>

      {/* Interactive 3D sculpture — extends below the hero so the orbiting ring
          can spill into the next section, breaking the rigid banner edge. */}
      <div className="absolute inset-x-0 top-0 -bottom-32 md:-bottom-48 z-[5] pointer-events-auto">
        <HeroSculpture />
        {/* Soft fade so the 3D blends into the section edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background)/0.55)_88%)]" />
      </div>

      <div className="relative z-10 site-container pt-10 pb-16 md:pt-14 md:pb-20 2xl:pt-20 2xl:pb-28 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl text-center flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold tracking-tight leading-[1.05]">
            Sculpt{" "}
            <span className="relative inline-block align-baseline text-primary">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING[idx]}
                  initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="inline-block"
                >
                  {ROTATING[idx]}
                </motion.span>
              </AnimatePresence>
            </span>
            ,
            <br /> not just <span className="italic font-serif font-normal">meshes.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg 2xl:text-xl text-muted-foreground max-w-xl 2xl:max-w-2xl leading-relaxed mx-auto"
          >
            CRUDE 3D is an AI-native sculpting & rendering studio. Generate concept-ready
            assets in seconds, refine them with a real-time engine, and publish your gallery
            — all from one elegant workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
          >
            <MagneticButton strength={0.4}>
              <Link to="/edit">
                <Button
                  size="lg"
                  className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_0_30px_hsl(var(--primary)/0.45)]"
                >
                  Launch Editor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link to="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 bg-surface-1/60 border-border text-foreground hover:bg-surface-2"
                >
                  Browse Gallery
                </Button>
              </Link>
            </MagneticButton>
            <button className="h-12 inline-flex items-center gap-2 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <span className="grid place-items-center h-9 w-9 rounded-full border border-border bg-surface-1 group-hover:bg-surface-2">
                <Play className="h-3.5 w-3.5 fill-foreground" />
              </span>
              Watch the 90s tour
            </button>
          </motion.div>

          {/* Live stats — replaces the old feature chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 flex justify-center pointer-events-auto"
          >
            <LiveStats />
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
