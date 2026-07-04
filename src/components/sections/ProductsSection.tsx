"use client";

import React, { useEffect, useRef } from "react";
import { Orbit, Cpu, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      // Reveal Title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
        y: isMobile ? 0 : 40,
        opacity: 0,
        filter: isMobile ? "none" : "blur(10px)",
        duration: 1.2,
        ease: "power4.out",
      });

      // Reveal Content Card
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        y: isMobile ? 0 : 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5"
      id="products"
    >
      {/* Cosmic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase mb-4">
            Our Ventures
          </h2>
          <h3 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] text-white">
            <span className="text-silver-matte">We Build Proprietary</span> <br />
            <span className="text-white/20">Market Engines.</span>
          </h3>
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed">
            Asenra is not just an agency; we are a Venture Studio. We conceptualize, build, and deploy our own high-impact products to disrupt modern consumer markets.
          </p>
        </div>

        {/* Product Bento Card */}
        <div 
          ref={contentRef}
          onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
          className="premium-depth-card group relative p-5 min-[375px]:p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 bg-linear-to-br from-neutral-900/40 to-black hover:border-white/20 backdrop-blur-2xl transition-colors duration-500 shadow-2xl"
        >
          <div className="card-sheen" />
          {/* Internal ambient glowing blur */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-white/[0.03] to-zinc-500/[0.03] blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h4 className="text-2xl min-[360px]:text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
                Astroneo.space
              </h4>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">
                Advanced Interactive 3D Stellar Engine
              </p>
              
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-medium">
                Our first proprietary launch. Astroneo lets you explore any star in the night sky. Search over 8,800+ stars, interact with real-time 3D WebGL models, and discover complete astronomical data (distance, luminosity, coordinates, and spectral classes).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 border-t border-white/10 pt-8">
                <div className="flex items-start gap-3.5 group/feature">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-white shrink-0 group-hover/feature:bg-white/10 transition-colors duration-300">
                    <Orbit className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Stellar Database</h5>
                    <p className="text-xs text-neutral-500 leading-normal">Search over 8,800+ stars by name, Bayer designation, or catalog ID with instant data retrieval.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group/feature">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-white shrink-0 group-hover/feature:bg-white/10 transition-colors duration-300">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Interactive 3D Renderers</h5>
                    <p className="text-xs text-neutral-500 leading-normal">View, rotate, and explore high-fidelity 3D WebGL models of stellar objects directly in your browser.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://astroneo.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modern-light py-4 px-8 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 group/btn cursor-pointer no-underline"
                >
                  Launch Astroneo
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>

            {/* Right Showcase Column (Real Product Interface) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[450px] aspect-4/3 rounded-2xl md:rounded-[2rem] border border-white/10 bg-neutral-950/80 overflow-hidden group/panel shadow-2xl shadow-black/90 transition-all duration-500 hover:border-white/20">
                {/* Subtle White Ambient Backlight on Hover */}
                <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <Image 
                  src="/astroneo.png" 
                  alt="Astroneo.space Interactive 3D Stellar Engine Interface"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover opacity-85 group-hover/panel:opacity-100 group-hover/panel:scale-102 transition-all duration-700 ease-out"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
