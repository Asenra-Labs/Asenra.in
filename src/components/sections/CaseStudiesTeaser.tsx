"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const caseStudies = [
  {
    client: "Healthcare Data Network",
    industry: "Healthcare & Diagnostics",
    headline: "Automated Clinical Document Intelligence Pipeline",
    metric: "70% Reduction",
    metricSub: "In processing time & operational friction",
    summary: "Implemented HIPAA-aligned document extraction and automated triage pipelines for a regional diagnostic network.",
    icon: ShieldCheck,
  },
  {
    client: "Global Logistics Group",
    industry: "Logistics & Supply Chain",
    headline: "Predictive Dispatch & Freight Automation",
    metric: "$1.2M Saved",
    metricSub: "Annual operational overhead eliminated",
    summary: "Replaced legacy manual dispatching with a custom intelligent routing agent and real-time inventory tracking platform.",
    icon: Zap,
  },
  {
    client: "Precision Manufacturing Corp",
    industry: "Industrial Manufacturing",
    headline: "Predictive Maintenance & Quality Inspection",
    metric: "99.4% Uptime",
    metricSub: "Zero unplanned machine downtime",
    summary: "Engineered automated inspection and telemetry analysis to catch defects before production line stoppage.",
    icon: BarChart3,
  },
];

export function CaseStudiesTeaser() {
  return (
    <section className="relative py-28 bg-black border-t border-white/5 overflow-hidden" id="selected-work">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-zinc-500 select-none">
              Selected Work
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95]">
              Proven Results. <br />
              <span className="text-silver-matte">Quantifiable Impact.</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <span>View All Selected Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.client}
              className="premium-depth-card group p-8 rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-950 to-black hover:border-white/25 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="card-sheen" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    {cs.industry}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <cs.icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
                    {cs.metric}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 block mt-1">
                    {cs.metricSub}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {cs.headline}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  {cs.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300">{cs.client}</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Case Study</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
