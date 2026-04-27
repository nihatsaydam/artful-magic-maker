import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Zap, Crown, ArrowRight } from "lucide-react";

/**
 * PricingCalculator — interactive estimator.
 * Sliders for monthly model count + complexity, returns estimated credits
 * and recommends the best-fit plan.
 */

const COST_PER_MODEL = {
  basic: 25,    // text -> 3D, low res
  pro: 55,      // hi-res + retopo
  hero: 110,    // hi-res + retopo + 4K bake + rig
} as const;

type Tier = keyof typeof COST_PER_MODEL;

const TIER_LABELS: Record<Tier, { name: string; sub: string }> = {
  basic: { name: "Basic", sub: "Text → 3D · low res" },
  pro: { name: "Pro", sub: "Hi-res + retopology" },
  hero: { name: "Hero", sub: "Full bake + rig" },
};

const PLANS = [
  { name: "Free", credits: 200, price: 0, icon: Sparkles },
  { name: "Creator", credits: 3000, price: 19, icon: Zap, popular: true },
  { name: "Studio", credits: 10000, price: 49, icon: Crown },
] as const;

export default function PricingCalculator() {
  const [models, setModels] = useState(40);
  const [tier, setTier] = useState<Tier>("pro");

  const credits = useMemo(() => models * COST_PER_MODEL[tier], [models, tier]);

  const recommended = useMemo(() => {
    const fit = PLANS.find((p) => p.credits >= credits);
    return fit ?? PLANS[PLANS.length - 1];
  }, [credits]);

  const usagePct = useMemo(
    () => Math.min(100, (credits / recommended.credits) * 100),
    [credits, recommended.credits]
  );

  const overage = Math.max(0, credits - PLANS[PLANS.length - 1].credits);

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Estimate your usage
          </div>
          <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
            How much will{" "}
            <span className="italic font-serif font-normal text-primary">
              you sculpt?
            </span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Slide to see the plan that matches your studio's pace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
        >
          {/* Controls */}
          <div className="lg:col-span-3 rounded-2xl border border-border bg-surface-1/70 backdrop-blur-sm p-6 md:p-8">
            {/* Model count */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <label className="text-sm font-medium text-foreground">
                  Models per month
                </label>
                <div className="text-3xl font-bold tabular-nums text-primary">
                  {models}
                </div>
              </div>
              <Slider
                value={[models]}
                onValueChange={(v) => setModels(v[0])}
                min={1}
                max={250}
                step={1}
                aria-label="Models per month"
              />
              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>1</span>
                <span>50</span>
                <span>100</span>
                <span>250+</span>
              </div>
            </div>

            {/* Quality tier */}
            <div className="mt-10">
              <label className="text-sm font-medium text-foreground mb-4 block">
                Average quality
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(TIER_LABELS) as Tier[]).map((t) => {
                  const active = tier === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`text-left rounded-xl border p-3 transition-colors ${
                        active
                          ? "border-primary/60 bg-primary/10"
                          : "border-border bg-surface-2/50 hover:border-foreground/20"
                      }`}
                    >
                      <div className={`text-sm font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                        {TIER_LABELS[t].name}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {TIER_LABELS[t].sub}
                      </div>
                      <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        {COST_PER_MODEL[t]} cr/model
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Credits result */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Estimated monthly credits
                </span>
                <motion.div
                  key={credits}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl font-bold tabular-nums text-foreground"
                >
                  {credits.toLocaleString("en-US")}
                </motion.div>
              </div>

              <div className="mt-3 h-2 rounded-full bg-surface-2 overflow-hidden">
                <motion.div
                  animate={{ width: `${usagePct}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`h-full ${overage > 0 ? "bg-destructive" : "bg-gradient-to-r from-primary to-primary/60"}`}
                />
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">
                {overage > 0
                  ? `Over the largest self-serve plan by ${overage.toLocaleString("en-US")} credits — talk to sales for Enterprise.`
                  : `Using ${Math.round(usagePct)}% of the ${recommended.name} plan allowance.`}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="lg:col-span-2 rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/10 to-surface-1 p-6 md:p-8 flex flex-col shadow-[0_0_40px_hsl(var(--primary)/0.18)]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
              / recommended for you
            </div>

            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 text-primary">
                <recommended.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {recommended.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {recommended.credits.toLocaleString("en-US")} credits / mo
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tabular-nums text-foreground">
                ${recommended.price}
              </span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-foreground/85 flex-1">
              <li>· {Math.floor(recommended.credits / COST_PER_MODEL[tier])} {TIER_LABELS[tier].name.toLowerCase()} models / mo</li>
              <li>· Commercial license included</li>
              <li>· Priority render queue</li>
              <li>· Roll-over up to 1 month</li>
            </ul>

            <button className="mt-6 h-11 rounded-lg bg-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_24px_hsl(var(--primary)/0.4)]">
              Start with {recommended.name}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
