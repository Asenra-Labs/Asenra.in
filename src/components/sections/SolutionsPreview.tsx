"use client";

import React from "react";
import Link from "next/link";
import { Brain, Cpu, Workflow, Layers, Layout, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "AI Consulting",
    description: "Identify where AI creates measurable business value. We audit your existing workflows, evaluate ROI viability, and deliver an actionable implementation roadmap.",
    tag: "Strategy & Audit",
  },
  {
    icon: Cpu,
    title: "AI Implementation",
    description: "Custom AI models and intelligent systems integrated directly into your core business operations. Private, secure, and fine-tuned on your domain data.",
    tag: "Core Systems",
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    description: "Reduce manual work and operational friction through intelligent automated workflows. Streamline processes across finance, operations, customer service, and HR.",
    tag: "Operational Scale",
  },
  {
    icon: Layers,
    title: "Custom Software Systems",
    description: "Internal tools, operational portals, and business management platforms engineered specifically around your complex operational mechanics.",
    tag: "Custom Platforms",
  },
  {
    icon: Layout,
    title: "Digital Infrastructure",
    description: "Conversion-focused, high-performance web applications and digital interfaces built to establish strong online authority for ambitious brands.",
    tag: "Brand & Performance",
  },
];

export function SolutionsPreview() {
  return (
    <section className="relative py-28 bg-black overflow-hidden border-t border-white/5" id="capabilities">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-zinc-500 select-none">
            Capabilities
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
            What We <span className="text-silver-matte">Build.</span>
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed">
            We move beyond superficial AI hype. We engineer robust AI systems and intelligent automation platforms tailored to your business operations.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={cap.title}
              className={`premium-depth-card group relative p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-black hover:border-white/25 transition-all duration-500 flex flex-col justify-between ${
                idx === 0 ? "lg:col-span-2 lg:p-10" : ""
              }`}
            >
              <div className="card-sheen" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 group-hover:scale-105 transition-all">
                    <cap.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-white/10 px-3 py-1 rounded-full group-hover:text-zinc-300 transition-colors">
                    {cap.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                  {cap.title}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed mb-8">
                  {cap.description}
                </p>
              </div>

              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase text-xs sm:text-sm tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
          >
            <span>View All Capabilities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
