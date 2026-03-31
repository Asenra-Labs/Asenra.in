import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="bg-black">
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

      <div className="relative z-50">
        <StatsSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
}
