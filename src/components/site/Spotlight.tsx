import { useRef, useState, ReactNode } from "react";

/**
 * Spotlight — mouse-following radial gradient aurora.
 * Wrap any section with this to get a premium "light follows cursor" effect.
 *
 * Usage:
 *   <Spotlight color="primary" size={600}>
 *     <section>...</section>
 *   </Spotlight>
 */
type Props = {
  children: ReactNode;
  className?: string;
  /** Tailwind / token color name. Defaults to primary. */
  color?: "primary" | "neon" | "foreground";
  /** Diameter of the spotlight in px. */
  size?: number;
  /** Opacity of the spotlight 0..1. */
  intensity?: number;
};

const COLOR_VAR: Record<NonNullable<Props["color"]>, string> = {
  primary: "var(--primary)",
  neon: "var(--neon)",
  foreground: "var(--foreground)",
};

export default function Spotlight({
  children,
  className = "",
  color = "primary",
  size = 600,
  intensity = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={`relative ${className}`}
    >
      {/* Aurora layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, hsl(${COLOR_VAR[color]} / ${intensity}), transparent 70%)`,
        }}
      />
      {/* Soft secondary halo (always faintly visible) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(${size * 1.4}px circle at ${pos.x}px ${pos.y}px, hsl(${COLOR_VAR[color]} / ${intensity * 0.25}), transparent 75%)`,
          opacity: active ? 0.6 : 0,
          transition: "opacity 700ms ease",
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
