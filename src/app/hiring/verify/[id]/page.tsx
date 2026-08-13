import { verifyIntern } from "../actions";
import { CheckCircle2, FileText, Briefcase, Calendar, Shield, ExternalLink, GraduationCap, ArrowLeft, XCircle } from "lucide-react";
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
      {/* Liquid Glass Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-30 pt-28 sm:pt-32">
        <Link 
          href="/hiring/verify" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-medium tracking-wide group mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Verification</span>
        </Link>

        <section className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-16 text-center">
            <h1 className="text-sm font-bold tracking-[0.4em] text-neutral-400 uppercase">
              Identity Protocol
            </h1>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic">
              Record <span className="text-silver-matte">Lookup.</span>
            </h2>
          </div>

          <div className="relative min-h-[400px]">
            {!result.success || !result.data ? (
              <div className="absolute w-full bg-red-950/20 border border-red-500/20 text-red-400 p-10 rounded-[40px] text-center flex flex-col items-center justify-center gap-6 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
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
              <div className="premium-depth-card rounded-[40px] overflow-hidden bg-white/2 animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-2xl relative">
                <div className="card-sheen" />
                <div className="p-10 border-b border-white/5 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Verified Status
                    </span>

                    {/* Candidate Status Badge */}
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${
                      (result.data.status || 'ONGOING').toUpperCase() === 'ONGOING'
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                        : (result.data.status || '').toUpperCase() === 'TERMINATED' || (result.data.status || '').toUpperCase() === 'DISCONTINUED'
                        ? 'bg-zinc-900 text-zinc-400 border border-zinc-700'
                        : 'bg-zinc-900 text-zinc-200 border border-white/20'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      Status: {result.data.status || 'ONGOING'}
                    </span>

                    <span className="text-neutral-500 text-sm font-mono tracking-widest ml-auto">{result.data.internId}</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black text-white mb-2 uppercase tracking-tighter italic">
                    {result.data.firstName} {result.data.lastName}
                  </h2>
                  <p className="text-neutral-400 text-lg flex items-center gap-2 font-medium tracking-wide">
                    <Briefcase className="w-4 h-4" /> {result.data.role}
                  </p>
                </div>

                <div className="p-10 bg-black/40 relative z-10">
                  <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-6">
                    Official Documentation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.data.offerLetterLink && (
                      <a
                        href={result.data.offerLetterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-5 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-sm tracking-wide uppercase">Offer Letter</h4>
                          <p className="text-neutral-500 text-xs mt-0.5">Signed Official Copy</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                      </a>
                    )}

                    {result.data.ndaLink && (
                      <a
                        href={result.data.ndaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-5 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-sm tracking-wide uppercase">NDA Agreement</h4>
                          <p className="text-neutral-500 text-xs mt-0.5">Non-Disclosure Agreement</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
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

                  <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-mono">
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> ENTRY: {result.data.submittedAt}</span>
                    <span className="uppercase tracking-[0.2em] font-black">Asenra Official Record</span>
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
