import { Coins, Zap, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import GradientMesh from "@/components/site/GradientMesh";

export default function CreditsSection() {
  const used = 1720;
  const total = 3000;
  const pct = Math.round((used / total) * 100);

  return (
    <section className="relative overflow-hidden">
      <GradientMesh variant="c" />
      <div className="site-container py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-surface-1 to-surface-0 p-8 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-widest text-primary">/ your balance</span>
              <div className="mt-4 flex items-baseline gap-3">
                <Coins className="h-8 w-8 text-primary" />
                <span className="text-5xl font-bold tabular-nums">{(total - used).toLocaleString()}</span>
                <span className="text-muted-foreground">credits remaining</span>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Monthly usage</span>
                  <span className="font-mono">{used.toLocaleString()} / {total.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold shadow-[0_0_24px_hsl(var(--primary)/0.4)]">
                  <Plus className="h-4 w-4" /> Top up credits
                </button>
                <button className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-sm">
                  <TrendingUp className="h-4 w-4" /> Upgrade plan
                </button>
              </div>
            </div>
          </motion.div>

          {/* Cost breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface-1 p-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">/ cost reference</span>
            <ul className="mt-4 divide-y divide-border">
              {[
                { label: "Text → 3D generation", cost: "20" },
                { label: "Image → 3D conversion", cost: "30" },
                { label: "AI Retopology", cost: "10" },
                { label: "4K texture bake", cost: "15" },
                { label: "Animation rig", cost: "25" },
              ].map((row) => (
                <li key={row.label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-foreground/90">{row.label}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-mono text-primary">
                    <Zap className="h-3.5 w-3.5" /> {row.cost}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
