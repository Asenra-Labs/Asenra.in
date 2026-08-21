"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Cookie, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Matches the CSS transition duration below. */
const EXIT_MS = 400;

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  /** Drives the slide-in; flipped one frame after the banner mounts. */
  const [isEntered, setIsEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Force a fresh check on every mount
    setIsMounted(true);

    const initializeConsent = setTimeout(() => {
      // We use a newer version key to force it to show after our updates
      const hasConsented = localStorage.getItem("cookie-consent-v5");
      if (!hasConsented) {
        setIsVisible(true);
      }
    }, 1000); // 1s delay gives the main site time to settle

    return () => clearTimeout(initializeConsent);
  }, []);

  // Enter on the frame after mount, so the browser has an off-screen start
  // state to transition from.
  useEffect(() => {
    if (!isVisible) return;
    const frame = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  const dismiss = useCallback((choice: "accepted" | "declined") => {
    // Persist first. The old implementation wrote the choice in a GSAP
    // onComplete callback, so navigating away mid-animation lost it and the
    // banner returned on the next page.
    localStorage.setItem("cookie-consent-v5", choice);
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), EXIT_MS);
  }, []);

  const handleAccept = () => dismiss("accepted");
  const handleDecline = () => dismiss("declined");

  if (!isMounted || !isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[10000] w-full pointer-events-auto",
        "transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        isEntered && !isExiting
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="relative border-t border-white/10 bg-black/90 backdrop-blur-md md:backdrop-blur-4xl shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6 py-4 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 hidden sm:flex">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-sm font-black text-white italic tracking-tight uppercase">
                Cookie Architecture
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed mt-1 max-w-2xl font-medium">
                We utilize elite-grade optimizations to architect a smoother digital experience. By engaging, you consent to our high-performance data specifications.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              href="/privacy"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all text-center"
            >
              Specs
            </Link>
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-8 py-2.5 btn-modern-light rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Constructive Accept
            </button>
            <button 
              onClick={handleDecline}
              className="hidden lg:flex p-2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
