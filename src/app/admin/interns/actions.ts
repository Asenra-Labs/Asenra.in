"use server";

import { supabase, InternRecord, InternStatus } from "@/lib/supabase";

export async function getAdminInterns(): Promise<{ success: boolean; data?: InternRecord[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("interns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as InternRecord[] };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateInternStatusAction(
  internId: string,
  newStatus: InternStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("interns")
      .update({ status: newStatus })
      .eq("intern_id", internId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateInternDetailsAction(
  internId: string,
  updates: {
    intern_id?: string;
    role?: string;
    duration?: string;
    passcode?: string;
    status?: InternStatus;
    description?: string | null;
    key_contributions?: string[];
    tech_stack?: string[];
    offer_letter_url?: string;
    nda_url?: string;
    certificate_url?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("interns")
      .update(updates)
      .eq("intern_id", internId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createInternAction(
  newIntern: Omit<InternRecord, "id" | "created_at">
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("interns")
      .insert([newIntern]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteInternAction(internId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("interns")
      .delete()
      .eq("intern_id", internId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
