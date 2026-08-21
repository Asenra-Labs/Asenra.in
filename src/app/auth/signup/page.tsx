"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, User, ArrowRight, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Field } from "@/components/ui/Field";
import { FormAlert } from "@/components/ui/FormAlert";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/portal";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (signUpErr) {
        setError(signUpErr.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        if (typeof window !== "undefined") {
          localStorage.setItem("asenra_session_email", email.trim());
        }
        router.push(redirectUrl);
        router.refresh();
      } else {
        setSuccessMsg("Account created successfully! You can now sign in.");
        setTimeout(() => {
          router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`);
        }, 1500);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during account registration.");
      setLoading(false);
    }
  };

  return (
    <>
      {error ? <FormAlert tone="error" className="mb-6">{error}</FormAlert> : null}
      {successMsg ? (
        <FormAlert tone="success" className="mb-6">{successMsg}</FormAlert>
      ) : null}

      <form onSubmit={handleSignup} className="space-y-5">
        <Field
          id="signup-name"
          label="Full name"
          icon={User}
          type="text"
          autoComplete="name"
          required
          placeholder="Alex Morgan"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Field
          id="signup-email"
          label="Email address"
          icon={Mail}
          type="email"
          autoComplete="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          id="signup-password"
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Field
          id="signup-confirm"
          label="Confirm password"
          icon={Lock}
          type="password"
          autoComplete="new-password"
          required
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Creating account…</span>
            </>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-7 border-t border-white/[0.07] pt-6 text-center text-xs text-white/40">
        Already have an account?{" "}
        <Link
          href={`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`}
          className="font-medium text-white transition-colors hover:text-white/70"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Asenra identity protocol"
      title="Create account."
      lede="Register for account access and official team services."
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center gap-2 py-8 font-mono text-xs text-white/40">
            <Loader2 className="size-4 animate-spin" />
            <span>Loading…</span>
          </div>
        }
      >
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
