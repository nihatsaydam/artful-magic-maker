import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (l) => l.pathname });
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="contents"
    >
      {children}
    </motion.div>
  );
}
