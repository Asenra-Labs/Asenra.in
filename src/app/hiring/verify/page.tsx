"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();
  const [internId, setInternId] = useState("ASN-");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.toUpperCase();
    
    let prefix = 'ASN-';
    if (raw.startsWith('AES')) {
      prefix = 'AES-';
    }

    if (!raw.startsWith('AES-') && !raw.startsWith('ASN-')) {
      raw = prefix;
    }

    const isDeleting = raw.length < internId.length;

    if (isDeleting && internId.endsWith('-') && !raw.endsWith('-')) {
      const stripped = raw.substring(prefix.length).replace(/-/g, '');
      if (stripped.length === 3) {
        setInternId(prefix + stripped.slice(0, 2));
        return;
      }
      if (stripped.length === 7) {
        setInternId(prefix + 'INT-' + stripped.slice(3, 6));
        return;
      }
    }

    const suffix = raw.substring(prefix.length).replace(/-/g, '');
    
    const part1 = suffix.substring(0, 3).replace(/[^A-Z]/g, '');
    const part2 = suffix.substring(part1.length, part1.length + 4).replace(/[^0-9]/g, '');
    const part3 = suffix.substring(part1.length + part2.length, part1.length + part2.length + 3).replace(/[^0-9]/g, '');
    
    let formatted = prefix;
    if (part1.length > 0) {
      formatted += part1;
      if (part1.length === 3) {
        formatted += '-';
      }
    }
    
    if (part2.length > 0) {
      formatted += part2;
      if (part2.length === 4) {
        formatted += '-';
      }
    }
    
    if (part3.length > 0) {
      formatted += part3;
    }
    
    setInternId(formatted);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = internId.trim();
    if (!clean || clean === 'AES-' || clean === 'ASN-') return;
    setLoading(true);
    router.push(`/hiring/verify/${clean}`);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-white/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-zinc-400/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-theme opacity-15" />
      </div>

      <div className="container mx-auto px-6 relative z-30 pt-28 sm:pt-32">
        <div className="flex items-center justify-between mb-10">
          <Link 
            href="/careers" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-medium tracking-wide group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Careers</span>
          </Link>

          <Link
            href="/portal"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white rounded-xl transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Employee Portal</span>
          </Link>
        </div>

        <section className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Native Asenra Credentials Database</span>
            </div>
            <h1 className="text-sm font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Identity Protocol
            </h1>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic">
              Verify <span className="text-silver-matte">Credentials.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed mt-4">
              Enter the unique Asenra Identification Number to access verified candidate records and official documentation.
            </p>
          </div>

          {/* Search Box */}
          <div className="premium-depth-card p-2 rounded-[30px] relative overflow-hidden bg-white/2 mb-10 shadow-2xl border border-white/10">
            <div className="card-sheen" />
            <form onSubmit={handleVerify} className="relative flex items-center z-10">
              <div className="absolute left-6 text-neutral-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="ASN-INT-2026-001"
                value={internId}
                onChange={handleInputChange}
                className="w-full bg-transparent border-0 pl-16 pr-36 h-16 text-lg focus:outline-none focus:ring-0 text-white placeholder:text-neutral-600 font-mono tracking-widest font-bold"
              />
              <div className="absolute right-2 top-2 bottom-2">
                <button
                  type="submit"
                  disabled={loading || !internId.trim() || internId.length < 5}
                  className="h-full px-8 bg-white text-black hover:scale-105 active:scale-95 rounded-2xl font-black italic uppercase tracking-widest text-xs flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
