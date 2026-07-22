"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhoneCall, Mail, MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { YouFormModal } from "@/components/ui/YouFormModal";

export default function ContactPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-32 overflow-hidden relative">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.015] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <div className="mb-4 text-xs sm:text-sm font-black uppercase tracking-[0.35em] bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-sm select-none">
            Executive Consultation
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Book an AI <br />
            <span className="text-silver-matte">Strategy Session.</span>
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl">
            Direct access to our lead AI architects and systems engineers. We review your current operations and outline high-value automation opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Main Action Form Card */}
          <div className="lg:col-span-7 premium-depth-card p-8 sm:p-12 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="card-sheen" />
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-white">
                Schedule Technical Discovery Call
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                During this 30-minute executive briefing, our engineering team will evaluate your software ecosystem, data availability, and automation feasibility.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span>Zero sales pitch—pure technical review</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span>Custom ROI estimation & architecture roadmap</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span>Full confidentiality / NDA available upon request</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Launch Booking Briefing</span>
                </button>
              </div>
            </div>
          </div>

          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="premium-depth-card p-8 rounded-[2rem] border border-white/10 bg-zinc-950/80 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                Direct Email & Inquiries
              </span>
              <a href="mailto:contact@asenra.in" className="text-lg font-bold text-white hover:underline block">
                contact@asenra.in
              </a>
              <p className="text-zinc-400 text-xs font-medium">
                For RFP submissions, enterprise partnerships, and media inquiries.
              </p>
            </div>

            <div className="premium-depth-card p-8 rounded-[2rem] border border-white/10 bg-zinc-950/80 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                Direct Telephone
              </span>
              <a href="tel:+918956634577" className="text-lg font-bold text-white hover:underline block">
                +91 8956634577
              </a>
              <p className="text-zinc-400 text-xs font-medium">
                Monday – Saturday · 9:00 AM to 8:00 PM IST
              </p>
            </div>

            <div className="premium-depth-card p-8 rounded-[2rem] border border-white/10 bg-zinc-950/80 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                Engineering Headquarters
              </span>
              <p className="text-sm font-bold text-white">
                Asenra Technology Labs · Maharashtra, India
              </p>
              <p className="text-zinc-400 text-xs font-medium">
                Serving Enterprise Clients Across India & Global Markets.
              </p>
            </div>
          </div>

        </div>

      </div>

      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="vt3flmg8"
      />
    </main>
  );
}
