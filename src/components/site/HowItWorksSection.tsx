import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wand2, Boxes, Download } from "lucide-react";
import GradientMesh from "@/components/site/GradientMesh";

const STEPS = [
  {
    n: "01",
    icon: Wand2,
    title: "Prompt",
    sub: "Describe it",
    body: "Type a few words. Drop a reference. Pick a style. Our model parses intent in under a second.",
    visual: "prompt" as const,
  },
  {
    n: "02",
    icon: Boxes,
    title: "Sculpt",
    sub: "Refine in real-time",
    body: "Live PBR engine renders as you tweak. Push polys, paint materials, retopo with one click.",
    visual: "sculpt" as const,
  },
  {
    n: "03",
    icon: Download,
    title: "Export",
    sub: "Ship anywhere",
    body: "GLB, FBX, USDZ. Production-ready geometry, baked maps, optimized for web, game, and film.",
    visual: "export" as const,
  },
];

function StepVisual({ kind }: { kind: "prompt" | "sculpt" | "export" }) {
  if (kind === "prompt") {
    return (
      <div className="relative h-64 w-full rounded-xl border border-border bg-background/60 p-5 overflow-hidden">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
          prompt.txt
        </div>
        <div className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/30 mb-2 w-[85%]" />
        <div className="h-2 rounded-full bg-foreground/20 mb-2 w-[60%]" />
        <div className="h-2 rounded-full bg-foreground/10 w-[40%]" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          generating
        </div>
      </div>
    );
  }
  if (kind === "sculpt") {
    return (
      <div className="relative h-64 w-full rounded-xl border border-border bg-background/60 overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:20px_20px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-primary via-primary/70 to-primary/30 shadow-[0_0_60px_hsl(var(--primary)/0.5)]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="h-40 w-40 rounded-full border border-primary/40" />
        </motion.div>
        <div className="absolute bottom-3 left-3 text-[10px] text-muted-foreground">
          live · 60fps
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-64 w-full rounded-xl border border-border bg-background/60 p-5 overflow-hidden">
      <div className="grid grid-cols-3 gap-2">
        {["GLB", "FBX", "USDZ"].map((fmt) => (
          <div
            key={fmt}
            className="rounded-md border border-border bg-surface-1 p-3 text-center"
          >
            <div className="text-[10px] text-muted-foreground">.{fmt.toLowerCase()}</div>
            <div className="text-sm font-semibold text-foreground mt-1">{fmt}</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-5 right-5 h-1 rounded-full bg-primary" />
      <div className="absolute bottom-8 right-5 text-[10px] text-muted-foreground">
        ready
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move the horizontal track from 0 → -66.66% (3 panels, show 1 at a time).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0.4, 1]);

  return (
    <section id="how" data-label="How it works" className="relative">
      <GradientMesh variant="b" />

      {/* Tall scroll container — 3x viewport height drives the horizontal track */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Header */}
          <div className="site-container pt-16 md:pt-20 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
                How it works
              </div>
              <h2 className="display-heading text-3xl md:text-5xl 2xl:text-6xl leading-[1.05]">
                <span className="light">From idea to</span> asset in{" "}
                <span className="accent text-primary">three steps.</span>
              </h2>
            </motion.div>

            {/* Progress dots */}
            <motion.div
              className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"
              style={{ opacity: headerOpacity }}
            >
              {STEPS.map((s, i) => {
                const start = i / STEPS.length;
                const end = (i + 1) / STEPS.length;
                return (
                  <ProgressDot
                    key={s.n}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    label={s.n}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Horizontal track */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex w-[300%] h-full"
            >
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="w-1/3 h-full flex items-center justify-center px-6 md:px-12"
                >
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl w-full">
                    {/* Visual */}
                    <div>
                      <StepVisual kind={step.visual} />
                    </div>
                    {/* Copy */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="grid place-items-center h-12 w-12 rounded-full bg-primary/10 border border-primary/30 text-primary">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-mono text-muted-foreground tracking-widest">
                          {step.n} / 03
                        </div>
                      </div>
                      <h3 className="display-heading text-4xl md:text-6xl leading-[1.05] mb-3">
                        {step.title}{" "}
                        <span className="accent text-primary">— {step.sub.toLowerCase()}</span>
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressDot({
  progress,
  start,
  end,
  label,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  label: string;
}) {
  const opacity = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.3, 1, 1, 0.3]);
  const width = useTransform(progress, [start, end], [12, 36]);
  return (
    <motion.div style={{ opacity }} className="flex items-center gap-2">
      <motion.span
        style={{ width }}
        className="h-1 rounded-full bg-primary"
      />
      <span className="font-mono">{label}</span>
    </motion.div>
  );
}
