"use client";

import React from "react";
import { Workflow, TrendingUp, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Workflow,
    title: "Seamless Workflow Integration",
    description:
      "Most companies adopt AI by adding another standalone tool. We redesign core business operations around intelligent systems that integrate directly into your existing software and workflows.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Business Outcomes",
    description:
      "Every implementation is engineered with clear metrics in mind—reducing operational overhead, accelerating throughput velocity, and delivering verifiable return on investment.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Architecture",
    description:
      "Engineered around enterprise-grade security principles. Your data remains private, isolated, and protected under strict access governance and industry best practices.",
  },
];

export function WhyAsenra() {
  return (
    <section className="relative py-28 bg-black overflow-hidden border-t border-white/5" id="why-asenra">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-zinc-500 select-none">
            Why Businesses Choose Asenra
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-8">
            Intelligent Systems. <br />
            <span className="text-silver-matte">Measurable Outcomes.</span>
          </h2>
          <p className="text-zinc-300 text-lg sm:text-xl font-medium leading-relaxed">
            Most companies adopt AI by adding another tool. We redesign business operations around intelligent systems that integrate seamlessly into your existing workflows. Every implementation is engineered for measurable business outcomes, long-term scalability, and operational efficiency.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="premium-depth-card group relative p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-black hover:border-white/25 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="card-sheen" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-white/10 group-hover:scale-105 transition-all">
                  <pillar.icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
