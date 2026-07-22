"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BarChart3, TrendingUp, CheckCircle2, PhoneCall } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

const caseStudiesList = [
  {
    id: "healthcare-ai-pipeline",
    client: "Regional Diagnostic & Hospital Network",
    industry: "Healthcare & Life Sciences",
    headline: "70% Processing Friction Elimination via HIPAA-Compliant Document AI",
    metrics: [
      { label: "Processing Speed", value: "70% Faster" },
      { label: "Error Rate Reduction", value: "99.2%" },
      { label: "Monthly Time Saved", value: "1,400 Hours" },
    ],
    challenge: "The hospital network managed over 15,000 monthly paper & PDF lab diagnostics manually, causing diagnostic delays and administrative backlog.",
    solution: "Asenra deployed a secure, HIPAA-compliant document intelligence pipeline using custom OCR and domain LLM models that automatically extracts, validates, and routes lab reports directly into the electronic health record (EHR) system.",
    impact: "Turnaround time per patient record dropped from 45 minutes to under 90 seconds, freeing 35+ full-time medical administrators for direct patient care.",
  },
  {
    id: "logistics-automation-engine",
    client: "Apex Transnational Logistics",
    industry: "Supply Chain & Freight Logistics",
    headline: "$1.2M Annual Operational Cost Savings through Autonomous Freight Dispatch",
    metrics: [
      { label: "Annual Overhead Saved", value: "$1.2M" },
      { label: "Dispatch Accuracy", value: "99.8%" },
      { label: "Fuel Cost Efficiency", value: "+18%" },
    ],
    challenge: "Managing 450+ active fleet vehicles via manual spreadsheets caused route inefficiencies, delayed customer notifications, and idle vehicle costs.",
    solution: "Engineered a custom automated dispatch agent and real-time telemetry engine that dynamically optimizes driver routes, predicts delivery bottlenecks, and issues automated customer tracking updates.",
    impact: "Fleet fuel utilization improved by 18%, while customer inquiry calls plummeted by 82% due to proactive automated status alerts.",
  },
  {
    id: "manufacturing-predictive-ai",
    client: "Vanguard Precision Components",
    industry: "Industrial Manufacturing",
    headline: "99.4% Machine Uptime Achieved via IoT Telemetry & Computer Vision QA",
    metrics: [
      { label: "Line Uptime Rate", value: "99.4%" },
      { label: "Scrap Material Reduction", value: "34%" },
      { label: "Defect Detection", value: "Sub-10ms" },
    ],
    challenge: "Unplanned CNC machinery failure costs averaged $85,000 per breakdown hour, with manual QA inspections missing micro-defects during high-speed runs.",
    solution: "Installed high-speed edge computer vision inspection cameras combined with vibration & temperature IoT telemetry models to detect component wear before physical breakdown.",
    impact: "Unplanned downtime was completely eliminated for two consecutive quarters, saving over $2.4M in potential lost factory capacity.",
  },
  {
    id: "d2c-conversion-platform",
    client: "Elysian Atelier Luxury Apparel",
    industry: "Retail & D2C E-Commerce",
    headline: "3.4x Conversion Rate Uplift via Custom Edge Platform & Personalization AI",
    metrics: [
      { label: "Conversion Rate Uplift", value: "3.4x" },
      { label: "Page Load Performance", value: "65ms (Global Edge)" },
      { label: "Average Order Value", value: "+42%" },
    ],
    challenge: "Legacy e-commerce platform suffered from 4.2-second mobile load times and a high cart abandonment rate of 78%.",
    solution: "Rebuilt digital architecture on modern Next.js edge infrastructure with cinematic WebGL product showcases and an AI personal styling recommendation bot.",
    impact: "Page load speed improved by 95%, cart conversions quadrupled, and return on ad spend (ROAS) doubled within 60 days of launch.",
  },
];

export default function CaseStudiesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Glow Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Proof of Impact
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Enterprise Results. <br />
            <span className="text-silver-matte">Proven ROI.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Explore how Asenra partners with ambitious enterprises to eliminate operational friction, automate complex workflows, and unlock millions in business value.
          </p>
        </div>

        {/* Case Studies Deep Dive List */}
        <div className="space-y-16 mb-32">
          {caseStudiesList.map((cs) => (
            <div
              key={cs.id}
              className="premium-depth-card group p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/60 backdrop-blur-2xl transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="card-sheen" />

              <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10 pb-8 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 border border-white/10 px-3 py-1 rounded-full mb-4 inline-block">
                    {cs.industry}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-3">
                    {cs.headline}
                  </h2>
                  <p className="text-zinc-400 text-sm font-bold mt-2">{cs.client}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 bg-white/5 border border-white/10 p-6 rounded-2xl">
                {cs.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400 block mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Challenge / Solution / Impact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">
                    01. The Challenge
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium">
                    {cs.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white mb-3">
                    02. Asenra Solution
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-medium">
                    {cs.solution}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">
                    03. Measurable Impact
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium">
                    {cs.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy Consultation Callout */}
        <section className="text-center py-20 border-t border-white/10 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-6">
            Ready to achieve similar enterprise results?
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            Schedule a strategy call with our lead engineering team to review your current tech stack and identify high-value AI solutions.
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
