"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

export default function CompanyPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-36 pb-40 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.012] rounded-full blur-[180px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 font-sans">
        
        {/* Minimal Category Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-500 block mb-6">
            Founder Philosophy & Manifesto
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white leading-[0.95]">
            Why Asenra Exists.
          </h1>
        </div>

        {/* Apple Style Long-Form Minimal Essay */}
        <article className="space-y-12 text-zinc-300 text-lg sm:text-xl leading-relaxed font-normal tracking-tight">
          <p className="text-white text-2xl sm:text-3xl font-light leading-snug tracking-tight">
            Most software built for businesses today is fragile, complex, and unnecessarily bloated. We believe software should create immediate, measurable business impact.
          </p>

          <hr className="border-white/10 my-12" />

          <section className="space-y-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em]">
              01 / Why Asenra Exists
            </h2>
            <p>
              Asenra was founded on a simple realization: ambitious companies spend millions operating legacy software, manual back-offices, and fragmented spreadsheets that slow down execution.
            </p>
            <p>
              We don't operate as a generic digital marketing agency or a temporary dev shop. We operate as an enterprise systems integrator and AI consultancy. We build the core digital infrastructure that lets businesses automate repetitive tasks, scale operations without exploding headcount, and dominate their category.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em]">
              02 / Why Artificial Intelligence Matters
            </h2>
            <p>
              Artificial Intelligence is not a marketing gimmick or a party trick. It represents a fundamental shift in how human work is structured.
            </p>
            <p>
              For the first time in computing history, software can parse unstructured data, reason over complex business rules, and execute multi-step workflows autonomously. When applied correctly to enterprise operations, AI transforms hours of manual friction into milliseconds of computational certainty.
            </p>
            <p>
              However, off-the-shelf AI widgets fail because they lack domain context and security controls. Real business impact requires custom AI pipelines fine-tuned on proprietary operational data and integrated deeply into existing enterprise infrastructure.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em]">
              03 / What Future We're Building
            </h2>
            <p>
              We are building a future where every ambitious business runs on intelligent, self-optimizing infrastructure.
            </p>
            <p>
              A future where routine administrative burden is handled by autonomous background agents, allowing human teams to focus exclusively on high-level strategy, creative direction, and relationship building.
            </p>
            <p>
              We measure our success not by awards or vanity metrics, but by the tangible ROI, operational speed, and profit expansion we unlock for our partners.
            </p>
          </section>

          <hr className="border-white/10 my-12" />

          <div className="space-y-4 pt-4">
            <p className="text-white font-bold text-base">
              The Asenra Leadership Team
            </p>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
              Engineered with conviction · Operations Pan-India & Global
            </p>
          </div>
        </article>

        {/* Action Button */}
        <div className="mt-20 text-center pt-12 border-t border-white/10">
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Book AI Strategy Session</span>
          </button>
        </div>

      </div>

      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="vt3flmg8"
      />
    </main>
  );
}
