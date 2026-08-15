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

const SEED_INTERNS = [
  {
    intern_id: "ASN-INT-2026-001",
    first_name: "Sarvesh",
    last_name: "Gajakosh",
    email: "sarveshgajakosh23@gmail.com",
    phone_number: "+918260192989",
    role: "QA Engineer Intern",
    status: "ongoing",
    submitted_at: "Jun 25, 2026 05:36 pm",
    duration: "Jun 2026 - Present",
    offer_letter_url: "https://files.youform.com/form-files/25e907c8-177c-4302-a8d0-26353ba557f7.jpg",
    nda_url: "https://files.youform.com/form-files/a0d36d3b-e058-48d3-8ed6-a378f826eace.jpg",
    certificate_url: "Pending Completion",
    passcode: "ASN-2026-001-PASS",
    key_contributions: [
      "Automated end-to-end regression test suites for Asenra core web platforms and API endpoints",
      "Designed automated identity protocol verification test flows for candidate credential lookup",
      "Validated Supabase RLS policies and server action input sanitization"
    ],
    tech_stack: ["TypeScript", "Playwright", "Jest", "CI/CD Auditing", "Regression Testing"]
  },
  {
    intern_id: "ASN-INT-2026-002",
    first_name: "Siddhi",
    last_name: "Shinde",
    email: "shindesiddhi2131@gmail.com",
    phone_number: "+919404432799",
    role: "AI/ML Engineer Intern",
    status: "ongoing",
    submitted_at: "Jun 25, 2026 08:23 pm",
    duration: "Jun 2026 - Present",
    offer_letter_url: "https://files.youform.com/form-files/ece824eb-6073-47ba-8541-f540b2b29e36.pdf",
    nda_url: "https://files.youform.com/form-files/a2e729b2-5721-4190-a80b-5410c8a3fe2c.pdf",
    certificate_url: "Pending Completion",
    passcode: "ASN-2026-002-PASS",
    key_contributions: [
      "Developed fine-tuning datasets and domain adaptation pipelines for enterprise client models",
      "Constructed benchmark opportunity datasets for precision scoring accuracy",
      "Optimized RAG retrieval pipelines reducing query response latency by 40%"
    ],
    tech_stack: ["Python", "PyTorch", "FastAPI", "LangChain", "Vector Embeddings"]
  },
  {
    intern_id: "ASN-INT-2026-008",
    first_name: "Shlok",
    last_name: "Thorat",
    email: "shlokthorat29075@gmail.com",
    phone_number: "+919021167893",
    role: "Backend Engineer Intern",
    status: "ongoing",
    submitted_at: "Jun 28, 2026 09:07 pm",
    duration: "Jun 2026 - Present",
    offer_letter_url: "https://files.youform.com/form-files/e3d0f948-a57a-40b0-9c79-eed351499076.pdf",
    nda_url: "https://files.youform.com/form-files/b56ff424-cd76-43f7-81ce-eb4497b5a0c8.pdf",
    certificate_url: "Pending Completion",
    passcode: "ASN-2026-008-PASS",
    key_contributions: [
      "Engineered scalable Supabase schema migrations for internal operational data",
      "Built high-throughput backend webhooks for real-time lead and opportunity processing",
      "Implemented security middleware for request validation and rate limiting"
    ],
    tech_stack: ["Node.js", "Express", "Supabase", "PostgreSQL", "REST APIs"]
  },
  {
    intern_id: "ASN-INT-2026-007",
    first_name: "Yachna",
    last_name: "Sharma",
    email: "sharmayachna40@gmail.com",
    phone_number: "+918928651652",
    role: "AI/ML Engineer Intern",
    status: "ongoing",
    submitted_at: "Jun 29, 2026 01:33 am",
    duration: "Jun 2026 - Present",
    offer_letter_url: "https://files.youform.com/form-files/9fba8f10-ca2b-4853-914c-ec9bda427731.pdf",
    nda_url: "https://files.youform.com/form-files/eddd3257-b84c-414e-a7fc-795f30014c7d.pdf",
    certificate_url: "Pending Completion",
    passcode: "ASN-2026-007-PASS",
    key_contributions: [
      "Architected intent-classification models for B2B manufacturer lead evaluation",
      "Integrated multi-modal web scrapers for corporate metadata extraction",
      "Trained custom classification heads for digital gap indexing"
    ],
    tech_stack: ["Python", "Transformers", "OpenAI API", "Pandas", "Scikit-Learn"]
  },
  {
    intern_id: "ASN-INT-2026-011",
    first_name: "Nupur",
    last_name: "Dagdiya",
    email: "nupurdagdiya09@gmail.com",
    phone_number: "+919579691640",
    role: "Backend Engineer Intern",
    status: "discontinued",
    submitted_at: "Jun 30, 2026 12:50 pm",
    duration: "Jun 2026 - Jul 2026",
    offer_letter_url: "https://files.youform.com/form-files/51005eb0-47c2-4b10-83ea-8a7f973b6b16.pdf",
    nda_url: "https://files.youform.com/form-files/3de6fa7d-bba0-449e-8dbf-2576c9ee4370.pdf",
    certificate_url: "Completed (Partial Track)",
    passcode: "ASN-2026-011-PASS",
    key_contributions: [
      "Contributed to initial API specification and backend microservice scaffolding",
      "Built prototype dataset cleaners for company directory ingestion"
    ],
    tech_stack: ["Python", "FastAPI", "PostgreSQL", "Docker"]
  },
  {
    intern_id: "ASN-INT-2026-012",
    first_name: "Tanisha",
    last_name: "Choudhari",
    email: "choudharitanisha07@gmail.com",
    phone_number: "+919322669962",
    role: "AI/ML Engineer Intern",
    status: "ongoing",
    submitted_at: "Jul 02, 2026 02:05 pm",
    duration: "Jul 2026 - Present",
    offer_letter_url: "https://files.youform.com/form-files/cc321088-28c8-4629-8e3d-602a759876ae.pdf",
    nda_url: "https://files.youform.com/form-files/298f582b-2dcf-4cc8-9047-a35acf56ab74.pdf",
    certificate_url: "Pending Completion",
    passcode: "ASN-2026-012-PASS",
    key_contributions: [
      "Built prompt-engineering evaluation framework for automated audit reports",
      "Implemented semantic vector search across Indian corporate databases",
      "Co-authored opportunity intelligence scoring algorithms"
    ],
    tech_stack: ["Python", "LangChain", "Faiss", "HuggingFace", "Streamlit"]
  },
  {
    intern_id: "ASN-INT-2026-013",
    first_name: "Amar",
    last_name: "Nawale",
    email: "amarnawale09@gmail.com",
    phone_number: "+918530361909",
    role: "Frontend Engineer Intern",
    status: "terminated",
    submitted_at: "Jul 27, 2026 01:21 pm",
    duration: "Jul 2026 - Aug 2026",
    offer_letter_url: "https://files.youform.com/form-files/66901dbf-aad1-41e2-8f81-698b150dedf7.pdf",
    nda_url: "https://files.youform.com/form-files/b7881261-1394-4398-ba58-0fc4fcd7de8e.pdf",
    certificate_url: "Terminated",
    passcode: "ASN-2026-013-PASS",
    key_contributions: [
      "Scaffolded initial UI components for candidate verification portal",
      "Built prototype responsive bento grid layouts"
    ],
    tech_stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
  }
];

