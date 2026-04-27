import { Plus } from "lucide-react";

interface Props {
  /** Show "+" markers at the corners (default true) */
  corners?: boolean;
  className?: string;
}

/**
 * Subtle gradient divider with optional corner "+" markers.
 * Place between major page sections for a modern AI/studio aesthetic.
 */
export default function SectionDivider({ corners = true, className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`relative h-px w-full bg-gradient-to-r from-transparent via-border to-transparent ${className}`}
    >
      {corners && (
        <>
          <Plus className="absolute -left-1.5 -top-1.5 h-3 w-3 text-border" strokeWidth={1.5} />
          <Plus className="absolute -right-1.5 -top-1.5 h-3 w-3 text-border" strokeWidth={1.5} />
          <Plus className="absolute left-1/2 -translate-x-1/2 -top-1.5 h-3 w-3 text-primary/60" strokeWidth={1.5} />
        </>
      )}
    </div>
  );
}
