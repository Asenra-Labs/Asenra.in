"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X, Lock, Mail, User, ShieldCheck, Loader2, AlertCircle, ArrowRight } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-2xl overflow-hidden">
        <div className="card-sheen" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Account Authentication Required</span>
          </div>

          <h3 className="text-2xl font-black uppercase italic tracking-tight text-white mb-1">
            {mode === "login" ? "Sign In to Apply" : "Create Account to Apply"}
          </h3>
          <p className="text-xs text-zinc-400 font-medium">
            {roleTitle ? `Applying for: ${roleTitle}` : "Authenticating candidate profile..."}
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 relative z-10">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {mode === "signup" && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="Sarvesh Gajakosh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-3.5 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-3.5 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-3"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{mode === "login" ? "Sign In & Continue" : "Create Account & Continue"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Mode Switch */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center relative z-10">
          {mode === "login" ? (
            <p className="text-xs text-zinc-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(""); }}
                className="text-white font-bold underline hover:text-zinc-300 transition-colors ml-1 cursor-pointer"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("login"); setError(""); }}
                className="text-white font-bold underline hover:text-zinc-300 transition-colors ml-1 cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
