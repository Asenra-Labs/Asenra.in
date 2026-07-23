"use client";

import React from "react";
import Link from "next/link";
import { Search, Compass, Code, Activity, ArrowRight } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Discover",
    icon: Search,
    description: "Understand business operations, audit existing workflows, and identify high-value AI and automation opportunities.",
  },
  {
    step: "02",
    title: "Architect",
    icon: Compass,
    description: "Design the right AI models, software architecture, and integration protocols tailored to your technical ecosystem.",
  },
  {
    step: "03",
    title: "Implement",
    icon: Code,
    description: "Build and integrate intelligent systems seamlessly into your business operations with zero disruption to daily workflows.",
  },
  {
    step: "04",
    title: "Optimize",
    icon: Activity,
    description: "Continuously monitor performance, refine system capabilities, and measure tangible business outcomes and efficiency gains.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative py-28 bg-black border-t border-white/5 overflow-hidden" id="process">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-zinc-500 select-none">
            How We Work
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
            Structured Consulting Process. <br />
            <span className="text-silver-matte">Predictable Execution.</span>
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed">
            We operate with absolute clarity and accountability. Our 4-stage process ensures seamless integration from initial audit through ongoing optimization.
          </p>
        </div>

        {/* Process Flow Cards */}
        <div className="space-y-4">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="premium-depth-card group p-8 sm:p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 bg-zinc-950/60 backdrop-blur-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between"
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl sm:text-5xl font-black text-white/10 group-hover:text-white/30 transition-colors font-mono">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/10 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-600 uppercase tracking-widest shrink-0">
                <span>Stage {item.step}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/process"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase text-xs sm:text-sm tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
          >
            <span>Explore Complete Process</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
