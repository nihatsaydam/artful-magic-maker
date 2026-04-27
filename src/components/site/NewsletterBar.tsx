import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "crude3d-newsletter-dismissed";

export default function NewsletterBar() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Hmm, that email doesn't look right.");
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list ✨", { description: "Studio updates land in your inbox monthly." });
    setTimeout(dismiss, 1500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="relative rounded-full border border-border bg-surface-1/90 backdrop-blur-xl shadow-[0_10px_40px_hsl(0_0%_0%/0.5)] pl-4 pr-2 h-12 flex items-center gap-3">
            <Mail className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs sm:text-sm text-foreground/90 shrink-0 hidden sm:inline">
              Studio updates monthly
            </span>
            <form onSubmit={submit} className="flex-1 flex items-center gap-1 min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                disabled={submitted}
                className="flex-1 min-w-0 h-8 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitted}
                className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1 hover:bg-primary/90 disabled:opacity-50"
              >
                {submitted ? "✓" : <>Join <ArrowRight className="h-3 w-3" /></>}
              </button>
            </form>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-2 shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
