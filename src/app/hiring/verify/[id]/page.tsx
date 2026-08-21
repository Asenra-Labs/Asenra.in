import { verifyIntern } from "../actions";
import { CheckCircle2, Briefcase, Calendar, ArrowLeft, Lock, XCircle } from "lucide-react";
import Link from "next/link";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VerifiedInternPage({ params }: PageProps) {
  const resolvedParams = await params;
  const internId = resolvedParams.id.toUpperCase();
  const result = await verifyIntern(internId);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <GridBackdrop />

      <div className="container relative z-10 mx-auto px-6 pb-24 pt-28 sm:pt-32">
        <div className="mb-12 flex items-center justify-between">
          <Link 
            href="/hiring/verify" 
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Verification Directory</span>
          </Link>

          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Lock className="size-3.5" />
            <span>Employee Portal</span>
          </Link>
        </div>

        <section className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <Eyebrow className="mb-3">Identity Protocol Record</Eyebrow>
            <h1 className="text-4xl font-medium tracking-tighter sm:text-5xl">
              Record Lookup.
            </h1>
          </div>

          <div className="relative min-h-[400px]">
            {!result.success || !result.data ? (
              <Panel interactive={false} className="flex flex-col items-center justify-center gap-6 p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <XCircle className="size-8 text-white/40" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium tracking-tight">Verification Failed</h3>
                  <p className="text-sm text-white/50">
                    {result.error || `No record found for ID: ${internId}`}
                  </p>
                </div>
                <Link 
                  href="/hiring/verify" 
                  className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                >
                  Try Again
                </Link>
              </Panel>
            ) : (
              <div className="space-y-6">
                <Panel interactive={false} className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden p-0">
                  <div className="border-b border-white/10 p-8 sm:p-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        <CheckCircle2 className="size-3.5" /> Verified Status
                      </span>

                      <span className={cn(
                        "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]",
                        result.data.status.toUpperCase() === 'ONGOING'
                          ? "border-white/20 bg-white text-black"
                          : result.data.status.toUpperCase() === 'TERMINATED' || result.data.status.toUpperCase() === 'DISCONTINUED'
                          ? "border-white/10 bg-white/[0.02] text-white/40"
                          : "border-white/10 bg-white/[0.04] text-white/70"
                      )}>
                        <span className="size-1.5 rounded-full bg-current" />
                        Status: {result.data.status}
                      </span>

                      <span className="ml-auto font-mono text-sm tracking-widest text-white/40">
                        {result.data.internId}
                      </span>
                    </div>

                    <h2 className="mb-3 text-3xl sm:text-5xl font-medium tracking-tight">
                      {result.data.firstName} {result.data.lastName}
                    </h2>
                    <p className="flex items-center gap-2 text-base text-white/60">
                      <Briefcase className="size-4 text-white/40" /> {result.data.role}
                    </p>
                    
                    {result.data.description && (
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                          {result.data.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-black/20 p-8 sm:p-10 space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-white/40">
                        Tenure & Duration
                      </span>
                      <div className="flex items-center gap-2 font-mono text-sm text-white/80">
                        <Calendar className="size-4 text-white/40" />
                        <span>{result.data.duration || "Jun 2026 - Present"}</span>
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Lock className="size-4.5 text-white/60" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium tracking-wide">Official Documentation Security</h4>
                          <p className="mt-1 text-sm text-white/50">Signed Offer Letter & NDA Agreements are restricted to authorized employee accounts.</p>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="font-mono text-[11px] text-white/30">Employee Credentials Required</span>
                        <Link
                          href="/portal"
                          className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-white/90"
                        >
                          <Lock className="size-3.5" />
                          <span>Login to Employee Portal</span>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono text-[10px] text-white/30">
                      <span className="flex items-center gap-2 uppercase tracking-widest"><Calendar className="size-3.5" /> ENTRY: {result.data.submittedAt}</span>
                      <span className="uppercase tracking-[0.2em]">Asenra Official Record</span>
                    </div>
                  </div>
                </Panel>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
