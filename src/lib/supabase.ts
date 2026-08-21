import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing in environment variables.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WebsiteStatus = 
  | "NO_WEBSITE"
  | "WEAK_WEBSITE"
  | "OUTDATED_WEBSITE"
  | "BASIC_WEBSITE"
  | "MODERN_WEBSITE"
  | "STRONG_WEBSITE";

export type WebsiteOpportunityType =
  | "NEW WEBSITE"
  | "WEBSITE REDESIGN"
  | "WEBSITE MODERNIZATION"
  | "PRODUCT CATALOG WEBSITE"
  | "PORTFOLIO WEBSITE"
  | "B2B CORPORATE WEBSITE"
  | "LEAD-GENERATION WEBSITE"
  | "E-COMMERCE OPPORTUNITY"
  | "DIGITAL BRAND EXPERIENCE";

export type LeadPipelineStatus =
  | "NEW"
  | "QUALIFIED"
  | "SHORTLISTED"
  | "DEMO BUILDING"
  | "DEMO READY"
  | "CONTACTED"
  | "REPLIED"
  | "INTERESTED"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "REJECTED"
  | "ongoing"
  | "discontinued"
  | "terminated"
  | "called"
  | "closed";

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export interface ScoreBreakdown {
  maturity: number;          // 0 - 20
  commercialValue: number;   // 0 - 20
  visualRichness: number;    // 0 - 15
  digitalGap: number;        // 0 - 25
  contactability: number;    // 0 - 10
  growthIntent: number;      // 0 - 10
}

export interface ConfidenceScores {
  maturity: ConfidenceLevel;
  commercialValue: ConfidenceLevel;
  visualRichness: ConfidenceLevel;
  digitalGap: ConfidenceLevel;
  growthIntent: ConfidenceLevel;
}

export interface OutcomeData {
  contacted?: boolean;
  replied?: boolean;
  interested?: boolean;
  demo_created?: boolean;
  meeting?: boolean;
  quoted?: boolean;
  won?: boolean;
  lost?: boolean;
  loss_reason?: string;
  updated_at?: string;
}

export interface Lead {
  id: string;
  slug: string;
  name: string;
  industry: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  maps_link: string;
  rating: number;
  review_count: number;
  social_links?: string;
  category: string;
  tagline?: string;
  description?: string;
  services?: string;
  color_theme?: string;
  status: LeadPipelineStatus | string;
  created_at?: string;
  
  // High-Intent Website Opportunity Intelligence Fields
  website?: string;
  website_status?: WebsiteStatus | string;
  website_opportunity_type?: WebsiteOpportunityType | string;
  total_score?: number;
  priority?: "HIGH" | "MEDIUM" | "LOW" | string;
  
  // Score breakdown
  maturity_score?: number;
  commercial_value_score?: number;
  visual_richness_score?: number;
  digital_gap_score?: number;
  contactability_score?: number;
  growth_intent_score?: number;
  
  // Confidence indicators & insights
  confidence_indicators?: ConfidenceScores;
  why_asenra?: string;
  why_this_lead?: string;
  key_signals?: string[];
  
  // Feedback & Outcomes
  lead_quality_rating?: number;
  lead_quality_feedback?: string;
  outcome_data?: OutcomeData;
}

export type InternStatus = "ongoing" | "discontinued" | "terminated" | "completed";

export interface InternRecord {
  id?: string;
  intern_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  role: string;
  status: InternStatus | string;
  submitted_at?: string;
  duration?: string;
  offer_letter_url?: string;
  nda_url?: string;
  certificate_url?: string;
  passcode?: string;
  description?: string | null;
  key_contributions?: string[];
  tech_stack?: string[];
  created_at?: string;
}


