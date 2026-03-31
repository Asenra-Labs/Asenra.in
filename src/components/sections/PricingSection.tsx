"use client";

import React, { useEffect, useRef } from "react";
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
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PACKAGES = [
  {
    id: "starter",
    name: "Starter Website",
    price: "4,999",
    description: "For local cafés, tiffins, and shops launching their first digital home.",
    features: [
      "3-4 Page Responsive React Site",
      "WhatsApp 'Order/Enquiry' Button",
      "Basic On-Page SEO (Local)",
      "1 Round of Revisions"
    ],
    icon: Globe,
    color: "from-white/10 to-transparent"
  },
  {
    id: "business",
    name: "Business Plus",
    price: "9,999",
    description: "For brands that need to capture every lead automatically.",
    features: [
      "Everything in Starter",
      "WhatsApp Auto-Reply (via n8n)",
      "Leads stored in Google Sheets",
      "Google Business Profile Setup"
    ],
    icon: Zap,
    color: "from-[#F43F5E]/20 to-transparent",
    popular: true
  },
  {
    id: "ai-agent",
    name: "AI Agent Studio",
    price: "14,999",
    description: "Custom AI that handles support and qualifies leads 24/7.",
    features: [
      "OpenAI-Powered AI Agent",
      "WhatsApp or Web Integration",
      "Lead Management Dashboard",
      "Monthly Response Tuning"
    ],
    icon: Cpu,
    color: "from-[#9F1239]/20 to-transparent"
  },
  {
    id: "mobile-lite",
    name: "Mobile App Lite",
    price: "19,999",
    description: "Your business in their pocket. Simple, fast, native.",
    features: [
      "React Native Android Build",
      "Service/Menu Catalog",
      "Direct Booking Interface",
      "Basic Play Store Publish"
    ],
    icon: Smartphone,
    color: "from-[#BE123C]/20 to-transparent"
  }
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const maintenanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Reveal
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power4.out"
      });

      // Cards Fanned Reveal
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          stagger: 0.15,
          duration: 1.4,
          ease: "power3.out",
          clearProps: "all"
        });
      }

      // Maintenance Banner Reveal
      gsap.from(maintenanceRef.current, {
        scrollTrigger: {
          trigger: maintenanceRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

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
        <div ref={titleRef} className="max-w-3xl mb-16 sm:mb-24">
          <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase mb-4">
            Pricing & Packages
          </h2>
          <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-silver-matte leading-[0.9]">
            Transparent Scale for <br />
            <span className="text-white/20">Growing Businesses.</span>
          </h3>
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed">
            Professional Indian businesses deserve premium tech. 
            No hidden fees. One-time build, monthly growth.
          </p>
        </div>

        {/* Pricing Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                className={cn(
                  "premium-depth-card group p-8 flex flex-col min-h-[480px] rounded-2xl transition-transform duration-500 hover:-translate-y-2",
                  pkg.popular && "ring-1 ring-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                )}
              >
                <div className="card-sheen" />
                
                {/* Package Glow Overlay */}
                <div className={cn("absolute inset-0 opacity-10 blur-3xl rounded-full translate-y-[-20%] translate-x-[-20%] pointer-events-none bg-linear-to-br", pkg.color)} />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/20 transition-colors">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    {pkg.popular && (
                      <span className="text-[10px] font-black italic tracking-widest uppercase as-glossy-red text-white px-3 py-1 rounded-full shadow-[0_0_15px_rgba(238,0,0,0.5)]">
                        Popular
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-neutral-500 mb-8 leading-snug">
                    {pkg.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-neutral-400 text-sm">₹</span>
                      <span className="text-4xl font-black text-white tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500">One-time payment</span>
                  </div>

                  <ul className="space-y-4 mb-12 grow">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                        <span className="text-xs text-neutral-400 leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full btn-modern-dark py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group/btn">
                    Select Plan
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Maintenance Retainer Banner */}
        <div 
          ref={maintenanceRef}
          className="relative overflow-hidden premium-depth-card rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 border-[#E11D48]/10"
          onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
        >
          <div className="card-sheen" />
          
          <div className="absolute top-0 right-0 w-[400px] h-full bg-linear-to-l from-[#E11D48]/5 to-transparent pointer-events-none" />

          <div className="grow z-10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#FB7185]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#FB7185] uppercase">
                Success & Support Foundation
              </span>
            </div>
            <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-4">
              Maintenance & <br className="sm:hidden" /> Growth Retainer
            </h4>
            <p className="text-neutral-400 max-w-xl text-sm leading-relaxed">
              We don&apos;t just build and leave. After launch, we stay on your team to manage content updates, technical health, SEO tweaks, and performance audits every single month.
            </p>
          </div>

          <div className="w-full lg:w-auto z-10 flex flex-col sm:flex-row items-center gap-6 lg:gap-12 p-6 sm:p-8 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="text-center sm:text-right">
              <div className="flex items-baseline justify-center sm:justify-end gap-1">
                <span className="text-neutral-500 text-sm">₹</span>
                <span className="text-5xl font-black text-white tracking-tight">
                  1,999
                </span>
                <span className="text-neutral-400 text-sm">/mo</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-bold">
                Predictable Growth
              </p>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <button className="w-full sm:w-auto px-8 py-4 btn-modern-light rounded-xl font-black text-sm tracking-tight flex items-center gap-2">
              Add to Workflow
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
