"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, PhoneCall } from "lucide-react";
import { YouFormModal } from "./YouFormModal";

const navLinks = [
  { label: "Capabilities", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Selected Work", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Packages", href: "/packages" },
  { label: "Company", href: "/company" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo - Just the "A" Logo Icon */}
          <Link href="/" className="flex items-center shrink-0 group py-0.5">
            <Image
              src="/logo.png"
              alt="ASENRA AI"
              width={48}
              height={48}
              className="h-8 sm:h-10 md:h-11 w-auto brightness-200 group-hover:scale-105 transition-all object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md shrink-0">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? "text-white bg-white/15 shadow-inner font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <Link
              href="/audit"
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-[11px] font-semibold text-zinc-300 hover:text-white transition-all whitespace-nowrap"
            >
              Free AI Audit
            </Link>
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-modern-light px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl xl:hidden pt-28 px-6 pb-12 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Enterprise Navigation
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-bold tracking-tight py-2.5 border-b border-white/5 transition-all ${
                    pathname === link.href
                      ? "text-white pl-2 border-white/30 font-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 mt-6">
            <Link
              href="/audit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 text-center text-xs font-bold uppercase tracking-widest text-white block"
            >
              Free AI Readiness Assessment
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsFormOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-white text-black text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Book AI Strategy Session
            </button>
          </div>
        </div>
      )}

      {/* Strategy Session Modal */}
      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="vt3flmg8"
      />
    </>
  );
}
