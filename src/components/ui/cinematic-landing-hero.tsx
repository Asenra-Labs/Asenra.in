"use client";

import React, { useEffect, useRef, useState } from "react";
import { YouFormModal } from "./YouFormModal";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Zap, Bot } from "lucide-react";

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
    if (window.innerWidth < 768) return; // Exit early on mobile to bypass event listeners and quickTo overhead
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
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, rotationX: -20, force3D: true });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)", force3D: true });
      gsap.set(".main-card", { y: "110vh", autoAlpha: 1, force3D: true });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0, force3D: true });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, force3D: true });
      gsap.set(".scroll-indicator", { autoAlpha: 0, y: 20 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, rotationX: 0, ease: "expo.out" })
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

      if (isMobile) {
        scrollTl
          .to([".hero-text-wrapper", ".bg-grid-theme"], { 
              scale: 1.02, 
              opacity: 0.15, 
              ease: "power2.inOut", 
              duration: 2 
          }, 0)
          .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
          .to(".scroll-indicator", { autoAlpha: 0, pointerEvents: "none", duration: 0.5 }, 0)
          .to(".main-card", { scale: 1.09, ease: "power3.inOut", duration: 1.5 })
          .fromTo(".mockup-scroll-wrapper",
            { y: 100, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 0, scale: 0.9 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
          )
          .fromTo(".phone-widget", 
            { y: 40, autoAlpha: 0, scale: 0.95 }, 
            { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(1.2)", duration: 1.2 }, "-=1.5"
          )
          .to(".chart-path", { strokeDashoffset: 0, duration: 2, ease: "power3.inOut" }, "-=1.2")
          .fromTo(".log-item", 
            { x: -20, autoAlpha: 0 }, 
            { x: 0, autoAlpha: 1, stagger: 0.2, ease: "power3.out", duration: 1 }, "-=1.5"
          )
          .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, "-=1.5")
          .fromTo(".card-right-text", 
            { x: 0, y: 20, autoAlpha: 0, scale: 1.1 }, 
            { x: 0, y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.2 }, "<")
          .to({}, { duration: 2 })
          .set(".hero-text-wrapper", { autoAlpha: 0 })
          .set(".cta-wrapper", { autoAlpha: 1 }) 
          .to({}, { duration: 1.2 })
          .to([".mockup-scroll-wrapper", ".card-left-text", ".card-right-text"], {
            scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1, stagger: 0.05,
          })
          .to(".main-card", { 
            scale: 1,
            ease: "expo.inOut", 
            duration: 1.8 
          }, "pullback") 
          .to(".cta-wrapper", { scale: 1, ease: "expo.inOut", duration: 1.8 }, "pullback")
          .to(".main-card", { y: -window.innerHeight - 500, ease: "power3.in", duration: 1.5 });
      } else {
        scrollTl
          .to([".hero-text-wrapper", ".bg-grid-theme"], { 
              scale: 1.1, 
              opacity: 0.15, 
              ease: "power2.inOut", 
              duration: 2 
          }, 0)
          .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
          .to(".scroll-indicator", { autoAlpha: 0, pointerEvents: "none", duration: 0.5 }, 0)
          .to(".main-card", { scale: 1.18, ease: "power3.inOut", duration: 1.5 })
          .fromTo(".mockup-scroll-wrapper",
            { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
          )
          .fromTo(".phone-widget", 
            { y: 40, autoAlpha: 0, scale: 0.95 }, 
            { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(1.2)", duration: 1.2 }, "-=1.5"
          )
          .to(".chart-path", { strokeDashoffset: 0, duration: 2, ease: "power3.inOut" }, "-=1.2")
          .fromTo(".log-item", 
            { x: -20, autoAlpha: 0 }, 
            { x: 0, autoAlpha: 1, stagger: 0.2, ease: "power3.out", duration: 1 }, "-=1.5"
          )
          .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.2 }, "-=1.5")
          .fromTo(".card-right-text", 
            { x: 50, y: 0, autoAlpha: 0, scale: 0.8 }, 
            { x: 0, y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.2 }, "<")
          .to({}, { duration: 2 })
          .set(".hero-text-wrapper", { autoAlpha: 0 })
          .set(".cta-wrapper", { autoAlpha: 1 }) 
          .to({}, { duration: 1.2 })
          .to([".mockup-scroll-wrapper", ".card-left-text", ".card-right-text"], {
            scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1, stagger: 0.05,
          })
          .to(".main-card", { 
            scale: 1,
            ease: "expo.inOut", 
            duration: 1.8 
          }, "pullback") 
          .to(".cta-wrapper", { scale: 1, ease: "expo.inOut", duration: 1.8 }, "pullback")
          .to(".main-card", { y: -window.innerHeight - 500, ease: "power3.in", duration: 1.5 });
      }

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
        <span className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter block">
          {tagline2}
        </span>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
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
                 className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md md:backdrop-blur-xl hover:bg-white/10 hover:border-white/40 transition-all group shadow-2xl"
               >
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                  <span className="text-[10px] font-black italic uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
                    Join as intern
                  </span>
               </Link>
            </div>

            {/* LOGO */}
            {brandLogo && (
              <div className="absolute top-8 left-6 lg:left-12 z-50">
                <Image src={brandLogo} alt={`${brandName} - Tech Intelligence Logo`} width={160} height={48} className="w-auto h-8 md:h-12 object-contain" priority />
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
                      <div className="phone-widget flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">ASENRA</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
                          </div>
                          <span className="text-lg font-bold tracking-tight text-white drop-shadow-md">COMMAND CENTER</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </div>
                      </div>

                      <div className="phone-widget relative w-full h-32 mx-auto flex items-end justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] px-2">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                              <stop offset="50%" stopColor="rgba(200, 200, 200, 1)" />
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                            </linearGradient>
                            <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                            </linearGradient>
                          </defs>
                          <path d="M0,80 Q20,20 40,60 T80,40 T120,70 T160,20 T200,50 L200,100 L0,100 Z" fill="url(#fillGrad)" className="opacity-50" />
                          <path className="chart-path" strokeDasharray="300" strokeDashoffset="300" d="M0,80 Q20,20 40,60 T80,40 T120,70 T160,20 T200,50" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          
                          {/* Grid lines */}
                          <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                          <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                          <line x1="0" y1="75" x2="200" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        </svg>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget log-item widget-depth rounded-xl p-3 border border-white/5 bg-white/5 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-500 font-mono mb-1">08:42:12 UTC</span>
                            <span className="text-xs text-neutral-200 font-medium tracking-wide">Production Build</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/20 rounded text-[9px] font-bold text-neutral-300 tracking-wider">
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            SUCCESS
                          </div>
                        </div>

                        <div className="phone-widget log-item widget-depth rounded-xl p-3 border border-white/5 bg-white/5 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-500 font-mono mb-1">08:42:15 UTC</span>
                            <span className="text-xs text-neutral-200 font-medium tracking-wide">Edge Caching</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/20 rounded text-[9px] font-bold text-neutral-300 tracking-wider">
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            OPTIMIZED
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
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
