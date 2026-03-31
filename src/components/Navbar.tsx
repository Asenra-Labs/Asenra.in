"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
        isScrolled || mobileMenuOpen
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-black font-black text-xl md:text-2xl italic tracking-tighter">A</span>
          </div>
          <span className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase hidden sm:block">
            Asenra
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">
            Services
          </Link>
          <a href="tel:+918956634577" className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-black uppercase tracking-tight hover:scale-105 active:scale-95 transition-all">
            <Phone size={14} />
            Book Call
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-4">
          <a href="tel:+918956634577" className="p-2.5 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all">
            <Phone size={18} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 bg-zinc-900 text-white rounded-full border border-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-black z-[-1] flex flex-col p-12 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link 
            href="/services" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-black text-white uppercase tracking-tighter"
          >
            Services
          </Link>
          <div className="mt-auto border-t border-zinc-900 pt-8">
            <p className="text-zinc-500 mb-4 text-sm font-medium uppercase tracking-widest">Kolhapur Office</p>
            <p className="text-white text-lg">+91 89566 34577</p>
          </div>
        </div>
      )}
    </nav>
  );
}
