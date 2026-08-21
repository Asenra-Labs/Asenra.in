"use server";

import { supabase, InternRecord } from "@/lib/supabase";

export type InternData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  offerLetterLink: string;
  ndaLink: string;
  certificateUrl?: string;
  submittedAt: string;
  internId: string;
  role: string;
  status: string;
  duration?: string;
  description?: string | null;
  keyContributions?: string[];
  techStack?: string[];
};

export async function verifyIntern(internId: string): Promise<{ success: boolean; data?: InternData; error?: string }> {
  try {
    const cleanInput = internId.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    if (!cleanInput) {
      return { success: false, error: "Please enter a valid Intern ID." };
    }

    // Build variant set (e.g. ASN vs AES)
    const inputVariants = new Set<string>();
    inputVariants.add(cleanInput);
    if (cleanInput.startsWith('AES')) {
      inputVariants.add('ASN' + cleanInput.slice(3));
    } else if (cleanInput.startsWith('ASN')) {
      inputVariants.add('AES' + cleanInput.slice(3));
    }

    // Fetch interns from Supabase
    const { data: interns, error } = await supabase
      .from("interns")
      .select("*");

    if (error) {
      console.error("Supabase query error:", error.message);
      return { success: false, error: "Failed to connect to verification database." };
    }

    if (!interns || interns.length === 0) {
      return { success: false, error: "No records found in database." };
    }

    // Match candidate by Intern ID variant
    const matched = (interns as InternRecord[]).find((item) => {
      if (!item.intern_id) return false;
      const cleanDbId = item.intern_id.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      return inputVariants.has(cleanDbId);
    });

    if (!matched) {
      return { success: false, error: `Intern ID ${internId} not found in verified records.` };
    }

    const internData: InternData = {
      firstName: matched.first_name || "",
      lastName: matched.last_name || "",
      email: matched.email || "",
      phoneNumber: matched.phone_number || "",
      offerLetterLink: matched.offer_letter_url || "",
      ndaLink: matched.nda_url || "",
      certificateUrl: matched.certificate_url,
      submittedAt: matched.submitted_at || "",
      internId: matched.intern_id,
      role: matched.role || "",
      status: (matched.status || "ongoing").toUpperCase(),
      duration: matched.duration || "Jun 2026 - Present",
      certificateUrl: matched.certificate_url || "Pending Completion",
      passcode: matched.passcode,
      keyContributions: Array.isArray(matched.key_contributions) ? matched.key_contributions : [],
      techStack: Array.isArray(matched.tech_stack) ? matched.tech_stack : [],
      description: matched.description || null
    };

    return { success: true, data: internData };
  } catch (err: any) {
    console.error("Error in verifyIntern action:", err);
    return { success: false, error: "An error occurred during credential lookup." };
  }
}

export async function getAllInterns(): Promise<{ success: boolean; data?: InternData[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("interns")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    const mapped: InternData[] = (data as InternRecord[]).map((item) => ({
      firstName: item.first_name || "",
      lastName: item.last_name || "",
      email: item.email || "",
      phoneNumber: item.phone_number || "",
      offerLetterLink: item.offer_letter_url || "",
      ndaLink: item.nda_url || "",
      certificateUrl: item.certificate_url || "Pending Completion",
      submittedAt: item.submitted_at || "",
      internId: item.intern_id,
      role: item.role || "",
      status: (item.status || "ongoing").toUpperCase(),
      duration: item.duration || "Jun 2026 - Present",
      keyContributions: Array.isArray(item.key_contributions) ? item.key_contributions : [],
      techStack: Array.isArray(item.tech_stack) ? item.tech_stack : []
    }));

    return { success: true, data: mapped };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
