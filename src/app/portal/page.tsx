"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getEmployeeByEmail } from "./actions";
import { InternData } from "../hiring/verify/actions";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft, Award, Briefcase, ExternalLink, FileText, Key, KeyRound,
  Loader2, LogOut, ShieldCheck, User,
} from "lucide-react";

import { Field } from "@/components/ui/Field";
import { FormAlert } from "@/components/ui/FormAlert";
import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { cn } from "@/lib/utils";
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
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex items-center gap-3 font-mono text-xs text-white/40">
          <Loader2 className="size-4 animate-spin" />
          <span>Authenticating session…</span>
        </div>
      </main>
    );
  }

  /*
   * The three document cards were three near-identical 35-line blocks that
   * differed only in icon, title, blurb, and which field on internData they
   * read. Describing them as data means a fourth document is one entry.
   */
  const documents = internData
    ? [
        {
          icon: FileText,
          badge: "Signed offer letter",
          title: "Official offer letter",
          blurb: "Official engagement terms and agreement contract.",
          href: internData.offerLetterLink,
          pending: "Document pending",
        },
        {
          icon: ShieldCheck,
          badge: "Signed NDA",
          title: "Non-disclosure agreement",
          blurb: "Intellectual property protection and confidentiality terms.",
          href: internData.ndaLink,
          pending: "Document pending",
        },
        {
          icon: Award,
          badge: "Official certificate",
          title: "Internship certificate",
          blurb: "Verified proof of internship completion and tenure.",
          href:
            internData.certificateUrl &&
            internData.certificateUrl !== "Pending Completion"
              ? internData.certificateUrl
              : null,
          pending: "Pending completion",
        },
      ]
    : [];

  const tabs = [
    { id: "documents" as const, label: "Official documents", icon: FileText },
    { id: "security" as const, label: "Security & password", icon: KeyRound },
  ];

  const profileFacts = internData
    ? [
        { label: "Role title", value: internData.role, mono: false },
        { label: "Tenure / duration", value: internData.duration, mono: false },
        { label: "Verification ID", value: internData.internId, mono: true },
      ]
    : [];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-black pb-28 pt-28">
      <GridBackdrop className="opacity-50" />
      <GlowField
        intensity="faint"
        className="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-10">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to home</span>
          </Link>

          {activeEmail ? (
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[11px] text-white/35 sm:inline">
                {activeEmail}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-white/55 transition-colors hover:border-white/25 hover:text-white"
              >
                <LogOut className="size-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          ) : null}
        </div>

        {activeEmail ? (
          <div className="mt-10 space-y-6">
            <Panel interactive={false} className="p-7 sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lg font-medium tracking-tight text-white">
                    {internData
                      ? `${internData.firstName[0]}${internData.lastName[0]}`
                      : activeEmail[0].toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <PanelLabel>
                        {internData ? internData.internId : "Team account"}
                      </PanelLabel>
                      <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-black">
                        {internData ? internData.status : "Active"}
                      </span>
                    </div>

                    <h1 className="mt-2 text-2xl font-medium tracking-tighter text-white sm:text-3xl">
                      {internData
                        ? `${internData.firstName} ${internData.lastName}`
                        : activeEmail.split("@")[0]}
                    </h1>
                    <p className="mt-1 text-sm text-white/45">
                      {internData ? internData.role : "Asenra registered account"}
                    </p>
                  </div>
                </div>

                {internData ? (
                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2">
                    <ShieldCheck className="size-3.5 text-white/70" />
                    <PanelLabel>Verified record</PanelLabel>
                  </div>
                ) : null}
              </div>
            </Panel>

            <div
              role="tablist"
              aria-label="Portal sections"
              className="flex w-fit flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] tracking-tight transition-colors",
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-white/45 hover:text-white"
                  )}
                >
                  <tab.icon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {activeTab === "documents" ? (
              <div className="space-y-5">
                {dataLoading ? (
                  <div className="flex items-center justify-center gap-2 py-16 font-mono text-xs text-white/35">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading profile documents…</span>
                  </div>
                ) : internData ? (
                  <>
                    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      {profileFacts.map((fact) => (
                        <Panel key={fact.label} interactive={false} className="p-5">
                          <dt>
                            <PanelLabel>{fact.label}</PanelLabel>
                          </dt>
                          <dd
                            className={cn(
                              "mt-2.5 text-sm font-medium text-white text-pretty",
                              fact.mono && "font-mono"
                            )}
                          >
                            {fact.value}
                          </dd>
                        </Panel>
                      ))}
                    </dl>

                    {internData.description ? (
                      <Panel interactive={false} className="p-7 sm:p-8">
                        <div className="flex items-center gap-2.5">
                          <Briefcase className="size-3.5 text-white/50" />
                          <PanelLabel>Professional summary</PanelLabel>
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-white/60 text-pretty">
                          {internData.description}
                        </p>
                      </Panel>
                    ) : null}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      {documents.map((doc) => (
                        <Panel key={doc.title} className="justify-between p-7">
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <PanelIcon icon={doc.icon} />
                              <PanelLabel className="max-w-[9ch] text-right">
                                {doc.badge}
                              </PanelLabel>
                            </div>

                            <h2 className="mt-7 text-base font-medium tracking-tight text-white text-pretty">
                              {doc.title}
                            </h2>
                            <p className="mt-2.5 text-xs leading-relaxed text-white/40 text-pretty">
                              {doc.blurb}
                            </p>
                          </div>

                          {doc.href ? (
                            <a
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12.5px] font-medium tracking-tight text-black transition-colors hover:bg-white/90"
                            >
                              <span>Download</span>
                              <ExternalLink className="size-3.5" />
                            </a>
                          ) : (
                            <p className="mt-7 rounded-full border border-white/[0.07] bg-white/[0.02] py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
                              {doc.pending}
                            </p>
                          )}
                        </Panel>
                      ))}
                    </div>
                  </>
                ) : (
                  <Panel interactive={false} className="items-center p-10 text-center sm:p-12">
                    <PanelIcon icon={User} className="size-14" />
                    <h2 className="mt-7 text-xl font-medium tracking-tighter text-white sm:text-2xl">
                      Account signed in.
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45 text-pretty">
                      You are signed in as{" "}
                      <span className="text-white">{activeEmail}</span>. No official
                      employee records are linked to this email address.
                    </p>

                    <Link
                      href="/"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90"
                    >
                      <span>Return to home</span>
                    </Link>
                  </Panel>
                )}
              </div>
            ) : null}

            {activeTab === "security" ? (
              <Panel interactive={false} className="p-8 sm:p-10">
                <div className="mx-auto w-full max-w-md">
                  <div className="text-center">
                    <PanelIcon icon={Key} className="mx-auto" />
                    <h2 className="mt-5 text-xl font-medium tracking-tighter text-white">
                      Update your password.
                    </h2>
                    <p className="mt-3 text-xs text-white/45 text-pretty">
                      Set a custom secure password for your account login.
                    </p>
                  </div>

                  {pwdError ? (
                    <FormAlert tone="error" className="mt-6">
                      {pwdError}
                    </FormAlert>
                  ) : null}
                  {pwdSuccess ? (
                    <FormAlert tone="success" className="mt-6">
                      {pwdSuccess}
                    </FormAlert>
                  ) : null}

                  <form onSubmit={handleChangePassword} className="mt-6 space-y-5">
                    <Field
                      id="portal-new-password"
                      label="New password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Field
                      id="portal-confirm-password"
                      label="Confirm new password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {pwdLoading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Updating…</span>
                        </>
                      ) : (
                        <span>Save new password</span>
                      )}
                    </button>
                  </form>
                </div>
              </Panel>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto mt-16 w-full max-w-md">
            <div className="text-center">
              <PanelLabel>Asenra secure team portal</PanelLabel>
              <h1 className="mt-5 text-3xl font-medium tracking-tighter text-white sm:text-4xl">
                Portal access.
              </h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/45 text-pretty">
                Sign in with your registered email and password to access official
                team documentation.
              </p>
            </div>

            <Panel interactive={false} className="mt-10 gap-3 p-7">
              <Link
                href="/auth/login?redirect=/portal"
                className="flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium tracking-tight text-black transition-colors hover:bg-white/90"
              >
                Sign in
              </Link>

              <Link
                href="/auth/signup?redirect=/portal"
                className="flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                Create new account
              </Link>
            </Panel>
          </div>
        )}
      </div>
    </main>
  );
}
