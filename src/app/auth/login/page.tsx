"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { authenticateEmployee } from "@/app/portal/actions";
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

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
    <div className="w-full max-w-md relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>Asenra Identity Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic text-white mb-2">
          Sign <span className="text-silver-matte">In.</span>
        </h1>
        <p className="text-xs text-zinc-400 font-medium">
          Access official employee documents, verified credentials, and team portal.
        </p>
      </div>

      {/* Single Unified Card Form */}
      <div className="premium-depth-card p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-2xl relative">
        <div className="card-sheen" />

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/20 text-zinc-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {resetMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/20 text-white text-xs flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>{resetMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
              Registered Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isResetting}
                className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {isResetting ? "Sending..." : "Forgot password?"}
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In & Access Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
            <strong>Default Employee Password:</strong> <code className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">asenra2026</code>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-zinc-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href={`/auth/signup?redirect=${encodeURIComponent(redirectUrl)}`}
              className="text-white font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex items-center justify-center pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-400/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-theme opacity-15" />
      </div>

      <Suspense fallback={
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading Sign In...</span>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  );
}
