import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageCircle, Bot, Settings } from "lucide-react";

export function ServicesSection() {
  const services = [
    { name: "Pro Websites", desc: "React/Tailwind + WhatsApp. 7 days.", icon: <Globe className="w-8 h-8 text-white" /> },
    { name: "WhatsApp Bots", desc: "n8n auto-replies. 5 days.", icon: <MessageCircle className="w-8 h-8 text-zinc-300" /> },
    { name: "AI Agents", desc: "OpenAI sales bots. 10 days.", icon: <Bot className="w-8 h-8 text-zinc-200" /> },
    { name: "Maintenance", desc: "Updates + SEO monthly.", icon: <Settings className="w-8 h-8 text-zinc-400" /> }
  ];

  return (
    <section id="services" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Our Services
          </h2>
          <p className="text-zinc-400 text-lg">
            High-performance solutions designed exclusively for SMBs to drive growth, efficiency, and revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group relative overflow-hidden bg-black/50 border-zinc-800 transition-all hover:bg-neutral-950/80 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1">
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-colors duration-500" />
              
              <CardHeader className="relative">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-black/50 border border-zinc-800 shadow-inner">
                   {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-zinc-200 transition-colors">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-zinc-400 text-base">
                  {service.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
          
          <Card className="group relative overflow-hidden bg-black/50 border-zinc-800 border-dashed transition-all hover:bg-neutral-950/80 hover:border-zinc-700 hover:shadow-2xl flex items-center justify-center p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-white mb-2">Custom Request?</h3>
              <p className="text-sm text-zinc-400 mb-4">Need something specific for your business?</p>
              <a href="#contact" className="text-white hover:text-zinc-300 font-medium inline-flex items-center text-sm underline underline-offset-4">
                Let&apos;s talk <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
