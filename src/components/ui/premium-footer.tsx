"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, MessageSquare } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks: FooterSection[] = [
    {
      title: "Company",
      links: [
        { label: "Our Vision", href: "/vision" },
        { label: "Join the Elite", href: "/hiring" },
        { label: "Architecture", href: "/architecture" },
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/asenra/", icon: Globe },
        { label: "Instagram", href: "https://www.instagram.com/asenra.in/", icon: Globe },
        { label: "GitHub", href: "https://github.com/Asenra-Org", icon: Globe },
      ]
    }
  ];

  return (
    <footer className="relative bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Decorative Gradient Glows */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/2 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-1/3 bg-white/2 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 border-r border-white/5 pr-8">
            <Link href="/" className="inline-block mb-8 group opacity-90 hover:opacity-100 transition-opacity">
              <Image 
                src="/Full_text_logo.png" 
                alt="Asenra" 
                width={200} 
                height={54} 
                className="h-14 w-auto brightness-[100]" 
              />
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-[240px] mb-8 font-medium">
              Architecting the digital infrastructure for elite Indian businesses. Built for performance, designed for impact.
            </p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white text-xs font-black tracking-[0.3em] uppercase mb-8 opacity-40">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-neutral-400 hover:text-white transition-colors text-sm font-medium flex items-center group gap-2"
                    >
                      {"icon" in link && link.icon && <link.icon className="w-3.5 h-3.5 opacity-50" />}
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Massive Text Background */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden h-[300px] flex items-end justify-center">
             <span className="text-[14vw] font-black tracking-tighter text-white/5 leading-[0.5] select-none whitespace-nowrap uppercase">
               Asenra Corp 2026
             </span>
          </div>

          <div className="text-neutral-500 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase order-2 md:order-1">
            © {currentYear} Asenra Labs Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-8 order-1 md:order-2">
             <Link href="/privacy" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
               Privacy
             </Link>
             <Link href="/terms" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
               Terms
             </Link>
             <div className="w-1 h-1 rounded-full bg-white/10" />
             <span className="text-neutral-600 text-[10px] font-black uppercase tracking-widest">
               Kolhapur, MH
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
