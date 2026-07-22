"use server";

import Papa from "papaparse";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1MZTjGoyTzfntRqd6NOS2JPX3GjC4rq4alaN33SVPsEA/export?format=csv&gid=2077283251";

export type InternData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  offerLetterLink: string;
  ndaLink: string;
  submittedAt: string;
  internId: string;
  role: string;
};

export async function verifyIntern(internId: string): Promise<{ success: boolean; data?: InternData; error?: string }> {
  try {
    const response = await fetch(SHEET_URL, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch intern data");
    }

    const csvText = await response.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data as any[];

    // Clean input ID: remove non-alphanumeric characters and convert to uppercase
    const cleanInput = internId.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    if (!cleanInput) {
      return { success: false, error: "Please enter a valid Intern ID." };
    }

    // Create prefix variants (AES... vs ASN...)
    const inputVariants = new Set<string>();
    inputVariants.add(cleanInput);
    if (cleanInput.startsWith('AES')) {
      inputVariants.add('ASN' + cleanInput.slice(3));
    } else if (cleanInput.startsWith('ASN')) {
      inputVariants.add('AES' + cleanInput.slice(3));
    }

    // Find the intern matching any variant
    const intern = rows.find((row) => {
      const rawId = row["Intern ID"];
      if (!rawId) return false;
      const cleanRowId = String(rawId).replace(/[^A-Z0-9]/gi, '').toUpperCase();
      return inputVariants.has(cleanRowId);
    });

    if (!intern) {
      return { success: false, error: "Intern ID not found. Please check and try again." };
    }

    // Map the CSV headers to our type
    const internData: InternData = {
      firstName: (intern["First Name"] || "").trim(),
      lastName: (intern["Last Name"] || "").trim(),
      email: (intern["Email"] || "").trim(),
      phoneNumber: (intern["Phone Number"] || "").trim(),
      offerLetterLink: (intern["Upload your signed offer letter here that we have sent on your email"] || "").trim(),
      ndaLink: (intern["Upload your signed NDA form here that we have sent on your email"] || "").trim(),
      submittedAt: (intern["Submitted At"] || "").trim(),
      internId: (intern["Intern ID"] || "").trim(),
      role: (intern["Role"] || "").trim(),
    };

    return { success: true, data: internData };
  } catch (error: any) {
    console.error("Error verifying intern:", error);
    return { success: false, error: "An error occurred while verifying the intern. Please try again later." };
  }
}
