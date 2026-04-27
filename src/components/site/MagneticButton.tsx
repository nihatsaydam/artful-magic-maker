import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1). Default 0.35 */
  strength?: number;
  as?: "div" | "span";
}

/**
 * MagneticButton — wraps any element so it gently follows the cursor on hover.
 * Pure CSS transform, no re-render per frame.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      data-cursor="hover"
    >
      {children}
    </Tag>
  );
}
