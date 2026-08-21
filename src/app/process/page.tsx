import { Search, Compass, Code, Rocket, Activity, PhoneCall } from "lucide-react";

import { BookCallButton } from "@/components/ui/BookCallButton";
import { CtaButton } from "@/components/ui/CtaButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const detailedProcess = [
  {
    step: "01",
    title: "Business Discovery",
    icon: Search,
    subtitle: "Auditing workflows & identifying high-ROI opportunities.",
    details: [
      "Deep-dive audit of your current software architecture, databases, and operational bottlenecks.",
      "Feasibility evaluation of AI models vs traditional algorithmic automation for your exact domain.",
      "Comprehensive ROI projection detailing estimated labor hours saved and efficiency lift.",
    ],
    outcome: "Deliverable: AI Opportunities Blueprint & ROI Audit Report.",
  },
  {
    step: "02",
    title: "Solution Design",
    icon: Compass,
    subtitle: "Architecting custom blueprints, data privacy & system security.",
    details: [
      "Custom system architecture diagram, vector database schemas, and API integration flows.",
      "Data governance protocol design ensuring zero data leakage and total HIPAA/SOC2 compliance.",
      "User experience & interface prototyping for internal dashboards and customer touchpoints.",
    ],
    outcome: "Deliverable: Technical Specification Document & UX Blueprints.",
  },
  {
    step: "03",
    title: "Implementation",
    icon: Code,
    subtitle: "Agile engineering sprints with daily staging updates.",
    details: [
      "Fine-tuning proprietary domain LLMs, configuring RAG pipelines, and building autonomous agent logic.",
      "Front-end and back-end software engineering built with sub-second response benchmarks.",
      "Daily automated staging deployments allowing real-time client testing and feedback loops.",
    ],
    outcome: "Deliverable: Functional Staging Platform & Tested AI Models.",
  },
  {
    step: "04",
    title: "Deployment",
    icon: Rocket,
    subtitle: "Zero-downtime edge deployment & operational handoff.",
    details: [
      "Zero-downtime production release across global edge networks (Vercel Edge, AWS, Supabase).",
      "Rigorous load testing, security vulnerability scans, and fallback protocol activation.",
      "Staff onboarding workshops, documentation handoff, and operational integration.",
    ],
    outcome: "Deliverable: Live Production Deployment & Operational Handoff.",
  },
  {
    step: "05",
    title: "Optimization",
    icon: Activity,
    subtitle: "Continuous monitoring, fine-tuning & ROI tracking.",
    details: [
      "24/7 telemetry monitoring of API latency, token efficiency, and system uptime.",
      "Iterative AI model fine-tuning based on real-world user interactions and edge cases.",
      "Quarterly operational reviews to identify new automation frontiers as your business scales.",
    ],
    outcome: "Deliverable: Monthly Performance Reports & Continuous AI Refinement.",
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Execution methodology"
        title={
          <>
            How Asenra
            <br />
            engineers value.
          </>
        }
        lede="A battle-tested five-stage lifecycle engineered to deliver enterprise AI solutions with zero operational friction, full transparency, and measurable business ROI."
      />

      <section className="relative isolate bg-black pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <RevealGroup className="space-y-5">
            {detailedProcess.map((item) => (
              <RevealItem key={item.step}>
                <Panel className="p-8 sm:p-10 md:p-12">
                  <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-4xl font-medium tabular-nums text-white/15">
                          {item.step}
                        </span>
                        <PanelIcon icon={item.icon} />
                      </div>

                      <h2 className="mt-6 text-2xl font-medium tracking-tighter text-white sm:text-3xl">
                        {item.title}
                      </h2>
                      <PanelLabel className="mt-3 block">{item.subtitle}</PanelLabel>
                    </div>

                    <div className="lg:col-span-8">
                      <ul className="space-y-4">
                        {item.details.map((detail: string) => (
                          <li key={detail} className="flex items-start gap-3">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-white/40" />
                            <span className="text-sm leading-relaxed text-white/55 text-pretty">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 border-t border-white/[0.07] pt-5">
                        <PanelLabel className="text-white/70">{item.outcome}</PanelLabel>
                      </div>
                    </div>
                  </div>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>

          <Panel
            interactive={false}
            className="mt-16 flex-col items-start justify-between gap-8 p-8 sm:p-10 md:flex-row md:items-center"
          >
            <div>
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                Want to inspect our tech stack?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45 text-pretty">
                Explore the underlying infrastructure, LLM frameworks, vector databases,
                and edge CDNs that power the Asenra Engine.
              </p>
            </div>

            <CtaButton href="/architecture" variant="secondary" size="md" className="shrink-0">
              View system architecture
            </CtaButton>
          </Panel>
        </div>
      </section>

      <CtaSection
        title="Ready to initiate Stage 01 discovery?"
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
