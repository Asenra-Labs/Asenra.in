import { PricingSection } from "@/components/sections/PricingSection";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = {
  title: "Website & Digital Packages | Asenra",
  description:
    "Explore our fixed-scope website and digital infrastructure packages tailored for modern brands.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Transparent scopes"
        title={
          <>
            Digital infrastructure
            <br />
            & web packages.
          </>
        }
        lede="Fixed-scope development packages engineered for rapid deployment, high performance, and cinematic visual design."
      />

      <PricingSection />
    </main>
  );
}
