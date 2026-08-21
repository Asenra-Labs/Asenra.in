"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";

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
    <main className="relative isolate min-h-screen overflow-hidden bg-black pb-24 pt-28">
      <GridBackdrop className="opacity-60" />
      <GlowField
        intensity="base"
        className="left-1/2 top-1/4 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 md:px-10">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
          <Link
            href="/careers"
            className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to careers</span>
          </Link>

          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/55 transition-colors hover:border-white/25 hover:text-white"
          >
            <Lock className="size-3" />
            <span>Employee portal</span>
          </Link>
        </div>

        <section className="mt-16 text-center">
          <Eyebrow className="mb-5">Identity protocol</Eyebrow>

          <h1 className="text-4xl font-medium tracking-tighter text-white sm:text-5xl md:text-6xl">
            Verify credentials.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/45 text-pretty">
            Enter the unique Asenra identification number to access verified
            candidate records and official documentation.
          </p>

          <form onSubmit={handleVerify} className="mt-12">
            <label htmlFor="intern-id" className="sr-only">
              Asenra identification number
            </label>

            <div className="relative flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1.5 transition-colors focus-within:border-white/35">
              <Search className="pointer-events-none absolute left-6 size-4 text-white/30" />

              <input
                id="intern-id"
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder="ASN-INT-2026-001"
                value={internId}
                onChange={handleInputChange}
                className="h-12 w-full bg-transparent pl-14 pr-4 font-mono text-base tracking-[0.1em] text-white outline-none placeholder:text-white/20"
              />

              <button
                type="submit"
                disabled={loading || !internId.trim() || internId.length < 5}
                className="h-12 shrink-0 rounded-full bg-white px-7 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Verify"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
