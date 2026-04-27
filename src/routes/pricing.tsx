import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Building2 } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import PricingCalculator from "@/components/site/PricingCalculator";
import FAQSection from "@/components/site/FAQSection";
import FinalCTA from "@/components/site/FinalCTA";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CRUDE 3D" },
      { name: "description", content: "Plans that scale with you. Start free, upgrade when you ship." },
      { property: "og:title", content: "Pricing — CRUDE 3D" },
      { property: "og:description", content: "Free, Creator, Studio and Enterprise plans for AI-native 3D." },
    ],
  }),
  component: Pricing,
});

type Cycle = "monthly" | "yearly";

const PLANS = [
  { name: "Free", icon: Sparkles, price: { monthly: 0, yearly: 0 }, blurb: "For curious creators getting started.", credits: "200 credits / month", cta: "Start free", highlight: false, features: ["Text → 3D (low-res)", "Personal use only", "Public gallery uploads", "Community support"] },
  { name: "Creator", icon: Zap, price: { monthly: 19, yearly: 15 }, blurb: "For solo artists shipping projects.", credits: "3,000 credits / month", cta: "Start 14-day trial", highlight: true, features: ["All Free features", "Hi-res Text/Image → 3D", "AI Retopology + 4K bake", "Commercial license", "Private projects", "Priority queue"] },
  { name: "Studio", icon: Crown, price: { monthly: 49, yearly: 39 }, blurb: "For teams shipping at production scale.", credits: "10,000 credits / month", cta: "Upgrade to Studio", highlight: false, features: ["All Creator features", "5 seats included", "Shared team library", "Animation rigging", "API access (beta)", "Dedicated support"] },
  { name: "Enterprise", icon: Building2, price: { monthly: null as number | null, yearly: null as number | null }, blurb: "Custom deployment & SLAs.", credits: "Unlimited credits", cta: "Talk to sales", highlight: false, features: ["All Studio features", "SSO / SAML", "On-prem or VPC", "Custom model fine-tuning", "99.9% uptime SLA", "Dedicated CSM"] },
];

function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-surface-0/40 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.2),transparent_55%)]" />
        <div className="site-container py-20 text-center relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">/ pricing</span>
            <h1 className="mt-2 text-4xl md:text-6xl font-bold tracking-tight">Plans that scale with you</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Start free. Upgrade when you ship. No hidden fees, no per-seat traps — just credits.</p>
            <div className="mt-8 inline-flex items-center p-1 rounded-full border border-border bg-surface-1">
              {(["monthly", "yearly"] as Cycle[]).map((c) => (
                <button key={c} onClick={() => setCycle(c)} className={`px-5 h-9 rounded-full text-sm font-medium transition-all ${cycle === c ? "bg-primary text-primary-foreground shadow-[0_0_18px_hsl(var(--primary)/0.4)]" : "text-muted-foreground hover:text-foreground"}`}>
                  {c === "monthly" ? "Monthly" : "Yearly"}
                  {c === "yearly" && <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-neon">−20%</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className={`relative rounded-2xl border p-6 flex flex-col ${p.highlight ? "border-primary/60 bg-gradient-to-b from-primary/10 to-surface-1 shadow-[0_0_40px_hsl(var(--primary)/0.25)]" : "border-border bg-surface-1"}`}>
              {p.highlight && <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-mono">Most popular</span>}
              <div className="flex items-center gap-2"><p.icon className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">{p.name}</h3></div>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1">
                {p.price[cycle] === null ? <span className="text-3xl font-bold">Custom</span> : (<><span className="text-4xl font-bold tabular-nums">${p.price[cycle]}</span><span className="text-sm text-muted-foreground">/ mo</span></>)}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-widest text-primary">{p.credits}</div>
              <button className={`mt-6 h-10 rounded-lg text-sm font-semibold transition-colors ${p.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-surface-2 text-foreground hover:bg-surface-3 border border-border"}`}>{p.cta}</button>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span className="text-foreground/85">{f}</span></li>))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <PricingCalculator />
      <FAQSection />
      <FinalCTA />
    </SiteShell>
  );
}
