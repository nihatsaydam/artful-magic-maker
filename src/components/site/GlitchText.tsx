import { useState, type ReactNode } from "react";

/**
 * GlitchText — wraps text and triggers a brief RGB-split / scramble glitch on hover.
 * Pure CSS keyframes (defined in styles.css) keep cost minimal.
 */
export default function GlitchText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const [hover, setHover] = useState(false);
  const text = typeof children === "string" ? children : "";

  return (
    <Tag
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative inline-block ${className}`}
      data-text={text}
    >
      <span className="relative z-10">{children}</span>
      {hover && text && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 z-0 text-primary opacity-80 mix-blend-screen pointer-events-none animate-glitch-1"
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-0 text-[#5060ff] opacity-80 mix-blend-screen pointer-events-none animate-glitch-2"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
