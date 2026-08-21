"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, User, ArrowRight, Loader2, X } from "lucide-react";

import { Field } from "@/components/ui/Field";
import { FormAlert } from "@/components/ui/FormAlert";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  roleTitle?: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, roleTitle }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }

    if (mode === "signup" && !fullName) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        if (data.session) {
          setLoading(false);
          onSuccess();
        }
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: { full_name: fullName.trim() },
          },
        });
        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        if (data.session) {
          setLoading(false);
          onSuccess();
        } else {
          // If sign up succeeded but auto-session depends on email confirmation settings
          setLoading(false);
          onSuccess();
        }
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Sign in to apply" : "Create an account to apply"}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0A] p-7 sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/50 transition-colors hover:border-white/25 hover:text-white"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <header className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            Authentication required
          </p>
          <h2 className="mt-4 text-2xl font-medium tracking-tighter text-white">
            {mode === "login" ? "Sign in to apply." : "Create an account to apply."}
          </h2>
          <p className="mt-3 text-xs text-white/45 text-pretty">
            {roleTitle ? `Applying for ${roleTitle}` : "Authenticating candidate profile"}
          </p>
        </header>

        {error ? <FormAlert tone="error" className="mt-6">{error}</FormAlert> : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {mode === "signup" ? (
            <Field
              id="auth-modal-name"
              label="Full name"
              icon={User}
              type="text"
              autoComplete="name"
              required
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          ) : null}

          <Field
            id="auth-modal-email"
            label="Email address"
            icon={Mail}
            type="email"
            autoComplete="email"
            required
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Field
            id="auth-modal-password"
            label="Password"
            icon={Lock}
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            placeholder={mode === "login" ? "Enter your password" : "At least 6 characters"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <span>{mode === "login" ? "Sign in & continue" : "Create account & continue"}</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-7 border-t border-white/[0.07] pt-6 text-center text-xs text-white/40">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            className="font-medium text-white transition-colors hover:text-white/70"
          >
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
