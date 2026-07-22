"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { YouFormModal } from "@/components/ui/YouFormModal";
import {
  Laptop,
  Smartphone,
  RefreshCw,
  Play,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Sliders,
  Eye,
  Settings,
  ShieldAlert,
  ChevronRight,
  Globe,
  TrendingUp,
  Cpu,
  Zap,
  Dumbbell,
  Coffee,
  Scissors,
  Sparkles
} from "lucide-react";
import { 
  CafeTemplate, 
  GymTemplate, 
  SalonTemplate, 
  ServicesTemplate, 
  GeneralTemplate,
  ArchitectureTemplate 
} from "@/components/demo/Templates";

// Iframe wrapper to allow responsive previews by forcing viewport media queries 
// to execute against the simulator's container width rather than the browser window.
function Frame({ children, className, title, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement> & { children: React.ReactNode }) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const headNode = contentRef?.contentWindow?.document?.head;

  useEffect(() => {
    if (headNode && contentRef) {
      // Clear out any old stylesheets
      headNode.innerHTML = "";
      
      // Inject viewport meta for responsive execution inside the iframe
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1";
      headNode.appendChild(meta);

      // Copy parent document styles and links into the iframe head
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach((style) => {
        headNode.appendChild(style.cloneNode(true));
      });

      // Style the iframe body
      if (contentRef.contentWindow?.document?.body) {
        contentRef.contentWindow.document.body.style.margin = "0";
        contentRef.contentWindow.document.body.style.backgroundColor = "#000000";
      }
    }
  }, [headNode, contentRef]);

  return (
    <iframe {...props} ref={setContentRef} className={className} title={title}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

type Industry = "ecommerce" | "real-estate" | "saas" | "services" | "gym" | "cafe" | "salon" | "architecture" | "custom";

// Helper to detect template category & base theme color based on industry selection
function detectTemplate(industry: Industry, customNiche: string): { category: string; themeColor: string } {
  if (industry !== "custom") {
    const mapping: Record<Exclude<Industry, "custom">, { category: string; themeColor: string }> = {
      ecommerce: { category: "general", themeColor: "blue" },
      "real-estate": { category: "architecture", themeColor: "white" },
      saas: { category: "general", themeColor: "blue" },
      services: { category: "services", themeColor: "emerald" },
      gym: { category: "gym", themeColor: "gold" },
      cafe: { category: "cafe", themeColor: "gold" },
      salon: { category: "salon", themeColor: "rose" },
      architecture: { category: "architecture", themeColor: "white" }
    };
    return mapping[industry];
  }

  // Detect based on custom niche keywords
  const niche = customNiche.toLowerCase();
  if (niche.includes("gym") || niche.includes("fitness") || niche.includes("workout") || niche.includes("crossfit") || niche.includes("yoga") || niche.includes("trainer") || niche.includes("sport")) {
    return { category: "gym", themeColor: "gold" };
  }
  if (niche.includes("cafe") || niche.includes("bakery") || niche.includes("restaurant") || niche.includes("coffee") || niche.includes("food") || niche.includes("dining") || niche.includes("bar")) {
    return { category: "cafe", themeColor: "gold" };
  }
  if (niche.includes("salon") || niche.includes("spa") || niche.includes("hair") || niche.includes("beauty") || niche.includes("makeup") || niche.includes("nail") || niche.includes("parlor")) {
    return { category: "salon", themeColor: "rose" };
  }
  if (niche.includes("architect") || niche.includes("interior") || niche.includes("decor") || niche.includes("design") || niche.includes("builder") || niche.includes("construction") || niche.includes("home")) {
    return { category: "architecture", themeColor: "white" };
  }
  if (niche.includes("clean") || niche.includes("dentist") || niche.includes("dental") || niche.includes("clinic") || niche.includes("doctor") || niche.includes("legal") || niche.includes("law") || niche.includes("plumber") || niche.includes("repair")) {
    return { category: "services", themeColor: "emerald" };
  }
  return { category: "general", themeColor: "blue" };
}

// Helper to generate dynamic, professional copy matching business category
function generateCopy(name: string, category: string, customNiche: string): { tagline: string; description: string; services: string[] } {
  const label = customNiche || category;
  const copyMap: Record<string, { tagline: string; description: string; services: string[] }> = {
    gym: {
      tagline: "Break Your Limits. Build Raw Power.",
      description: `Transform your athletic output at ${name}. We supply high-end strength platforms, biomechanically correct weight stacks, and elite coaching designed to build strength.`,
      services: ["High-Performance Free Weights", "Olympic Lifting Platforms", "Metabolic Conditioning (HIIT)", "Elite Performance Coaching"]
    },
    cafe: {
      tagline: "Artisanal Brews & Slow Living",
      description: `Every cup is a ritual at ${name}. We source organic, high-altitude coffee beans directly from fair-trade estates and bake signature French pastries daily.`,
      services: ["Single-Origin Pour Over", "Flaky French Croissants", "Signature Cold Brews", "Artisanal Desserts"]
    },
    salon: {
      tagline: "Refined Beauty & Glamour",
      description: `A luxury salon experience at ${name} built around custom treatments, premium hair care, and relaxing spa sessions designed to pamper you.`,
      services: ["Signature Haircuts & Styling", "Luxury Bridal Makeup", "Organic Skin Cleansing", "Aroma Scalp Therapy"]
    },
    architecture: {
      tagline: "Bespoke Structural Narratives",
      description: `We craft high-end spatial realities at ${name}. From structural engineering to custom interior furnishing, we deliver award-winning designs.`,
      services: ["High-End Residential Architecture", "Bespoke Interior & Spatial Styling", "Commercial Workplace Planning", "Turnkey Design & Commissioning"]
    },
    services: {
      tagline: "Professional Service You Can Trust",
      description: `High-quality, reliable, and premium local services at ${name} tailored exactly to your home or office needs. Certified professionals ready to help.`,
      services: ["Invisible Dental Aligners", "Cosmetic Dentistry Sessions", "Painless Root Canal Treatments", "Specialized Pediatric Dentistry"]
    },
    general: {
      tagline: "Modern Solutions for Your Growth",
      description: `Premium services, expert consultations, and dedicated support at ${name} built around your unique business goals.`,
      services: ["Luxury Residential Interior Architecture", "Modern Office Workplace Planning", "Bespoke Furniture Concept Design"]
    }
  };

  return copyMap[category] || copyMap.general;
}

interface AuditReport {
  originalSpeed: number;
  originalCro: string;
  gaps: string[];
  features: string[];
}

function generateAuditReport(category: string, name: string): AuditReport {
  const reports: Record<string, AuditReport> = {
    gym: {
      originalSpeed: 41,
      originalCro: "0.7%",
      gaps: [
        "No local schema markup for local SEO rankings",
        "Slow image loading on mobile devices (slower than 3.5s)",
        "Static booking forms without direct WhatsApp integration"
      ],
      features: [
        "Automated SEO schema markup for local fitness search",
        "Sub-100ms loading speeds utilizing dynamic asset caching",
        "Encrypted lead intake form with custom gold glow borders"
      ]
    },
    cafe: {
      originalSpeed: 44,
      originalCro: "0.9%",
      gaps: [
        "Unresponsive menus causing layout shifts on mobile",
        "Lack of direct booking schema for reservation engines",
        "Missing high-contrast text accessibility highlights"
      ],
      features: [
        "Elegant responsive editorial grid menus",
        "One-click table booking and WhatsApp routing",
        "High-contrast premium typography layout system"
      ]
    },
    salon: {
      originalSpeed: 39,
      originalCro: "0.6%",
      gaps: [
        "Heavy assets causing long first-contentful-paint (FCP)",
        "Missing local schema validation tags for beauty services",
        "Frictional multi-step booking causing user drops"
      ],
      features: [
        "Optimized light assets with smooth luxury scroll",
        "Local business schema integration for beauty search",
        "Subtle floating scheduling CTA buttons"
      ]
    },
    architecture: {
      originalSpeed: 35,
      originalCro: "0.5%",
      gaps: [
        "Heavy high-resolution portfolio images collapsing mobile viewports",
        "No structured metadata search classification for architectural terms",
        "Ineffective inquiry forms hidden below the fold"
      ],
      features: [
        "GPU-accelerated layout positioning and image load scaling",
        "Semantic SEO structure for technical design searches",
        "High-contrast minimalist inquiry callouts"
      ]
    },
    services: {
      originalSpeed: 48,
      originalCro: "1.1%",
      gaps: [
        "Unoptimized landing pages jumbling local search queries",
        "No trust markers or social proof badges at scroll milestones",
        "High mobile bounce rates due to poor touch-target sizing"
      ],
      features: [
        "Geotargeted landing page assets with sub-second speeds",
        "Interactive case studies and review modules",
        "Responsive touch-safe layouts with premium padding"
      ]
    },
    general: {
      originalSpeed: 46,
      originalCro: "1.2%",
      gaps: [
        "Overhead from bloated legacy tracking scripts and frameworks",
        "Weak accessibility scores (WCAG 2.2) blocking enterprise clients",
        "Absence of structured schema data for target keywords"
      ],
      features: [
        "Clean, optimized Next.js server-side rendered layouts",
        "Keyboard-navigable responsive layouts for accessibility compliance",
        "Dynamic structured schema generation for search engine indexation"
      ]
    }
  };

  return reports[category] || reports.general;
}

export default function AcquisitionPage() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState<Industry>("ecommerce");
  const [customNiche, setCustomNiche] = useState("");
  const [themeColor, setThemeColor] = useState<"gold" | "white" | "rose" | "emerald" | "blue" | "crimson">("gold");
  
  // Terminal animation states
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Detect dynamic templates & reports
  const templateInfo = detectTemplate(industry, customNiche);
  const copy = generateCopy(companyName, templateInfo.category, customNiche);
  const audit = generateAuditReport(templateInfo.category, companyName);

  // Dynamic Lead configuration for Sandbox preview
  const mockLead = {
    id: "demo-lead",
    name: companyName,
    phone: "+91 99999 88888",
    address: "Flagship Studio, Metro Plaza, Mumbai",
    category: templateInfo.category,
    tagline: copy.tagline,
    description: copy.description,
    color_theme: themeColor,
    services: copy.services.join(", "),
    rating: 4.9,
    review_count: 184
  };

  const simulateLogs = [
    `[SYS] Initializing Asenra Agent Engine...`,
    `[SYS] Connecting to URL repository: ${website || "ad-hoc sandbox"}`,
    `[SYS] Scanning DOM hierarchy and assets...`,
    `[AUDIT] Analyzing Core Web Vitals on server...`,
    `[WARN] Found low Performance Index: ${audit.originalSpeed}%`,
    `[WARN] Detected layout shifts (CLS) on primary viewports`,
    `[AUDIT] Running CRO & Heuristic friction audits...`,
    `[WARN] Found unoptimized lead-capture funnel (CRO: ${audit.originalCro})`,
    `[SYS] Injecting Asenra High-End Styling System...`,
    `[SYS] Building custom industry components...`,
    `[SYS] Generating live sandbox environment...`,
    `[SUCCESS] System ready. Launching live preview...`
  ];

  useEffect(() => {
    if (step === "loading") {
      setLogs([]);
      setProgress(0);
      let logIndex = 0;
      
      const logInterval = setInterval(() => {
        if (logIndex < simulateLogs.length) {
          setLogs((prev) => [...prev, simulateLogs[logIndex]]);
          logIndex++;
          setProgress((prev) => Math.min(prev + 10, 100));
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            setStep("result");
          }, 800);
        }
      }, 400); // Made slightly faster for smoother DX

      return () => clearInterval(logInterval);
    }
  }, [step, industry, customNiche, website]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    setStep("loading");
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden selection:bg-white/20">
      {/* Background Grids & Ambient Beams (Asenra Classic Black & White Theme) */}
      <div className="fixed inset-0 bg-grid-theme opacity-35 z-0 pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.015] blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-zinc-800/10 blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300">
            <span className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-400 group-hover:-translate-x-1 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-silver-matte">Back to Hub</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">ASENRA DEMO PIPELINE V2.0</span>
          </div>
        </div>

        {/* 1. INPUT STEP */}
        {step === "input" && (
          <div className="max-w-3xl mx-auto py-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none uppercase text-white">
                Interactive <br />
                <span className="text-silver-matte">Demo & Tech Audit.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                Generate a custom, high-end landing page layout and run a conversion audit tailored specifically to your business niche instantly.
              </p>
            </div>

            <form onSubmit={handleStart} className="space-y-6 bg-zinc-950/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Company / Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Acme Corporation" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-all font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Existing Website URL (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com" 
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-all font-semibold"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Industry / Domain</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(["ecommerce", "real-estate", "saas", "services", "gym", "cafe", "salon", "architecture", "custom"] as const).map((ind) => {
                    const label = {
                      ecommerce: "E-Commerce",
                      "real-estate": "Real Estate",
                      saas: "SaaS / Tech",
                      services: "Clinics/Services",
                      gym: "Gym & Fitness",
                      cafe: "Cafe/Restaurant",
                      salon: "Salon & Spa",
                      architecture: "Architecture",
                      custom: "Custom Niche..."
                    }[ind];

                    const icon = {
                      ecommerce: <Zap className="w-4 h-4" />,
                      "real-estate": <Globe className="w-4 h-4" />,
                      saas: <Cpu className="w-4 h-4" />,
                      services: <TrendingUp className="w-4 h-4" />,
                      gym: <Dumbbell className="w-4 h-4" />,
                      cafe: <Coffee className="w-4 h-4" />,
                      salon: <Scissors className="w-4 h-4" />,
                      architecture: <Laptop className="w-4 h-4" />,
                      custom: <Sliders className="w-4 h-4" />
                    }[ind];

                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => {
                          setIndustry(ind);
                          if (ind !== "custom") setCustomNiche("");
                        }}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 justify-center capitalize font-semibold ${
                          industry === ind 
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
                            : "bg-black/40 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {icon}
                        <span className="text-[10px] tracking-wide whitespace-nowrap">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional Custom Niche Input */}
              {industry === "custom" && (
                <div className="space-y-2 mt-4 animate-fadeIn">
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Describe Your Business / Niche</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Organic Bakery, Dental Clinic, Legal Advisor" 
                    value={customNiche}
                    onChange={(e) => setCustomNiche(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-all font-semibold"
                  />
                </div>
              )}

              {/* Brand Accent Color */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Brand Color Accent</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {(["gold", "white", "rose", "emerald", "blue", "crimson"] as const).map((color) => {
                    const colorLabel = {
                      gold: "Obsidian Gold",
                      white: "Chrome Silver",
                      rose: "Blush Rose",
                      emerald: "Emerald",
                      blue: "Sapphire",
                      crimson: "Crimson Red"
                    }[color];

                    const borderBg = {
                      gold: "border-[#bf953f] text-[#bf953f] bg-[#bf953f]/10",
                      white: "border-white text-white bg-white/10",
                      rose: "border-rose-400 text-rose-400 bg-rose-400/10",
                      emerald: "border-emerald-400 text-emerald-400 bg-emerald-400/10",
                      blue: "border-blue-400 text-blue-400 bg-blue-400/10",
                      crimson: "border-[#EE0000] text-[#EE0000] bg-[#EE0000]/10"
                    }[color];

                    const activeStyle = themeColor === color ? `${borderBg} border-2 shadow-md` : "border-white/10 text-zinc-400 hover:border-white/30";

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setThemeColor(color)}
                        className={`py-3.5 rounded-xl border text-center transition-all cursor-pointer text-[10px] font-bold capitalize ${activeStyle}`}
                      >
                        {colorLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-black uppercase tracking-tighter py-5 rounded-2xl hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer mt-8 btn-shine-effect"
              >
                <span>Generate Dynamic Audit & Demo Website</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* 2. LOADING STEP */}
        {step === "loading" && (
          <div className="max-w-2xl mx-auto py-16 text-center animate-fadeIn">
            <div className="bg-zinc-950/60 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden space-y-10">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              
              {/* Cinematic Double Spinner */}
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                {/* Outer spin ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-white animate-spin [animation-duration:1.2s]" />
                {/* Inner counter-spin ring */}
                <div className="absolute -inset-2 rounded-full border border-white/5 border-b-white/40 animate-spin [animation-duration:1.8s]" style={{ animationDirection: 'reverse' }} />
                {/* Center pulse glow */}
                <div className="absolute inset-6 rounded-full bg-white/[0.03] animate-pulse" />
                {/* Center percentage */}
                <span className="text-3xl font-black tracking-tighter text-white font-mono">{progress}%</span>
              </div>

              {/* Phase Indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">ASENRA PIPELINE ACTIVE</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white h-8 overflow-hidden transition-all duration-300">
                  {logs[logs.length - 1] 
                    ? logs[logs.length - 1]
                        .replace(/^\[SYS\]\s*/, "")
                        .replace(/^\[WARN\]\s*/, "")
                        .replace(/^\[AUDIT\]\s*/, "")
                        .replace(/^\[SUCCESS\]\s*/, "")
                    : "Initializing AI Agent..."}
                </h3>
              </div>

              {/* Progress Slider (Minimalist) */}
              <div className="space-y-2 max-w-md mx-auto">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">
                  <span>Footprint scan</span>
                  <span>Rendering preview</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. RESULT STATE */}
        {step === "result" && (
          <div className="space-y-12">
            {/* Intro banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">{companyName}</h1>
                <p className="text-zinc-500 font-medium text-xs mt-1 uppercase tracking-widest">
                  Live Audit & Generated Layout for {industry === "custom" ? customNiche : industry} · Theme: {themeColor}
                </p>
              </div>
              <button 
                onClick={() => setStep("input")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 transition-all cursor-pointer text-white shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-Configure Website</span>
              </button>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Tech Audit report card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                  
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-white" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Technical Gap Analysis</h3>
                  </div>

                  {/* Audit Metric comparisons */}
                  <div className="space-y-4 pt-2">
                    <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1">Performance Index</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-zinc-500">{audit.originalSpeed}%</span>
                          <span className="text-zinc-600 text-xs font-medium">vs</span>
                          <span className="text-2xl font-black text-white">99%</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1">Conversion (CRO)</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-zinc-500">{audit.originalCro}</span>
                          <span className="text-zinc-600 text-xs font-medium">vs</span>
                          <span className="text-2xl font-black text-white">3.8%+</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Critical Bottlenecks identified */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Critical Gaps Identified</span>
                    </span>
                    <ul className="space-y-3">
                      {audit.gaps.map((gap, index) => (
                        <li key={index} className="flex gap-3 text-xs text-zinc-300 items-start">
                          <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Asenra Infrastructure Fixes */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Asenra Architect Recommendations</span>
                    </span>
                    <ul className="space-y-3">
                      {audit.features.map((feature, index) => (
                        <li key={index} className="flex gap-3 text-xs text-zinc-300 items-start">
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call-to-action bottom card */}
                <div className="bg-gradient-to-b from-zinc-900/60 to-black/60 border border-white/10 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden space-y-4">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
                  <h4 className="text-xl font-bold tracking-tight text-white leading-tight">Claim This Audited Code & Launch</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Deploy this optimized template immediately. Integrate custom backends, custom database structures, and premium animations under our Venture Studio.
                  </p>
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-full py-4 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer btn-shine-effect"
                  >
                    <span>Secure Live Project Portal</span>
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Mock Sandbox Preview */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Device Bar Controls */}
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-2.5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setDevice("desktop")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        device === "desktop" ? "bg-white text-black shadow-md animate-fadeIn" : "text-zinc-400 hover:text-white bg-transparent"
                      }`}
                    >
                      <Laptop className="w-4 h-4" />
                      <span className="hidden sm:inline">Desktop View</span>
                    </button>
                    <button 
                      onClick={() => setDevice("mobile")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        device === "mobile" ? "bg-white text-black shadow-md animate-fadeIn" : "text-zinc-400 hover:text-white bg-transparent"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="hidden sm:inline">Mobile View</span>
                    </button>

                    {/* Dynamic Accent swatches inside toolbar for instant color customization */}
                    <div className="flex items-center gap-1.5 border-l border-white/10 pl-3 ml-1">
                      {(["gold", "white", "rose", "emerald", "blue", "crimson"] as const).map((color) => {
                        const colorBg = {
                          gold: "bg-[#bf953f]",
                          white: "bg-white",
                          rose: "bg-rose-400",
                          emerald: "bg-emerald-400",
                          blue: "bg-blue-400",
                          crimson: "bg-[#EE0000]"
                        }[color];
                        return (
                          <button
                            key={color}
                            onClick={() => setThemeColor(color)}
                            title={`Switch brand accent to ${color}`}
                            className={`w-3.5 h-3.5 rounded-full ${colorBg} transition-all cursor-pointer hover:scale-125 ${
                              themeColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "opacity-50"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Browser URL Input Sim */}
                  <div className="flex-1 max-w-md mx-6 hidden md:block">
                    <div className="bg-black/60 border border-white/5 rounded-xl px-4 py-1.5 text-center text-xs font-mono text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      https://asenra.in/sandbox/preview/{companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-500 pr-2">
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Live Sandbox</span>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  </div>
                </div>

                {/* Device Shell Screen wrapper */}
                <div className="w-full flex justify-center items-start overflow-hidden">
                  <div 
                    className={`bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative transition-all duration-500 flex flex-col ${
                      device === "mobile" 
                        ? "w-full max-w-[390px] h-[700px] border-8 border-zinc-800" 
                        : "w-full h-[700px]"
                    }`}
                  >
                    
                    {/* Simulated mobile status bar */}
                    {device === "mobile" && (
                      <div className="bg-black text-zinc-500 px-6 py-2.5 flex justify-between items-center text-[10px] font-bold border-b border-white/5 select-none shrink-0 z-50">
                        <span>9:41</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="w-3.5 h-2.5 rounded-sm border border-zinc-500 relative flex items-center justify-start p-0.5"><span className="w-1.5 h-1 bg-zinc-500 rounded-[1px]" /></span>
                        </div>
                      </div>
                    )}

                    {/* MOCK GENERATED WEBSITE INTERFACE RENDERING INSIDE AN IFRAME FOR MOBILE RESPONSIVENESS */}
                    <Frame className="flex-1 bg-black text-white relative font-sans w-full h-full border-none">
                      {templateInfo.category === "cafe" && <CafeTemplate lead={mockLead} />}
                      {templateInfo.category === "gym" && <GymTemplate lead={mockLead} />}
                      {templateInfo.category === "salon" && <SalonTemplate lead={mockLead} />}
                      {templateInfo.category === "services" && <ServicesTemplate lead={mockLead} />}
                      {templateInfo.category === "architecture" && <ArchitectureTemplate lead={mockLead} />}
                      {templateInfo.category === "general" && <GeneralTemplate lead={mockLead} />}
                    </Frame>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Consultation/Lead Capture Modal */}
      <YouFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        formId="vt3flmg8" 
      />
    </div>
  );
}
