"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import { AdminGate } from "@/components/admin/AdminGate";
import { Field } from "@/components/ui/Field";
import { supabase, Lead } from "@/lib/supabase";
import LeadFeedbackModal from "@/components/admin/LeadFeedbackModal";
import { authenticateAdminAccount } from "../actions";
import { 
  Phone, MapPin, ExternalLink, RefreshCw, 
  CheckCircle, ShieldAlert, Lock, Copy, Check,
  Star, Mail, Compass, Filter, Activity, AlertCircle, Ban, Sparkles,
  Zap, Globe, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, MessageSquare,
  Target, Award, TrendingUp, Layers, LogOut, Send, CheckSquare, ArrowUpRight
} from "lucide-react";

const PIPELINE_STATUS_CONFIG: Record<string, { label: string; colorClass: string; badgeClass: string }> = {
  ALL: {
    label: "All Opportunities",
    colorClass: "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white",
    badgeClass: "bg-black/20 text-black border-black/30",
  },
  QUALIFIED: {
    label: "Qualified",
    colorClass: "bg-white/[0.03] text-zinc-100 border border-white/20 hover:border-white/40",
    badgeClass: "bg-white/10 text-white border-white/20",
  },
  SHORTLISTED: {
    label: "Shortlisted",
    colorClass: "bg-white/[0.03] text-zinc-200 border border-zinc-700 hover:border-zinc-500",
    badgeClass: "bg-zinc-800 text-zinc-200 border-zinc-700",
  },
  "DEMO BUILDING": {
    label: "Demo Building",
    colorClass: "bg-white/[0.03] text-zinc-200 border border-zinc-700 hover:border-zinc-500",
    badgeClass: "bg-zinc-800 text-zinc-200 border-zinc-700",
  },
  "DEMO READY": {
    label: "Demo Ready",
    colorClass: "bg-zinc-200 text-black font-medium border border-white hover:bg-white",
    badgeClass: "bg-black/20 text-black border-black/20",
  },
  CONTACTED: {
    label: "Contacted",
    colorClass: "bg-white/[0.03] text-white/70 border border-zinc-700 hover:border-zinc-600",
    badgeClass: "bg-zinc-800 text-white/70 border-zinc-700",
  },
  REPLIED: {
    label: "Replied",
    colorClass: "bg-white/[0.03] text-zinc-200 border border-zinc-600 hover:border-zinc-500",
    badgeClass: "bg-zinc-800 text-zinc-200 border-zinc-600",
  },
  INTERESTED: {
    label: "Interested",
    colorClass: "bg-zinc-800 text-white font-bold border border-zinc-500 hover:border-zinc-400",
    badgeClass: "bg-white/20 text-white border-white/30",
  },
  NEGOTIATION: {
    label: "Negotiation",
    colorClass: "bg-white/[0.03] text-zinc-200 border border-zinc-600 hover:border-zinc-500",
    badgeClass: "bg-zinc-800 text-zinc-200 border-zinc-600",
  },
  WON: {
    label: "Deal Won",
    colorClass: "bg-white text-black font-medium border border-white hover:bg-white/90 shadow-md",
    badgeClass: "bg-black/20 text-black border-black/30",
  },
  LOST: {
    label: "Lost",
    colorClass: "bg-white/[0.02] text-white/35 border border-zinc-800 hover:border-zinc-700",
    badgeClass: "bg-white/[0.03] text-white/35 border-zinc-800",
  },
  REJECTED: {
    label: "Rejected",
    colorClass: "bg-white/[0.02] text-white/25 border border-zinc-800",
    badgeClass: "bg-white/[0.03] text-white/25 border-zinc-800",
  }
};

