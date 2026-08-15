"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Globe, 
  Zap, 
  Cpu, 
  Smartphone, 
  Check, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  XCircle,
  LayoutGrid,
  Bot,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  {
    id: "websites",
    name: "Websites",
    icon: Globe,
    description: "Cinematic digital real estate engineered for performance.",
    packages: [
      {
        id: "web-basic",
        name: "Basic",
        price: "4,999",
        amc: "2,920",
        description: "1 Page Cinema",
        features: [
          "React Architecture",
          "Domain (1 yr) Free",
          "Hosting Free Forever",
          "1 Revision Round",
          "WhatsApp Direct Button",
          "Basic Global SEO"
        ],
        icon: LayoutGrid,
        color: "from-white/10 to-transparent"
      },
      {
        id: "web-advanced",
        name: "Advanced",
        price: "8,999",
        amc: "3,844",
        description: "Cinematic Animations + 3D",
        features: [
          "3-5 Optimized Pages",
          "React + GSAP Animations",
          "Subtle 3D Integration",
          "Domain & Hosting Free",
          "2 Revision Rounds",
          "Advanced SEO Engine"
        ],
        icon: Zap,
        color: "from-[#F43F5E]/20 to-transparent",
        popular: true
      },
      {
        id: "web-dynamic",
        name: "Dynamic",
        price: "22,999",
        amc: "7,420",
        description: "Full-Scale Web Infrastructure",
        features: [
          "Unlimited Pages",
          "MERN Stack (Fullstack)",
          "Auth & Custom Dashboard",
          "Domain & 6 Mo Hosting",
          "3 Revision Rounds",
          "Scalable Architecture"
        ],
        icon: Layers,
        color: "from-[#9F1239]/20 to-transparent"
      }
    ]
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    icon: Bot,
    description: "Autonomous digital employees working 24/7.",
    packages: [
      {
        id: "ai-chat",
        name: "Chat Agent",
        price: "12,999",
        amc: "5,844",
        description: "WhatsApp & Web Intelligence",
        features: [
          "WhatsApp/Web Platform",
          "Instant Lead Capture",
          "Google Sheets Sync",
          "Quarterly Prompt Tuning",
          "Semantic Understanding",
          "24/7 Active Support"
        ],
        icon: Cpu,
        color: "from-white/10 to-transparent"
      },
      {
        id: "ai-calling",
        name: "Calling Agent",
        price: "15,999",
        amc: "6,920",
        description: "Voice Automation AI",
        features: [
          "Retell AI Integration",
          "Real-time Phone Sales",
          "Lead Qualification",
          "Google Sheets Sync",
          "Quarterly Tuning",
          "Human-like Latency"
        ],
        icon: Smartphone,
        color: "from-white/10 to-transparent"
      },
      {
        id: "ai-combo",
        name: "Omni Combo",
        price: "24,999",
        amc: "9,844",
        description: "Full Sales Automation Suite",
        features: [
          "Chat + Calling Agents",
          "Unified Customer View",
          "Lead Management System",
          "Quarterly Prompt Tuning",
          "Priority API Support",
          "Maximum Conversion ROI"
        ],
        icon: Zap,
        color: "from-[#F43F5E]/20 to-transparent",
        popular: true
      }
    ]
  }
];

