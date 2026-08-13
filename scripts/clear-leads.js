const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = "";
let supabaseKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split(/\r?\n/);
  for (const line of lines) {
    const parts = line.split("=");
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_URL") {
      supabaseUrl = parts[1].trim();
    }
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
      supabaseKey = parts[1].trim();
    }
  }
}

supabaseUrl = (supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
supabaseKey = (supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase credentials missing!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearLeads() {
  console.log("Clearing all leads from Supabase database...");
  const { data, error } = await supabase
    .from("leads")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    console.error("Error deleting leads:", error);
  } else {
    console.log("Database cleared successfully!");
  }
}

clearLeads();
