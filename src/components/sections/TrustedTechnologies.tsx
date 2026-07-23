"use client";

import React from "react";
import { Cpu, Shield, Zap, Layers, Cloud, Server, Database } from "lucide-react";

const techStack = [
  { name: "OpenAI", desc: "Advanced LLMs & Reasoning Systems" },
  { name: "Anthropic", desc: "Frontier Claude Enterprise Models" },
  { name: "Google AI", desc: "Multimodal Gemini & Vector AI" },
  { name: "AWS", desc: "Cloud Compute & Secure Infrastructure" },
  { name: "Microsoft", desc: "Azure AI & Enterprise Cloud" },
  { name: "Vercel", desc: "Edge Network & Global Deployment" },
  { name: "Cloudflare", desc: "Security, DNS & Zero-Trust Edge" },
];

export function TrustedTechnologies() {
  return (
    <section className="relative py-16 sm:py-20 bg-black border-y border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500 mb-2">
            Built on Industry-Leading Technologies
          </h2>
          <p className="text-sm font-medium text-zinc-400">
            We architect solutions using battle-tested enterprise infrastructure and AI frameworks.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-3 group cursor-default shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
              <span className="text-sm font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
