"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Phone, MapPin, Clock, ArrowRight, ArrowUpRight, 
  CheckCircle, Play, Star, ChevronRight, Menu, X, ShieldCheck
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// -------------------------------------------------------------------
// Core Types & Theme Config
// -------------------------------------------------------------------
export interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  category: string;
  tagline: string;
  description: string;
  color_theme: string;
  services?: string;
  rating?: number;
  review_count?: number;
}

export interface ThemeConfig {
  text: string;
  textHover: string;
  border: string;
  bg: string;
  bgHover: string;
  btn: string;
  textShine: string;
  accent: string;
}

export function getThemeConfig(themeColor: string = "gold"): ThemeConfig {
  const normalized = (themeColor || "gold").toLowerCase();
  
  const configs: Record<string, ThemeConfig> = {
    gold: {
      text: "text-[#c5a880]", textHover: "hover:text-[#c5a880]", border: "border-[#c5a880]/20",
      bg: "bg-[#c5a880]", bgHover: "hover:bg-[#b0946f]", 
      btn: "bg-[#c5a880] text-black hover:bg-white hover:text-black transition-all duration-500", 
      textShine: "text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]",
      accent: "#c5a880"
    },
    white: {
      text: "text-white", textHover: "hover:text-neutral-400", border: "border-white/10",
      bg: "bg-white", bgHover: "hover:bg-neutral-200", 
      btn: "bg-white text-black hover:bg-neutral-200 transition-all duration-500", 
      textShine: "text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500",
      accent: "#ffffff"
    },
    rose: {
      text: "text-rose-400", textHover: "hover:text-rose-300", border: "border-rose-400/20",
      bg: "bg-rose-400", bgHover: "hover:bg-rose-500", 
      btn: "bg-rose-400 text-white hover:bg-rose-500 transition-all duration-500", 
      textShine: "text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600",
      accent: "#f43f5e"
    },
    emerald: {
      text: "text-emerald-400", textHover: "hover:text-emerald-300", border: "border-emerald-500/20",
      bg: "bg-emerald-600", bgHover: "hover:bg-emerald-700", 
      btn: "bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-500", 
      textShine: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500",
      accent: "#10b981"
    },
    blue: {
      text: "text-blue-500", textHover: "hover:text-blue-400", border: "border-blue-500/20",
      bg: "bg-blue-600", bgHover: "hover:bg-blue-700", 
      btn: "bg-blue-600 text-white hover:bg-blue-700 transition-all duration-500", 
      textShine: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600",
      accent: "#2563eb"
    }
  };

  return configs[normalized] || configs.gold;
}

function parseServices(servicesString?: string, defaultServices: string[] = []): string[] {
  if (!servicesString) return defaultServices;
  return servicesString.split(",").map(s => s.trim()).filter(Boolean);
}

