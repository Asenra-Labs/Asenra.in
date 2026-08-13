const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = "";
let supabaseKey = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split(/\r?\n/)) {
    const parts = line.split("=");
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_URL") supabaseUrl = parts[1].trim();
    if (parts[0] === "NEXT_PUBLIC_SUPABASE_ANON_KEY") supabaseKey = parts[1].trim();
  }
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  const { data, error } = await supabase.from("leads").select("*").limit(1);
  if (error) {
    console.error("Query Error:", error);
    return;
  }
  if (data && data.length > 0) {
    console.log("Existing columns in leads table:", Object.keys(data[0]));
  } else {
    console.log("Leads table is empty.");
  }
}

checkColumns();
