"use client";

import React, { useState, useEffect } from "react";
import { getAdminInterns, updateInternStatusAction, updateInternDetailsAction, createInternAction, deleteInternAction } from "./actions";
import { InternRecord, InternStatus } from "@/lib/supabase";
import { 
  Users, Search, ShieldCheck, Plus, Lock, KeyRound, Loader2, CheckCircle2, 
  XCircle, Edit3, Trash2, ExternalLink, Briefcase, Calendar, Code2, Save, X, ChevronRight, Layers, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function AdminInternsPage() {
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [interns, setInterns] = useState<InternRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedIntern, setSelectedIntern] = useState<InternRecord | null>(null);
  const [editingContributions, setEditingContributions] = useState<string[]>([]);
  const [newContrib, setNewContrib] = useState("");
  const [editingTechStack, setEditingTechStack] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");
  const [editingPasscode, setEditingPasscode] = useState("");
  const [editingStatus, setEditingStatus] = useState<string>("");
  const [editingOfferLetter, setEditingOfferLetter] = useState("");
  const [editingNda, setEditingNda] = useState("");
  const [editingCertificate, setEditingCertificate] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);

  // New Intern Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInternForm, setNewInternForm] = useState({
    intern_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "AI Software Intern",
    status: "ongoing",
    duration: "Jun 2026 - Present",
    passcode: "asenra2026",
    offer_letter_url: "",
    nda_url: "",
    certificate_url: "Pending Completion",
  });
  const [creating, setCreating] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "asenra2026") {
      setAuthenticated(true);
      setAuthError("");
      loadInterns();
    } else {
      setAuthError("Invalid Admin Passcode.");
    }
  };

  const loadInterns = async () => {
    setLoading(true);
    const res = await getAdminInterns();
    if (res.success && res.data) {
      setInterns(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("asenra_admin_auth");
    if (auth === "true") {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadInterns();
    }
  }, [authenticated]);

  const openEditDrawer = (intern: InternRecord) => {
    setSelectedIntern(intern);
    setEditingContributions(Array.isArray(intern.key_contributions) ? intern.key_contributions : []);
    setEditingTechStack(Array.isArray(intern.tech_stack) ? intern.tech_stack : []);
    setEditingPasscode(intern.passcode || "asenra2026");
    setEditingStatus(intern.status || "ongoing");
    setEditingOfferLetter(intern.offer_letter_url || "");
    setEditingNda(intern.nda_url || "");
    setEditingCertificate(intern.certificate_url || "");
  };

  const handleSaveDetails = async () => {
    if (!selectedIntern) return;
    setSavingDetails(true);

    const res = await updateInternDetailsAction(selectedIntern.intern_id, {
      key_contributions: editingContributions,
      tech_stack: editingTechStack,
      passcode: editingPasscode,
      status: editingStatus as InternStatus,
      offer_letter_url: editingOfferLetter,
      nda_url: editingNda,
      certificate_url: editingCertificate,
    });

    setSavingDetails(false);
    if (res.success) {
      setSelectedIntern(null);
      loadInterns();
    } else {
      alert("Failed to save changes: " + res.error);
    }
  };

  const handleCreateIntern = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const res = await createInternAction({
      intern_id: newInternForm.intern_id.trim().toUpperCase(),
      first_name: newInternForm.first_name.trim(),
      last_name: newInternForm.last_name.trim(),
      email: newInternForm.email.trim(),
      phone_number: newInternForm.phone_number.trim(),
      role: newInternForm.role.trim(),
      status: newInternForm.status,
      duration: newInternForm.duration.trim(),
      passcode: newInternForm.passcode.trim(),
      offer_letter_url: newInternForm.offer_letter_url.trim(),
      nda_url: newInternForm.nda_url.trim(),
      certificate_url: newInternForm.certificate_url.trim(),
      submitted_at: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }),
      key_contributions: [],
      tech_stack: [],
    });

    setCreating(false);
    if (res.success) {
      setShowAddModal(false);
      loadInterns();
    } else {
      alert("Error creating intern: " + res.error);
    }
  };

  const handleDelete = async (internId: string) => {
    if (!confirm(`Are you sure you want to delete intern ${internId}?`)) return;
    const res = await deleteInternAction(internId);
    if (res.success) {
      loadInterns();
      if (selectedIntern?.intern_id === internId) setSelectedIntern(null);
    } else {
      alert("Delete failed: " + res.error);
    }
  };

  const filteredInterns = interns.filter((item) => {
    const matchesSearch = 
      item.first_name.toLowerCase().includes(search.toLowerCase()) ||
      item.last_name.toLowerCase().includes(search.toLowerCase()) ||
      item.intern_id.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalCount = interns.length;
  const activeCount = interns.filter(i => i.status.toLowerCase() === 'ongoing').length;
  const discontinuedCount = interns.filter(i => i.status.toLowerCase() === 'discontinued' || i.status.toLowerCase() === 'terminated').length;
  const completedCount = interns.filter(i => i.status.toLowerCase() === 'completed').length;

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative">
        <div className="fixed inset-0 bg-grid-theme opacity-15 pointer-events-none" />
        <div className="w-full max-w-md bg-zinc-950 border border-white/10 p-8 sm:p-10 rounded-[35px] shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight">Admin Gate</h1>
            <p className="text-xs text-zinc-400">Enter administrator passcode to access Intern Management System</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-black border border-white/15 rounded-2xl px-5 py-4 text-center font-mono tracking-widest text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>
            {authError && <p className="text-xs text-red-400 text-center font-mono">{authError}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-zinc-200 transition-all cursor-pointer"
            >
              Verify Identity
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-sm font-black tracking-widest uppercase italic">
              ASENRA <span className="text-zinc-500">ADMIN</span>
            </span>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
              <Link
                href="/admin/leads"
                className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                Leads CRM
              </Link>
              <span className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-black">
                Intern Database
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Intern</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-10 relative z-10">
        {/* Header Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Total Intern Profiles</span>
            <div className="text-3xl font-black font-mono text-white">{totalCount}</div>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Active / Ongoing</span>
            <div className="text-3xl font-black font-mono text-white">{activeCount}</div>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Completed</span>
            <div className="text-3xl font-black font-mono text-zinc-300">{completedCount}</div>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Discontinued / Terminated</span>
            <div className="text-3xl font-black font-mono text-zinc-500">{discontinuedCount}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, role, email, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["all", "ongoing", "completed", "discontinued", "terminated"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-white text-black"
                    : "bg-zinc-950 text-zinc-400 border border-white/10 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Intern Table */}
        <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-16 text-center text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading Intern Database...
            </div>
          ) : filteredInterns.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm font-medium">No intern profiles found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/60 text-xs uppercase font-mono tracking-wider text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6">ID & Name</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Contact Info</th>
                    <th className="py-4 px-6">Contributions & Stack</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInterns.map((item) => (
                    <tr key={item.intern_id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono text-xs text-zinc-400 font-bold mb-0.5">{item.intern_id}</div>
                        <div className="font-bold text-white uppercase">{item.first_name} {item.last_name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{item.duration || "Jun 2026 - Present"}</div>
                      </td>
                      <td className="py-4 px-6 text-zinc-300 font-medium">
                        {item.role}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          item.status.toLowerCase() === 'ongoing'
                            ? 'bg-white text-black font-bold'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-zinc-400 font-mono space-y-1">
                        <div>{item.email}</div>
                        <div>{item.phone_number}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1 max-w-xs">
                          <span className="text-[10px] font-mono text-zinc-500 block">
                            {Array.isArray(item.key_contributions) ? item.key_contributions.length : 0} Contributions Listed
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(item.tech_stack) && item.tech_stack.slice(0, 3).map((t, idx) => (
                              <span key={idx} className="text-[9px] font-mono px-2 py-0.5 bg-white/5 text-zinc-300 rounded border border-white/10">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Link
                          href={`/hiring/verify/${item.intern_id}`}
                          target="_blank"
                          className="p-2 inline-flex items-center text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="View Verification Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditDrawer(item)}
                          className="p-2 inline-flex items-center text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit Profile"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.intern_id)}
                          className="p-2 inline-flex items-center text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Drawer / Modal */}
      {selectedIntern && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-zinc-950 border-l border-white/10 h-full overflow-y-auto p-8 space-y-8 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-zinc-400 font-bold">{selectedIntern.intern_id}</span>
                <h3 className="text-2xl font-black text-white uppercase">{selectedIntern.first_name} {selectedIntern.last_name}</h3>
              </div>
              <button
                onClick={() => setSelectedIntern(null)}
                className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Control */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">Candidate Status</label>
              <div className="grid grid-cols-4 gap-2">
                {["ongoing", "completed", "discontinued", "terminated"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEditingStatus(st)}
                    className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      editingStatus.toLowerCase() === st
                        ? "bg-white text-black font-extrabold"
                        : "bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Passcode */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">Employee Passcode</label>
              <input
                type="text"
                value={editingPasscode}
                onChange={(e) => setEditingPasscode(e.target.value)}
                className="w-full bg-black border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-white"
              />
            </div>

            {/* Document Links */}
            <div className="space-y-4">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block border-b border-white/10 pb-2">Documents & Credentials</label>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">Offer Letter URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingOfferLetter}
                    onChange={(e) => setEditingOfferLetter(e.target.value)}
                    placeholder="https://docs.google.com/..."
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white"
                  />
                  {editingOfferLetter && (
                    <a href={editingOfferLetter} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center shrink-0">
                      View
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">NDA URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingNda}
                    onChange={(e) => setEditingNda(e.target.value)}
                    placeholder="https://docs.google.com/..."
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white"
                  />
                  {editingNda && (
                    <a href={editingNda} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center shrink-0">
                      View
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">Certificate URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingCertificate}
                    onChange={(e) => setEditingCertificate(e.target.value)}
                    placeholder="Pending Completion"
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white"
                  />
                  {editingCertificate && editingCertificate !== "Pending Completion" && (
                    <a href={editingCertificate} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center shrink-0">
                      View
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Key Contributions */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                Key Contributions & Deliverables ({editingContributions.length})
              </label>
              <div className="space-y-2">
                {editingContributions.map((contrib, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/5 border border-white/10 p-3 rounded-xl">
                    <span className="text-xs text-zinc-300 font-medium flex-1">{contrib}</span>
                    <button
                      onClick={() => setEditingContributions(editingContributions.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new contribution bullet point..."
                  value={newContrib}
                  onChange={(e) => setNewContrib(e.target.value)}
                  className="flex-1 bg-black border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newContrib.trim()) {
                      setEditingContributions([...editingContributions, newContrib.trim()]);
                      setNewContrib("");
                    }
                  }}
                  className="px-4 py-2 bg-white text-black font-bold uppercase text-xs rounded-xl hover:bg-zinc-200"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                Tech Stack Pills ({editingTechStack.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {editingTechStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/10 border border-white/15 text-white font-mono text-xs rounded-xl flex items-center gap-2">
                    {tech}
                    <button
                      onClick={() => setEditingTechStack(editingTechStack.filter((_, i) => i !== idx))}
                      className="text-zinc-400 hover:text-white font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Python, Supabase..."
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="flex-1 bg-black border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTech.trim()) {
                      setEditingTechStack([...editingTechStack, newTech.trim()]);
                      setNewTech("");
                    }
                  }}
                  className="px-4 py-2 bg-white text-black font-bold uppercase text-xs rounded-xl hover:bg-zinc-200"
                >
                  Add Pill
                </button>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedIntern(null)}
                className="px-6 py-3 bg-zinc-900 border border-white/10 text-zinc-300 font-bold uppercase text-xs rounded-xl hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDetails}
                disabled={savingDetails}
                className="px-8 py-3 bg-white text-black font-black uppercase text-xs rounded-xl hover:bg-zinc-200 flex items-center gap-2 cursor-pointer"
              >
                {savingDetails ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Intern Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-xl bg-zinc-950 border border-white/15 rounded-3xl p-8 space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Create Intern Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIntern} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Intern ID</label>
                  <input
                    type="text"
                    required
                    placeholder="ASN-INT-2026-014"
                    value={newInternForm.intern_id}
                    onChange={(e) => setNewInternForm({ ...newInternForm, intern_id: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Role</label>
                  <input
                    type="text"
                    required
                    placeholder="AI Engineer Intern"
                    value={newInternForm.role}
                    onChange={(e) => setNewInternForm({ ...newInternForm, role: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John"
                    value={newInternForm.first_name}
                    onChange={(e) => setNewInternForm({ ...newInternForm, first_name: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    value={newInternForm.last_name}
                    onChange={(e) => setNewInternForm({ ...newInternForm, last_name: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={newInternForm.email}
                    onChange={(e) => setNewInternForm({ ...newInternForm, email: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91..."
                    value={newInternForm.phone_number}
                    onChange={(e) => setNewInternForm({ ...newInternForm, phone_number: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Offer Letter Link</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newInternForm.offer_letter_url}
                    onChange={(e) => setNewInternForm({ ...newInternForm, offer_letter_url: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">NDA Link</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newInternForm.nda_url}
                    onChange={(e) => setNewInternForm({ ...newInternForm, nda_url: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-zinc-300 font-bold uppercase text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 bg-white text-black font-black uppercase text-xs rounded-xl hover:bg-zinc-200 flex items-center gap-2"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Create Intern</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
