import { ReactNode, useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ContextualCursor from "@/components/site/ContextualCursor";
import GrainOverlay from "@/components/site/GrainOverlay";
import FloatingEditorCTA from "@/components/site/FloatingEditorCTA";
import NewsletterBar from "@/components/site/NewsletterBar";
import ScrollProgress from "@/components/site/ScrollProgress";
import SectionDots from "@/components/site/SectionDots";

export default function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col relative">
      <ScrollProgress />
      <GrainOverlay />
      <ContextualCursor />
      <SiteHeader />
      <SectionDots />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingEditorCTA />
      <NewsletterBar />
    </div>
  );
}
