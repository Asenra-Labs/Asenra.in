import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { TrustedTechnologies } from "@/components/sections/TrustedTechnologies";
import { WhyAsenra } from "@/components/sections/WhyAsenra";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CaseStudiesTeaser } from "@/components/sections/CaseStudiesTeaser";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CinematicHero 
        brandName="ASENRA"
        brandLogo="/logo.png"
        brandTextLogo="/asenra-full-logo.png"
        tagline1="Enterprise AI Consulting."
        tagline2="Intelligent Business Systems."
        cardHeading="AI & Business Systems Consulting"
        cardDescription="We help businesses design, implement, and scale intelligent systems powered by AI."
        metricValue={50}
        metricLabel="Systems Deployed"
        ctaHeading="Transform Your Business."
        ctaDescription="Book an AI strategy session or request an AI readiness assessment to pinpoint high-ROI opportunities."
      />

      <TrustedTechnologies />

      <WhyAsenra />

      <WhoWeWorkWith />
      
      <SolutionsPreview />

      <ProcessSection />

      <CaseStudiesTeaser />
    </main>
  );
}
