import { PhoneCall } from "lucide-react";

import { BookCallButton } from "@/components/ui/BookCallButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel, PanelLabel } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const caseStudiesList = [
  {
    id: "healthcare-ai-pipeline",
    client: "Regional Diagnostic & Hospital Network",
    industry: "Healthcare & Life Sciences",
    headline: "70% Processing Friction Elimination via HIPAA-Compliant Document AI",
    metrics: [
      { label: "Processing Speed", value: "70% Faster" },
      { label: "Error Rate Reduction", value: "99.2%" },
      { label: "Monthly Time Saved", value: "1,400 Hours" },
    ],
    challenge: "The hospital network managed over 15,000 monthly paper & PDF lab diagnostics manually, causing diagnostic delays and administrative backlog.",
    solution: "Asenra deployed a secure, HIPAA-compliant document intelligence pipeline using custom OCR and domain LLM models that automatically extracts, validates, and routes lab reports directly into the electronic health record (EHR) system.",
    impact: "Turnaround time per patient record dropped from 45 minutes to under 90 seconds, freeing 35+ full-time medical administrators for direct patient care.",
  },
  {
    id: "logistics-automation-engine",
    client: "Apex Transnational Logistics",
    industry: "Supply Chain & Freight Logistics",
    headline: "$1.2M Annual Operational Cost Savings through Autonomous Freight Dispatch",
    metrics: [
      { label: "Annual Overhead Saved", value: "$1.2M" },
      { label: "Dispatch Accuracy", value: "99.8%" },
      { label: "Fuel Cost Efficiency", value: "+18%" },
    ],
    challenge: "Managing 450+ active fleet vehicles via manual spreadsheets caused route inefficiencies, delayed customer notifications, and idle vehicle costs.",
    solution: "Engineered a custom automated dispatch agent and real-time telemetry engine that dynamically optimizes driver routes, predicts delivery bottlenecks, and issues automated customer tracking updates.",
    impact: "Fleet fuel utilization improved by 18%, while customer inquiry calls plummeted by 82% due to proactive automated status alerts.",
  },
  {
    id: "manufacturing-predictive-ai",
    client: "Vanguard Precision Components",
    industry: "Industrial Manufacturing",
    headline: "99.4% Machine Uptime Achieved via IoT Telemetry & Computer Vision QA",
    metrics: [
      { label: "Line Uptime Rate", value: "99.4%" },
      { label: "Scrap Material Reduction", value: "34%" },
      { label: "Defect Detection", value: "Sub-10ms" },
    ],
    challenge: "Unplanned CNC machinery failure costs averaged $85,000 per breakdown hour, with manual QA inspections missing micro-defects during high-speed runs.",
    solution: "Installed high-speed edge computer vision inspection cameras combined with vibration & temperature IoT telemetry models to detect component wear before physical breakdown.",
    impact: "Unplanned downtime was completely eliminated for two consecutive quarters, saving over $2.4M in potential lost factory capacity.",
  },
  {
    id: "d2c-conversion-platform",
    client: "Elysian Atelier Luxury Apparel",
    industry: "Retail & D2C E-Commerce",
    headline: "3.4x Conversion Rate Uplift via Custom Edge Platform & Personalization AI",
    metrics: [
      { label: "Conversion Rate Uplift", value: "3.4x" },
      { label: "Page Load Performance", value: "65ms (Global Edge)" },
      { label: "Average Order Value", value: "+42%" },
    ],
    challenge: "Legacy e-commerce platform suffered from 4.2-second mobile load times and a high cart abandonment rate of 78%.",
    solution: "Rebuilt digital architecture on modern Next.js edge infrastructure with cinematic WebGL product showcases and an AI personal styling recommendation bot.",
    impact: "Page load speed improved by 95%, cart conversions quadrupled, and return on ad spend (ROAS) doubled within 60 days of launch.",
  },
];

const PHASES = ["01. The challenge", "02. Asenra solution", "03. Measurable impact"] as const;

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Proof of impact"
        title={
          <>
            Enterprise results.
            <br />
            Proven ROI.
          </>
        }
        lede="Explore how Asenra partners with ambitious enterprises to eliminate operational friction, automate complex workflows, and unlock millions in business value."
      />

      <section className="relative isolate bg-black pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <RevealGroup className="space-y-5">
            {caseStudiesList.map((study) => (
              <RevealItem key={study.id}>
                <Panel id={study.id} className="scroll-mt-32 p-8 sm:p-10 md:p-12">
                  <header className="border-b border-white/[0.07] pb-8">
                    <PanelLabel>{study.industry}</PanelLabel>
                    <h2 className="mt-5 max-w-3xl text-2xl font-medium tracking-tighter text-white text-balance sm:text-3xl md:text-4xl">
                      {study.headline}
                    </h2>
                    <p className="mt-3 text-sm font-medium text-white/70">{study.client}</p>
                  </header>

                  <dl className="mt-10 grid grid-cols-1 gap-8 rounded-xl border border-white/[0.07] bg-black/40 p-7 sm:grid-cols-3">
                    {study.metrics.map((metric: { label: string; value: string }) => (
                      <div key={metric.label}>
                        <dt className="sr-only">{metric.label}</dt>
                        <dd>
                          <span className="block text-2xl font-medium leading-none tracking-tighter text-white sm:text-3xl">
                            {metric.value}
                          </span>
                          <span className="mt-2.5 block text-xs text-white/45 text-pretty">
                            {metric.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[study.challenge, study.solution, study.impact].map((copy, index) => (
                      <div key={PHASES[index]}>
                        <PanelLabel className={index === 1 ? "text-white/70" : undefined}>
                          {PHASES[index]}
                        </PanelLabel>
                        <p className="mt-4 text-sm leading-relaxed text-white/45 text-pretty">
                          {copy}
                        </p>
                      </div>
                    ))}
                  </div>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection
        title="Ready to achieve similar enterprise results?"
        lede="Schedule a strategy call with our lead engineering team to review your current tech stack and identify high-value AI solutions."
        actions={
          <BookCallButton variant="primary" size="lg" formId="vt3flmg8">
            <PhoneCall className="size-4" />
            <span>Book an AI strategy session</span>
          </BookCallButton>
        }
      />
    </main>
  );
}
