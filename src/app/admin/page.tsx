"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, Lock, UserPlus, Users, KeyRound, CheckCircle2, 
  XCircle, Loader2, ArrowUpRight, ShieldAlert, Activity, LogOut, 
  Briefcase, FileText, Database, Sparkles, AlertCircle, Trash2, RefreshCw
} from "lucide-react";
import { 
  authenticateAdminAccount, 
  getAdminUsers, 
  createAdminAccount, 
  updateAdminUserStatus, 
  deleteAdminAccount, 
  getAdminDashboardMetrics,
  AdminUserRecord, 
  DashboardMetrics 
} from "./actions";

export default function SuperAdminPortalPage() {
  // Auth state
  const [email, setEmail] = useState("karan.patil@asenra.in");
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState<Omit<AdminUserRecord, "passcode"> | null>(null);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<"overview" | "access" | "modules" | "logs">("overview");
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalLeads: 0,
    qualifiedLeads: 0,
    totalInterns: 0,
    activeInterns: 0,
    totalAdmins: 1,
  });
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // New Admin Form Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    email: "",
    name: "",
    role: "ADMIN" as "SUPER_ADMIN" | "ADMIN" | "MANAGER",
    passcode: "asenra2026",
  });
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // Check saved session
    const savedUser = sessionStorage.getItem("asenra_admin_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        loadDashboardData(parsed.email);
      } catch (e) {
        sessionStorage.removeItem("asenra_admin_user");
      }
    }
  }, []);

  const loadDashboardData = async (userEmail: string) => {
    setLoadingUsers(true);
    try {
      const [metricsData, usersRes] = await Promise.all([
        getAdminDashboardMetrics(),
        getAdminUsers(),
      ]);
      setMetrics(metricsData);
      if (usersRes.success && usersRes.users) {
        setAdminUsers(usersRes.users);
      }
    } catch (e) {
      console.error("Error loading admin data:", e);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const res = await authenticateAdminAccount(email, passcode);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      sessionStorage.setItem("asenra_admin_user", JSON.stringify(res.user));
      sessionStorage.setItem("asenra_admin_auth", "true");
      loadDashboardData(res.user.email);
    } else {
      setAuthError(res.error || "Authentication failed.");
    }
    setAuthLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("asenra_admin_user");
    sessionStorage.removeItem("asenra_admin_auth");
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setCreatingAdmin(true);
    setActionMessage(null);

    const res = await createAdminAccount(newAdminForm, currentUser.email);
    if (res.success) {
      setActionMessage({ type: "success", text: `Admin account created for ${newAdminForm.email}` });
      setShowAddModal(false);
      setNewAdminForm({ email: "", name: "", role: "ADMIN", passcode: "asenra2026" });
      loadDashboardData(currentUser.email);
    } else {
      setActionMessage({ type: "error", text: res.error || "Failed to create admin user." });
    }
    setCreatingAdmin(false);
  };

  const handleToggleStatus = async (user: AdminUserRecord) => {
    if (!currentUser) return;
    const targetStatus = user.status === "ACTIVE" ? "REVOKED" : "ACTIVE";
    const res = await updateAdminUserStatus(user.id, targetStatus, currentUser.email);
    if (res.success) {
      loadDashboardData(currentUser.email);
    }
  };

  const handleDeleteAdmin = async (user: AdminUserRecord) => {
    if (!currentUser) return;
    if (confirm(`Are you sure you want to delete access for ${user.email}?`)) {
      const res = await deleteAdminAccount(user.id, user.email, currentUser.email);
      if (res.success) {
        loadDashboardData(currentUser.email);
      } else {
        alert(res.error || "Could not delete account.");
      }
    }
  };

  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN" || currentUser?.email.toLowerCase() === "karan.patil@asenra.in";

  // Login Screen if not authenticated
  if (!currentUser) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-white selection:text-black relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 space-y-8 relative z-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-xs font-mono font-medium text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Super Admin Protocol</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Asenra Executive Portal
            </h1>
            <p className="text-xs text-zinc-400">
              Sign in with your authorized admin credentials to access system management modules.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3.5 bg-red-950/50 border border-red-800/40 rounded-xl text-red-300 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="karan.patil@asenra.in"
                className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
              <p className="text-[10px] text-zinc-500 font-mono">Default passcode: asenra2026</p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-black" />
                  <span>Authenticate Admin Access</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors">
              ← Return to Main Asenra Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard Interface for Authenticated Admin User
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10 space-y-8">
        {/* Top Executive Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-zinc-950 border border-white/10 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-black font-black flex items-center justify-center text-xl shrink-0 shadow-lg">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white">Super Admin Control Center</h1>
                <span className="px-2.5 py-0.5 bg-white/10 border border-white/20 text-[10px] font-mono font-bold uppercase rounded-full text-zinc-300">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Authenticated as <span className="text-white font-semibold">{currentUser.email}</span> ({currentUser.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadDashboardData(currentUser.email)}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 transition-colors"
              title="Refresh Dashboard Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingUsers ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-white/5 hover:bg-red-950/40 hover:border-red-800/40 border border-white/10 text-xs font-bold text-zinc-300 hover:text-red-300 rounded-xl transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Global Key Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <span>Total Leads</span>
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-black text-white">{metrics.totalLeads}</div>
            <p className="text-[11px] text-zinc-500 font-mono">{metrics.qualifiedLeads} high priority opportunities</p>
          </div>

          <div className="p-5 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <span>Active Team</span>
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-black text-white">{metrics.activeInterns}</div>
            <p className="text-[11px] text-zinc-500 font-mono">{metrics.totalInterns} total registered records</p>
          </div>

          <div className="p-5 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <span>Admin Accounts</span>
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-black text-white">{metrics.totalAdmins}</div>
            <p className="text-[11px] text-zinc-500 font-mono">Authorized managing access</p>
          </div>

          <div className="p-5 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <span>System Health</span>
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-black text-white flex items-center gap-2">
              <span>100%</span>
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">Encrypted database live</p>
          </div>
        </section>

        {/* Action notification banner */}
        {actionMessage && (
          <div className={`p-4 rounded-2xl border text-xs font-mono flex items-center justify-between ${
            actionMessage.type === "success" 
              ? "bg-zinc-900 border-white/30 text-white" 
              : "bg-red-950/60 border-red-800/40 text-red-300"
          }`}>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionMessage.text}</span>
            </span>
            <button onClick={() => setActionMessage(null)} className="text-zinc-500 hover:text-white">✕</button>
          </div>
        )}

        {/* Main Tab Navigation Bar */}
        <div className="flex border-b border-white/10 space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "overview" 
                ? "bg-white text-black shadow-lg" 
                : "bg-zinc-950 text-zinc-400 hover:text-white border border-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Overview & Launchpad</span>
          </button>

          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab("access")}
              className={`px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "access" 
                  ? "bg-white text-black shadow-lg" 
                  : "bg-zinc-950 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Admin Access Control ({adminUsers.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("modules")}
            className={`px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "modules" 
                ? "bg-white text-black shadow-lg" 
                : "bg-zinc-950 text-zinc-400 hover:text-white border border-white/5"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Management Modules</span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "logs" 
                ? "bg-white text-black shadow-lg" 
                : "bg-zinc-950 text-zinc-400 hover:text-white border border-white/5"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Security & Audit</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & LAUNCHPAD */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Module 1: Leads Engine */}
              <div className="p-8 bg-zinc-950 border border-white/10 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Acquisition & Lead Intelligence</h2>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Access and manage high-intent client website audit submissions, qualification scores, and outreach pipeline status.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{metrics.totalLeads} Submissions Total</span>
                  <Link
                    href="/admin/leads"
                    className="px-4 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>Launch Leads Portal</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Module 2: Team & Intern Directory */}
              <div className="p-8 bg-zinc-950 border border-white/10 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Team & Employee Directory</h2>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Create, update, and manage official intern/employee records, document links, passcodes, and tenure verification.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{metrics.totalInterns} Team Members Listed</span>
                  <Link
                    href="/admin/interns"
                    className="px-4 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>Manage Directory</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Access Portals */}
            <div className="p-8 bg-zinc-950 border border-white/10 rounded-3xl space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-400">
                System Verification & Client Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/hiring/verify"
                  target="_blank"
                  className="p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-zinc-200">Public Verification Directory</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Live Credential Lookup</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </Link>

                <Link
                  href="/portal"
                  target="_blank"
                  className="p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-zinc-200">Employee Secured Document Portal</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Offer Letter & NDA Access</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </Link>

                <Link
                  href="/audit"
                  target="_blank"
                  className="p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-zinc-200">Public Free AI Audit Form</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Client Acquisition Intake</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ADMIN ACCESS CONTROL (SUPER ADMIN EXCLUSIVE) */}
        {activeTab === "access" && isSuperAdmin && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-950 border border-white/10 rounded-3xl">
              <div>
                <h2 className="text-lg font-bold text-white">Authorized Admin Accounts & Permissions</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage access permissions for Asenra managing officers. Only Super Admin (<span className="text-white">karan.patil@asenra.in</span>) can grant or revoke admin access.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Authorized Admin</span>
              </button>
            </div>

            {/* Admin Users Table */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Managing Account</th>
                      <th className="px-6 py-4">Role / Access Level</th>
                      <th className="px-6 py-4">Security Passcode</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {adminUsers.map((u) => {
                      const isSuper = u.email.toLowerCase() === "karan.patil@asenra.in";
                      return (
                        <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white text-sm">{u.name}</div>
                            <div className="text-zinc-400 text-xs font-mono">{u.email}</div>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                              u.role === "SUPER_ADMIN" 
                                ? "bg-white text-black border border-white" 
                                : "bg-white/10 text-zinc-200 border border-white/20"
                            }`}>
                              {u.role}
                            </span>
                          </td>

                          <td className="px-6 py-4 font-mono text-zinc-300">
                            {u.passcode || "asenra2026"}
                          </td>

                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              u.status === "ACTIVE" 
                                ? "bg-white/10 text-white border border-white/20" 
                                : "bg-red-950/60 text-red-300 border border-red-800/40"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${u.status === "ACTIVE" ? "bg-white" : "bg-red-400"}`} />
                              <span>{u.status}</span>
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            {!isSuper ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleToggleStatus(u)}
                                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-zinc-300 transition-colors"
                                >
                                  {u.status === "ACTIVE" ? "Revoke Access" : "Activate Access"}
                                </button>
                                <button
                                  onClick={() => handleDeleteAdmin(u)}
                                  className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 rounded-lg transition-colors"
                                  title="Delete Account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                Primary Super Admin
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGEMENT MODULES */}
        {activeTab === "modules" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-zinc-950 border border-white/10 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <span>Leads & Client Intake Engine</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Filter by Pipeline status (Qualified, Shortlisted, Demo Building, Demo Ready, Interested, Negotiation, Won), review score breakdowns, add feedback ratings, and copy phone/email contacts directly.
              </p>
              <div className="pt-2">
                <Link
                  href="/admin/leads"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  <span>Open Leads Manager</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/10 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <span>Employee & Intern Directory</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Add new interns, generate unique IDs (ASN-INT-2026-XXX), upload signed Offer Letters and NDA agreement URLs, assign default passcodes, and track active vs discontinued status.
              </p>
              <div className="pt-2">
                <Link
                  href="/admin/interns"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  <span>Open Employee Directory</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & AUDIT */}
        {activeTab === "logs" && (
          <div className="p-8 bg-zinc-950 border border-white/10 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">System Security & Access Policies</h3>
                <p className="text-xs text-zinc-400">Security configuration and RBAC enforcement details.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <div className="text-white font-bold">1. Primary Super Admin Credentials</div>
                <div className="text-zinc-400">Account: karan.patil@asenra.in</div>
                <div className="text-zinc-400">Role: SUPER_ADMIN (Full Website & Permission Management)</div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <div className="text-white font-bold">2. Role-Based Access Control (RBAC)</div>
                <div className="text-zinc-400">
                  - SUPER_ADMIN: Unrestricted access to add/remove admins, edit leads, manage employees, and change credentials.
                </div>
                <div className="text-zinc-400">
                  - ADMIN / MANAGER: Authorized access to leads pipeline and employee directory. Cannot modify admin permissions.
                </div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <div className="text-white font-bold">3. Database Encryption & SSL</div>
                <div className="text-zinc-400">Connection: Supabase PostgreSQL (SSL Enabled)</div>
                <div className="text-zinc-400">Session Mode: Cookie & SessionStorage Encrypted Token</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-white" />
                <h3 className="text-lg font-bold text-white">Create Authorized Admin Account</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-500 hover:text-white text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAdminForm.name}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newAdminForm.email}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                  placeholder="rahul@asenra.in"
                  className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Role Access
                  </label>
                  <select
                    value={newAdminForm.role}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value as any })}
                    className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="ADMIN">ADMIN (Leads & Team Manager)</option>
                    <option value="MANAGER">MANAGER (Standard View)</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN (Full Access)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Initial Passcode
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminForm.passcode}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, passcode: e.target.value })}
                    placeholder="asenra2026"
                    className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  {creatingAdmin ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 text-black" />
                      <span>Grant Admin Access</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
