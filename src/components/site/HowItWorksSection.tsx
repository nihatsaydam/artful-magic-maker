import { motion } from "framer-motion";
import { Wand2, Boxes, Download, ArrowRight } from "lucide-react";
import GradientMesh from "@/components/site/GradientMesh";

const STEPS = [
  {
    n: "01",
    icon: Wand2,
    title: "Prompt",
    sub: "Describe it",
    body: "Type a few words. Drop a reference. Pick a style. Our model parses intent in under a second.",
    visual: "prompt",
  },
  {
    n: "02",
    icon: Boxes,
    title: "Sculpt",
    sub: "Refine in real-time",
    body: "Live PBR engine renders as you tweak. Push polys, paint materials, retopo with one click.",
    visual: "sculpt",
  },
  {
    n: "03",
    icon: Download,
    title: "Export",
    sub: "Ship anywhere",
    body: "GLB, FBX, USDZ. Production-ready geometry, baked maps, optimized for web, game, and film.",
    visual: "export",
  },
];

function StepVisual({ kind, index }: { kind: string; index: number }) {
  if (kind === "prompt") {
    return (
      <div className="relative h-40 rounded-lg border border-border bg-background/60 p-4 overflow-hidden">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
          prompt.txt
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-2"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 + index * 0.1, ease: "easeOut" }}
          className="h-2 rounded-full bg-foreground/20 mb-2"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.9 + index * 0.1, ease: "easeOut" }}
          className="h-2 rounded-full bg-foreground/10"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          generating
        </div>
      </div>
    );
  }
  if (kind === "sculpt") {
    return (
      <div className="relative h-40 rounded-lg border border-border bg-background/60 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary via-primary/70 to-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.5)]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="h-28 w-28 rounded-full border border-primary/40" />
        </motion.div>
        <div className="absolute bottom-3 left-3 text-[10px] text-muted-foreground">
          live · 60fps
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-40 rounded-lg border border-border bg-background/60 p-4 overflow-hidden">
      <div className="grid grid-cols-3 gap-2">
        {["GLB", "FBX", "USDZ"].map((fmt, i) => (
          <motion.div
            key={fmt}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            className="rounded-md border border-border bg-surface-1 p-2 text-center"
          >
            <div className="text-[10px] text-muted-foreground">.{fmt.toLowerCase()}</div>
            <div className="text-sm font-semibold text-foreground mt-1">{fmt}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.7 }}
        className="absolute bottom-4 left-4 right-4 h-1 rounded-full bg-primary"
      />
      <div className="absolute bottom-7 right-4 text-[10px] text-muted-foreground">
        ready
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how" className="relative py-20 md:py-28 2xl:py-36 overflow-hidden">
      <GradientMesh variant="b" />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
            How it works
          </div>
          <h2 className="display-heading text-3xl md:text-5xl 2xl:text-6xl leading-[1.05]">
            <span className="light">From idea to</span> asset in{" "}
            <span className="accent text-primary">three steps.</span>
          </h2>
          <p className="mt-4 text-base 2xl:text-lg text-muted-foreground max-w-xl">
            No node graphs. No 40-button sculpt menus. Just prompt, refine, and ship.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8 relative">
          {/* connector line */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-border bg-surface-1/70 backdrop-blur-sm p-6 2xl:p-8 hover:border-primary/40 transition-colors h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 border border-primary/30 text-primary">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground tracking-wider">
                    {step.n}
                  </div>
                </div>

                <StepVisual kind={step.visual} index={i} />

                <div className="mt-5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl 2xl:text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">— {step.sub}</span>
                  </div>
                  <p className="mt-2 text-sm 2xl:text-base text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>

              {/* arrow between cards */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:grid place-items-center absolute top-1/2 -right-3 z-10 h-6 w-6 rounded-full bg-background border border-border text-muted-foreground">
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
