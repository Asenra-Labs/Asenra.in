"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Compass, Code, Rocket, Activity, ArrowRight, PhoneCall, ShieldCheck, Layers, Server } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

const detailedProcess = [
  {
    step: "01",
    title: "Business Discovery",
    icon: Search,
    subtitle: "Auditing workflows & identifying high-ROI opportunities.",
    details: [
      "Deep-dive audit of your current software architecture, databases, and operational bottlenecks.",
      "Feasibility evaluation of AI models vs traditional algorithmic automation for your exact domain.",
      "Comprehensive ROI projection detailing estimated labor hours saved and efficiency lift.",
    ],
    outcome: "Deliverable: AI Opportunities Blueprint & ROI Audit Report.",
  },
  {
    step: "02",
    title: "Solution Design",
    icon: Compass,
    subtitle: "Architecting custom blueprints, data privacy & system security.",
    details: [
      "Custom system architecture diagram, vector database schemas, and API integration flows.",
      "Data governance protocol design ensuring zero data leakage and total HIPAA/SOC2 compliance.",
      "User experience & interface prototyping for internal dashboards and customer touchpoints.",
    ],
    outcome: "Deliverable: Technical Specification Document & UX Blueprints.",
  },
  {
    step: "03",
    title: "Implementation",
    icon: Code,
    subtitle: "Agile engineering sprints with daily staging updates.",
    details: [
      "Fine-tuning proprietary domain LLMs, configuring RAG pipelines, and building autonomous agent logic.",
      "Front-end and back-end software engineering built with sub-second response benchmarks.",
      "Daily automated staging deployments allowing real-time client testing and feedback loops.",
    ],
    outcome: "Deliverable: Functional Staging Platform & Tested AI Models.",
  },
  {
    step: "04",
    title: "Deployment",
    icon: Rocket,
    subtitle: "Zero-downtime edge deployment & operational handoff.",
    details: [
      "Zero-downtime production release across global edge networks (Vercel Edge, AWS, Supabase).",
      "Rigorous load testing, security vulnerability scans, and fallback protocol activation.",
      "Staff onboarding workshops, documentation handoff, and operational integration.",
    ],
    outcome: "Deliverable: Live Production Deployment & Operational Handoff.",
  },
  {
    step: "05",
    title: "Optimization",
    icon: Activity,
    subtitle: "Continuous monitoring, fine-tuning & ROI tracking.",
    details: [
      "24/7 telemetry monitoring of API latency, token efficiency, and system uptime.",
      "Iterative AI model fine-tuning based on real-world user interactions and edge cases.",
      "Quarterly operational reviews to identify new automation frontiers as your business scales.",
    ],
    outcome: "Deliverable: Monthly Performance Reports & Continuous AI Refinement.",
  },
];

export default function ProcessPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Execution Methodology
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            How Asenra <br />
            <span className="text-silver-matte">Engineers Value.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            A battle-tested 5-stage lifecycle engineered to deliver enterprise AI solutions with zero operational friction, full transparency, and measurable business ROI.
          </p>
        </div>

        {/* Process Flow Deep Dive */}
        <div className="space-y-12 mb-32">
          {detailedProcess.map((item) => (
            <div
              key={item.step}
              className="premium-depth-card group p-8 sm:p-12 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/60 backdrop-blur-2xl transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="card-sheen" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-black text-white/20 font-mono">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-black tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    {item.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <ul className="space-y-4">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {item.outcome}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture Transition Box */}
        <div className="premium-depth-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 mb-32 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Want to inspect our tech stack?</h3>
            <p className="text-zinc-400 text-sm font-medium">Explore the underlying infrastructure, LLM frameworks, vector databases, and edge CDNs that power the Asenra Engine.</p>
          </div>
          <Link
            href="/architecture"
            className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          >
            View System Architecture
          </Link>
        </div>

        {/* Strategy Consultation Callout */}
        <section className="text-center py-20 border-t border-white/10 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-6">
            Ready to initiate Stage 01 Discovery?
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