export function PricingSection() {
  const [activeTab, setActiveTab] = useState("websites");
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const policyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      // Title Reveal
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
        y: isMobile ? 0 : 40,
        opacity: 0,
        filter: isMobile ? "none" : "blur(10px)",
        duration: 1.2,
        ease: "power4.out"
      });

      // Cards Grid Reveal
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: isMobile ? 0 : 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Policy Reveal
      gsap.from(policyRef.current, {
        scrollTrigger: {
          trigger: policyRef.current,
          start: "top 90%",
        },
        y: isMobile ? 0 : 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate tab content change
  useEffect(() => {
    if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(cards, 
            { y: 20, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
    }
  }, [activeTab]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const activeCategoryData = CATEGORIES.find(c => c.id === activeTab);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 bg-black overflow-hidden"
      id="pricing"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-grid-theme opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase mb-4">
            Pricing Models
          </h2>
          <h3 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] text-white">
            <span className="text-silver-matte">Transparent Scale for</span> <br />
            <span className="text-white/20">Elite Businesses.</span>
          </h3>
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed">
            Choose your engine. From kinematic websites to autonomous AI agents, we architect for high-impact growth.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-12 p-1.5 bg-white/5 rounded-2xl w-fit border border-white/5 backdrop-blur-md md:backdrop-blur-3xl">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  active 
                    ? "bg-white text-black shadow-xl" 
                    : "text-neutral-500 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-black" : "text-neutral-500")} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Pricing Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {activeCategoryData?.packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                className={cn(
                  "premium-depth-card group p-8 flex flex-col min-h-[540px] rounded-3xl transition-all duration-500 hover:-translate-y-2",
                  pkg.popular && "ring-1 ring-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] border-white/10"
                )}
              >
                <div className="card-sheen" />
                <div className={cn("absolute inset-0 opacity-10 blur-3xl rounded-full translate-y-[-20%] translate-x-[-20%] pointer-events-none bg-linear-to-br", pkg.color)} />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:border-white/20 transition-colors">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    {pkg.popular && (
                      <span className="text-[10px] font-black italic tracking-widest uppercase bg-white text-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Most Active
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
                        {pkg.name}
                    </h4>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                        {pkg.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-neutral-500 text-lg font-bold">₹</span>
                      <span className="text-5xl font-black text-white tracking-tighter">
                        {pkg.price}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">AMC: ₹{pkg.amc}/year</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black italic">50% Advance | 50% Delivery</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-12 grow border-t border-white/5 pt-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        <span className="text-xs text-neutral-400 font-medium tracking-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={`https://wa.me/918956634577?text=${encodeURIComponent(`I am interested in the ${pkg.name} ${activeCategoryData.name} package.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-modern-light py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 group/btn cursor-pointer no-underline"
                  >
                    Launch Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Engine CTA Callout Banner */}
        <div className="premium-depth-card p-8 sm:p-12 rounded-[2.5rem] border-white/5 bg-linear-to-r from-neutral-950 to-neutral-900/60 relative overflow-hidden group mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="card-sheen" />
          <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-white/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 block mb-2">Interactive Gap Analysis</span>
            <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mb-3">Not sure which package fits?</h4>
            <p className="text-neutral-400 text-xs sm:text-sm font-medium leading-relaxed">
              Run a live technical audit on your current website and generate a customized mock layout instantly with our Asenra Demo Engine.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link 
              href="/acquisition" 
              className="inline-flex items-center gap-3 px-8 py-4.5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-98 transition-all cursor-pointer shadow-lg shadow-black/40 no-underline"
            >
              <span>Launch Demo Engine</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>

        {/* Policy & Coverage Sections */}
        <div ref={policyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* AMC Coverage */}
          <div className="premium-depth-card p-10 rounded-[40px] border-white/5 relative overflow-hidden group">
            <div className="card-sheen" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">AMC Coverage</h4>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Included in annual maintenance</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Included</h5>
                        {[
                            "Domain Renewal", "Hosting Continuation", "Bug Fixes", "Minor Content Updates", "Uptime Monitoring", "Performance Checks"
                        ].map(item => (
                            <div key={item} className="flex items-center gap-3">
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs text-neutral-400">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Not Included</h5>
                        {[
                            "New Features/Modules", "Full Redesign", "New Integrations", "Third Party API Charges"
                        ].map(item => (
                            <div key={item} className="flex items-center gap-3">
                                <XCircle className="w-3.5 h-3.5 text-zinc-500 opacity-60" />
                                <span className="text-xs text-neutral-400">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="premium-depth-card p-10 rounded-[40px] border-white/5 relative overflow-hidden group">
            <div className="card-sheen" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] -ml-32 -mb-32" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Payment Structure</h4>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Fair Milestone-Based Billables</p>
                    </div>
                </div>

                <div className="space-y-8 grow flex flex-col justify-center">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/2 border border-white/5">
                        <div>
                            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-1">Phase 01</span>
                            <h5 className="text-lg font-black text-white italic">Advance (Before Start)</h5>
                        </div>
                        <div className="text-3xl font-black text-white italic">50%</div>
                    </div>
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                        <div>
                            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-1">Phase 02</span>
                            <h5 className="text-lg font-black text-white italic">Final Handover</h5>
                        </div>
                        <div className="text-3xl font-black text-white italic">50%</div>
                    </div>
                </div>

                <p className="mt-8 text-[10px] text-neutral-600 font-black uppercase tracking-[0.3em] text-center italic">
                    Transparent. Professional. High-Integrity.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
