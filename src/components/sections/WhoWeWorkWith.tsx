"use client";

import React from "react";
import { Factory, HeartPulse, Landmark, ShoppingBag, Briefcase } from "lucide-react";

const industries = [
  {
    icon: Factory,
    name: "Manufacturing & Logistics",
    desc: "Automated inventory tracking, predictive maintenance, and supply chain dispatch automation.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & Diagnostics",
    desc: "HIPAA-aligned clinical document intelligence, automated triage pipelines, and patient record processing.",
  },
  {
    icon: Landmark,
    name: "Financial Services",
    desc: "Automated compliance auditing, document processing, and intelligent risk evaluation systems.",
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-Commerce",
    desc: "Customer operations automation, dynamic fulfillment intelligence, and inventory optimization.",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    desc: "Knowledge management engines, automated reporting workflows, and custom client portals.",
  },
];

export function WhoWeWorkWith() {
  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-white/5" id="who-we-work-with">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-zinc-500 select-none">
            Client Sectors
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white leading-[0.95] mb-6">
            Industries <span className="text-silver-matte">We Serve.</span>
          </h2>
          <p className="text-zinc-400 text-lg font-medium leading-relaxed">
            We partner with ambitious leadership teams across critical business sectors to architect and implement domain-specific intelligent systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="premium-depth-card group p-8 rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-950 to-black hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="card-sheen" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                  <ind.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {ind.name}
                </h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
