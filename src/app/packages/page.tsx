import React from "react";
import { PricingSection } from "@/components/sections/PricingSection";
import Metadata from "next";

export const metadata = {
  title: "Website & Digital Packages | Asenra",
  description: "Explore our fixed-scope website and digital infrastructure packages tailored for modern brands.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
            Transparent Scopes
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
            Digital Infrastructure <br />
            <span className="text-silver-matte">& Web Packages.</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg font-medium leading-relaxed">
            Fixed-scope development packages engineered for rapid deployment, high performance, and cinematic visual design.
          </p>
        </div>

        <PricingSection />
      </div>
    </main>
  );
}
