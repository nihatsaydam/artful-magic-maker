import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import GradientMesh from "@/components/site/GradientMesh";

const STUDIOS = [
  "ARCFIELD",
  "NOCTURNE",
  "KOI/LAB",
  "MERIDIAN",
  "FORGE ATELIER",
  "NORTHWIND",
  "STUDIO MIRROR",
  "CINDER CO.",
  "PARALLAX",
  "SOLSTICE",
];

const QUOTES = [
  {
    body: "We replaced three weeks of concept iteration with about forty minutes in CRUDE. Our art director still doesn't believe the turnaround.",
    name: "Iris Hahn",
    role: "Art Director",
    studio: "Nocturne Lab",
    initials: "IH",
  },
  {
    body: "The retopology alone is worth it. Game-ready meshes straight out of a sculpt session — no babysitting required.",
    name: "Tomas Albrecht",
    role: "Tech Artist",
    studio: "Arcfield",
    initials: "TA",
  },
  {
    body: "It feels less like a tool and more like a collaborator that happens to be very fast and never gets bored.",
    name: "Renée Caillou",
    role: "Founder",
    studio: "Koi/Lab",
    initials: "RC",
  },
  {
    body: "Our pitch decks now ship with rendered hero shots instead of mood boards. That alone changed how clients respond.",
    name: "David Okwu",
    role: "Creative Lead",
    studio: "Meridian",
    initials: "DO",
  },
];

function QuoteCard({
  q,
  index,
}: {
  q: (typeof QUOTES)[number];
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-surface-1/70 backdrop-blur-sm p-6 2xl:p-8 flex flex-col h-full hover:border-primary/40 transition-colors"
    >
      <Quote className="h-5 w-5 text-primary/70" />
      <blockquote className="mt-4 text-base 2xl:text-lg text-foreground/90 leading-relaxed flex-1">
        “{q.body}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/40 grid place-items-center text-primary-foreground text-xs font-bold">
          {q.initials}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">{q.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {q.role} · {q.studio}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export default function TestimonialsSection() {
  // duplicate for seamless marquee
  const loop = [...STUDIOS, ...STUDIOS];

  return (
    <section id="testimonials" className="relative py-20 md:py-28 2xl:py-36 overflow-hidden">
      <GradientMesh variant="c" />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Trusted by studios
          </div>
          <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
            What teams are{" "}
            <span className="italic font-serif font-normal text-primary">
              shipping with it.
            </span>
          </h2>
          <p className="mt-4 text-base 2xl:text-lg text-muted-foreground max-w-xl">
            From two-person ateliers to in-house studios at major IP holders.
          </p>
        </motion.div>

        {/* quotes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 2xl:gap-6">
          {QUOTES.map((q, i) => (
            <QuoteCard key={q.name} q={q} index={i} />
          ))}
        </div>

        {/* marquee */}
        <div className="mt-16 relative">
          <div className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Studios using CRUDE 3D in production
          </div>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-12 animate-marquee whitespace-nowrap py-2">
              {loop.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
