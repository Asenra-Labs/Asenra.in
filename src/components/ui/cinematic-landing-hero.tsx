"use client";

import React, { useEffect, useRef, useState } from "react";
import { YouFormModal } from "./YouFormModal";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



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
  brandName = "Sobers",
  brandLogo,
  brandTextLogo,
  tagline1 = "Track the journey,",
  tagline2 = "not just the days.",
  cardHeading = "Accountability, redefined.",
  cardDescription = <><span className="text-white font-semibold">Sobers</span> empowers sponsors and sponsees in 12-step recovery programs with structured accountability, precise sobriety tracking, and beautiful visual timelines.</>,
  metricValue = 365,
  metricLabel = "Days Sober",
  ctaHeading = "Start your recovery.",
  ctaDescription = "Join thousands of others in the 12-step program and take control of your timeline today.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // 1. High-Performance Mouse Interaction Logic (Using gsap.quickTo)
  useEffect(() => {
    if (!mainCardRef.current || !mockupRef.current) return;

    const mainCard = mainCardRef.current;
    const mockup = mockupRef.current;

    // Use quickTo for much faster updates without the overhead of creating new GSAP instances every frame
    const xTo = gsap.quickTo(mockup, "rotationY", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(mockup, "rotationX", { duration: 1.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse moves out of view
      if (window.scrollY > window.innerHeight * 1.5) return;

      const rect = mainCard.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      mainCard.style.setProperty("--mouse-x", `${mouseX}px`);
      mainCard.style.setProperty("--mouse-y", `${mouseY}px`);

      const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

      // Update rotation using quickTo to bypass animation setup latency
      xTo(xVal * 12);
      yTo(-yVal * 12);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Set initial values and ensure GPU acceleration via translateZ(0)
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20, force3D: true });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)", force3D: true });
      gsap.set(".main-card", { y: "110vh", autoAlpha: 1, force3D: true });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0, force3D: true });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)", force3D: true });
      gsap.set(".scroll-indicator", { autoAlpha: 0, y: 20 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0")
        .to(".scroll-indicator", { duration: 1.2, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.2");

      // Simple looping animation for the scroll bead
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
          end: isMobile ? "+=1800" : "+=5000", // Further reduced for better mobile DX
          pin: true,
          scrub: isMobile ? 0.6 : 1.2, // Snappier on mobile
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { 
            scale: isMobile ? 1.02 : 1.1, 
            filter: isMobile ? "none" : "blur(15px)", // Disable heavy blur on mobile
            opacity: 0.15, 
            ease: "power2.inOut", 
            duration: 2 
        }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".scroll-indicator", { autoAlpha: 0, pointerEvents: "none", duration: 0.5 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: isMobile ? 200 : 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: isMobile ? 0.8 : 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", 
          { y: 40, autoAlpha: 0, scale: 0.95 }, 
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(1.2)", duration: 1.2 }, "-=1.5"
        )
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", 
          { y: isMobile ? 40 : 80, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, 
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.2, stagger: 0.15 }, "-=2.0"
        )
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, "-=1.5")
        .fromTo(".card-right-text", 
          { x: isMobile ? 0 : 50, y: isMobile ? 20 : 0, autoAlpha: 0, scale: isMobile ? 1.1 : 0.8 }, 
          { x: 0, y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.2 }, "<")
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.2 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1, stagger: 0.05,
        })
        // Responsive card pullback sizing
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 500, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />


      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pb-20 md:pb-32 lg:pb-40 will-change-transform transform-style-3d">
        {brandTextLogo && (
          <div className="text-track gsap-reveal mb-4 md:mb-6 lg:mb-8">
            <Image 
              src={brandTextLogo} 
              alt="Asenra" 
              width={600} 
              height={150} 
              className="h-16 md:h-24 lg:h-32 w-auto object-contain select-none pointer-events-none opacity-90"
              priority 
            />
          </div>
        )}
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
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
              <div className="text-xl font-bold leading-none tracking-tight">Book a Call</div>
            </div>
          </button>
          <Link href="/services" aria-label="Explore Services" className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-background">
            <div className="text-center">
              <div className="text-xl font-bold leading-none tracking-tight">Explore Services</div>
            </div>
          </Link>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* HIRING BADGE */}
            <div className="absolute top-8 right-6 lg:right-12 z-50">
               <Link 
                 href="/hiring" 
                 className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/40 transition-all group shadow-2xl"
               >
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                  <span className="text-[10px] font-black italic uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
                    We are Hiring
                  </span>
               </Link>
            </div>

            {/* LOGO */}
            {brandLogo && (
              <div className="absolute top-8 left-6 lg:left-12 z-50">
                <Image src={brandLogo} alt="Logo" width={160} height={48} className="w-auto h-8 md:h-12 object-contain" priority />
              </div>
            )}

            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full relative pointer-events-none">
              
              {brandTextLogo ? (
                <div className="relative flex justify-center lg:justify-end lg:-translate-x-12 lg:-translate-y-6">
                  {/* Subtle ambient backlight instead of bright wash, increases text contrast */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-neutral-800/40 blur-[40px] lg:blur-[80px] rounded-full pointer-events-none" />
                  
                  {/* The logo container with massive size boost, high contrast multi-layered shadows */}
                  <div className="relative z-10 w-full max-w-[120%] lg:max-w-[200%] transform scale-[0.85] lg:scale-[1.8] lg:origin-right lg:-ml-12 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] lg:drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] contrast-125">
                    
                    {/* Next.js Image for optimized loading while maintaining aspect ratio support */}
                    <div className="relative w-full aspect-4/1">
                       <Image src={brandTextLogo} alt={brandName || "Brand Full Logo"} fill className="object-contain opacity-0 select-none pointer-events-none" priority />
                    </div>
                    
                    {/* High-visibility crisp gradient overhead — No mix blend mode so colours stay hard and vibrant */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-white via-zinc-200 to-zinc-500"
                      style={{
                        WebkitMaskImage: `url('${brandTextLogo}')`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url('${brandTextLogo}')`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                  {brandName}
                </h2>
              )}
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              
              {/* Inner wrapper for safe CSS scaling that doesn't conflict with GSAP */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">ASENRA</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Clients</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">AP</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3B82F6" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-neutral-400 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-500/20 to-neutral-600/10 flex items-center justify-center mr-3 border border-neutral-400/20 shadow-inner">
                            <svg className="w-4 h-4 text-neutral-300 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-blue-500 rounded-full mb-2 shadow-inner" />
                            <div className="h-1.5 w-12 bg-neutral-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-500/20 to-zinc-600/10 flex items-center justify-center mr-3 border border-zinc-400/20 shadow-inner">
                            <svg className="w-4 h-4 text-zinc-300 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-24 bg-blue-500 rounded-full mb-2 shadow-inner" />
                            <div className="h-1.5 w-24 bg-neutral-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges - Positioned carefully for mobile */}
                <div className="floating-badge absolute flex top-2 lg:top-12 left-[-10px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-4 items-center gap-2.5 lg:gap-4 z-30">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-neutral-400/20 to-neutral-700/10 flex items-center justify-center border border-neutral-400/30 shadow-inner">
                    <span className="text-sm lg:text-xl drop-shadow-lg" aria-hidden="true">🔥</span>
                  </div>
                  <div>
                    <p className="text-white text-[10px] lg:text-sm font-bold tracking-tight">Active Sites</p>
                    <p className="text-neutral-400 text-[8px] lg:text-xs font-medium">Over 50+ deployed</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-2 lg:bottom-20 right-[-10px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-4 items-center gap-2.5 lg:gap-4 z-30">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-linear-to-b from-zinc-400/20 to-zinc-700/10 flex items-center justify-center border border-zinc-400/30 shadow-inner">
                    <span className="text-sm lg:text-lg drop-shadow-lg" aria-hidden="true">🤖</span>
                  </div>
                  <div>
                    <p className="text-white text-[10px] lg:text-sm font-bold tracking-tight">AI Integrated</p>
                    <p className="text-neutral-400 text-[8px] lg:text-xs font-medium">Smart automation</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              {/* HIDDEN ON MOBILE (added hidden md:block) */}
              <p className="hidden md:block text-neutral-300/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
      
      {/* SCROLL INDICATOR: Minimalist premium aesthetic */}
      <div className="scroll-indicator absolute bottom-24 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold ml-[0.4em]">
          Scroll to Discover
        </span>
        <div className="relative w-px h-12 bg-neutral-800 overflow-hidden">
           <div className="scroll-bead absolute top-0 left-0 w-full h-4 bg-linear-to-b from-white to-transparent" />
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
