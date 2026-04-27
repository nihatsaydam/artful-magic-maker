import { motion } from "framer-motion";

interface Props {
  /** Position variant for visual variety between sections. */
  variant?: "a" | "b" | "c";
  className?: string;
}

/**
 * GradientMesh — animated blurred gradient blobs, used as section dividers
 * to bind blocks together with a continuous, "alive" backdrop (Stripe-style).
 * Pure CSS/Framer — no WebGL dependency.
 */
export default function GradientMesh({ variant = "a", className = "" }: Props) {
  const blobs =
    variant === "a"
      ? [
          { c: "bg-primary/25", size: "h-[36rem] w-[36rem]", pos: "top-[-10%] left-[-8%]" },
          { c: "bg-neon/15",    size: "h-[28rem] w-[28rem]", pos: "bottom-[-15%] right-[-6%]" },
          { c: "bg-primary/15", size: "h-[22rem] w-[22rem]", pos: "top-[40%] left-[55%]" },
        ]
      : variant === "b"
      ? [
          { c: "bg-neon/20",    size: "h-[32rem] w-[32rem]", pos: "top-[-15%] right-[-10%]" },
          { c: "bg-primary/20", size: "h-[26rem] w-[26rem]", pos: "bottom-[-10%] left-[-5%]" },
          { c: "bg-primary/10", size: "h-[20rem] w-[20rem]", pos: "top-[30%] left-[20%]" },
        ]
      : [
          { c: "bg-primary/20", size: "h-[34rem] w-[34rem]", pos: "top-[-20%] left-[40%]" },
          { c: "bg-neon/10",    size: "h-[28rem] w-[28rem]", pos: "bottom-[-10%] right-[20%]" },
          { c: "bg-primary/15", size: "h-[24rem] w-[24rem]", pos: "top-[20%] left-[-5%]" },
        ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.c} ${b.size} ${b.pos}`}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Soft vignette to fade edges into the background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background)/0.85)_100%)]" />
    </div>
  );
}
