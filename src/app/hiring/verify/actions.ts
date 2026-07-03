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
      next: { revalidate: 60 }, // Cache for 60 seconds
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

    // Normalize input to uppercase and trim spaces
    const normalizedId = internId.trim().toUpperCase();

    // Find the intern matching the ID
    const intern = rows.find((row) => {
      const id = row["Intern ID"];
      return id && id.trim().toUpperCase() === normalizedId;
    });

    if (!intern) {
      return { success: false, error: "Intern ID not found. Please check and try again." };
    }

    // Map the CSV headers to our type
    const internData: InternData = {
      firstName: intern["First Name"] || "",
      lastName: intern["Last Name"] || "",
      email: intern["Email"] || "",
      phoneNumber: intern["Phone Number"] || "",
      offerLetterLink: intern["Upload your signed offer letter here that we have sent on your email"] || "",
      ndaLink: intern["Upload your signed NDA form here that we have sent on your email"] || "",
      submittedAt: intern["Submitted At"] || "",
      internId: intern["Intern ID"] || "",
      role: intern["Role"] || "",
    };

    return { success: true, data: internData };
  } catch (error: any) {
    console.error("Error verifying intern:", error);
    return { success: false, error: "An error occurred while verifying the intern. Please try again later." };
  }
}
