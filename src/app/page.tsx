import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CaseStudiesTeaser } from "@/components/sections/CaseStudiesTeaser";
import { ProductsSection } from "@/components/sections/ProductsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CinematicHero 
        brandName="ASENRA"
        brandLogo="/logo.png"
        brandTextLogo="/asenra-full-logo.png"
        tagline1="Enterprise AI Consulting."
        tagline2="Intelligent Business Systems."
        cardHeading="Enterprise AI & Business Automation"
        cardDescription="We help ambitious businesses implement AI, automate operations, and build digital infrastructure that scales."
        metricValue={50}
        metricLabel="Enterprises Scaled"
        ctaHeading="Transform Your Business."
        ctaDescription="Book an AI strategy session or request a free technology audit to pinpoint high-ROI automation opportunities."
      />
      
      <SolutionsPreview />

      <ProcessSection />

      <CaseStudiesTeaser />
      
      <ProductsSection />
    </main>
  );
}
