"use client";

import React, { useEffect, useRef } from "react";
import { Mail, Zap, ArrowRight, UserPlus, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 85%",
        },
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });
    }, containerRef);

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
      ref={containerRef}
      id="contact" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Context & CTAs */}
          <div ref={leftRef} className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase">
                Launch Your Engine
              </h2>
              <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-silver-matte leading-[0.9]">
                Let&apos;s Build Your<br />
                <span className="text-glossy-red">Digital Future.</span>
              </h3>
              <p className="text-neutral-400 text-lg max-w-lg leading-relaxed">
                Whether it&apos;s a Pro Website or an Autonomous AI Agent, we launch your tech in as little as 7 days.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Email</div>
                  <a href="mailto:info@asenra.in" className="text-white font-medium hover:text-white/80 transition-colors leading-none">info@asenra.in</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Phone</div>
                  <a href="tel:+918956634577" className="text-white font-medium hover:text-white/80 transition-colors leading-none">+91 89566 34577</a>
                </div>
              </div>
            </div>

            {/* Hiring Callout */}
            <div 
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              className="premium-depth-card group p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 border-white/5"
            >
              <div className="card-sheen" />
              <div className="w-12 h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div className="grow text-center sm:text-left">
                <h4 className="text-white font-bold text-lg leading-tight mb-1">Join the Asenra Codebase?</h4>
                <p className="text-neutral-500 text-xs">We&apos;re always looking for elite engineers and designers.</p>
              </div>
              <a 
                href="https://app.youform.com/forms/tzv3h9tr" 
                target="_blank" 
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 btn-modern-dark text-xs font-bold whitespace-nowrap flex items-center justify-center gap-2"
              >
                Apply Now <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div 
            ref={rightRef}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            className="premium-depth-card p-8 sm:p-10 rounded-[32px] relative overflow-hidden"
          >
            <div className="card-sheen" />
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <h4 className="text-2xl font-black text-white tracking-tight leading-none mb-2">Get Your Free Audit</h4>
                <p className="text-neutral-500 text-sm">Send us your details and we&apos;ll analyze your business tech gap.</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                    <input 
                      className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Business Name</label>
                    <input 
                      className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder="Doe Industries"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Email or Phone</label>
                  <input 
                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Project Interest</label>
                  <select className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-white/50 transition-all appearance-none">
                    <option value="website">Pro Website Build</option>
                    <option value="bot">WhatsApp AI Bot</option>
                    <option value="agent">Custom OpenAI Agent</option>
                    <option value="app">Mobile Application</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-4 btn-modern-light rounded-[20px] font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 group">
                    Analyze My Business
                    <Zap className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
