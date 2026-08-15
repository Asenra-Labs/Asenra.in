import { verifyIntern } from "../actions";
import { CheckCircle2, Briefcase, Calendar, GraduationCap, ArrowLeft, XCircle, ShieldCheck, Lock, Code2, Award } from "lucide-react";
import Link from "next/link";

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
            href="/hiring/verify" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-medium tracking-wide group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Verification Directory</span>
          </Link>

          <Link
            href="/portal"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white rounded-xl transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Employee Portal</span>
          </Link>
        </div>

        <section className="max-w-4xl mx-auto">
          <div className="space-y-3 mb-12 text-center">
            <h1 className="text-xs font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Identity Protocol Record
            </h1>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic">
              Record <span className="text-silver-matte">Lookup.</span>
            </h2>
          </div>

          <div className="relative min-h-[400px]">
            {!result.success || !result.data ? (
              <div className="w-full bg-red-950/20 border border-red-500/20 text-red-400 p-10 rounded-[40px] text-center flex flex-col items-center justify-center gap-6 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Verification Failed</h3>
                  <p className="font-medium tracking-wide text-red-400/80">
                    {result.error || `No record found for ID: ${internId}`}
                  </p>
                </div>
                <Link href="/hiring/verify" className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors">
                  Try Again
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Main Identity Profile Card */}
                <div className="premium-depth-card rounded-[40px] overflow-hidden bg-white/2 animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-2xl relative border border-white/10">
                  <div className="card-sheen" />
                  <div className="p-8 sm:p-10 border-b border-white/10 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-4 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Verified Status
                      </span>

                      {/* Candidate Status Badge */}
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${
                        result.data.status.toUpperCase() === 'ONGOING'
                          ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                          : result.data.status.toUpperCase() === 'TERMINATED' || result.data.status.toUpperCase() === 'DISCONTINUED'
                          ? 'bg-zinc-900 text-zinc-400 border border-zinc-700'
                          : 'bg-zinc-900 text-zinc-200 border border-white/20'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        Status: {result.data.status}
                      </span>

                      <span className="text-neutral-400 text-base font-mono font-bold tracking-widest ml-auto">
                        {result.data.internId}
                      </span>
                    </div>

                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-3 uppercase tracking-tighter italic">
                      {result.data.firstName} {result.data.lastName}
                    </h2>
                    <p className="text-neutral-300 text-lg flex items-center gap-2 font-medium tracking-wide">
                      <Briefcase className="w-4 h-4 text-white" /> {result.data.role}
                    </p>
                  </div>

                  <div className="p-8 sm:p-10 bg-black/40 relative z-10 space-y-8">
                    {/* Duration & Tenure */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                          Tenure & Duration
                        </span>
                        <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-zinc-400" />
                          <span>{result.data.duration || "Jun 2026 - Present"}</span>
                        </div>
                      </div>

                      <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                          Official Certificate Record
                        </span>
                        <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                          <Award className="w-4 h-4 text-zinc-400" />
                          <span>{result.data.certificateUrl || "Pending Completion"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Contributions & Tech Stack sections hidden until internship completion */}

                    {/* Protected Document Access Box */}
                    <div className="p-6 bg-gradient-to-br from-zinc-950 to-black border border-white/15 rounded-3xl space-y-4">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Official Documentation Security</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">Signed Offer Letter & NDA Agreements are restricted to authorized employee accounts.</p>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-zinc-500">Employee Credentials Required</span>
                        <Link
                          href="/portal"
                          className="px-5 py-2.5 bg-white text-black font-black uppercase text-xs tracking-wider rounded-xl hover:scale-105 transition-all flex items-center gap-2"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Login to Employee Portal</span>
                        </Link>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
                      <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> ENTRY: {result.data.submittedAt}</span>
                      <span className="uppercase tracking-[0.2em] font-black text-neutral-400">Asenra Official Record</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
