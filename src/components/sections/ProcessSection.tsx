"use client";

import React from "react";
import Link from "next/link";
import { Search, Compass, Code, Rocket, Activity, ArrowRight } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Business Discovery",
    icon: Search,
    description: "We audit your existing workflows, data infrastructure, and operational friction to identify high-ROI AI and automation opportunities.",
  },
  {
    step: "02",
    title: "Solution Design",
    icon: Compass,
    description: "We design custom architecture blueprints, data security protocols, and integration specifications tailored to your enterprise systems.",
  },
  {
    step: "03",
    title: "Implementation",
    icon: Code,
    description: "Our engineering team builds and integrates your custom AI models and automation workflows with daily staging updates and rigorous code quality.",
  },
  {
    step: "04",
    title: "Deployment",
    icon: Rocket,
    description: "Seamless, zero-downtime deployment to secure global edge infrastructure with comprehensive team onboarding and operational alignment.",
  },
  {
    step: "05",
    title: "Optimization",
    icon: Activity,
    description: "Continuous monitoring, performance tuning, and AI model refinement to guarantee ongoing efficiency gains and measurable business ROI.",
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
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            The Asenra Way
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
            Enterprise Execution. <br />
            <span className="text-silver-matte">Zero Guesswork.</span>
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed">
            Enterprise clients demand clarity, accountability, and predictable execution. Our 5-stage engineering process ensures total alignment from initial audit to post-deployment scaling.
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
                <span>Phase {item.step}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/process"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase text-xs sm:text-sm tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
          >
            <span>Explore Complete Execution Methodology</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
