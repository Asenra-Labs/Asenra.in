import { Target, Users, MapPin } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-black text-white relative border-t border-zinc-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neutral-950/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">About ASENRA</h2>
          <p className="text-zinc-400 text-lg">
            A premium agency built on the belief that small businesses deserve world-class technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-black/40 p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-6 p-4 inline-flex rounded-xl bg-neutral-950/50 text-indigo-400">
               <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-zinc-400 leading-relaxed">
              We empower SMBs—from local tiffins to high-street salons—with pro-tier websites, intelligent WhatsApp bots, and AI agents to exponentially scale their revenue and ease operations.
            </p>
          </div>

          <div className="bg-black/40 p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-6 p-4 inline-flex rounded-xl bg-neutral-950/50 text-emerald-400">
               <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Expert Team</h3>
            <p className="text-zinc-400 leading-relaxed">
              Backed by a powerhouse team of <span className="text-white font-medium">20+</span> expert developers, designers, and AI engineers. We blend deep technical capability with a focus on real-world business outcomes.
            </p>
          </div>

          <div className="bg-black/40 p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-6 p-4 inline-flex rounded-xl bg-neutral-950/50 text-amber-400">
               <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Kolhapur-First</h3>
            <p className="text-zinc-400 leading-relaxed">
              Proudly based in Kolhapur, we understand the pulse of Indian small businesses. Our roots keep us grounded, while our technology propels your growth globally.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
