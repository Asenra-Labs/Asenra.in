import Link from "next/link";
import Image from "next/image";

import { GlowField } from "./GlowField";
import { Eyebrow } from "./Eyebrow";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

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

/**
 * Site footer.
 *
 * Converted from a Client Component — it had a "use client" directive but no
 * hooks, state or handlers; the only dynamic value is the copyright year,
 * which the server can render just as well.
 */
export default function PremiumFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-black pb-12 pt-24 md:pt-32">
      <GlowField
        intensity="faint"
        className="bottom-0 left-0 h-[400px] w-[600px] -translate-x-1/3 translate-y-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.07] pb-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" aria-label="Asenra home">
              <Image
                src="/Full_text_logo.png"
                alt="Asenra"
                width={180}
                height={48}
                className="h-10 w-auto brightness-[100] transition-opacity hover:opacity-80"
              />
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/45 text-pretty">
              Enterprise AI consulting, intelligent business automation, and modern
              digital infrastructure engineered for ambitious companies.
            </p>

            {/*
              Relocated from the hero, where it floated over the headline with
              a glowing pulse ring and competed with the primary CTA.
            */}
            <Link
              href="/careers"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              <span className="size-1.5 rounded-full bg-white/70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                We are hiring
              </span>
            </Link>
          </div>

          {footerLinks.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <Eyebrow className="text-[10px]">{section.title}</Eyebrow>

              <ul className="mt-6 space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-white/45 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/45 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-10 md:flex-row">
          <p className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30 md:order-1">
            © {currentYear} Asenra — Enterprise AI Consulting
          </p>

          <div className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:order-2">
            <Link
              href="/privacy"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white"
            >
              Terms
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
              Global delivery & engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