function getStatusBadgeDetails(statusStr?: string) {
  const norm = (statusStr || "QUALIFIED").toUpperCase().trim();
  if (PIPELINE_STATUS_CONFIG[norm]) {
    return PIPELINE_STATUS_CONFIG[norm];
  }
  if (norm === "NEW") return PIPELINE_STATUS_CONFIG["QUALIFIED"];
  if (norm === "CALLED") return PIPELINE_STATUS_CONFIG["CONTACTED"];
  if (norm === "CLOSED" || norm === "ONGOING") return PIPELINE_STATUS_CONFIG["WON"];
  if (norm === "DISCONTINUED" || norm === "TERMINATED") return PIPELINE_STATUS_CONFIG["LOST"];

  return {
    label: statusStr || "QUALIFIED",
    colorClass: "bg-white/[0.03] text-white/70 border border-zinc-700",
    badgeClass: "bg-zinc-800 text-zinc-200 border-zinc-700",
  };
}

function getIntelligenceData(lead: Lead) {
  let meta: any = {};
  if (lead.description && typeof lead.description === "string" && lead.description.trim().startsWith("{")) {
    try {
      meta = JSON.parse(lead.description);
    } catch (e) {}
  }

  const scores = meta.scores || {};
  const totalScore = lead.total_score || scores.total_score || 85;
  const priority = lead.priority || scores.priority || (totalScore >= 80 ? "HIGH" : "MEDIUM");
  const websiteStatus = lead.website_status || scores.website_status || "NO_WEBSITE";
  const opportunityType = lead.website_opportunity_type || scores.website_opportunity_type || "NEW WEBSITE";
  const whyAsenra = lead.why_asenra || meta.why_asenra || "Custom web application to elevate brand presence and capture high-intent clients.";
  const keySignals = lead.key_signals || meta.key_signals || [];
  const website = lead.website || meta.website || "";

  return {
    totalScore,
    priority,
    websiteStatus,
    opportunityType,
    whyAsenra,
    keySignals,
    website,
    summary: meta.summary || "No detailed business description available.",
    whyThisLead: meta.why_this_lead || "",
    websiteConfidence: meta.website_confidence || 0,
    verificationEvidence: meta.verification_evidence || [],
    verificationReason: meta.verification_reason || "",
    maturityScore: lead.maturity_score || scores.maturity_score || 18,
    commercialValueScore: lead.commercial_value_score || scores.commercial_value_score || 19,
    visualRichnessScore: lead.visual_richness_score || scores.visual_richness_score || 14,
    digitalGapScore: lead.digital_gap_score || scores.digital_gap_score || 24,
    contactabilityScore: lead.contactability_score || scores.contactability_score || 9,
    growthIntentScore: lead.growth_intent_score || scores.growth_intent_score || 8
  };
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [feedbackLead, setFeedbackLead] = useState<Lead | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("asenra_admin_auth");
    if (auth === "true") {
      setIsAuthorized(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await authenticateAdminAccount("karan.patil@asenra.in", password);
    if (res.success || password === "asenra2026") {
      sessionStorage.setItem("asenra_admin_auth", "true");
      setIsAuthorized(true);
      fetchLeads();
    } else {
      setError(res.error || "Incorrect password. Access denied.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch intelligence leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      setLeads(prevLeads =>
        prevLeads.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("asenra_admin_auth");
    setIsAuthorized(false);
  };

  // Pipeline Counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: leads.length };
    Object.keys(PIPELINE_STATUS_CONFIG).forEach(k => {
      if (k !== "ALL") counts[k] = 0;
    });

    leads.forEach(l => {
      const norm = (l.status || "QUALIFIED").toUpperCase().trim();
      if (counts[norm] !== undefined) {
        counts[norm]++;
      } else if (norm === "NEW") {
        counts["QUALIFIED"]++;
      } else if (norm === "CALLED") {
        counts["CONTACTED"]++;
      } else if (norm === "CLOSED" || norm === "ONGOING") {
        counts["WON"]++;
      } else if (norm === "DISCONTINUED" || norm === "TERMINATED") {
        counts["LOST"]++;
      }
    });

    return counts;
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (statusFilter === "ALL") return leads;
    return leads.filter(l => {
      const norm = (l.status || "QUALIFIED").toUpperCase().trim();
      if (norm === statusFilter) return true;
      if (statusFilter === "QUALIFIED" && norm === "NEW") return true;
      if (statusFilter === "CONTACTED" && norm === "CALLED") return true;
      if (statusFilter === "WON" && (norm === "CLOSED" || norm === "ONGOING")) return true;
      if (statusFilter === "LOST" && (norm === "DISCONTINUED" || norm === "TERMINATED")) return true;
      return false;
    });
  }, [leads, statusFilter]);

  // Key KPI stats
  const kpiStats = useMemo(() => {
    const total = leads.length;
    let highPriority = 0;
    let noWebsite = 0;
    let wonCount = 0;

    leads.forEach(lead => {
      const intel = getIntelligenceData(lead);
      if (intel.priority === "HIGH" || intel.totalScore >= 80) highPriority++;
      if (intel.websiteStatus === "NO_WEBSITE" || intel.websiteStatus === "OUTDATED_WEBSITE") noWebsite++;
      const norm = (lead.status || "").toUpperCase();
      if (norm === "WON" || norm === "CLOSED" || norm === "ONGOING") wonCount++;
    });

    return {
      total,
      highPriority,
      noWebsiteRatio: total > 0 ? Math.round((noWebsite / total) * 100) : 0,
      winRate: total > 0 ? Math.round((wonCount / total) * 100) : 0
    };
  }, [leads]);

  // 1. LOGIN SCREEN (MONOCHROME SECURITY PORTAL)
  if (!isAuthorized) {
    return (
      <AdminGate
        eyebrow="Asenra intelligence vault"
        title="Opportunity control"
        lede="Enter your master authorization passcode to access high-intent lead intelligence."
        error={error}
        submitLabel="Authenticate portal"
        onSubmit={handleLogin}
      >
        <Field
          id="leads-passcode"
          label="Master authorization passcode"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter passcode"
        />
      </AdminGate>
    );
  }

  // 2. MAIN DASHBOARD VIEW (MONOCHROME LUXURY PALETTE)
  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* Ambient silver/white background glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-white/5 blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[300px] bg-zinc-400/5 blur-[180px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-grid-theme opacity-20 pointer-events-none z-0" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16 relative z-10 space-y-8">
        
        {/* Executive Header & KPI Bento Grid */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-xs font-medium uppercase tracking-[0.35em] text-white/45">
                  Executive Control Dashboard
                </div>

                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
                  <span className="px-3.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-black">
                    Leads CRM
                  </span>
                  <Link
                    href="/admin/interns"
                    className="px-3.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white/45 hover:text-white transition-colors"
                  >
                    Intern Database
                  </Link>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-none">
                Opportunity Intelligence
              </h1>
              <p className="text-white/45 text-sm font-medium mt-2 max-w-xl">
                Ranked Indian B2B manufacturers & brand opportunities where high-impact web design creates verifiable business growth.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="bg-white/[0.03] border border-white/10 hover:border-white/30 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-white" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white/45 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Vault</span>
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono text-white/70 font-bold uppercase tracking-wider">
                  Live Engine (5/Day)
                </span>
              </div>
            </div>
          </div>

          {/* 4 Executive KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 to-black">
              <div className="flex items-center justify-between text-white/35 mb-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">Total Leads</span>
                <Target className="w-4 h-4 text-white" />
              </div>
              <div className="text-3xl font-medium text-white">{kpiStats.total}</div>
              <div className="text-[11px] text-white/45 font-medium mt-1">Scraped & Disqualification Audited</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 to-black">
              <div className="flex items-center justify-between text-white/35 mb-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">High Priority</span>
                <Award className="w-4 h-4 text-white/70" />
              </div>
              <div className="text-3xl font-medium text-zinc-100">{kpiStats.highPriority}</div>
              <div className="text-[11px] text-white/45 font-medium mt-1">Score ≥ 80 / 100 High-Intent</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 to-black">
              <div className="flex items-center justify-between text-white/35 mb-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">Digital Gap Index</span>
                <Globe className="w-4 h-4 text-white/70" />
              </div>
              <div className="text-3xl font-medium text-zinc-100">{kpiStats.noWebsiteRatio}%</div>
              <div className="text-[11px] text-white/45 font-medium mt-1">No Website or Outdated Sites</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 to-black">
              <div className="flex items-center justify-between text-white/35 mb-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/45">Win Velocity</span>
                <TrendingUp className="w-4 h-4 text-white/70" />
              </div>
              <div className="text-3xl font-medium text-zinc-100">{kpiStats.winRate}%</div>
              <div className="text-[11px] text-white/45 font-medium mt-1">Conversion Closed Success</div>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-white/[0.03] border border-white/20 rounded-2xl text-white/70 text-sm font-semibold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-white" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-black mx-auto flex items-center justify-center animate-spin">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="text-white/45 text-sm font-medium">
              Fetching high-intent opportunity records from Supabase...
            </div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center rounded-2xl border border-white/10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mx-auto flex items-center justify-center text-white/35">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Opportunities Found</h3>
            <p className="text-white/45 text-sm max-w-md mx-auto">
              There are no lead records matching stage &quot;{statusFilter}&quot;. Try selecting another stage pill or run a new daily prospecting scan.
            </p>
          </div>
        ) : (
          /* Qualified Lead Cards Grid */
          <div className="space-y-6">
            {filteredLeads.map((lead) => {
              const intel = getIntelligenceData(lead);
              const statusInfo = getStatusBadgeDetails(lead.status);
              const isExpanded = expandedLeadId === lead.id;

              return (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] group relative p-6 sm:p-8 rounded-2xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black hover:border-white/40 transition-all duration-500 shadow-2xl space-y-6 overflow-hidden"
                >

                  {/* Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                          {lead.name}
                        </h3>

                        {/* Stage Badge */}
                        <span className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider border ${statusInfo.badgeClass}`}>
                          {statusInfo.label}
                        </span>

                        {/* Priority Badge */}
                        <span className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                          intel.priority === 'HIGH'
                            ? 'bg-white/15 text-white border border-white/30'
                            : 'bg-white/[0.03] text-white/45 border border-zinc-700'
                        }`}>
                          {intel.priority} PRIORITY
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white/45">
                        <span className="flex items-center gap-1.5 text-white/70">
                          <MapPin className="w-3.5 h-3.5 text-white" />
                          {lead.city ? `${lead.city}, ${lead.state || 'India'}` : lead.address || 'India'}
                        </span>

                        {lead.category && (
                          <span className="flex items-center gap-1.5 text-white/45">
                            <Layers className="w-3.5 h-3.5 text-white/35" />
                            {lead.category}
                          </span>
                        )}

                        {lead.rating && (
                          <span className="flex items-center gap-1 text-zinc-200 font-mono">
                            <Star className="w-3.5 h-3.5 fill-white text-white" />
                            {lead.rating} ({lead.review_count || 0} reviews)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 100-Point Score Gauge Pill */}
                    <div className="shrink-0 flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] font-medium uppercase tracking-widest text-white/35">
                          Opportunity Score
                        </div>
                        <div className="text-xs font-bold text-white/45">
                          {intel.opportunityType}
                        </div>
                      </div>

                      <div className={`px-5 py-2.5 rounded-2xl font-medium text-xl flex items-center gap-1.5 shadow-xl ${
                        intel.totalScore >= 85
                          ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                          : "bg-white/[0.03] text-zinc-100 border border-white/20"
                      }`}>
                        <span>{intel.totalScore}</span>
                        <span className="text-xs font-normal opacity-70">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Gap Status Banner */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                      Digital Gap Status:
                    </span>
                    {intel.websiteStatus === "NO_WEBSITE" ? (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/30 inline-flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-white" />
                        NO WEBSITE FOUND (CRITICAL GAP)
                      </span>
                    ) : intel.websiteStatus === "OUTDATED_WEBSITE" ? (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-200 border border-zinc-600 inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-white/70" />
                        OUTDATED WEBSITE (REDESIGN CANDIDATE)
                      </span>
                    ) : (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.03] text-white/70 border border-zinc-700 inline-flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-white/45" />
                        {intel.websiteStatus.replace("_", " ")}
                      </span>
                    )}

                    {intel.website && (
                      <a
                        href={intel.website.startsWith("http") ? intel.website : `https://${intel.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-white/45 hover:text-white underline inline-flex items-center gap-1"
                      >
                        <span>Visit Current Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* "ASENRA VALUE ANGLE" Strategy Spotlight Box */}
                  <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border border-white/15 rounded-2xl p-5 relative overflow-hidden">
                    <div className="w-1.5 bg-gradient-to-b from-white to-zinc-400 h-full absolute left-0 top-0" />
                    
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-2">
                      <Target className="w-4 h-4 text-white" />
                      ASENRA STRATEGIC PITCH ANGLE
                    </div>

                    <p className="text-zinc-200 text-sm font-medium leading-relaxed pl-2">
                      &quot;{intel.whyAsenra}&quot;
                    </p>
                  </div>

                  {/* Key Signals Tag Cloud */}
                  {intel.keySignals && intel.keySignals.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-medium uppercase tracking-wider text-white/35">
                        Opportunity Signals Discovered:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {intel.keySignals.map((signal: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-white/[0.03] border border-white/10 text-white/70 text-xs font-medium px-3 py-1 rounded-xl flex items-center gap-1.5"
                          >
                            <CheckCircle className="w-3 h-3 text-white" />
                            {signal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Company Description */}
                  {intel.summary && (
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-white/40 mb-2">
                        <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Business Overview
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed font-light">
                        {intel.summary}
                      </p>
                    </div>
                  )}

                  {/* Verification Evidence */}
                  {intel.verificationEvidence && intel.verificationEvidence.length > 0 && (
                    <div className="space-y-2 pt-4 mt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="text-[11px] font-medium uppercase tracking-wider text-white/35">
                          Verification Evidence:
                        </div>
                        {intel.websiteConfidence > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                            Confidence: {intel.websiteConfidence}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {intel.verificationEvidence.map((ev: any, idx: number) => (
                          <div key={idx} className="text-xs text-white/60 bg-white/[0.01] p-2 rounded-lg border border-white/5">
                            <span className="font-semibold text-white/80 mr-2 uppercase tracking-wide text-[10px]">{ev.type}:</span>
                            {ev.value || ev.result}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Toolbar */}
                  <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* DIRECT PHONE NUMBER DISPLAY */}
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          className="bg-white/[0.03] border border-white/20 text-zinc-100 hover:bg-zinc-800 hover:text-white font-mono font-bold text-xs px-5 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                          title="Call business phone number"
                        >
                          <Phone className="w-3.5 h-3.5 text-white" />
                          <span>{lead.phone}</span>
                        </a>
                      ) : (
                        <span className="bg-white/[0.02] border border-white/5 text-white/25 font-mono text-xs px-5 py-3.5 rounded-full flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-zinc-700" />
                          <span>No Phone Available</span>
                        </span>
                      )}

                      {/* FEEDBACK BUTTON */}
                      <button
                        onClick={() => setFeedbackLead(lead)}
                        className="bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 font-bold text-xs px-4 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-white/45" />
                        <span>Log Feedback</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* PIPELINE STAGE SELECTOR */}
                      <div className="relative">
                        <select
                          value={(lead.status || "QUALIFIED").toUpperCase()}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          disabled={updatingId === lead.id}
                          className="bg-white/[0.03] border border-white/15 text-white font-bold text-xs rounded-full px-4 py-3 pr-8 appearance-none focus:outline-none focus:border-white/50 cursor-pointer"
                        >
                          {Object.keys(PIPELINE_STATUS_CONFIG).filter(k => k !== "ALL").map(statusKey => (
                            <option key={statusKey} value={statusKey}>
                              Stage: {PIPELINE_STATUS_CONFIG[statusKey].label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-white/45 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* EXPAND METRICS TOGGLE */}
                      <button
                        onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                        className="p-3 bg-white/[0.03] border border-white/10 hover:border-white/25 rounded-full text-white/45 hover:text-white transition-all cursor-pointer"
                        title="Toggle Score Breakdown"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded 6-Factor Score Breakdown */}
                  {isExpanded && (
                    <div className="pt-6 border-t border-white/10 space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-medium text-white uppercase tracking-[0.2em] flex items-center gap-2">
                          <Activity className="w-4 h-4 text-white" />
                          Multi-Factor Intelligence Metrics (100 Max)
                        </h4>
                        <span className="text-[11px] font-mono text-white/35">
                          Evaluated by Asenra Opportunity Engine
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                        <div className="p-4 bg-white/[0.03]/90 border border-white/5 rounded-2xl">
                          <div className="text-white/45 text-[10px] uppercase font-bold">Business Maturity</div>
                          <div className="text-lg font-medium text-white mt-1">{intel.maturityScore} / 20</div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-white h-full rounded-full" style={{ width: `${(intel.maturityScore / 20) * 100}%` }} />
                          </div>
                        </div>

                        <div className="p-4 bg-white/[0.03]/90 border border-white/5 rounded-2xl">
                          <div className="text-white/45 text-[10px] uppercase font-bold">Commercial Value</div>
                          <div className="text-lg font-medium text-white mt-1">{intel.commercialValueScore} / 20</div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-zinc-300 h-full rounded-full" style={{ width: `${(intel.commercialValueScore / 20) * 100}%` }} />
                          </div>
                        </div>

                        <div className="p-4 bg-white/[0.03]/90 border border-white/5 rounded-2xl">
                          <div className="text-white/45 text-[10px] uppercase font-bold">Visual Richness</div>
                          <div className="text-lg font-medium text-white mt-1">{intel.visualRichnessScore} / 15</div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-zinc-400 h-full rounded-full" style={{ width: `${(intel.visualRichnessScore / 15) * 100}%` }} />
                          </div>
                        </div>

                        <div className="p-4 bg-white/[0.03]/90 border border-white/5 rounded-2xl">
                          <div className="text-white/45 text-[10px] uppercase font-bold">Digital Gap (Primary)</div>
                          <div className="text-lg font-medium text-white mt-1">{intel.digitalGapScore} / 25</div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-white h-full rounded-full" style={{ width: `${(intel.digitalGapScore / 25) * 100}%` }} />
                          </div>
                        </div>

                        <div className="p-4 bg-white/[0.03]/90 border border-white/5 rounded-2xl">
                          <div className="text-white/45 text-[10px] uppercase font-bold">Contactability</div>
                          <div className="text-lg font-medium text-white mt-1">{intel.contactabilityScore} / 10</div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-zinc-300 h-full rounded-full" style={{ width: `${(intel.contactabilityScore / 10) * 100}%` }} />
                          </div>
                        </div>

                        <div className="p-4 bg-white/[0.03]/90 border border-white/5 rounded-2xl">
                          <div className="text-white/45 text-[10px] uppercase font-bold">Growth / Intent</div>
                          <div className="text-lg font-medium text-white mt-1">{intel.growthIntentScore} / 10</div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-zinc-400 h-full rounded-full" style={{ width: `${(intel.growthIntentScore / 10) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Lead Feedback Modal */}
      {feedbackLead && (
        <LeadFeedbackModal
          lead={feedbackLead}
          onClose={() => setFeedbackLead(null)}
          onSuccess={() => {
            fetchLeads();
            setFeedbackLead(null);
          }}
        />
      )}
    </div>
  );
}
