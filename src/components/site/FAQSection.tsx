import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  {
    q: "Do I really own the models I generate?",
    a: "Yes — every paid plan ships with a full commercial license. Use your sculpts in games, films, products, NFTs, anywhere. Free plan outputs are for personal use only.",
  },
  {
    q: "How fast is 'real-time'?",
    a: "Most prompts return a draft mesh in 8–14 seconds on our shared queue. Hi-res passes with 4K bakes finish in under 90 seconds. Studio plans get a dedicated lane.",
  },
  {
    q: "Which formats can I export?",
    a: "GLB, FBX, OBJ, USDZ, and STL out of the box. Bakes ship as 16-bit PNG or EXR. Need something custom? Studio plans include API access.",
  },
  {
    q: "Will my work train your models?",
    a: "No. We never train on user-generated content. Your sculpts, prompts, and references stay private to your workspace.",
  },
  {
    q: "What if I run out of credits?",
    a: "You can top up at any time, or wait for your monthly refill. Unused credits roll over up to one full month on Creator and Studio plans.",
  },
  {
    q: "Do you offer student or studio discounts?",
    a: "Yes — 50% off Creator for verified students and a tiered discount for studios over 5 seats. Drop us a note from the contact page.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden">
      <div className="site-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
              Frequently asked
            </div>
            <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight">
              Everything you'd{" "}
              <span className="italic font-serif font-normal text-primary">
                ask the founders.
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-md">
              Short answers to the questions we hear in every demo. Need more? The
              docs go deep, and our team is one DM away.
            </p>

            <div className="mt-8 hidden lg:block">
              <a
                href="mailto:hi@crude3d.studio"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Talk to a human →
              </a>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium text-foreground hover:text-primary hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
