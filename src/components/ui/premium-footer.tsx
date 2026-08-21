"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
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
        { label: "Founder Philosophy", href: "/company" },
        { label: "Careers & Culture", href: "/careers" },
        { label: "Execution Process", href: "/process" },
        { label: "System Architecture", href: "/architecture" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "AI Consulting", href: "/solutions#ai-consulting" },
        { label: "AI Implementation", href: "/solutions#ai-implementation" },
        { label: "Intelligent Automation", href: "/solutions#process-automation" },
        { label: "Custom Software", href: "/solutions#custom-software" },
        { label: "Digital Infrastructure", href: "/solutions#digital-infrastructure" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "Manufacturing", href: "/industries#manufacturing" },
        { label: "Healthcare", href: "/industries#healthcare" },
        { label: "Finance & Banking", href: "/industries#finance" },
        { label: "Retail & D2C", href: "/industries#retail" },
        { label: "Professional Services", href: "/industries#professional-services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Selected Work", href: "/case-studies" },
        { label: "Insights & Analysis", href: "/insights" },
        { label: "Web Packages", href: "/packages" },
        { label: "AI Readiness Audit", href: "/audit" },
        { label: "Book Strategy Call", href: "/contact" },
        { label: "LinkedIn ↗", href: "https://www.linkedin.com/company/asenra/", external: true },
      ],
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
      {/* Decorative Gradient Glows */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/[0.02] rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-1/3 bg-white/[0.02] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 border-r border-white/5 pr-6">
            <Link href="/" className="inline-block mb-6 group opacity-90 hover:opacity-100 transition-opacity">
              <Image 
                src="/Full_text_logo.png" 
                alt="Asenra" 
                width={180} 
                height={48} 
                className="h-12 w-auto brightness-[100]" 
              />
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed font-medium mb-6">
              Enterprise AI Consulting, Intelligent Business Automation, and Modern Digital Infrastructure engineered for ambitious companies.
            </p>
            {/*
              Relocated from the hero, where it floated over the headline with
              a glowing pulse ring and competed with the primary CTA. The
              signal is worth keeping; the hero is not the place for it.
            */}
            <Link
              href="/careers"
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              <span className="size-1.5 rounded-full bg-white/70" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                We are hiring
              </span>
            </Link>

            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Asenra Technology Labs
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white text-[11px] font-black tracking-[0.25em] uppercase mb-6 text-zinc-400">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors text-xs font-medium flex items-center group gap-1.5"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="text-zinc-400 hover:text-white transition-colors text-xs font-medium flex items-center group gap-1.5"
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-zinc-500" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] order-2 md:order-1">
            © {currentYear} ASENRA. Enterprise AI Consulting & Intelligent Systems.
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link href="/privacy" className="text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
              Terms of Service
            </Link>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
              Global Delivery & Engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
