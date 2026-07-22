"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Brain, Cpu, Workflow, Layers, Layout, ArrowRight, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

const solutionsDetail = [
  {
    id: "ai-consulting",
    icon: Brain,
    title: "AI Consulting",
    tagline: "Identify where AI creates measurable business value.",
    description: "We audit your existing operational workflows, data assets, and software ecosystem to locate high-ROI opportunities for artificial intelligence. We replace vague hype with clear metrics, feasibility studies, and actionable deployment roadmaps.",
    deliverables: [
      "Operational AI Opportunity Audit",
      "ROI Viability & Data Readiness Assessment",
      "Custom AI Architecture Roadmap",
      "Vendor & Model Selection Strategy",
    ],
    tag: "Strategy & ROI",
  },
  {
    id: "enterprise-ai-implementation",
    icon: Cpu,
    title: "Enterprise AI Implementation",
    tagline: "Custom AI systems integrated into your core business operations.",
    description: "We engineer private, domain-specific AI models, retrieval-augmented generation (RAG) pipelines, and intelligent agent swarms tailored to your company's proprietary data and workflows.",
    deliverables: [
      "Custom RAG & Vector Search Pipelines",
      "Private Enterprise LLM Fine-Tuning",
      "Autonomous Multi-Agent Systems",
      "HIPAA/SOC2 Compliant AI Infrastructure",
    ],
    tag: "Core Systems",
  },
  {
    id: "business-process-automation",
    icon: Workflow,
    title: "Business Process Automation",
    tagline: "Reduce manual work through intelligent automated workflows.",
    description: "We replace repetitive manual tasks with resilient, event-driven automation pipelines. From financial reconciliation to automated lead processing and cross-department data sync.",
    deliverables: [
      "End-to-End Workflow Automation",
      "API & Database Integration Networks",
      "Intelligent Document Extraction (OCR/AI)",
      "Automated Notification & Escalation Triggers",
    ],
    tag: "Operational Scale",
  },
  {
    id: "intelligent-software",
    icon: Layers,
    title: "Intelligent Software",
    tagline: "Internal tools and business platforms engineered around your operations.",
    description: "Custom internal portals, executive dashboards, and operational software built specifically to streamline how your teams work, make decisions, and service clients.",
    deliverables: [
      "Custom Enterprise Portals & Dashboards",
      "Operation-Specific Business Applications",
      "Real-Time Data Analytics Engines",
      "Role-Based Access & Security Protocols",
    ],
    tag: "Custom Platforms",
  },
  {
    id: "premium-digital-experiences",
    icon: Layout,
    title: "Premium Digital Experiences",
    tagline: "Conversion-focused websites for ambitious brands.",
    description: "High-performance, cinematic web platforms designed for category leaders. Built on modern edge infrastructure with sub-second page loads, conversion-engineered layouts, and bespoke visual identity.",
    deliverables: [
      "Conversion-Engineered Web Applications",
      "Edge-Optimized Infrastructure & Speed",
      "Cinematic Motion & Visual Architecture",
      "Lead Capture & CRM Integrations",
    ],
    tag: "Brand & Conversion",
  },
];

export default function SolutionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Solutions Architecture
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Enterprise AI. <br />
            <span className="text-silver-matte">Intelligent Automation.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            We help ambitious enterprises implement custom AI systems, eliminate operational manual friction, and build scalable digital infrastructure.
          </p>
        </div>

        {/* 5 Core Solutions Showcase */}
        <div className="space-y-16 mb-32">
          {solutionsDetail.map((sol, idx) => (
            <div
              key={sol.id}
              id={sol.id}
              className="premium-depth-card group p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950/80 via-black to-zinc-950/40 hover:border-white/20 backdrop-blur-2xl transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="card-sheen" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <sol.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 border border-white/10 px-3 py-1 rounded-full">
                        {sol.tag}
                      </span>
                      <span className="text-xs font-mono text-zinc-600 ml-3">0{idx + 1} / 05</span>
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                    {sol.title}
                  </h2>
                  <p className="text-zinc-200 text-lg font-semibold tracking-tight leading-snug">
                    {sol.tagline}
                  </p>
                  <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.15)] group"
                    >
                      <span>Discuss {sol.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Deliverables List Column */}
                <div className="lg:col-span-5 bg-black/60 border border-white/5 p-8 rounded-2xl space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Core Deliverables</span>
                  </h3>
                  <ul className="space-y-4">
                    {sol.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy Consultation Callout */}
        <section className="text-center py-20 border-t border-white/10 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-6">
            Ready to implement Enterprise AI?
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

      {/* Consultation Modal */}
      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="vt3flmg8"
      />
    </main>
  );
}
