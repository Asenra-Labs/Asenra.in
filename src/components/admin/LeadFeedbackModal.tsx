"use client";

import React, { useState } from "react";
import { Star, X, CheckCircle, MessageSquare, AlertCircle } from "lucide-react";
import { Lead, supabase, OutcomeData } from "@/lib/supabase";

interface LeadFeedbackModalProps {
  lead: Lead;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LeadFeedbackModal({ lead, onClose, onSuccess }: LeadFeedbackModalProps) {
  const [rating, setRating] = useState<number>(lead.lead_quality_rating || 5);
  const [feedback, setFeedback] = useState<string>(lead.lead_quality_feedback || "");
  
  const initialOutcomes: OutcomeData = lead.outcome_data || {
    contacted: lead.status === "CONTACTED" || lead.status === "called",
    replied: lead.status === "REPLIED",
    interested: lead.status === "INTERESTED",
    won: lead.status === "WON" || lead.status === "closed",
    lost: lead.status === "LOST",
    loss_reason: ""
  };

  const [outcomes, setOutcomes] = useState<OutcomeData>(initialOutcomes);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      let newStatus = lead.status;
      if (outcomes.won) newStatus = "WON";
      else if (outcomes.lost) newStatus = "LOST";
      else if (outcomes.interested) newStatus = "INTERESTED";
      else if (outcomes.replied) newStatus = "REPLIED";
      else if (outcomes.contacted) newStatus = "CONTACTED";

      const updatedFields = {
        lead_quality_rating: rating,
        lead_quality_feedback: feedback,
        outcome_data: {
          ...outcomes,
          updated_at: new Date().toISOString()
        },
        status: newStatus
      };

      const { error: updateErr } = await supabase
        .from("leads")
        .update(updatedFields)
        .eq("id", lead.id);

      if (updateErr) throw updateErr;

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save feedback.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{lead.name}</h3>
            <p className="text-xs text-zinc-400">Lead Quality Feedback & Conversion Outcome</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-zinc-900 border border-white/20 rounded-xl text-xs text-zinc-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-white" />
            <span>{error}</span>
          </div>
        )}

        {/* Rating Stars */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Manual Lead Quality Rating (1–5 Stars)
          </label>
          <div className="flex items-center gap-2 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-white hover:scale-110 transition-all cursor-pointer"
              >
                <Star
                  className={`w-7 h-7 ${star <= rating ? "fill-white text-white" : "text-zinc-700"}`}
                />
              </button>
            ))}
            <span className="ml-3 text-sm font-bold text-white">{rating} / 5 Stars</span>
          </div>
        </div>

        {/* Feedback Reason */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Qualitative Feedback / Reason ("Why?")
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="e.g., High willingness to buy, owner responded on WhatsApp immediately, requested proposal..."
            rows={3}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-white/40"
          />
        </div>

        {/* Outcome Checkboxes */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Sales Acquisition Outcomes
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-zinc-900 cursor-pointer hover:bg-zinc-800">
              <input
                type="checkbox"
                checked={!!outcomes.contacted}
                onChange={(e) => setOutcomes({ ...outcomes, contacted: e.target.checked })}
                className="accent-white rounded"
              />
              <span className="text-zinc-300">Contacted</span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-zinc-900 cursor-pointer hover:bg-zinc-800">
              <input
                type="checkbox"
                checked={!!outcomes.replied}
                onChange={(e) => setOutcomes({ ...outcomes, replied: e.target.checked })}
                className="accent-white rounded"
              />
              <span className="text-zinc-300">Replied / Answered</span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-zinc-900 cursor-pointer hover:bg-zinc-800">
              <input
                type="checkbox"
                checked={!!outcomes.interested}
                onChange={(e) => setOutcomes({ ...outcomes, interested: e.target.checked })}
                className="accent-white rounded"
              />
              <span className="text-zinc-300">Interested in Website</span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-zinc-900 cursor-pointer hover:bg-zinc-800">
              <input
                type="checkbox"
                checked={!!outcomes.won}
                onChange={(e) => setOutcomes({ ...outcomes, won: e.target.checked, lost: false })}
                className="accent-white rounded"
              />
              <span className="text-white font-semibold">Deal Won</span>
            </label>
          </div>

          <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/5 bg-zinc-900 cursor-pointer hover:bg-zinc-800">
            <input
              type="checkbox"
              checked={!!outcomes.lost}
              onChange={(e) => setOutcomes({ ...outcomes, lost: e.target.checked, won: false })}
              className="accent-white rounded"
            />
            <span className="text-zinc-400">Deal Lost</span>
          </label>

          {outcomes.lost && (
            <input
              type="text"
              value={outcomes.loss_reason || ""}
              onChange={(e) => setOutcomes({ ...outcomes, loss_reason: e.target.value })}
              placeholder="Reason for loss (e.g. Budget constraints, no bandwidth)"
              className="w-full bg-zinc-900 border border-white/10 rounded-xl p-2.5 text-xs text-zinc-300 focus:outline-none"
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-black" />
            {saving ? "Saving Feedback..." : "Save Intelligence Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}
