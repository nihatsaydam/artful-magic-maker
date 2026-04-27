import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, LayoutGrid, Printer, Star,
  User, Car, Cat, Building2, Sofa, Box, Sword, Shirt, Cog, UtensilsCrossed, Trees, Bone, Plus,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import GradientMesh from "@/components/site/GradientMesh";
import GalleryGridItem from "@/components/site/GalleryGridItem";
import GalleryCardSkeleton from "@/components/site/GalleryCardSkeleton";
import shopImg from "@/assets/shop-card.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

type Cat =
  | "All" | "Featured" | "3D Print" | "Character" | "Vehicle" | "Animal"
  | "Architecture" | "Furniture" | "Object" | "Weapon" | "Outfit"
  | "Mechanical" | "Food" | "Nature" | "Skeleton";

const CATEGORIES: { key: Cat; icon: any }[] = [
  { key: "All", icon: LayoutGrid },
  { key: "3D Print", icon: Printer },
  { key: "Featured", icon: Star },
  { key: "Character", icon: User },
  { key: "Vehicle", icon: Car },
  { key: "Animal", icon: Cat },
  { key: "Architecture", icon: Building2 },
  { key: "Furniture", icon: Sofa },
  { key: "Object", icon: Box },
  { key: "Weapon", icon: Sword },
  { key: "Outfit", icon: Shirt },
  { key: "Mechanical", icon: Cog },
  { key: "Food", icon: UtensilsCrossed },
  { key: "Nature", icon: Trees },
  { key: "Skeleton", icon: Bone },
];

interface Item {
  id: number;
  title: string;
  author: string;
  cats: Cat[];
  img: string;
  likes: number;
  avatar?: string;
}

const ITEMS: Item[] = [
  { id: 1, title: "Oni Samurai Helmet",  author: "kaito.r",            cats: ["Character", "Featured"], img: g1, likes: 109 },
  { id: 2, title: "Crimson Wyrm",        author: "vex.studio",         cats: ["Animal", "Featured"],    img: g2, likes: 76 },
  { id: 3, title: "GT-X Concept",        author: "northpaw",           cats: ["Vehicle", "Featured"],   img: g3, likes: 36 },
  { id: 4, title: "Mochi Bot Mk.II",     author: "yuna.io",            cats: ["Character", "3D Print"], img: g4, likes: 73 },
  { id: 5, title: "Runeblade Aether",    author: "forge.lab",          cats: ["Weapon", "Featured"],    img: g5, likes: 46 },
  { id: 6, title: "Voyager Helm",        author: "drift.fx",           cats: ["Character", "Outfit"],   img: g6, likes: 88 },
  { id: 7, title: "Loot Crate Stylized", author: "pix.guild",          cats: ["Object", "3D Print"],    img: g7, likes: 41 },
  { id: 8, title: "Shell Lounge Chair",  author: "nori.lab",           cats: ["Furniture", "Featured"], img: g8, likes: 62 },
  { id: 9, title: "Tundra Drake",        author: "aristo.k",           cats: ["Animal"],                img: g2, likes: 73 },
  { id:10, title: "Mech Scorpion",       author: "anonymous772",       cats: ["Mechanical"],            img: g1, likes: 46 },
];

interface Props {
  /** Embedded teaser (8 items) on landing — true. Standalone /gallery — false. */
  preview?: boolean;
}

export default function GallerySection({ preview = false }: Props) {
  const [active, setActive] = useState<Cat>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Re-trigger skeleton briefly on category change for premium feel
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [active]);

  const filtered = useMemo(() => {
    const list = active === "All" ? ITEMS : ITEMS.filter((i) => i.cats.includes(active));
    return preview ? list.slice(0, 8) : list;
  }, [active, preview]);

  return (
    <section id="gallery" className="relative">
      <GradientMesh variant="a" />
      <div className="site-container py-20 relative">
        {/* Header row — Tripo-style toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mr-2">Gallery</h2>

          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border bg-surface-1 hover:bg-surface-2 text-sm">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          {/* Scrollable category bar */}
          <div className="flex-1 min-w-0 overflow-x-auto scrollbar-thin">
            <div className="flex items-center gap-2 w-max">
              {CATEGORIES.map(({ key, icon: Icon }) => {
                const isActive = key === active;
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-foreground text-background border-foreground"
                        : "bg-surface-1 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="ml-auto hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 shadow-[0_0_18px_hsl(var(--primary)/0.4)]">
            <Plus className="h-3.5 w-3.5" /> Feature My Model
            <span className="ml-1 px-1.5 py-0.5 rounded bg-background/20 text-[10px] font-mono">+10</span>
          </button>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] xl:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]"
        >
          {/* Featured Shop tile (only on All) */}
          <AnimatePresence>
            {active === "All" && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden border border-border bg-surface-1 group"
              >
                <img
                  src={shopImg}
                  alt="CRUDE Shop"
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-foreground/95 text-background text-[10px] uppercase tracking-widest font-mono">
                  Shop
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <div className="text-2xl md:text-3xl font-extrabold leading-tight">
                    <span className="text-primary">3D FULL-COLORED</span>{" "}
                    <span className="text-foreground">PRINTING</span>
                  </div>
                  <button className="mt-3 inline-flex h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 shadow-[0_0_18px_hsl(var(--primary)/0.4)]">
                    Try it NOW!
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading
            ? Array.from({ length: preview ? 8 : 10 }).map((_, i) => (
                <GalleryCardSkeleton key={`skl-${i}`} />
              ))
            : filtered.map((item, i) => (
                <GalleryGridItem key={item.id} item={item} index={i} />
              ))}
        </motion.div>

        {preview && (
          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-border bg-surface-1 hover:bg-surface-2 text-sm"
            >
              Explore the full gallery →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
