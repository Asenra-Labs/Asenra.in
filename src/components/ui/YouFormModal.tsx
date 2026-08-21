"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId?: string;
}

/** Matches the CSS transition duration below. */
const EXIT_MS = 300;

/**
 * Booking form in an overlay.
 *
 * The previous version rendered its markup — including the third-party
 * <iframe> — at all times and merely toggled opacity. Since the navbar mounts
 * this modal on every marketing page, that meant every page load fetched
 * app.youform.com whether or not anyone opened the form, and any page with
 * several triggers loaded it several times over. It now mounts on open and
 * unmounts on close, so the request happens when the user asks for it.
 */
export function YouFormModal({ isOpen, onClose, formId = "v71b3eiv" }: YouFormModalProps) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }
    if (!mounted) return;
    setEntered(false);
    const timer = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [isOpen, mounted]);

  // Enter on the frame after mount, so there is an off-screen state to
  // transition from.
  useEffect(() => {
    if (!mounted || !isOpen) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [mounted, isOpen]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!mounted) return;
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted, handleKeyDown]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Book a consultation"
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300",
          entered ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]",
          "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.98] opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Secure consultation portal
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/50 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden bg-black">
          <iframe
            src={`https://app.youform.com/forms/${formId}`}
            className="size-full border-none"
            title="Asenra consultation form"
          />
        </div>
      </div>
    </div>
  );
}