// -------------------------------------------------------------------
// Shared Components
// -------------------------------------------------------------------
function LuxuryContactForm({ lead, cfg, lightMode = false }: { lead: Lead, cfg: ThemeConfig, lightMode?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bgClass = lightMode ? "bg-white/70" : "bg-neutral-900/50";
  const hoverClass = lightMode ? "hover:bg-white/90" : "hover:bg-neutral-900/70";
  const textClass = lightMode ? "text-slate-900" : "text-white";
  const subTextClass = lightMode ? "text-slate-500" : "text-neutral-400";
  const inputBorder = lightMode ? "border-slate-300" : "border-neutral-700";
  const focusBorder = lightMode ? "focus:border-slate-900" : "focus:border-white";
  const labelText = lightMode ? "peer-focus:text-slate-900 peer-valid:text-slate-900 text-slate-400" : "peer-focus:text-white peer-valid:text-white text-neutral-500";

  if (submitted) {
    return (
      <div className={`h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 ${bgClass} backdrop-blur-xl border rounded-[2rem]`} style={{ borderColor: `${cfg.accent}30` }}>
        <CheckCircle className="w-16 h-16 mb-6" style={{ color: cfg.accent }} />
        <h4 className={`text-2xl font-light ${textClass} mb-3`}>Request Received</h4>
        <p className={`font-light ${subTextClass}`}>Our concierge will contact you shortly to confirm your reservation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col justify-between h-full p-8 sm:p-12 ${bgClass} backdrop-blur-xl border rounded-[2rem] ${hoverClass} transition-all duration-700`} style={{ borderColor: `${cfg.accent}20` }}>
      <div>
        <h4 className={`text-3xl font-light ${textClass} mb-2 tracking-tight`}>Reserve Access</h4>
        <p className={`${subTextClass} text-sm font-light mb-8`}>Priority booking for verified guests.</p>
        
        <div className="space-y-6">
          <div className="relative">
            <input type="text" required id="name" className={`peer w-full bg-transparent border-b ${inputBorder} py-3 ${textClass} focus:outline-none ${focusBorder} transition-colors placeholder-transparent`} placeholder="Name" />
            <label htmlFor="name" className={`absolute left-0 top-3 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs ${labelText}`}>Full Name</label>
          </div>
          <div className="relative">
            <input type="tel" required id="phone" className={`peer w-full bg-transparent border-b ${inputBorder} py-3 ${textClass} focus:outline-none ${focusBorder} transition-colors placeholder-transparent`} placeholder="Phone" />
            <label htmlFor="phone" className={`absolute left-0 top-3 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs ${labelText}`}>Phone Number</label>
          </div>
        </div>
      </div>
      
      <button type="submit" className={`mt-12 w-full py-5 rounded-full font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-3 group ${cfg.btn}`}>
        Submit Request
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

// -------------------------------------------------------------------
// 1. CAFE TEMPLATE (Ultra-Premium, Cinematic, Bento Grid)
// -------------------------------------------------------------------
export function CafeTemplate({ lead }: { lead: Lead }) {
  const cfg = getThemeConfig(lead.color_theme);
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".reveal-text", { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" })
      .from(".reveal-img", { scale: 1.1, opacity: 0, duration: 1.5, stagger: 0.1, ease: "power3.out" }, "-=1");

    gsap.utils.toArray('.scroll-section').forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#070605] text-[#e8e3d9] selection:bg-[#c5a880] selection:text-[#070605]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <nav className="fixed w-full top-0 z-50 p-6 sm:p-10 flex justify-between items-center mix-blend-difference text-white">
        <span className="text-sm font-bold tracking-[0.3em] uppercase">{lead.name}</span>
        <button className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity">
          Menu <Menu className="w-4 h-4" />
        </button>
      </nav>

      <section className="relative h-screen flex items-end pb-20 px-6 sm:px-12 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000" alt="Cafe Interior" className="absolute inset-0 w-full h-full object-cover opacity-40 reveal-img scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-4xl overflow-hidden">
            <h1 className="text-5xl sm:text-7xl lg:text-[10rem] leading-[0.9] font-light tracking-tighter uppercase reveal-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lead.tagline || "The Art of Coffee"}
            </h1>
          </div>
          <div className="overflow-hidden pb-4">
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-sm reveal-text">
              {lead.description || "A sanctuary for coffee purists. We source rare single-origin beans and craft every cup with mathematical precision."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto scroll-section">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800" alt="Coffee Pour" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute bottom-8 left-8">
              <span className="text-xs font-bold tracking-widest uppercase bg-white text-black px-4 py-2 rounded-full">Signature Roast</span>
            </div>
          </div>
          
          <div className="md:col-span-1 md:row-span-1 bg-[#12100e] rounded-3xl p-8 flex flex-col justify-between hover:bg-[#1a1714] transition-colors border border-white/5">
            <span className="text-3xl font-light" style={{ color: cfg.accent }}>01</span>
            <div>
              <h3 className="text-xl font-light uppercase tracking-wide mb-2">Artisanal Pastries</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Baked fresh at 4 AM daily using imported French butter and organic flour.</p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600" alt="Pastry" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
          </div>

          <div className="md:col-span-2 md:row-span-1 bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-8">Visit The Studio</h3>
            <div className="flex flex-col sm:flex-row justify-between gap-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <div>
                <span className="block text-white mb-1">Location</span>
                {lead.address}
              </div>
              <div>
                <span className="block text-white mb-1">Hours</span>
                8AM - 8PM / DAILY
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto scroll-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-auto lg:h-[600px]">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl sm:text-7xl font-light uppercase tracking-tighter mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Reserve Your Experience</h2>
            <p className="text-neutral-400 max-w-md font-light mb-12">We accept limited reservations for our omakase coffee tasting experience. Secure your slot.</p>
          </div>
          <LuxuryContactForm lead={lead} cfg={cfg} />
        </div>
      </section>
      
      <footer className="py-12 text-center text-xs text-neutral-600 border-t border-white/5 uppercase tracking-widest font-bold">
        &copy; {new Date().getFullYear()} {lead.name}
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 2. ARCHITECTURE TEMPLATE (Monochrome, Brutalist Luxury)
// -------------------------------------------------------------------
export function ArchitectureTemplate({ lead }: { lead: Lead }) {
  const cfg = getThemeConfig("white"); 
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".arch-text", { y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.2 });
    gsap.to(".parallax-bg", { yPercent: 20, ease: "none", scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: true }});
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans uppercase">
      <nav className="absolute top-0 w-full p-8 flex justify-between z-50 mix-blend-difference">
        <span className="text-sm font-bold tracking-[0.2em]">{lead.name}</span>
        <span className="text-xs font-medium tracking-widest">STUDIO</span>
      </nav>

      <section className="relative h-screen flex flex-col justify-center px-6 sm:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=100&w=2500" alt="Architecture" className="parallax-bg w-full h-[120%] object-cover opacity-50 grayscale" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center mt-20">
          <h1 className="arch-text text-[12vw] leading-[0.8] font-bold tracking-tighter mix-blend-difference text-white">
            {lead.tagline || "STRUCTURAL BRILLIANCE"}
          </h1>
          <p className="arch-text mt-12 text-sm md:text-base tracking-widest max-w-xl mx-auto mix-blend-difference text-neutral-300">
            {lead.description || "Award-winning architectural studio focusing on high-end residential and commercial spaces. Minimalist design, maximum impact."}
          </p>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-8 max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px]">
          <div className="relative rounded-xl overflow-hidden group bg-neutral-900">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs tracking-widest mb-1">01 / PROJECT</span>
              <h3 className="text-2xl font-bold tracking-tighter">RESIDENTIAL</h3>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden group bg-neutral-900 md:col-span-2">
            <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs tracking-widest mb-1">02 / PROJECT</span>
              <h3 className="text-2xl font-bold tracking-tighter">COMMERCIAL SPACE</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">INITIATE PROJECT</h2>
        </div>
        <LuxuryContactForm lead={lead} cfg={cfg} />
      </section>
    </div>
  );
}

// -------------------------------------------------------------------
// 3. GYM TEMPLATE (Equinox-style Brutalist Luxury)
// -------------------------------------------------------------------
export function GymTemplate({ lead }: { lead: Lead }) {
  const cfg = getThemeConfig(lead.color_theme || "white");
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".gym-head", { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" })
      .from(".gym-line", { width: 0, duration: 1, ease: "power3.inOut" }, "-=0.8");
      
    gsap.utils.toArray('.gym-section').forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 60, opacity: 0, duration: 1, ease: "expo.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <nav className="fixed w-full top-0 p-8 flex justify-between z-50 mix-blend-difference text-white">
        <span className="text-lg font-black tracking-tighter uppercase">{lead.name}</span>
        <Menu className="w-6 h-6 cursor-pointer" />
      </nav>

      <section className="relative h-screen flex flex-col justify-end pb-24 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-neutral-900">
          <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000" className="w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="gym-line h-1 bg-white mb-8" style={{ width: "100%", maxWidth: "120px" }}></div>
          <div className="overflow-hidden">
            <h1 className="gym-head text-6xl sm:text-8xl md:text-[10rem] leading-[0.85] font-black tracking-tighter uppercase">
              {lead.tagline || "DEFY LIMITS."}
            </h1>
          </div>
          <div className="overflow-hidden mt-6">
            <p className="gym-head text-neutral-400 font-medium text-lg max-w-xl">
              {lead.description || "The definitive high-performance training sanctuary. Engineered for those who demand excellence in every discipline."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-7xl mx-auto gym-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000" className="w-full h-full object-cover grayscale transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">Uncompromising <br/> Standards</h2>
            <p className="text-neutral-400 mb-12 text-lg">World-class equipment, elite coaching, and a community of high-achievers. Access is strictly limited to ensure an unparalleled training environment.</p>
            <div className="space-y-6 border-l-2 border-neutral-800 pl-6">
              <div>
                <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Location</h4>
                <p className="text-neutral-500 text-sm">{lead.address}</p>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Inquiries</h4>
                <p className="text-neutral-500 text-sm">{lead.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 bg-neutral-900 border-t border-white/5 gym-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Request Membership</h2>
            <p className="text-neutral-400 text-sm tracking-widest uppercase">Evaluations by appointment only.</p>
          </div>
          <LuxuryContactForm lead={lead} cfg={getThemeConfig("white")} />
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------------
// 4. SALON TEMPLATE (Soft, Flowing, Serene Luxury)
// -------------------------------------------------------------------
export function SalonTemplate({ lead }: { lead: Lead }) {
  const cfg = getThemeConfig(lead.color_theme || "rose");
  
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#2c2623] selection:bg-[#2c2623] selection:text-white" style={{ fontFamily: "'Italiana', serif" }}>
      <nav className="p-8 text-center border-b border-black/5">
        <h1 className="text-2xl tracking-[0.3em] uppercase">{lead.name}</h1>
      </nav>

      <section className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="aspect-[3/4] rounded-t-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl uppercase tracking-widest leading-tight mb-8">
            {lead.tagline || "Ethereal Beauty"}
          </h2>
          <p className="text-neutral-500 font-sans font-light text-sm md:text-base mb-12 max-w-md mx-auto md:mx-0">
            {lead.description || "A sanctuary for refined aesthetics. Tailored treatments designed to enhance your natural grace and elegance."}
          </p>
          <button className="px-12 py-4 rounded-full border border-black/20 text-xs font-sans uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors duration-500">
            Book Session
          </button>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto bg-white rounded-t-[4rem] shadow-2xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl uppercase tracking-widest">Reserve Time</h3>
        </div>
        <div className="font-sans">
          <LuxuryContactForm lead={lead} cfg={cfg} />
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------------
// 5. SERVICES TEMPLATE (Apple-like Glassmorphism)
// -------------------------------------------------------------------
export function ServicesTemplate({ lead }: { lead: Lead }) {
  const cfg = getThemeConfig(lead.color_theme || "emerald");
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".glass-card", {
      y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".glass-grid", start: "top 80%" }
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      <nav className="fixed top-0 w-full p-4 z-50 flex justify-center">
        <div className="bg-white/70 backdrop-blur-md px-8 py-4 rounded-full shadow-sm border border-white/20 flex gap-8 items-center">
          <span className="font-semibold tracking-tight">{lead.name}</span>
          <div className="w-px h-4 bg-slate-300"></div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Verified Partner</span>
        </div>
      </nav>

      <section className="relative pt-48 pb-24 px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[80px] -z-10"></div>
        
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 max-w-5xl mx-auto leading-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600">
          {lead.tagline || "Exceptional Service. Uncompromising Quality."}
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-16">
          {lead.description || "The premier choice for professionals who demand reliability, transparency, and perfection."}
        </p>

        <div className="glass-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
            <ShieldCheck className="w-10 h-10 mb-6 text-blue-500" />
            <h3 className="font-semibold text-xl mb-2">Vetted Professionals</h3>
            <p className="text-slate-500">Every specialist undergoes rigorous background checks and continuous performance evaluations.</p>
          </div>
          <div className="glass-card bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
            <ShieldCheck className="w-10 h-10 mb-6 text-emerald-500" />
            <h3 className="font-semibold text-xl mb-2">Transparent Pricing</h3>
            <p className="text-slate-500">Clear, upfront quotes with absolutely zero hidden fees or surprise charges.</p>
          </div>
          <div className="glass-card bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
            <ShieldCheck className="w-10 h-10 mb-6 text-indigo-500" />
            <h3 className="font-semibold text-xl mb-2">Satisfaction Guarantee</h3>
            <p className="text-slate-500">Our job isn't finished until you are completely satisfied with the results.</p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl -z-10"></div>
          <div className="p-2">
            <LuxuryContactForm lead={lead} cfg={getThemeConfig("blue")} lightMode={true} />
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------------
// 6. BOUTIQUE TEMPLATE (High Fashion, Editorial, Minimalist)
// -------------------------------------------------------------------
export function BoutiqueTemplate({ lead }: { lead: Lead }) {
  const cfg = getThemeConfig(lead.color_theme || "gold");
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".boutique-fade", { y: 30, opacity: 0, duration: 1.5, stagger: 0.2, ease: "power2.out" });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#fcfcfc] text-black selection:bg-black selection:text-white" style={{ fontFamily: "'Italiana', serif" }}>
      <nav className="fixed w-full top-0 p-8 flex justify-between z-50 bg-[#fcfcfc]/80 backdrop-blur-md">
        <span className="text-xl tracking-[0.2em] uppercase">{lead.name}</span>
        <span className="text-xs font-sans tracking-widest uppercase font-bold">Menu</span>
      </nav>

      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 boutique-fade">
          <h1 className="text-6xl md:text-8xl tracking-widest uppercase leading-tight mb-6">
            {lead.tagline || "Curated Elegance"}
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-neutral-500 max-w-xl mx-auto">
            {lead.description || "A selection of exclusive designer pieces, curated for the modern aesthetic. Discover the new collection."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 boutique-fade">
          <div className="aspect-[3/4] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          </div>
          <div className="flex flex-col justify-between py-12">
            <div className="aspect-[4/3] overflow-hidden group mb-12">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
            </div>
            <div>
              <h3 className="text-4xl tracking-widest uppercase mb-4">The Collection</h3>
              <p className="font-sans text-neutral-500 text-sm leading-relaxed mb-8 max-w-md">
                Experience the pinnacle of fashion. Our boutique offers personalized styling and exclusive access to limited edition pieces.
              </p>
              <a href="#appointment" className="font-sans text-xs font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-neutral-500 transition-colors">
                Book a Styling Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="appointment" className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center font-sans">
          <h2 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-16" style={{ fontFamily: "'Italiana', serif" }}>Private Viewing</h2>
          <LuxuryContactForm lead={lead} cfg={getThemeConfig("white")} />
        </div>
      </section>
    </div>
  );
}

export function GeneralTemplate({ lead }: { lead: Lead }) {
  // Fallback to Services Template if it's general
  return <ServicesTemplate lead={lead} />;
}
