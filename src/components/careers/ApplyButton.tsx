"use client";

import { useState } from "react";
import type { VariantProps } from "class-variance-authority";

import { AuthModal } from "@/components/auth/AuthModal";
import { YouFormModal } from "@/components/ui/YouFormModal";
import { ctaVariants } from "@/components/ui/CtaButton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

/**
 * Apply action for a single role.
 *
 * Auth-gated: signed-in visitors go straight to the application form, everyone
 * else meets the sign-in modal first and is handed to the form on success.
 *
 * Self-contained on purpose. The page used to hoist this state to the top —
 * one `selectedRoleTitle` shared by every button — which made the whole page a
 * Client Component. Each button owning its own role means the page renders on
 * the server, and the behaviour is identical.
 */
export function ApplyButton({
  roleTitle,
  children,
  className,
  variant,
  size,
}: VariantProps<typeof ctaVariants> & {
  roleTitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { user } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => (user ? setIsFormOpen(true) : setIsAuthOpen(true))}
        className={cn(ctaVariants({ variant, size }), className)}
      >
        {children}
      </button>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          setIsFormOpen(true);
        }}
        roleTitle={roleTitle}
      />

      <YouFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="tzv3h9tr"
      />
    </>
  );
}
