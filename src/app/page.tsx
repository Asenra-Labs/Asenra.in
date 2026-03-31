import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { PricingSection } from "@/components/sections/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CinematicHero 
        brandName="ASENRA"
        brandLogo="/logo.png"
        brandTextLogo="/asenra-full-logo.png"
        tagline1="Tech That Doubles"
        tagline2="Your Business Revenue"
        cardHeading="One-Stop SMB Tech"
        cardDescription="Websites • Bots • AI Agents • Apps for tiffins, shops, salons."
        metricValue={50}
        metricLabel="Clients"
        ctaHeading="Get Your Free Audit"
        ctaDescription="Book a call. Launch in 7 days."
      />
      
      <PricingSection />
    </main>
  );
}
