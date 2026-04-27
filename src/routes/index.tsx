import { createFileRoute } from "@tanstack/react-router";
import SiteShell from "@/components/site/SiteShell";
import Hero from "@/components/site/Hero";
import HowItWorksSection from "@/components/site/HowItWorksSection";
import FeaturedArtistsSection from "@/components/site/FeaturedArtistsSection";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import GallerySection from "@/components/site/GallerySection";
import RoadmapSection from "@/components/site/RoadmapSection";
import BlogSection from "@/components/site/BlogSection";
import FAQSection from "@/components/site/FAQSection";
import CreditsSection from "@/components/site/CreditsSection";
import FinalCTA from "@/components/site/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRUDE 3D — AI-native sculpting & rendering studio" },
      { name: "description", content: "Sculpt, texture and render 3D worlds with AI in your browser." },
      { property: "og:title", content: "CRUDE 3D — AI-native sculpting & rendering studio" },
      { property: "og:description", content: "Sculpt, texture and render 3D worlds with AI in your browser." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <h1 className="sr-only">CRUDE 3D — AI-native sculpting & rendering studio</h1>
      <Hero />
      <HowItWorksSection />
      <GallerySection preview />
      <FeaturedArtistsSection />
      <TestimonialsSection />
      <RoadmapSection />
      <BlogSection />
      <CreditsSection />
      <FinalCTA />
      <FAQSection />
    </SiteShell>
  );
}
