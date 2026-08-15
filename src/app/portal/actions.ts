"use server";

import { supabase, InternRecord } from "@/lib/supabase";
import { InternData } from "../hiring/verify/actions";

export async function getEmployeeByEmail(
  email: string
): Promise<{ success: boolean; data?: InternData; error?: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: "No user email provided." };
    }

    const { data: interns, error } = await supabase
      .from("interns")
      .select("*");

    if (error || !interns) {
      return { success: false, error: "Database lookup error." };
    }

    const intern = (interns as InternRecord[]).find((item) => {
      return (item.email || "").trim().toLowerCase() === cleanEmail;
    });

    if (!intern) {
      return { success: false, error: "No employee record linked to this email." };
    }

    const internData: InternData = {
      firstName: intern.first_name || "",
      lastName: intern.last_name || "",
      email: intern.email || "",
      phoneNumber: intern.phone_number || "",
      offerLetterLink: intern.offer_letter_url || "",
      ndaLink: intern.nda_url || "",
      certificateUrl: intern.certificate_url || "Pending Completion",
      submittedAt: intern.submitted_at || "",
      internId: intern.intern_id,
      role: intern.role || "",
      status: (intern.status || "ongoing").toUpperCase(),
      duration: intern.duration || "Jun 2026 - Present",
      keyContributions: Array.isArray(intern.key_contributions) ? intern.key_contributions : [],
      techStack: Array.isArray(intern.tech_stack) ? intern.tech_stack : []
    };

    return { success: true, data: internData };
  } catch (err: any) {
    console.error("Employee Portal Email Fetch Error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function authenticateEmployee(
  identifier: string,
  passcode: string
): Promise<{ success: boolean; data?: InternData; error?: string }> {
  try {
    const cleanInput = identifier.trim();
    const cleanPasscode = passcode.trim();

    if (!cleanInput || !cleanPasscode) {
      return { success: false, error: "Please provide both Intern ID / Email and Passcode." };
    }

    const { data: interns, error } = await supabase
      .from("interns")
      .select("*");

    if (error || !interns) {
      return { success: false, error: "Database authentication error." };
    }

    // Prepare match variants for ID or Email
    const inputUpper = cleanInput.toUpperCase();
    const cleanIdInput = inputUpper.replace(/[^A-Z0-9]/gi, '');
    const isEmailInput = cleanInput.includes('@');

    const inputVariants = new Set<string>();
    inputVariants.add(cleanIdInput);
    if (cleanIdInput.startsWith('AES')) {
      inputVariants.add('ASN' + cleanIdInput.slice(3));
    } else if (cleanIdInput.startsWith('ASN')) {
      inputVariants.add('AES' + cleanIdInput.slice(3));
    }

    const intern = (interns as InternRecord[]).find((item) => {
      if (isEmailInput) {
        return (item.email || "").trim().toLowerCase() === cleanInput.toLowerCase();
      }
      if (!item.intern_id) return false;
      const cleanDbId = item.intern_id.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      const dbEmail = (item.email || "").trim().toLowerCase();
      return inputVariants.has(cleanDbId) || dbEmail === cleanInput.toLowerCase();
    });

    if (!intern) {
      return { success: false, error: `No record found for: ${identifier}` };
    }

    // Verify Passcode: Accept custom passcode, master passcode 'asenra2026', phone, email, or any passcode starting with ASN
    const validPasscodes = [
      (intern.passcode || "").trim(),
      "asenra2026",
      (intern.phone_number || "").trim(),
      (intern.email || "").trim(),
      `ASN-2026-${(intern.intern_id || '').split('-').pop()}-PASS`,
    ].filter(Boolean);

    const isMatch = validPasscodes.some(p => p.toLowerCase() === cleanPasscode.toLowerCase()) 
      || cleanPasscode.toLowerCase() === "asenra2026"
      || cleanPasscode.toLowerCase().startsWith("asn-2026-");

    if (!isMatch) {
      return { success: false, error: "Invalid security passcode. Access denied." };
    }

    const internData: InternData = {
      firstName: intern.first_name || "",
      lastName: intern.last_name || "",
      email: intern.email || "",
      phoneNumber: intern.phone_number || "",
      offerLetterLink: intern.offer_letter_url || "",
      ndaLink: intern.nda_url || "",
      certificateUrl: intern.certificate_url || "Pending Completion",
      submittedAt: intern.submitted_at || "",
      internId: intern.intern_id,
      role: intern.role || "",
      status: (intern.status || "ongoing").toUpperCase(),
      duration: intern.duration || "Jun 2026 - Present",
      keyContributions: Array.isArray(intern.key_contributions) ? intern.key_contributions : [],
      techStack: Array.isArray(intern.tech_stack) ? intern.tech_stack : []
    };

    return { success: true, data: internData };
  } catch (err: any) {
    console.error("Employee Portal Login Error:", err);
    return { success: false, error: "An unexpected authentication error occurred." };
  }
}
