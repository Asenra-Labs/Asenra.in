"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { authenticateEmployee } from "@/app/portal/actions";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Field } from "@/components/ui/Field";
import { FormAlert } from "@/components/ui/FormAlert";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/portal";
  const { setCustomSessionEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter both your registered Email Address and Password.");
      return;
    }

    setLoading(true);

    try {
      // 1. Check direct database records first (zero rate limits & zero 400 errors)
      const empRes = await authenticateEmployee(cleanEmail, cleanPassword);
      if (empRes.success && empRes.data) {
        setCustomSessionEmail(empRes.data.email.trim());
        if (typeof window !== "undefined") {
          localStorage.setItem("asenra_employee_id", empRes.data.internId);
        }

        // Quietly attempt Supabase Auth sign in if user account exists
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        }).catch(() => {});

        router.push(redirectUrl);
        router.refresh();
        return;
      }

      // 2. Standard Supabase Auth fallback
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (authData?.session) {
        setCustomSessionEmail(authData.session.user.email || cleanEmail);
        router.push(redirectUrl);
        router.refresh();
        return;
      }

      setError(authError?.message || empRes.error || "Invalid credentials. Please verify your Email Address and Password.");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your registered email address first.");
      return;
    }

    setIsResetting(true);
    setError("");
    setResetMessage("");

    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/portal?reset=true`,
      });

      if (resetErr) {
        setError(resetErr.message);
      } else {
        setResetMessage("Password reset email sent! Please check your inbox.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      {error ? <FormAlert tone="error" className="mb-6">{error}</FormAlert> : null}
      {resetMessage ? (
        <FormAlert tone="success" className="mb-6">{resetMessage}</FormAlert>
      ) : null}

      <form onSubmit={handleLogin} className="space-y-5">
        <Field
          id="login-email"
          label="Registered email address"
          icon={Mail}
          type="email"
          autoComplete="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          id="login-password"
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          action={
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isResetting}
              className="font-mono text-[11px] text-white/40 transition-colors hover:text-white disabled:opacity-50"
            >
              {isResetting ? "Sending…" : "Forgot password?"}
            </button>
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-7 border-t border-white/[0.07] pt-6 text-center text-xs text-white/40">
        Don&apos;t have an account yet?{" "}
        <Link
          href={`/auth/signup?redirect=${encodeURIComponent(redirectUrl)}`}
          className="font-medium text-white transition-colors hover:text-white/70"
        >
          Create one
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Asenra identity protocol"
      title="Sign in."
      lede="Access official employee documents, verified credentials, and the team portal."
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center gap-2 py-8 font-mono text-xs text-white/40">
            <Loader2 className="size-4 animate-spin" />
            <span>Loading…</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
