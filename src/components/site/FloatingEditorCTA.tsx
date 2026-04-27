import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FloatingEditorCTA() {
  const pathname = useLocation({ select: (l) => l.pathname });
  // Hide on the editor itself & auth pages
  const hide = ["/edit", "/login", "/signup"].includes(pathname);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            to="/edit"
            className="group relative inline-flex items-center gap-2 h-12 pl-4 pr-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-[0_8px_28px_hsl(var(--primary)/0.45)] hover:shadow-[0_10px_36px_hsl(var(--primary)/0.6)] transition-shadow"
          >
            <span className="absolute inset-0 rounded-full bg-primary blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
            <Sparkles className="h-4 w-4" />
            Try the editor
            <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