async function setupInternsTable() {
  console.log("Setting up Supabase 'interns' database table...");

  // Try querying table first
  const { data: existingData, error: selectError } = await supabase.from("interns").select("intern_id").limit(1);

  if (selectError) {
    console.log("Note on table query:", selectError.message);
    console.log("If table 'interns' does not exist yet, please ensure table is created in Supabase dashboard or SQL editor.");
    console.log("\nSQL schema for Supabase SQL Editor:\n");
    console.log(`
CREATE TABLE IF NOT EXISTS public.interns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  intern_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ongoing',
  submitted_at TEXT,
  duration TEXT,
  offer_letter_url TEXT,
  nda_url TEXT,
  certificate_url TEXT,
  passcode TEXT,
  key_contributions JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
    `);
  }

  // Attempt upserting seeded interns
  console.log("\nUpserting seed intern profiles...");
  for (const intern of SEED_INTERNS) {
    const { data, error } = await supabase
      .from("interns")
      .upsert(intern, { onConflict: "intern_id" });

    if (error) {
      console.error(`Failed to upsert intern ${intern.intern_id}:`, error.message);
    } else {
      console.log(`✓ Seeded ${intern.intern_id} (${intern.first_name} ${intern.last_name})`);
    }
  }

  console.log("\nIntern database setup process completed!");
}

setupInternsTable();
