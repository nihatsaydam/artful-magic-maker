import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Bookmark, Sparkles, X, User as UserIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Item {
  id: number;
  title: string;
  author: string;
  cats: string[];
  img: string;
  likes: number;
}

function TiltCard({ item, onOpen, index }: { item: Item; onOpen: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-square rounded-2xl overflow-hidden border border-border bg-surface-1 hover:border-primary/40 transition-colors cursor-pointer"
    >
      <div style={{ transform: "translateZ(0)" }} className="absolute inset-0">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
      </div>

      <button
        aria-label="Bookmark"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: "translateZ(30px)" }}
        className="absolute top-2.5 left-2.5 h-7 w-7 grid place-items-center rounded-md bg-black/55 backdrop-blur-sm border border-white/10 text-foreground/80 hover:text-primary"
      >
        <Bookmark className="h-3.5 w-3.5" />
      </button>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/80 to-primary-glow shrink-0 grid place-items-center text-[10px] font-bold text-primary-foreground">
            {item.author[0].toUpperCase()}
          </div>
          <span className="text-xs text-foreground/90 truncate">{item.author}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-foreground/90">
          <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> {item.likes}
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryGridItem({ item, index }: { item: Item; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TiltCard item={item} onOpen={() => setOpen(true)} index={index} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-surface-1 border-border">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 relative aspect-square md:aspect-auto bg-black">
              <img src={item.img} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col gap-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">
                  {item.cats.join(" · ")}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">{item.title}</h3>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-primary-glow grid place-items-center text-sm font-bold text-primary-foreground">
                  {item.author[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{item.author}</div>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <UserIcon className="h-3 w-3" /> Featured artist
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-surface-2 border border-border p-2">
                  <div className="text-base font-bold text-foreground">{item.likes}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Likes</div>
                </div>
                <div className="rounded-lg bg-surface-2 border border-border p-2">
                  <div className="text-base font-bold text-foreground">GLB</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Format</div>
                </div>
                <div className="rounded-lg bg-surface-2 border border-border p-2">
                  <div className="text-base font-bold text-foreground">4K</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bakes</div>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <Link
                  to="/edit"
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                >
                  <Sparkles className="h-4 w-4" /> Remix in Editor
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 h-10 rounded-full border border-border bg-surface-2 hover:bg-surface-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" /> Close
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
