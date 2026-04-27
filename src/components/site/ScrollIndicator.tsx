import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="grid place-items-center h-9 w-9 rounded-full border border-border bg-surface-1/60 backdrop-blur-sm"
      >
        <ChevronDown className="h-4 w-4 text-primary" />
      </motion.div>
    </motion.div>
  );
}
