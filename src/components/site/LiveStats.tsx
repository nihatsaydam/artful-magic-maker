import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  format?: "comma" | "compact";
};

const STATS: Stat[] = [
  { value: 3247, label: "Models generated today", format: "comma" },
  { value: 89422, label: "Active sculptors", format: "comma" },
  { value: 1.2, suffix: "M", label: "Renders shipped", format: "compact" },
];

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => {
    if (stat.format === "compact") return latest.toFixed(1);
    return Math.floor(latest).toLocaleString("en-US");
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, stat.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, mv, stat.value]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{display}</motion.span>
      {stat.suffix && <span>{stat.suffix}</span>}
    </span>
  );
}

export default function LiveStats() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl 2xl:max-w-3xl w-full">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
          className="text-center sm:text-left"
        >
          <div className="text-2xl sm:text-3xl 2xl:text-4xl font-bold tracking-tight text-foreground tabular-nums">
            <Counter stat={s} />
          </div>
          <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider">
            {s.label}
          </div>
          {/* live dot */}
          <div className="mt-2 hidden sm:flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            LIVE
          </div>
        </motion.div>
      ))}
    </div>
  );
}
