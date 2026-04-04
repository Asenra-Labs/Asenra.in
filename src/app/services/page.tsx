"use client";

import React, { useEffect, useRef, useState } from "react";
import { YouFormModal } from "@/components/ui/YouFormModal";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Websites & Web Apps",
    description: "Ultra-fast, conversion-optimized landing pages and full-scale web applications designed to capture leads and grow your business.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    tag: "Digital Presence"
  },
  {
    title: "AI Bots & Automations",
    description: "Smart, conversational bots that handle customer support, bookings, and inquiries 24/7 without human intervention.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tag: "Efficiency"
  },
  {
    title: "Autonomous Agents",
    description: "Advanced autonomous agents tailored to your workflow. They don't just chat—they execute complex tasks and processes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tag: "Scale"
  },
  {
    title: "Custom Enterprise Solutions",
    description: "Bespoke digital systems tailored for high-growth ventures and modern enterprises. Streamline operations and engineer a premium customer experience.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    tag: "Operations"
  }
];

export default function ServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animations removed to ensure instant full visibility
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white/20 font-sans p-6 md:p-12 lg:px-24 py-20 pb-40 overflow-hidden relative">
      
      {/* Background intentionally cleared to debug visibility issue */}
      <div className="fixed inset-0 z-[-1] bg-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="header-element mb-20">
          <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300">
            <span className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-400 group-hover:-translate-x-1 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
        </div>

        {/* Hero Text */}
        <div className="max-w-4xl mb-24">
          <h1 className="header-element text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Engineered <br />
            <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-500 bg-clip-text text-transparent">for Growth.</span>
          </h1>
          <p className="header-element text-zinc-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
            We don&apos;t just build software. <br className="hidden md:block" />
            We build the architecture for your business to dominate its market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative z-50">
          {services.map((service, idx) => (
            <div 
              key={idx}
              onClick={() => setIsFormOpen(true)}
              className="service-card group relative p-1 leading-none rounded-[2rem] overflow-hidden bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 z-[100] cursor-pointer"
            >
              <div className="relative h-full w-full bg-[#1e1e1e] rounded-[1.9rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between shadow-2xl">
                {/* Clean internal background */}
                <div className="absolute inset-0 bg-white/[0.03]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-500 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-zinc-700 transition-all duration-300">
                      {service.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 border border-zinc-900 px-4 py-1.5 rounded-full group-hover:text-zinc-300 group-hover:border-zinc-800 transition-all">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                    {service.title}
                  </h3>
                  
                  <p className="text-zinc-200 font-medium leading-relaxed text-base md:text-lg group-hover:text-white transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                <div className="relative z-10 mt-12 flex items-center gap-2 text-zinc-600 group-hover:text-white transition-all duration-500">
                  <span className="text-sm font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">Connect to implement</span>
                  <svg className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Massive Footer CTA */}
        <div className="mt-40 relative z-50">
          <div className="relative z-10 text-center border-t border-zinc-900 pt-40">
            <h2 className="header-element text-5xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.8]">
              Ready for the <br />
              <span className="text-zinc-800 text-stroke-thin">next level?</span>
            </h2>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="header-element inline-block px-12 py-6 rounded-2xl bg-white text-black text-xl font-black uppercase tracking-tighter hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500 active:scale-95 cursor-pointer"
            >
              Launch Now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-stroke-thin {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
      
      {/* Consultation Form Modal */}
      <YouFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        formId="vt3flmg8" 
      />
    </div>
  );
}
