import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";

type Artist = {
  name: string;
  handle: string;
  studio: string;
  works: { title: string; tone: string }[];
};

const ARTISTS: Artist[] = [
  {
    name: "Yuna Sato",
    handle: "@yunaforge",
    studio: "Forge Atelier",
    works: [
      { title: "Oni Mask", tone: "from-red-500 to-rose-700" },
      { title: "Helmet 04", tone: "from-rose-500 to-orange-500" },
      { title: "Crown", tone: "from-orange-400 to-red-500" },
    ],
  },
  {
    name: "Marco Velez",
    handle: "@velezstudio",
    studio: "Nocturne Lab",
    works: [
      { title: "Drift Hull", tone: "from-cyan-400 to-blue-600" },
      { title: "Skiff 12", tone: "from-sky-400 to-indigo-600" },
      { title: "Hover Bike", tone: "from-blue-500 to-violet-600" },
    ],
  },
  {
    name: "Aisha Okafor",
    handle: "@aisha3d",
    studio: "Solstice Works",
    works: [
      { title: "Bloom Idol", tone: "from-fuchsia-500 to-pink-500" },
      { title: "Vase 09", tone: "from-pink-400 to-rose-500" },
      { title: "Petal Cage", tone: "from-rose-400 to-fuchsia-600" },
    ],
  },
  {
    name: "Liam Reid",
    handle: "@liambuilds",
    studio: "Northwind",
    works: [
      { title: "Tundra Wolf", tone: "from-slate-400 to-zinc-600" },
      { title: "Crag Beast", tone: "from-stone-400 to-slate-700" },
      { title: "Frost Mech", tone: "from-zinc-300 to-slate-500" },
    ],
  },
  {
    name: "Hana Park",
    handle: "@hana.poly",
    studio: "Studio Mirror",
    works: [
      { title: "Glass Idol", tone: "from-emerald-400 to-teal-600" },
      { title: "Bloom 02", tone: "from-teal-400 to-cyan-500" },
      { title: "Reflect", tone: "from-emerald-300 to-emerald-700" },
    ],
  },
  {
    name: "Diego Funes",
    handle: "@funesfx",
    studio: "Cinder Co.",
    works: [
      { title: "Magma Core", tone: "from-orange-500 to-red-700" },
      { title: "Ash Crow", tone: "from-orange-500 to-red-700" },
      { title: "Pyre", tone: "from-orange-400 to-rose-600" },
    ],
  },
];

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-1/70 backdrop-blur-sm p-5 hover:border-primary/40 transition-colors h-full">
      {/* avatar + name */}
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary/40 grid place-items-center text-primary-foreground font-bold text-sm">
          {artist.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          <span className="absolute -bottom-0.5 -right-0.5 grid place-items-center h-4 w-4 rounded-full bg-background">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          </span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">
            {artist.name}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {artist.handle} · {artist.studio}
          </div>
        </div>
      </div>

      {/* top 3 works */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {artist.works.map((w) => (
          <div key={w.title} className="group/w relative aspect-square rounded-lg overflow-hidden border border-border">
            <div className={`absolute inset-0 bg-gradient-to-br ${w.tone}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--background)/0)_0%,hsl(var(--background)/0.6)_100%)]" />
            <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] text-white/90 uppercase tracking-wider truncate">
              {w.title}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">12.4k followers</span>
        <button className="text-primary hover:underline">View profile →</button>
      </div>
    </div>
  );
}

export default function FeaturedArtistsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="artists" className="relative py-20 md:py-28 2xl:py-36 overflow-hidden">
      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
              Featured artists
            </div>
            <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
              Sculptors shaping{" "}
              <span className="italic font-serif font-normal text-primary">
                the studio.
              </span>
            </h2>
            <p className="mt-4 text-base 2xl:text-lg text-muted-foreground">
              A rotating spotlight on the makers who push the engine the furthest each week.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className="grid place-items-center h-10 w-10 rounded-full border border-border bg-surface-1 text-foreground hover:bg-surface-2 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next"
              className="grid place-items-center h-10 w-10 rounded-full border border-border bg-surface-1 text-foreground hover:bg-surface-2 disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-5 2xl:gap-6">
            {ARTISTS.map((a) => (
              <div
                key={a.name}
                className="flex-[0_0_85%] sm:flex-[0_0_55%] md:flex-[0_0_42%] lg:flex-[0_0_32%] xl:flex-[0_0_26%] min-w-0"
              >
                <ArtistCard artist={a} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
