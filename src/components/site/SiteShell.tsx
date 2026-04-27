import { ReactNode, useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import CustomCursor from "@/components/site/CustomCursor";
import GrainOverlay from "@/components/site/GrainOverlay";
import FloatingEditorCTA from "@/components/site/FloatingEditorCTA";
import NewsletterBar from "@/components/site/NewsletterBar";
import ScrollProgress from "@/components/site/ScrollProgress";

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
      <CustomCursor />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingEditorCTA />
      <NewsletterBar />
    </div>
  );
}
