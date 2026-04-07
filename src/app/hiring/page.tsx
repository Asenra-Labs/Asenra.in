"use client";

import React, { useState } from "react";
import { ArrowLeft, Code, Layout, Cpu, CheckCircle2, FlaskConical } from "lucide-react";
import Link from "next/link";
import { YouFormModal } from "@/components/ui/YouFormModal";

export default function HiringPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const roles = [
    {
      title: "Frontend Engineer Intern",
      icon: Layout,
      skills: ["React", "Next.js", "Framer Motion", "Tailwind", "TypeScript"],
      description: "Crafting legendary, cinematic web experiences that make visitors drop their jaws."
    },
    {
      title: "Backend Engineer Intern",
      icon: Code,
      skills: ["Node.js", "Express.js", "Passport.js", "MongoDB", "Supabase", "SQL"],
      description: "Architecting the robust engines and high-performance infrastructure that power our systems."
    },
    {
      title: "AI Engineer Intern",
      icon: Cpu,
      skills: ["Python Libraries", "Data Handling", "R-Learning", "OpenAI", "n8n"],
      description: "Building autonomous agents, handling large datasets, and implementing Reinforcement Learning models."
    },
    {
      title: "Testing Engineer Intern (QA)",
      icon: FlaskConical,
      skills: ["Manual Testing", "Automation", "Bug Reporting", "Quality Control"],
      description: "Ensuring every line of code is production-ready and of elite quality."
    }
  ];

  const benefits = [
    "Exposure to Advanced Engineering Methodologies",
    "High-Impact Product Portfolio Development",
    "Production-Level Software Architecture Lifecycle",
    "Professional Technical Stewardship",
    "Technical Leadership & Research Integration"
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
              Recruitment Protocol
            </h1>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
              JOIN AS <span className="text-silver-matte">INTERN.</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed mt-6">
              ASENRA is an advanced engineering entity focused on high-impact proprietary solutions. 
              We are seeking candidates with profound engineering knowledge to contribute to our sophisticated development lifecycles. 
              Engage with high-stakes technical projects and deliver professional-grade engineering excellence.
            </p>
          </div>

          <div className="space-y-12 mb-24">
            <div>
              <h3 className="text-sm font-bold tracking-[0.4em] text-neutral-500 uppercase mb-8">
                Engineering Roles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role, i) => (
                  <div 
                    key={i}
                    className="premium-depth-card group p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="card-sheen" />
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{role.title}</h3>
                    <p className="text-neutral-500 text-sm mb-6 leading-relaxed group-hover:text-neutral-400 transition-colors">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {role.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h3 className="text-sm font-bold tracking-[0.4em] text-neutral-500 uppercase mb-8">
                Fundamental Requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Profound Foundation in End-to-End Project Development",
                  "Advanced Version Control Mastery (Git Systems)",
                  "Deep Competency in Core Programming Paradigms",
                  "Systematic Project Management & Documentation",
                  "Autonomous Problem-Solving & Technical Research",
                  "High-Fidelity Architectural Implementation"
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-4 group/req">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover/req:bg-white transition-colors" />
                    <p className="text-neutral-400 text-sm font-medium tracking-tight group-hover/req:text-white transition-colors">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h3 className="text-sm font-bold tracking-[0.4em] text-neutral-500 uppercase mb-8">
                Professional Growth Markers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-white/5 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-neutral-400 text-sm font-medium leading-relaxed translate-y-1">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="premium-depth-card p-10 rounded-[40px] relative overflow-hidden bg-white/2">
            <div className="card-sheen" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black mb-6 italic tracking-tighter uppercase">Submit Credentials</h3>
                <p className="text-neutral-400 mb-8 max-w-md">
                  Candidates are evaluated based on technical precision, architectural depth, and 
                  independent problem-solving capability. Initiate the protocol below.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-5 btn-modern-light rounded-2xl font-black italic tracking-widest uppercase text-center flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Start Your Journey
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
                <p className="text-center text-[10px] text-neutral-600 uppercase tracking-widest">
                  Batch Enrollment: Open Now
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
