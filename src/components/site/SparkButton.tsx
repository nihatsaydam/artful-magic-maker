import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * SparkButton — wraps any element. On hover, emits short-lived particle sparks
 * from the cursor position. Cheap DOM-based particles, no canvas.
 */
export default function SparkButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(0);

  const spawn = (e: MouseEvent<HTMLSpanElement>) => {
    const now = performance.now();
    if (now - last.current < 60) return; // throttle
    last.current = now;
    const host = ref.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 3; i++) {
      const s = document.createElement("span");
      const dx = (Math.random() - 0.5) * 60;
      const dy = -20 - Math.random() * 40;
      s.className = "spark-particle";
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.setProperty("--dx", `${dx}px`);
      s.style.setProperty("--dy", `${dy}px`);
      host.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  };

  return (
    <span
      ref={ref}
      onMouseMove={spawn}
      className={`relative inline-block isolate ${className}`}
    >
      {children}
    </span>
  );
}
