"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle2, ArrowRight, ShieldCheck, Zap, PhoneCall, Sparkles } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

const auditIncludes = [
  {
    title: "01. Operational Workflow Audit",
    desc: "Complete mapping of your manual processes, employee time allocation, and repetitive administrative bottlenecks.",
  },
  {
    title: "02. AI Feasibility & ROI Benchmark",
    desc: "Rigorous evaluation of where fine-tuned LLMs, automated agents, or RAG vector pipelines generate measurable ROI.",
  },
  {
    title: "03. Data Security & Architecture Review",
    desc: "Analysis of your database structures, API access controls, and compliance requirements (HIPAA, SOC2, GDPR).",
  },
  {
    title: "04. Custom 90-Day Implementation Roadmap",
    desc: "Step-by-step technical blueprint outlining recommended software stack, milestone timelines, and cost projections.",
  },
];

export default function AuditPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top badge */}
        <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
          Free Enterprise Evaluation
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Free AI Readiness & <br />
            <span className="text-silver-matte">Technology Audit.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Pinpoint exactly where enterprise AI and intelligent automation can eliminate manual friction, reduce overhead, and accelerate your business execution.
          </p>
        </div>

        {/* Audit Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {auditIncludes.map((item) => (
            <div
              key={item.title}
              className="premium-depth-card group p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/60 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="card-sheen" />
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white mb-4">
                  {item.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Included in Free Audit</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action / Booking Box */}
        <div className="premium-depth-card p-10 sm:p-16 rounded-[3rem] border border-white/15 bg-gradient-to-b from-zinc-900 to-black text-center max-w-3xl mx-auto space-y-8 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mx-auto">
            <Search className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">
            Request Your Free Audit
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Fill out our quick 2-minute technology brief. Our lead AI architects will analyze your submission and deliver a customized readiness report within 48 hours.
          </p>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <Sparkles className="w-5 h-5" />
            <span>Submit Technology Brief</span>
          </button>

          <div className="pt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            100% Confidential · No Obligation · Executive Level Briefing
          </div>
        </div>

        {/* Secondary Link to Interactive Demos */}
        <div className="mt-16 text-center">
          <Link
            href="/acquisition"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>Interested in viewing interactive demo templates?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
