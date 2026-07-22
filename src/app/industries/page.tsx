"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Factory, Stethoscope, Landmark, ShoppingBag, Building2, Hotel, GraduationCap, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

const industries = [
  {
    id: "manufacturing",
    icon: Factory,
    name: "Manufacturing & Heavy Industry",
    tagline: "Predictive maintenance, automated quality inspection, and supply chain telemetry.",
    useCases: [
      "IoT telemetry & predictive machine failure alerting",
      "Computer vision automated assembly line QA",
      "Supplier inventory demand & replenishment forecasting",
      "ERP & warehouse management workflow automation",
    ],
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    name: "Healthcare & Diagnostics",
    tagline: "HIPAA-compliant clinical document AI, patient triage, and workflow pipelines.",
    useCases: [
      "Automated medical record & lab report extraction",
      "Intelligent patient inquiry & booking agents",
      "HIPAA-compliant data anonymization pipelines",
      "Diagnostic report synthesis & doctor review portals",
    ],
  },
  {
    id: "finance",
    icon: Landmark,
    name: "Banking & Financial Services",
    tagline: "Algorithmic compliance reporting, automated risk assessment, and fraud detection.",
    useCases: [
      "Automated financial reconciliation & audit tracking",
      "KYC & document verification intelligence",
      "Real-time transaction anomaly & fraud detection",
      "Executive portfolio analytics & reporting dashboards",
    ],
  },
  {
    id: "retail",
    icon: ShoppingBag,
    name: "Retail & D2C Brands",
    tagline: "Inventory demand forecasting, personalized customer AI, and conversion engines.",
    useCases: [
      "Dynamic pricing & competitor monitoring engines",
      "Personalized recommendation & AI search models",
      "Omnichannel inventory & order sync automation",
      "Customer support AI agents with instant order tracking",
    ],
  },
  {
    id: "real-estate",
    icon: Building2,
    name: "Real Estate & Development",
    tagline: "Automated lead qualification, property valuation models, and buyer portals.",
    useCases: [
      "24/7 lead qualification & scheduling AI agents",
      "Property valuation & market yield estimation models",
      "Automated tenant onboarding & lease agreement generation",
      "Cinematic digital property showcase platforms",
    ],
  },
  {
    id: "hospitality",
    icon: Hotel,
    name: "Hospitality & Luxury Resorts",
    tagline: "Guest experience automation, dynamic booking engines, and AI concierge.",
    useCases: [
      "AI Concierge for guest requests & room service routing",
      "Dynamic room rate optimization engines",
      "Direct booking engines with WhatsApp reservation bots",
      "Guest feedback sentiment analysis & management",
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    name: "Education & EdTech",
    tagline: "Administrative workflow automation, student intelligence, and adaptive platforms.",
    useCases: [
      "Student application & credential verification pipelines",
      "Automated grading assistance & feedback generation",
      "Adaptive learning path algorithms for course completion",
      "Institutional analytics & retention risk dashboards",
    ],
  },
];

export default function IndustriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-[-10%] w-[50%] h-[50%] bg-white/[0.015] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Industry Solutions
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Tailored AI for <br />
            <span className="text-silver-matte">Domain Dynamics.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Generic AI models fail in complex enterprise environments. We deploy industry-specific solutions tailored to your unique operational and regulatory requirements.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="premium-depth-card group p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/50 hover:border-white/20 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="card-sheen" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-white">
                    {ind.name}
                  </h2>
                </div>

                <p className="text-zinc-300 font-semibold text-sm mb-8 leading-snug">
                  {ind.tagline}
                </p>

                <div className="space-y-3 mb-8 pt-6 border-t border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 block mb-2">
                    Key AI Implementations
                  </span>
                  {ind.useCases.map((useCase) => (
                    <div key={useCase} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full py-4 px-6 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(255,255,255,0.15)] group"
              >
                <span>Discuss {ind.name} Blueprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Strategy Consultation Callout */}
        <section className="text-center py-20 border-t border-white/10 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-6">
            Don't see your industry?
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            We architect custom AI engines for complex enterprise operations regardless of domain. Book a technical discovery call today.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Book AI Strategy Session</span>
          </button>
        </section>
      </div>

      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="vt3flmg8"
      />
    </main>
  );
}
