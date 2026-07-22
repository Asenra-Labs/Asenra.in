"use client";

import React from "react";
import Link from "next/link";
import { Brain, Cpu, Workflow, Layers, Layout, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "AI Consulting",
    description: "Identify where AI creates measurable business value. We audit your existing workflows, evaluate ROI viability, and deliver an actionable AI implementation roadmap.",
    tag: "Strategy & ROI",
  },
  {
    icon: Cpu,
    title: "Enterprise AI Implementation",
    description: "Custom AI models and autonomous systems integrated into your core business operations. Secure, private, and fine-tuned on your proprietary domain data.",
    tag: "Core Systems",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Reduce manual work and human error through intelligent automated workflows. Streamline operations across finance, operations, customer service, and HR.",
    tag: "Operational Scale",
  },
  {
    icon: Layers,
    title: "Intelligent Software",
    description: "Internal tools, enterprise portals, and business management platforms engineered specifically around your complex operational mechanics.",
    tag: "Custom Platforms",
  },
  {
    icon: Layout,
    title: "Premium Digital Experiences",
    description: "Conversion-focused, high-performance web applications and digital interfaces built to position ambitious brands for market leadership.",
    tag: "Brand & Conversion",
  },
];

export function SolutionsPreview() {
  return (
    <section className="relative py-28 bg-black overflow-hidden border-t border-white/5" id="solutions">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Enterprise Solutions
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
            Architected for <br />
            <span className="text-silver-matte">Measurable Impact.</span>
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed">
            We move beyond superficial AI hype. We engineer robust, enterprise-grade AI systems and intelligent automation platforms tailored to your business operations.
          </p>
        </div>

        {/* 5 Enterprise Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, idx) => (
            <div
              key={sol.title}
              className={`premium-depth-card group relative p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-black hover:border-white/25 transition-all duration-500 flex flex-col justify-between ${
                idx === 0 ? "lg:col-span-2 lg:p-10" : ""
              }`}
            >
              <div className="card-sheen" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 group-hover:scale-105 transition-all">
                    <sol.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-white/10 px-3 py-1 rounded-full group-hover:text-zinc-300 transition-colors">
                    {sol.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                  {sol.title}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed mb-8">
                  {sol.description}
                </p>
              </div>

              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors"
              >
                <span>Explore Solution</span>
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
            <span>View Complete Solutions Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
