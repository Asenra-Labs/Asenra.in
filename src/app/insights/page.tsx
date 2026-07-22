"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, TrendingUp, Cpu, ShieldAlert, PhoneCall } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

const articles = [
  {
    slug: "roi-of-enterprise-ai",
    category: "Enterprise AI Strategy",
    title: "The ROI of Enterprise AI: Moving Beyond Hype to Measurable Business Metrics",
    excerpt: "Why 80% of generic AI initiatives fail to deliver ROI, and how leading enterprises structure private AI pipelines to cut costs and automate workflows.",
    readTime: "6 min read",
    date: "July 2026",
    author: "Asenra Research Team",
  },
  {
    slug: "why-off-the-shelf-bots-fail",
    category: "AI Engineering",
    title: "Why Off-the-Shelf AI Chatbots Fail in Complex Enterprise Workflows",
    excerpt: "Surface-level chatbot widgets lack domain context, security protocols, and operational database integrations. Here's how autonomous agent swarms solve execution friction.",
    readTime: "8 min read",
    date: "June 2026",
    author: "Asenra Architecture Guild",
  },
  {
    slug: "building-digital-infrastructure",
    category: "Digital Architecture",
    title: "Architecting High-Performance Infrastructure for High-Growth Enterprises",
    excerpt: "How modern edge computing, sub-second API caching, and micro-frontend architecture position market leaders for sub-100ms global response times.",
    readTime: "5 min read",
    date: "May 2026",
    author: "Founder Essays",
  },
  {
    slug: "hipaa-soc2-compliant-ai-pipelines",
    category: "Security & Compliance",
    title: "Building Privacy-First RAG Pipelines in Healthcare and Finance",
    excerpt: "A technical guide to implementing zero-data-retention vector search databases and encrypted local model inferencing in regulated industries.",
    readTime: "10 min read",
    date: "April 2026",
    author: "Asenra Security Audit Team",
  },
];

export default function InsightsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-[-10%] w-[50%] h-[50%] bg-white/[0.015] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Thought Leadership & Analysis
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Asenra Insights. <br />
            <span className="text-silver-matte">Enterprise AI & Automation.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            In-depth analysis, engineering blueprints, and executive essays on artificial intelligence, business process automation, and digital infrastructure.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {articles.map((art) => (
            <div
              key={art.slug}
              className="premium-depth-card group p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/60 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="card-sheen" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 border border-white/10 px-3 py-1 rounded-full">
                    {art.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{art.readTime}</span>
                </div>

                <h2 className="text-2xl font-black tracking-tight text-white mb-4 group-hover:text-zinc-200 transition-colors">
                  {art.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span>{art.author} · {art.date}</span>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy Consultation Callout */}
        <section className="text-center py-20 border-t border-white/10 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-6">
            Stay ahead of the enterprise AI shift.
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            Schedule an executive briefing with our lead AI architects to discuss customized automation strategies for your organization.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Book AI Strategy Session</span>
          </button>
        </section>
      </div>

      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="vt3flmg8"
      />
    </main>
  );
}
