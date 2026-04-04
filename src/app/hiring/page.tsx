"use client";

import React, { useState } from "react";
import { ArrowLeft, Zap, Code, Layout, Cpu, Send, MessageSquare } from "lucide-react";
import Link from "next/link";
import { YouFormModal } from "@/components/ui/YouFormModal";

export default function HiringPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const roles = [
    {
      title: "Frontend Engineer",
      type: "Remote / Hybrid",
      icon: Layout,
      skills: ["React", "Next.js", "GSAP", "Tailwind"],
      description: "Crafting legendary, cinematic web experiences that make visitors drop their jaws."
    },
    {
      title: "AI & Automation Lead",
      type: "Remote",
      icon: Cpu,
      skills: ["OpenAI API", "n8n", "Python", "Vercel AI"],
      description: "Building autonomous sales agents and complex multi-step automation workflows."
    },
    {
      title: "Fullstack App Dev",
      type: "Remote",
      icon: Code,
      skills: ["Node.js", "Prisma", "React Native", "PostgreSQL"],
      description: "Architecting the engines that power small businesses, from tiffin trackers to salon apps."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Liquid Glass Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </Link>

        <section className="max-w-4xl">
          <div className="space-y-4 mb-20">
            <h1 className="text-sm font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Now Hiring Elite Talent
            </h1>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
              Join the <span className="text-silver-matte">Asenra Codebase.</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              We aren&apos;t just another agency. We are an elite tech engine building the digital infrastructure for the next generation of Indian SMBs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {roles.map((role, i) => (
              <div 
                key={i}
                className="premium-depth-card group p-8 rounded-3xl border border-white/5 hover:border-white/20"
              >
                <div className="card-sheen" />
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-black mb-4">{role.type}</div>
                <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {role.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-medium text-neutral-400 uppercase tracking-tighter">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="premium-depth-card p-10 rounded-[40px] relative overflow-hidden bg-white/2">
            <div className="card-sheen" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black mb-6">Ready to Ship?</h3>
                <p className="text-neutral-400 mb-8 max-w-sm">
                  We value speed, aesthetic excellence, and self-correction. If you can build things that look like this site, we want you.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-neutral-300">
                    <Zap className="w-4 h-4 text-white" /> High Impact Projects
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-300">
                    <MessageSquare className="w-4 h-4 text-white" /> Fast Feedback Loops
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-300">
                    <Send className="w-4 h-4 text-white" /> Ship to Production Daily
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-5 btn-modern-light rounded-2xl font-black italic tracking-widest uppercase text-center flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Apply via YouForm
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
                <p className="text-center text-[10px] text-neutral-600 uppercase tracking-widest">
                  Response time: Less than 48 hours
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

       {/* Application Form Modal */}
       <YouFormModal 
         isOpen={isFormOpen} 
         onClose={() => setIsFormOpen(false)} 
         formId="tzv3h9tr" 
       />
    </main>
  );
}
