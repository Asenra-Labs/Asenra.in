"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getEmployeeByEmail } from "./actions";
import { InternData } from "../hiring/verify/actions";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { 
  ShieldCheck, FileText, User, 
  ExternalLink, KeyRound, Loader2, AlertCircle, ArrowLeft, LogOut, Key, CheckCircle2
} from "lucide-react";

export default function PortalPage() {
  const { user, loading: authLoading, signOut } = useAuth();

  // Active email session state (supports Supabase Auth & Direct Session)
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  
  // Employee data state
  const [internData, setInternData] = useState<InternData | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"documents" | "security">("documents");

  // Password Change State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");

  useEffect(() => {
    // 1. Resolve active session email
    const localEmail = typeof window !== "undefined" ? localStorage.getItem("asenra_session_email") : null;
    const currentEmail = user?.email || localEmail;
    setActiveEmail(currentEmail);

    async function loadData() {
      if (currentEmail) {
        setDataLoading(true);
        const res = await getEmployeeByEmail(currentEmail);
        if (res.success && res.data) {
          setInternData(res.data);
        } else {
          setInternData(null);
        }
        setDataLoading(false);
      } else {
        setInternData(null);
      }
    }
    loadData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem("asenra_session_email");
      localStorage.removeItem("asenra_employee_id");
    }
    setActiveEmail(null);
    setInternData(null);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess("");

    if (!newPassword) {
      setPwdError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setPwdError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError("Passwords do not match.");
      return;
    }

    setPwdLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword.trim(),
      });

      if (error) {
        setPwdError(error.message);
      } else {
        setPwdSuccess("Security password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setPwdError(err?.message || "Failed to update password.");
    } finally {
      setPwdLoading(false);
    }
  };

  if (authLoading && !activeEmail) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span>Authenticating Session...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-28 pb-32 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-400/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-theme opacity-15" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        
        {/* Navigation & Sign Out */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer text-sm font-medium tracking-wide group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>

          {activeEmail && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                {activeEmail}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-red-950/40 hover:border-red-500/30 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-red-300 rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* LOGGED IN USER INTERFACE */}
        {activeEmail ? (
          <div className="space-y-8">
            
            {/* Header Identity Card */}
            <div className="premium-depth-card p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 backdrop-blur-2xl">
              <div className="card-sheen" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-xl italic uppercase">
                    {internData ? `${internData.firstName[0]}${internData.lastName[0]}` : (activeEmail[0].toUpperCase())}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-zinc-400">
                        {internData ? internData.internId : "TEAM-ACCOUNT"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white text-black">
                        {internData ? internData.status : "ACTIVE"}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      {internData ? `${internData.firstName} ${internData.lastName}` : activeEmail.split('@')[0]}
                    </h1>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {internData ? internData.role : "Asenra Registered Account"}
                    </p>
                  </div>
                </div>

                {internData && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Verified Employee Record
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "documents"
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Official Documents</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "security"
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Security & Password</span>
              </button>
            </div>

            {/* TAB 1: DOCUMENTS */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                {dataLoading ? (
                  <div className="p-12 text-center text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Loading profile documents...</span>
                  </div>
                ) : internData ? (
                  /* REGISTERED EMPLOYEE DOCUMENTS */
                  <div className="space-y-6">
                    {/* Employee Profile Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="premium-depth-card p-5 rounded-2xl border border-white/10 bg-zinc-950">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                          Role Title
                        </div>
                        <div className="text-sm font-bold text-white">
                          {internData.role}
                        </div>
                      </div>
                      <div className="premium-depth-card p-5 rounded-2xl border border-white/10 bg-zinc-950">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                          Tenure / Duration
                        </div>
                        <div className="text-sm font-bold text-white">
                          {internData.duration}
                        </div>
                      </div>
                      <div className="premium-depth-card p-5 rounded-2xl border border-white/10 bg-zinc-950">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                          Verification ID
                        </div>
                        <div className="text-sm font-mono font-bold text-white">
                          {internData.internId}
                        </div>
                      </div>
                    </div>

                    {/* Official Documents Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Offer Letter */}
                      <div className="premium-depth-card p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden flex flex-col justify-between">
                        <div className="card-sheen" />
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                              <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-white border border-white/20 px-2.5 py-1 rounded-full bg-white/10">
                              Signed Offer Letter
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">Official Offer Letter</h3>
                          <p className="text-xs text-zinc-400 mb-6">
                            Official engagement terms and agreement contract.
                          </p>
                          {internData.offerLetterLink ? (
                            <a
                              href={internData.offerLetterLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                            >
                              <span>Download Offer Letter</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <div className="p-3 rounded-xl bg-white/5 text-center text-xs text-zinc-500 font-mono">
                              Document Pending
                            </div>
                          )}
                        </div>
                      </div>

                      {/* NDA Agreement */}
                      <div className="premium-depth-card p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden flex flex-col justify-between">
                        <div className="card-sheen" />
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                              <ShieldCheck className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-white border border-white/20 px-2.5 py-1 rounded-full bg-white/10">
                              Signed NDA Agreement
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">Non-Disclosure Agreement</h3>
                          <p className="text-xs text-zinc-400 mb-6">
                            Intellectual property protection and confidentiality terms.
                          </p>
                          {internData.ndaLink ? (
                            <a
                              href={internData.ndaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                            >
                              <span>Download NDA Form</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <div className="p-3 rounded-xl bg-white/5 text-center text-xs text-zinc-500 font-mono">
                              Document Pending
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* GENERAL ACCOUNT DASHBOARD (NO EMPLOYEE DOCUMENTS LINKED TO THIS EMAIL) */
                  <div className="premium-depth-card p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-center space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-zinc-400">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-2">
                        Account Signed In
                      </h3>
                      <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
                        You are logged in with <strong className="text-white">{activeEmail}</strong>. No official employee records are linked to this email address.
                      </p>
                    </div>

                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <span>Return to Home</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SECURITY & PASSWORD SETTINGS */}
            {activeTab === "security" && (
              <div className="premium-depth-card p-8 sm:p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
                <div className="card-sheen" />
                <div className="max-w-md mx-auto relative z-10 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-white">
                      <Key className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase text-white tracking-tight">
                      Update Security Password
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium">
                      Set a custom secure password for your account login.
                    </p>
                  </div>

                  {pwdError && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/20 text-zinc-300 text-xs flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{pwdError}</span>
                    </div>
                  )}

                  {pwdSuccess && (
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white text-xs flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{pwdSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
                        New Security Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="w-full py-4 px-6 rounded-2xl bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 mt-2"
                    >
                      {pwdLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Updating Password...</span>
                        </>
                      ) : (
                        <span>Save New Password</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* UNAUTHENTICATED VISITOR LOGIN VIEW */
          <div className="max-w-md mx-auto">
            <div className="space-y-4 mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Asenra Secure Team Portal</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">
                Portal <span className="text-silver-matte">Access.</span>
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed mt-2">
                Sign in with your registered email and password to access official team documentation.
              </p>
            </div>

            <div className="premium-depth-card p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-2xl relative space-y-4">
              <div className="card-sheen" />
              
              <Link
                href="/auth/login?redirect=/portal"
                className="w-full py-4 px-6 rounded-2xl bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] block text-center"
              >
                <span>Sign In With Email & Password</span>
              </Link>

              <Link
                href="/auth/signup?redirect=/portal"
                className="w-full py-3.5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-all block text-center"
              >
                <span>Create New Account</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
