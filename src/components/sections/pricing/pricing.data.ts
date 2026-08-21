import { Bot, Cpu, Globe, Layers, LayoutGrid, Smartphone, Zap } from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface Package {
  id: string;
  name: string;
  /** Headline figure in rupees. `null` means the card shows "On request". */
  price: string | null;
  /** Annual maintenance figure. `null` alongside a null price. */
  amc: string | null;
  description: string;
  features: string[];
  icon: LucideIcon;
  color: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  packages: Package[];
}

/**
 * Package catalogue.
 *
 * Lifted out of PricingSection so the tab UI and the section shell can be
 * split across the server/client boundary while both read the same source.
 *
 * Website packages carry `price: null` — those figures are quoted directly
 * rather than published, so the cards route to an enquiry instead.
 */
export const CATEGORIES: Category[] = [
  {
    id: "websites",
    name: "Websites",
    icon: Globe,
    description: "Cinematic digital real estate engineered for performance.",
    packages: [
      {
        id: "web-basic",
        name: "Basic",
        price: null,
        amc: null,
        description: "1 Page Cinema",
        features: [
          "React Architecture",
          "Domain (1 yr) Free",
          "Hosting Free Forever",
          "1 Revision Round",
          "WhatsApp Direct Button",
          "Basic Global SEO"
        ],
        icon: LayoutGrid,
        color: "from-white/10 to-transparent"
      },
      {
        id: "web-advanced",
        name: "Advanced",
        price: null,
        amc: null,
        description: "Cinematic Animations + 3D",
        features: [
          "3-5 Optimized Pages",
          "React + GSAP Animations",
          "Subtle 3D Integration",
          "Domain & Hosting Free",
          "2 Revision Rounds",
          "Advanced SEO Engine"
        ],
        icon: Zap,
        color: "from-[#F43F5E]/20 to-transparent",
        popular: true
      },
      {
        id: "web-dynamic",
        name: "Dynamic",
        price: null,
        amc: null,
        description: "Full-Scale Web Infrastructure",
        features: [
          "Unlimited Pages",
          "MERN Stack (Fullstack)",
          "Auth & Custom Dashboard",
          "Domain & 6 Mo Hosting",
          "3 Revision Rounds",
          "Scalable Architecture"
        ],
        icon: Layers,
        color: "from-[#9F1239]/20 to-transparent"
      }
    ]
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    icon: Bot,
    description: "Autonomous digital employees working 24/7.",
    packages: [
      {
        id: "ai-chat",
        name: "Chat Agent",
        price: "12,999",
        amc: "5,844",
        description: "WhatsApp & Web Intelligence",
        features: [
          "WhatsApp/Web Platform",
          "Instant Lead Capture",
          "Google Sheets Sync",
          "Quarterly Prompt Tuning",
          "Semantic Understanding",
          "24/7 Active Support"
        ],
        icon: Cpu,
        color: "from-white/10 to-transparent"
      },
      {
        id: "ai-calling",
        name: "Calling Agent",
        price: "15,999",
        amc: "6,920",
        description: "Voice Automation AI",
        features: [
          "Retell AI Integration",
          "Real-time Phone Sales",
          "Lead Qualification",
          "Google Sheets Sync",
          "Quarterly Tuning",
          "Human-like Latency"
        ],
        icon: Smartphone,
        color: "from-white/10 to-transparent"
      },
      {
        id: "ai-combo",
        name: "Omni Combo",
        price: "24,999",
        amc: "9,844",
        description: "Full Sales Automation Suite",
        features: [
          "Chat + Calling Agents",
          "Unified Customer View",
          "Lead Management System",
          "Quarterly Prompt Tuning",
          "Priority API Support",
          "Maximum Conversion ROI"
        ],
        icon: Zap,
        color: "from-[#F43F5E]/20 to-transparent",
        popular: true
      }
    ]
  }
];
