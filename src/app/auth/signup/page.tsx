"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User, Mail, Lock, ArrowRight, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

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
    <div className="w-full max-w-md relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>Asenra Identity Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic text-white mb-2">
          Create <span className="text-silver-matte">Account.</span>
        </h1>
        <p className="text-sm text-zinc-400 font-medium">
          Register for account access and official team services.
        </p>
      </div>

      {/* Form Card */}
      <div className="premium-depth-card p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-2xl relative">
        <div className="card-sheen" />

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/20 text-zinc-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/20 text-white text-xs flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
              <User className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
              Email Address
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
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-zinc-400">
            Already have an account?{" "}
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`}
              className="text-white font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
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
          <span>Loading Sign Up...</span>
        </div>
      }>
        <SignupForm />
      </Suspense>
    </main>
  );
}
