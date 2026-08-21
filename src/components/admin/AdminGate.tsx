"use client";

import { Loader2, Lock } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { FormAlert } from "@/components/ui/FormAlert";
import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";

/**
 * Sign-in screen shared by the three admin surfaces.
 *
 * Each of them previously carried its own: different card radii, three
 * different input treatments, and error states that ranged from red-950 to
 * plain white. The fields are passed in as children so each page keeps
 * whatever credentials it actually asks for.
 */
export function AdminGate({
  eyebrow,
  title,
  lede,
  error,
  loading,
  submitLabel,
  onSubmit,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  error?: string;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-20">
      <GridBackdrop className="opacity-60" />
      <GlowField
        intensity="base"
        className="left-1/2 top-1/2 h-[440px] w-[700px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 w-full max-w-md">
        <header className="text-center">
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h1 className="text-2xl font-medium tracking-tighter text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/45 text-pretty">
            {lede}
          </p>
        </header>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-sm sm:p-8">
          {error ? (
            <FormAlert tone="error" className="mb-6">
              {error}
            </FormAlert>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-5">
            {children}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <Lock className="size-3.5" />
                  <span>{submitLabel}</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-7 border-t border-white/[0.07] pt-6 text-center">
            <Link
              href="/"
              className="font-mono text-[11px] text-white/35 transition-colors hover:text-white"
            >
              ← Return to the main site
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
