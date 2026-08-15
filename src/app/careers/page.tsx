"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Layout, Sparkles, CheckCircle2, Shield, HeartHandshake } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/lib/auth";

const values = [
  {
    title: "Real Business Impact",
    desc: "We don't ship code for vanity or tech stack points. Every line of software we write must unlock tangible operational value or revenue growth for our clients.",
  },
  {
    title: "High Agency & Autonomy",
    desc: "We give engineers and designers complete ownership over outcomes. No micromanagement, no artificial bureaucracy—just talented builders shipping great software.",
  },
  {
    title: "Uncompromising Quality",
    desc: "Craftsmanship matters. From 60fps animations to sub-50ms API response times and robust fail-safes, we hold ourselves to global engineering standards.",
  },
  {
    title: "Continuous Learning",
    desc: "We operate on the bleeding edge of enterprise AI, vector databases, and system automation. You'll expand your technical depth faster here than anywhere else.",
  },
];

const openRoles = [
  {
    title: "Senior AI Systems Engineer",
    department: "Engineering",
    type: "Full-Time · Remote / On-Site",
    description: "Architect private RAG pipelines, fine-tune domain LLMs, and build resilient multi-agent swarms for enterprise clients.",
    skills: ["Python", "PyTorch", "LangChain/LlamaIndex", "Vector DBs", "PostgreSQL"],
  },
  {
    title: "Full-Stack Software Engineer",
    department: "Engineering",
    type: "Full-Time · Remote / On-Site",
    description: "Build high-performance internal tools and enterprise web platforms with Next.js Edge, TypeScript, and modern database backends.",
    skills: ["TypeScript", "Next.js", "Tailwind", "Supabase", "Node.js"],
  },
  {
    title: "Enterprise Solutions Architect",
    department: "Client Engineering",
    type: "Full-Time · Remote / On-Site",
    description: "Partner directly with enterprise executive teams to audit business processes, design AI integration blueprints, and lead technical implementation.",
    skills: ["System Architecture", "API Integration", "Process Automation", "Client Leadership"],
  },
  {
    title: "Software Engineering Intern",
    department: "Early Career",
    type: "Internship · Remote / Hybrid",
    description: "Work directly alongside senior engineers shipping production code, building high-impact products, and learning enterprise AI architecture.",
    skills: ["React/Next.js", "TypeScript", "Python Basics", "Git", "Problem Solving"],
  },
];

export default function CareersPage() {
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState("");

  const handleApplyClick = (roleTitle: string) => {
    setSelectedRoleTitle(roleTitle);
    if (user) {
      setIsFormOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsFormOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top bar */}
        <div className="flex items-center justify-between mb-16">
          <div className="text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Careers & Engineering Culture
          </div>
          <Link
            href="/hiring/verify"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Verify Credentials</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-24">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Build with people who believe software should create <br />
            <span className="text-silver-matte">real business impact.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            We're a team of engineers, designers, and AI architects building the next generation of enterprise systems. We value craftsmanship, high agency, and tangible results over corporate politics.
          </p>
        </div>

        {/* Culture & Values Grid */}
        <section className="mb-32">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-10">
            Our Culture & Ethos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="premium-depth-card p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/50 backdrop-blur-2xl"
              >
                <div className="card-sheen" />
                <h3 className="text-2xl font-black tracking-tight text-white mb-4">
                  {v.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-32">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-10">
            Open Roles
          </h2>
          <div className="space-y-6">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="premium-depth-card group p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/60 backdrop-blur-2xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="card-sheen" />
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-white/10 px-3 py-1 rounded-full">
                      {role.department}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{role.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {role.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApplyClick(role.title)}
                  className="px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Application Modal Trigger */}
        <section className="text-center py-20 border-t border-white/10 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-6">
            Don't see your specific role?
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            We are always looking for exceptional engineers, AI researchers, and designers. Send us your work and let's talk.
          </p>
          <button
            onClick={() => handleApplyClick("General Application")}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span>Submit General Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </div>

      {/* Auth Gating Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        roleTitle={selectedRoleTitle}
      />

      {/* Application Form Modal */}
      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="tzv3h9tr"
      />
    </main>
  );
}
