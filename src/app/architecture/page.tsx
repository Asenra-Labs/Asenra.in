"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Cpu, Server, Layers, Zap, Hexagon, Code2, Monitor, Database, PhoneCall } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

export default function ArchitecturePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const stackItems = [
    { title: "Frontend Engine", icon: Monitor, items: ["Next.js 15", "GSAP 3", "Tailwind 4", "Framer Motion"] },
    { title: "Intelligence Layer", icon: Cpu, items: ["OpenAI / Anthropic", "Custom RAG Pipelines", "n8n Automation", "LangChain"] },
    { title: "Data Architecture", icon: Database, items: ["PostgreSQL", "Prisma ORM", "Redis Caching", "Supabase"] },
    { title: "Infrastructure", icon: Server, items: ["Vercel Edge", "Docker", "CI/CD Automation", "Global CDN"] }
  ];

  const processSteps = [
    { num: "01", title: "Blueprint Analysis", desc: "We map out your business logic and aesthetic vision before a single line of code is written." },
    { num: "02", title: "Elite Engineering", desc: "Build phase starts. We ship daily updates to a staging environment for instant feedback." },
    { num: "03", title: "Aesthetic Stress Test", desc: "Rigorous testing of animations, responsive layouts, and performance benchmarks." },
    { num: "04", title: "Final Deployment", desc: "The engine goes live on global edge networks with 24/7 monitoring active." }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group uppercase text-[10px] font-black tracking-widest text-silver-matte">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Terminal
        </Link>

        {/* Hero Section */}
        <section className="mb-32">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-neutral-400">
            <Hexagon className="w-3 h-3 animate-pulse" /> System Architecture.v2
          </div>
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.85] mb-12">
            The Asenra <br />
            <span className="text-silver-matte">Engine.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
            We don&apos;t just code; we architect performance. Every pixel and query is engineered for sub-second responses and high conversion.
          </p>
        </section>

        {/* Stack Grid */}
        <section className="mb-40">
          <h2 className="text-xs font-black tracking-[0.5em] uppercase text-neutral-500 mb-12 flex items-center gap-4">
            <Layers className="w-4 h-4" /> Core Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stackItems.map((stack, i) => (
              <div key={i} className="premium-depth-card p-8 rounded-3xl border border-white/5 hover:border-white/15 transition-all group">
                <div className="card-sheen" />
                <div className="relative z-10">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                     <stack.icon className="w-5 h-5 text-white opacity-80" />
                   </div>
                   <h3 className="text-lg font-black mb-4">{stack.title}</h3>
                   <div className="space-y-2">
                     {stack.items.map(item => (
                       <div key={item} className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                         <div className="w-1 h-1 rounded-full bg-white/20" />
                         {item}
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section className="mb-40">
           <h2 className="text-xs font-black tracking-[0.5em] uppercase text-neutral-500 mb-12 flex items-center gap-4">
            <Zap className="w-4 h-4" /> The Engineering Lifecycle
          </h2>
          <div className="space-y-4">
            {processSteps.map((step, i) => (
              <div key={i} className="premium-depth-card p-10 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-12 items-start md:items-center group hover:border-white/20 transition-all">
                <div className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors tracking-tighter leading-none">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-neutral-500 text-sm max-w-xl leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="hidden md:block">
                   <Code2 className="w-6 h-6 text-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Floating Call to Action */}
        <div className="group relative">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="w-full text-left p-12 rounded-[50px] bg-white text-black relative z-20 shadow-[0_40px_100px_rgba(255,255,255,0.1)] mb-12 hover:scale-[1.01] transition-all active:scale-95 cursor-pointer border-none"
          >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h3 className="text-4xl font-black tracking-tighter mb-4">Architect your next move.</h3>
                    <p className="text-black/60 font-medium">Get an elite tech assessment for your business in 48 hours.</p>
                 </div>
                 <div className="flex justify-start md:justify-end">
                    <span className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest italic group-hover:px-12 transition-all flex items-center gap-3">
                      <PhoneCall className="w-5 h-5 opacity-80 group-hover:scale-110 transition-transform" />
                      Schedule Assessment & Call
                    </span>
                 </div>
              </div>
          </button>
        </div>
      </div>

       {/* Sub-footer watermark */}
       <div className="absolute top-1/2 left-0 -translate-x-1/2 opacity-[0.05] pointer-events-none -rotate-90">
         <span className="text-[15vw] font-black uppercase text-white tracking-widest">
           Engineered.
         </span>
       </div>
       
       {/* Consultation Form Modal */}
       <YouFormModal 
         isOpen={isFormOpen} 
         onClose={() => setIsFormOpen(false)} 
         formId="vt3flmg8" 
       />
    </main>
  );
}
