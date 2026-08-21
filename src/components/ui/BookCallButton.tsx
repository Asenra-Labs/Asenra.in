"use client";

import { useState } from "react";
import type { VariantProps } from "class-variance-authority";

import { YouFormModal } from "./YouFormModal";
import { ctaVariants } from "./CtaButton";
import { cn } from "@/lib/utils";

/**
 * Opens the booking modal.
 *
 * Exists so pages do not have to become Client Components just to own a
 * boolean. Every marketing page previously carried "use client" for exactly
 * this — one `useState` driving one modal — which sent the whole page's
 * markup to the browser as JavaScript.
 */
export function BookCallButton({
  children,
  className,
  variant,
  size,
  formId,
}: VariantProps<typeof ctaVariants> & {
  children: React.ReactNode;
  className?: string;
  formId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(ctaVariants({ variant, size }), className)}
      >
        {children}
      </button>

      <YouFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formId={formId}
      />
    </>
  );
}
