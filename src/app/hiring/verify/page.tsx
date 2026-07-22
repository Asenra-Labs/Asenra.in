"use client";

import React, { useState } from "react";
import { verifyIntern, InternData } from "./actions";
import { Search, Loader2, CheckCircle2, FileText, Briefcase, Calendar, Shield, ExternalLink, GraduationCap, ArrowLeft, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const [internId, setInternId] = useState("AES-");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<InternData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.toUpperCase();
    
    // Determine prefix (AES or ASN)
    let prefix = 'AES-';
    if (raw.startsWith('ASN')) {
      prefix = 'ASN-';
    }

    // Ensure it starts with valid prefix
    if (!raw.startsWith('AES-') && !raw.startsWith('ASN-')) {
      raw = prefix;
    }

    const isDeleting = raw.length < internId.length;

    // Handle backspace when user deletes a hyphen
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
      // Auto-append '-' as soon as 3 category letters (e.g. INT) are entered
      if (part1.length === 3) {
        formatted += '-';
      }
    }
    
    if (part2.length > 0) {
      formatted += part2;
      // Auto-append '-' as soon as 4 year digits (e.g. 2026) are entered
      if (part2.length === 4) {
        formatted += '-';
      }
    }
    
    if (part3.length > 0) {
      formatted += part3;
    }
    
    setInternId(formatted);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internId.trim() || internId.trim() === 'AES-' || internId.trim() === 'ASN-') return;

    setLoading(true);
    setError("");
    setData(null);

    const result = await verifyIntern(internId);

    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.error || "Verification failed");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Liquid Glass Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-30 pt-28 sm:pt-32">
        <Link 
          href="/careers" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-medium tracking-wide group mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Careers</span>
        </Link>

        <section className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-16 text-center">
            <h1 className="text-sm font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Identity Protocol
            </h1>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic">
              Verify <span className="text-silver-matte">Credentials.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed mt-6">
              Enter the unique Asenra Identification Number to access verified candidate records and official documentation.
            </p>
          </div>

          <div className="premium-depth-card p-2 rounded-[30px] relative overflow-hidden bg-white/2 mb-10 shadow-2xl">
            <div className="card-sheen" />
            <form onSubmit={handleVerify} className="relative flex items-center z-10">
              <div className="absolute left-6 text-neutral-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="AES-INT-2026-001"
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

          {error && (
            <div className="bg-red-950/30 border border-red-500/20 text-red-400 p-6 rounded-3xl text-center font-medium tracking-wide animate-in fade-in slide-in-from-top-2 duration-300 shadow-xl mb-10 flex items-center justify-center gap-3">
              <XCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {data && (
            <div className="premium-depth-card rounded-[40px] overflow-hidden bg-white/2 animate-in fade-in slide-in-from-bottom-6 duration-500 shadow-2xl relative border border-white/10">
              <div className="card-sheen" />
              <div className="p-8 sm:p-10 border-b border-white/5 relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Status
                  </span>
                  <span className="text-neutral-400 text-sm font-mono tracking-widest font-bold">{data.internId}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 uppercase tracking-tighter italic">
                  {data.firstName} {data.lastName}
                </h2>
                <p className="text-neutral-400 text-base sm:text-lg flex items-center gap-2 font-medium tracking-wide">
                  <Briefcase className="w-4 h-4 text-white" /> {data.role}
                </p>
              </div>

              <div className="p-8 sm:p-10 bg-black/40 relative z-10">
                <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-6">
                  Official Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.offerLetterLink && (
                    <a
                      href={data.offerLetterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm tracking-wide uppercase truncate">Offer Letter</h4>
                        <p className="text-neutral-400 text-xs mt-0.5 truncate">Signed Official Copy</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0 ml-2" />
                    </a>
                  )}

                  {data.ndaLink && (
                    <a
                      href={data.ndaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm tracking-wide uppercase truncate">NDA Agreement</h4>
                        <p className="text-neutral-400 text-xs mt-0.5 truncate">Non-Disclosure Agreement</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0 ml-2" />
                    </a>
                  )}
                  
                  <div className="flex items-center p-5 bg-white/[0.02] border border-white/5 border-dashed rounded-3xl opacity-60">
                    <div className="w-12 h-12 bg-black/30 rounded-2xl flex items-center justify-center mr-4">
                      <GraduationCap className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-400 font-bold text-sm tracking-wide uppercase">Certificate</h4>
                      <p className="text-neutral-600 text-xs mt-0.5">Pending Completion</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> ENTRY: {data.submittedAt}</span>
                  <span className="uppercase tracking-[0.2em] font-black text-neutral-400">Asenra Official Record</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
