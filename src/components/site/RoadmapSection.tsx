import { motion } from "framer-motion";
import { Check, Wrench, Sparkles } from "lucide-react";
import GradientMesh from "@/components/site/GradientMesh";

type Status = "shipped" | "building" | "next";

type Item = {
  date: string;
  status: Status;
  title: string;
  body: string;
  tags?: string[];
};

const TIMELINE: Item[] = [
  {
    date: "Apr 2026",
    status: "next",
    title: "Animation graphs (beta)",
    body: "Visual timeline editor for rigs. Layer poses, blend states, export to glTF animations.",
    tags: ["Editor", "Rigging"],
  },
  {
    date: "Mar 2026",
    status: "building",
    title: "Procedural materials",
    body: "Node-based PBR with live preview. Import from Substance, export packed channels.",
    tags: ["Materials"],
  },
  {
    date: "Feb 2026",
    status: "shipped",
    title: "Voxel Remesh 2.0",
    body: "10× faster topology pass with adaptive density. Now handles 8M-poly inputs comfortably.",
    tags: ["Engine"],
  },
  {
    date: "Jan 2026",
    status: "shipped",
    title: "API access (private beta)",
    body: "REST + webhooks for Studio plans. Generate, retopo, and export from your pipeline.",
    tags: ["API"],
  },
  {
    date: "Dec 2025",
    status: "shipped",
    title: "4K texture bake",
    body: "Full PBR set: albedo, normal, roughness, metallic, AO, displacement. 16-bit PNG / EXR.",
    tags: ["Bake"],
  },
  {
    date: "Nov 2025",
    status: "shipped",
    title: "Public gallery + remix",
    body: "Share sculpts, fork prompts, and credit the original artist automatically.",
    tags: ["Community"],
  },
];

const STATUS_META: Record<
  Status,
  { label: string; dot: string; icon: typeof Check; pill: string }
> = {
  shipped: {
    label: "Shipped",
    dot: "bg-primary border-primary",
    icon: Check,
    pill: "bg-primary/10 text-primary border-primary/30",
  },
  building: {
    label: "Building",
    dot: "bg-foreground border-foreground",
    icon: Wrench,
    pill: "bg-foreground/10 text-foreground border-foreground/30",
  },
  next: {
    label: "Up next",
    dot: "bg-background border-border",
    icon: Sparkles,
    pill: "bg-surface-2 text-muted-foreground border-border",
  },
};

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-20 md:py-28 2xl:py-36 overflow-hidden">
      <GradientMesh variant="b" />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Roadmap · changelog
          </div>
          <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
            Built in the open,{" "}
            <span className="italic font-serif font-normal text-primary">
              shipped weekly.
            </span>
          </h2>
          <p className="mt-4 text-base 2xl:text-lg text-muted-foreground max-w-xl">
            What's live, what's cooking, what's next. No vapourware.
          </p>

          {/* legend */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            {(Object.keys(STATUS_META) as Status[]).map((s) => (
              <span
                key={s}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${STATUS_META[s].pill}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_META[s].dot.split(" ")[0]}`} />
                {STATUS_META[s].label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* vertical line */}
          <div
            aria-hidden
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px"
          />

          <ul className="space-y-10 md:space-y-14">
            {TIMELINE.map((item, i) => {
              const meta = STATUS_META[item.status];
              const Icon = meta.icon;
              const onLeft = i % 2 === 0;

              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10"
                >
                  {/* dot */}
                  <span
                    className={`absolute left-4 md:left-1/2 top-3 -translate-x-1/2 grid place-items-center h-6 w-6 rounded-full border-2 ${meta.dot} z-10`}
                  >
                    <Icon className="h-3 w-3 text-background" strokeWidth={3} />
                  </span>

                  {/* date side */}
                  <div className={`md:text-right ${onLeft ? "" : "md:order-2 md:text-left"} mb-3 md:mb-0`}>
                    <div className={`md:${onLeft ? "pr-10" : "pl-10"}`}>
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {item.date}
                      </div>
                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider ${meta.pill}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  {/* content side */}
                  <div className={`${onLeft ? "" : "md:order-1"}`}>
                    <div className={`md:${onLeft ? "pl-10" : "pr-10 md:text-right"}`}>
                      <div className="rounded-2xl border border-border bg-surface-1/70 backdrop-blur-sm p-5 hover:border-primary/40 transition-colors">
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {item.body}
                        </p>
                        {item.tags && (
                          <div className={`mt-3 flex flex-wrap gap-1.5 ${!onLeft ? "md:justify-end" : ""}`}>
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-surface-2 px-2 py-0.5 rounded-full"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
