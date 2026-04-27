import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/site/MagneticButton";

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 2xl:py-40 overflow-hidden">
      {/* Layered glow background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.25),transparent_60%)]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[10%] bottom-[10%] h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]"
        />
      </div>

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl text-center"
        >
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary mb-6">
            <Sparkles className="h-3 w-3" />
            <span className="font-mono uppercase tracking-widest">
              Free to start · no card
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.05]">
            Ready to{" "}
            <span className="italic font-serif font-normal text-primary">
              sculpt?
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg 2xl:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Open the editor, type a prompt, and watch your first asset render in
            under a minute. The studio is live — your seat is waiting.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={0.4}>
              <Link to="/edit">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_0_60px_hsl(var(--primary)/0.5)]"
                >
                  Launch the editor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base bg-surface-1/60 border-border text-foreground hover:bg-surface-2"
                >
                  See pricing
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* trust micro-copy */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              200 free credits monthly
            </span>
            <span>·</span>
            <span>Cancel anytime</span>
            <span>·</span>
            <span>Commercial license on paid plans</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
