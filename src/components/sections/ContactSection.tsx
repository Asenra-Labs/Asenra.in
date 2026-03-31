"use client";

import { MessageSquare, Mail, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thanks for your interest! A representative from ASENRA will reach out soon.");
  };

  return (
    <section id="contact" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Let&apos;s Build Your<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">
                  Digital Engine
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-lg">
                Whether you need a Pro Website, a WhatsApp Bot, or a Custom OpenAI Agent, contact us and launch in as little as 7 days.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-full border border-zinc-800 bg-black/50 flex flex-col justify-center items-center shrink-0">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium">Email</div>
                  <a href="mailto:info@asenra.in" className="text-lg font-medium hover:text-white transition-colors">info@asenra.in</a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-full border border-zinc-800 bg-black/50 flex flex-col justify-center items-center shrink-0">
                  <MapPinned className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium">Office</div>
                  <div className="text-lg font-medium">Kolhapur, India</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="https://wa.me/910000000000?text=Hi%20ASENRA!%20I%20am%20interested%20in%20your%20tech%20services." 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#25D366] px-8 text-sm font-semibold text-white transition-all hover:bg-[#20BE5C] hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                <div className="mr-2 h-5 w-5 bg-white scale-[0.8] [mask-image:url('https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg')] [mask-size:cover]" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-black/60 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none rounded-2xl" />
            <form onSubmit={handleSubmit} className="relative space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  autoComplete="name"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-zinc-800 bg-black text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  autoComplete="email"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-zinc-800 bg-black text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-zinc-400">Interested Service</label>
                <select 
                  id="service" 
                  defaultValue=""
                  className="w-full h-12 px-4 rounded-xl border border-zinc-800 bg-black text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none font-medium"
                >
                  <option value="" disabled hidden>Select a service...</option>
                  <option value="react-website">Pro React Website</option>
                  <option value="whatsapp-bot">WhatsApp Bot (n8n)</option>
                  <option value="ai-agent">OpenAI Sales Agent</option>
                  <option value="mobile-app">React Native Mobile App</option>
                  <option value="maintenance">Maintenance & SEO</option>
                </select>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 bg-white text-zinc-950 hover:bg-zinc-200 text-base font-semibold">
                  Get Your Free Audit
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
