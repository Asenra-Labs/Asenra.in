"use client";

import React, { useEffect, useRef, useState } from "react";
import { YouFormModal } from "./YouFormModal";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Brain,
  Workflow,
  BarChart3,
  Bot,
  Layers,
  Layout,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const phoneCapabilities = [
  {
    title: "AI DASHBOARD",
    badge: "ACTIVE",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: Brain,
    stat: "42ms Latency",
    substat: "Custom Domain Fine-Tuned Model",
    content: (
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
          <span>Model Throughput</span>
          <span className="text-emerald-400 font-bold">99.98%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="w-[85%] h-full bg-gradient-to-r from-emerald-500 to-white rounded-full" />
        </div>
        <div className="flex justify-between text-[9px] text-zinc-500 font-mono pt-1">
          <span>Tokens: 1.4M / hr</span>
          <span>ROI: +340%</span>
        </div>
      </div>
    ),
  },
  {
    title: "WORKFLOW AUTOMATION",
    badge: "RUNNING",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: Workflow,
    stat: "1,420 Jobs / day",
    substat: "Zero Manual Backlog Friction",
    content: (
      <div className="space-y-1.5 text-[10px] font-mono">
        <div className="p-2 bg-white/5 rounded border border-white/10 flex justify-between items-center">
          <span className="text-zinc-300">Invoice Extraction</span>
          <span className="text-blue-400 font-bold">Auto-Routed</span>
        </div>
        <div className="p-2 bg-white/5 rounded border border-white/10 flex justify-between items-center">
          <span className="text-zinc-300">EHR Patient Sync</span>
          <span className="text-emerald-400 font-bold">Completed</span>
        </div>
      </div>
    ),
  },
  {
    title: "BUSINESS ANALYTICS",
    badge: "LIVE",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: BarChart3,
    stat: "$1.2M Saved",
    substat: "Annual Overhead Reduction",
    content: (
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>Efficiency Lift</span>
          <span className="text-purple-400 font-bold">+70%</span>
        </div>
        <div className="h-10 w-full flex items-end gap-1 pt-1">
          {[40, 65, 50, 80, 70, 95, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-purple-600/50 to-white rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "AI ASSISTANT",
    badge: "24/7 AGENT",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    icon: Bot,
    stat: "Multi-Agent Swarm",
    substat: "Autonomous Query Execution",
    content: (
      <div className="space-y-2 text-[10px] font-mono">
        <div className="p-2 bg-white/10 rounded-lg text-zinc-200 border border-white/10">
          "Query processed: 48 diagnostic records verified & submitted."
        </div>
        <div className="flex justify-between text-[9px] text-zinc-400">
          <span>Confidence: 99.8%</span>
          <span className="text-cyan-400 font-bold">Action Taken</span>
        </div>
      </div>
    ),
  },
  {
    title: "CRM INTEGRATION",
    badge: "SYNCED",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: Layers,
    stat: "Score: 94/100",
    substat: "Automated Enterprise Pipeline",
    content: (
      <div className="space-y-1.5 text-[10px] font-mono">
        <div className="flex justify-between text-zinc-300">
          <span>New Enterprise Lead</span>
          <span className="text-amber-400 font-bold">Qualified</span>
        </div>
        <div className="p-2 bg-white/5 rounded border border-white/10 text-zinc-400 text-[9px]">
          Meeting Auto-Scheduled · Strategy Brief Sent
        </div>
      </div>
    ),
  },
  {
    title: "WEBSITE PREVIEW",
    badge: "65ms EDGE",
    badgeColor: "bg-white/20 text-white border-white/40",
    icon: Layout,
    stat: "3.4x Conversion",
    substat: "Bespoke Digital Experience",
    content: (
      <div className="space-y-2 text-[10px] font-mono">
        <div className="flex justify-between text-zinc-300">
          <span>Lighthouse Performance</span>
          <span className="text-white font-bold">100/100</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white rounded-full" />
        </div>
      </div>
    ),
  },
  {
    title: "EXECUTIVE DASHBOARD",
    badge: "VERIFIED",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: ShieldCheck,
    stat: "System Health 100%",
    substat: "Unified Business Intelligence",
    content: (
      <div className="space-y-1.5 text-[9px] font-mono text-zinc-300">
        <div className="flex justify-between border-b border-white/10 pb-1">
          <span>Active Enterprise Systems</span>
          <span className="font-bold text-white">12 / 12</span>
        </div>
        <div className="flex justify-between pt-1">
          <span>Compliance Status</span>
          <span className="font-bold text-emerald-400">SOC2 / HIPAA OK</span>
        </div>
      </div>
    ),
  },
];

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  brandLogo?: string;
  brandTextLogo?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  brandName = "ASENRA",
  brandLogo = "/logo.png",
  brandTextLogo = "/asenra-full-logo.png",
  tagline1 = "Enterprise AI Consulting.",
  tagline2 = "Intelligent Business Systems.",
  cardHeading = "Enterprise AI & Business Automation",
  cardDescription = <><span className="text-white font-semibold">ASENRA</span> helps ambitious businesses implement enterprise AI, automate operations, and build digital infrastructure that scales.</>,
  metricValue = 50,
  metricLabel = "Enterprises Scaled",
  ctaHeading = "Transform Your Business.",
  ctaDescription = "Book an AI strategy session or request a free technology audit to pinpoint high-ROI automation opportunities.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // Rotate phone capabilities every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCapabilityIdx((prev) => (prev + 1) % phoneCapabilities.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Mouse interaction (subtle parallax)
  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (!mainCardRef.current || !mockupRef.current) return;

    const mainCard = mainCardRef.current;
    const mockup = mockupRef.current;

    const xTo = gsap.quickTo(mockup, "rotationY", { duration: 1.5, ease: "power2.out" });
    const yTo = gsap.quickTo(mockup, "rotationX", { duration: 1.5, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.5) return;

      const rect = mainCard.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      mainCard.style.setProperty("--mouse-x", `${mouseX}px`);
      mainCard.style.setProperty("--mouse-y", `${mouseY}px`);

      const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

      xTo(xVal * 2);
      yTo(-yVal * 2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GSAP Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 30, force3D: true });
      gsap.set(".text-days", { autoAlpha: 0, y: 30, force3D: true });
      gsap.set(".hero-subtext", { autoAlpha: 0, y: 20, force3D: true });
      gsap.set(".main-card", { y: "110vh", autoAlpha: 1, force3D: true });
      gsap.set([".card-left-text", ".mockup-scroll-wrapper"], { autoAlpha: 0, force3D: true });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.9, force3D: true });
      gsap.set(".scroll-indicator", { autoAlpha: 0, y: 20 });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-track", { duration: 1.2, autoAlpha: 1, y: 0, ease: "power3.out" })
        .to(".text-days", { duration: 1.2, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.8")
        .to(".hero-subtext", { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.6")
        .to(".scroll-indicator", { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.4");

      gsap.to(".scroll-bead", {
        y: 24,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut"
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=1500" : "+=4000",
          pin: true,
          scrub: isMobile ? 0.6 : 1.2,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { 
            opacity: 0.1, 
            ease: "power2.inOut", 
            duration: 2 
        }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".scroll-indicator", { autoAlpha: 0, pointerEvents: "none", duration: 0.5 }, 0)
        .to(".main-card", { scale: 1.05, ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 60, autoAlpha: 0, scale: 0.85 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 }, "-=0.8"
        )
        .fromTo(".card-left-text", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, "-=1.5")
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.2 })
        .to([".mockup-scroll-wrapper", ".card-left-text"], {
          scale: 0.95, y: -20, autoAlpha: 0, ease: "power3.in", duration: 1,
        })
        .to(".main-card", { 
          scale: 1,
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 500, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  const activeCap = phoneCapabilities[activeCapabilityIdx];

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-white font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* HERO HEADLINE SECTION - PLAIN CINEMATIC SHINY SILVER GRADIENT TEXT */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl px-6 pt-16 sm:pt-20 pointer-events-none">
        
        {/* Plain Cinematic Shiny Silver Gradient Text */}
        <div className="text-track mb-5 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
          Enterprise Technology Consulting
        </div>

        {/* Headline Line 1 - Shiny Silver Gradient */}
        <h1 className="text-track text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-[1.05] mb-2">
          {tagline1}
        </h1>

        {/* Headline Line 2 - Silver Matte Gradient */}
        <span className="text-days text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter block bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent leading-[1.05] mb-6">
          {tagline2}
        </span>

        {/* Enterprise Value Subtitle */}
        <p className="hero-subtext text-zinc-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          We help ambitious businesses implement custom AI, automate core operations, and build scalable digital infrastructure.
        </p>

        {/* Quick CTA Buttons */}
        <div className="hero-subtext mt-8 flex flex-col sm:flex-row items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all cursor-pointer shadow-lg"
          >
            Book Strategy Call
          </button>
          <Link
            href="/solutions"
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* CTA LAYER */}
      <div id="contact" className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => setIsFormOpen(true)}
            aria-label="Book a call" 
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <div className="text-center">
              <div className="text-xl font-bold leading-none tracking-tight">Book AI Strategy Session</div>
            </div>
          </button>
          <Link href="/solutions" aria-label="Explore Solutions" className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-background">
            <div className="text-center">
              <div className="text-xl font-bold leading-none tracking-tight">Explore Enterprise Solutions</div>
            </div>
          </Link>
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* RESPONSIVE HERO CARD HEADER BAR - AMBLE TOP SPACING & PROMINENT LOGO */}
          <div className="absolute top-8 sm:top-10 md:top-12 lg:top-14 left-8 sm:left-12 right-8 sm:right-12 z-50 flex items-center justify-between gap-4 pointer-events-auto">
            
            {/* LARGE PROMINENT TEXT LOGO IN HERO CARD */}
            <div className="flex items-center">
              <Image
                src={brandTextLogo}
                alt="ASENRA Enterprise AI"
                width={260}
                height={65}
                className="h-9 sm:h-11 md:h-13 lg:h-15 w-auto object-contain brightness-200 drop-shadow-md"
                priority
              />
            </div>

            {/* PROMINENT WE ARE HIRING BADGE WITH TOP PADDING CLEARANCE */}
            <Link 
              href="/careers" 
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 hover:border-white/40 transition-all group shadow-2xl shrink-0"
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
              <span className="text-[10px] sm:text-xs font-black italic uppercase tracking-[0.2em] text-white group-hover:text-white transition-colors">
                We are hiring
              </span>
            </Link>
          </div>

          {/* INNER CARD CONTENT GRID */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center lg:grid lg:grid-cols-2 items-center lg:gap-12 z-10 pt-24 sm:pt-28 lg:pt-20 pb-6">

            {/* 40-50% SMALLER PHONE MOCKUP WITH DYNAMIC CAPABILITY CAROUSEL */}
            <div className="mockup-scroll-wrapper relative w-full h-[240px] sm:h-[290px] lg:h-[360px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.4] sm:scale-[0.45] md:scale-[0.48] lg:scale-[0.52]">
                
                {/* iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[230px] h-[460px] rounded-[2.8rem] iphone-bezel flex flex-col will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20"
                >
                  {/* Physical Buttons */}
                  <div className="absolute top-[100px] -left-[3px] w-[3px] h-[20px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[135px] -left-[3px] w-[3px] h-[35px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[180px] -left-[3px] w-[3px] h-[35px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[140px] -right-[3px] w-[3px] h-[55px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[6px] bg-[#050914] rounded-[2.3rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-50 flex items-center justify-end px-2.5 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    </div>

                    {/* Dynamic Capabilities Screen Interface */}
                    <div className="relative w-full h-full pt-10 px-4 pb-6 flex flex-col justify-between">
                      
                      {/* Top Header */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Image src="/logo.png" alt="Asenra" width={16} height={16} className="w-4 h-4 object-contain brightness-200" />
                          <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase font-bold">ASENRA CORE</span>
                        </div>
                        <span className={cn("text-[8px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-full transition-all", activeCap.badgeColor)}>
                          {activeCap.badge}
                        </span>
                      </div>

                      {/* Rotating Screen Content Card */}
                      <div className="my-auto py-2 transition-all duration-500 ease-in-out">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                            <activeCap.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[8px] font-black uppercase tracking-wider text-zinc-400 block font-mono">
                              {activeCap.title}
                            </span>
                            <span className="text-xs font-black text-white block tracking-tight leading-tight">
                              {activeCap.stat}
                            </span>
                          </div>
                        </div>

                        <div className="text-[9px] font-medium text-zinc-400 mb-3">
                          {activeCap.substat}
                        </div>

                        {/* Interactive UI Widget */}
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl shadow-inner">
                          {activeCap.content}
                        </div>
                      </div>

                      {/* Capability Indicator Dots */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {phoneCapabilities.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveCapabilityIdx(idx)}
                              className={cn(
                                "h-1 rounded-full transition-all duration-300",
                                idx === activeCapabilityIdx ? "w-4 bg-white" : "w-1 bg-white/20"
                              )}
                              aria-label={`Capability slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                          {activeCapabilityIdx + 1} / {phoneCapabilities.length}
                        </span>
                      </div>

                      {/* Home Bar Indicator */}
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[90px] h-[3px] bg-white/30 rounded-full" />
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* CARD TEXT CONTENT */}
            <div className="card-left-text gsap-reveal flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 tracking-tight">
                {cardHeading}
              </h3>
              <p className="text-neutral-300/80 text-sm md:text-base font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
      
      {/* SCROLL INDICATOR */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
          Scroll to Discover
        </span>
        <div className="relative w-px h-10 bg-neutral-800 overflow-hidden">
           <div className="scroll-bead absolute top-0 left-0 w-full h-3 bg-linear-to-b from-white to-transparent" />
        </div>
      </div>
      
      {/* Consultation Form Modal */}
      <YouFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        formId="vt3flmg8" 
      />
    </div>
  );
}
