"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, User as UserIcon, Lock } from "lucide-react";

import { YouFormModal } from "./YouFormModal";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Capabilities", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Selected Work", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "Packages", href: "/packages" },
  { label: "Company", href: "/company" },
  { label: "Careers", href: "/careers" },
];

/** Routes that render their own chrome and should not show the marketing nav. */
const CHROMELESS = ["/admin", "/portal", "/auth"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const pathname = usePathname();

  /*
   * The drawer stores the route it was opened on rather than a bare boolean,
   * so any navigation — link tap, back button, anything — closes it by
   * definition. The previous approach synced a boolean in an effect keyed on
   * pathname, which triggers a cascading render.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const mobileMenuOpen = openedOn !== null && openedOn === pathname;
  const setMobileMenuOpen = (open: boolean) => setOpenedOn(open ? pathname : null);
  const { user, activeEmail, isLoggedIn } = useAuth();

  const displayEmail = activeEmail || user?.email;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (CHROMELESS.some((prefix) => pathname?.startsWith(prefix))) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300",
          scrolled
            ? "border-b border-white/10 bg-black/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5"
        )}
      >
        {/*
          Three columns, with the outer two on `flex-1` so they claim equal
          width. `justify-between` alone left the nav sitting left of centre,
          because the logo is narrow and the action buttons are wide.
        */}
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 md:px-10 lg:gap-6">
          <div className="flex flex-1 items-center">
            <Link href="/" className="shrink-0" aria-label="Asenra home">
              <Image
                src="/logo.png"
                alt="Asenra"
                width={44}
                height={44}
                className="h-8 w-auto object-contain brightness-200 transition-opacity hover:opacity-80 md:h-9"
                priority
              />
            </Link>
          </div>

          <nav className="hidden shrink-0 items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "whitespace-nowrap text-[12.5px] tracking-tight transition-colors xl:text-[13px]",
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/45 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2.5 lg:gap-3">
            <div className="hidden shrink-0 items-center gap-2.5 sm:flex lg:gap-3">
            {isLoggedIn && displayEmail ? (
              <Link
                href="/portal"
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/70 transition-colors hover:border-white/25 hover:text-white sm:inline-flex"
              >
                <UserIcon className="size-3.5" />
                <span className="max-w-[140px] truncate">
                  {displayEmail.split("@")[0]}
                </span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/55 transition-colors hover:border-white/25 hover:text-white sm:inline-flex"
              >
                <Lock className="size-3" />
                <span>Login</span>
              </Link>
            )}

            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-medium tracking-tight text-black transition-colors hover:bg-white/90"
            >
              <span className="lg:hidden xl:inline">Book a strategy call</span>
              <span className="hidden lg:inline xl:hidden">Book a call</span>
              <ArrowRight className="size-3.5" />
            </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white transition-colors hover:border-white/25 lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-black/95 px-6 pb-12 pt-28 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "border-b border-white/[0.07] py-4 text-2xl font-medium tracking-tighter transition-colors",
                  isActive(link.href) ? "text-white" : "text-white/45"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
            <Link
              href={isLoggedIn && displayEmail ? "/portal" : "/auth/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-3.5 text-[13px] text-white/70"
            >
              {isLoggedIn && displayEmail ? (
                <>
                  <UserIcon className="size-4" />
                  <span className="max-w-[220px] truncate">{displayEmail}</span>
                </>
              ) : (
                <>
                  <Lock className="size-3.5" />
                  <span>Login</span>
                </>
              )}
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsFormOpen(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[13px] font-medium tracking-tight text-black"
            >
              <span>Book a strategy call</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      <YouFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
