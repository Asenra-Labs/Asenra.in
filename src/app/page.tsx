import { Hero } from "@/components/sections/home/Hero";
import { Showcase } from "@/components/sections/home/Showcase";
import { TrustedTechnologies } from "@/components/sections/TrustedTechnologies";
import { WhyAsenra } from "@/components/sections/WhyAsenra";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CaseStudiesTeaser } from "@/components/sections/CaseStudiesTeaser";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <TrustedTechnologies />
      <Showcase />
      <WhyAsenra />
      <WhoWeWorkWith />
      <SolutionsPreview />
      <ProcessSection />
      <CaseStudiesTeaser />
    </main>
  );
}
