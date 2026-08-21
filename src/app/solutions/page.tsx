import { Brain, Cpu, Workflow, Layers, Layout, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";

import { BookCallButton } from "@/components/ui/BookCallButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const solutionsDetail = [
  {
    id: "ai-consulting",
    icon: Brain,
    title: "AI Consulting",
    tagline: "Identify where AI creates measurable business value.",
    description: "We audit your existing operational workflows, data assets, and software ecosystem to locate high-ROI opportunities for artificial intelligence. We replace vague hype with clear metrics, feasibility studies, and actionable deployment roadmaps.",
    deliverables: [
      "Operational AI Opportunity Audit",
      "ROI Viability & Data Readiness Assessment",
      "Custom AI Architecture Roadmap",
      "Vendor & Model Selection Strategy",
    ],
    tag: "Strategy & ROI",
  },
  {
    id: "enterprise-ai-implementation",
    icon: Cpu,
    title: "Enterprise AI Implementation",
    tagline: "Custom AI systems integrated into your core business operations.",
    description: "We engineer private, domain-specific AI models, retrieval-augmented generation (RAG) pipelines, and intelligent agent swarms tailored to your company's proprietary data and workflows.",
    deliverables: [
      "Custom RAG & Vector Search Pipelines",
      "Private Enterprise LLM Fine-Tuning",
      "Autonomous Multi-Agent Systems",
      "HIPAA/SOC2 Compliant AI Infrastructure",
    ],
    tag: "Core Systems",
  },
  {
    id: "business-process-automation",
    icon: Workflow,
    title: "Business Process Automation",
    tagline: "Reduce manual work through intelligent automated workflows.",
    description: "We replace repetitive manual tasks with resilient, event-driven automation pipelines. From financial reconciliation to automated lead processing and cross-department data sync.",
    deliverables: [
      "End-to-End Workflow Automation",
      "API & Database Integration Networks",
      "Intelligent Document Extraction (OCR/AI)",
      "Automated Notification & Escalation Triggers",
    ],
    tag: "Operational Scale",
  },
  {
    id: "intelligent-software",
    icon: Layers,
    title: "Intelligent Software",
    tagline: "Internal tools and business platforms engineered around your operations.",
    description: "Custom internal portals, executive dashboards, and operational software built specifically to streamline how your teams work, make decisions, and service clients.",
    deliverables: [
      "Custom Enterprise Portals & Dashboards",
      "Operation-Specific Business Applications",
      "Real-Time Data Analytics Engines",
      "Role-Based Access & Security Protocols",
    ],
    tag: "Custom Platforms",
  },
  {
    id: "premium-digital-experiences",
    icon: Layout,
    title: "Premium Digital Experiences",
    tagline: "Conversion-focused websites for ambitious brands.",
    description: "High-performance, cinematic web platforms designed for category leaders. Built on modern edge infrastructure with sub-second page loads, conversion-engineered layouts, and bespoke visual identity.",
    deliverables: [
      "Conversion-Engineered Web Applications",
      "Edge-Optimized Infrastructure & Speed",
      "Cinematic Motion & Visual Architecture",
      "Lead Capture & CRM Integrations",
    ],
    tag: "Brand & Conversion",
  },
];

/**
 * Capabilities detail.
 *
 * Was a Client Component solely to hold one boolean for the booking modal;
 * that state now lives inside BookCallButton, so the page itself renders on
 * the server.
 */
export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Solutions architecture"
        title={
          <>
            Enterprise AI.
            <br />
            Intelligent automation.
          </>
        }
        lede="We help ambitious enterprises implement custom AI systems, eliminate operational manual friction, and build scalable digital infrastructure."
      />

      <section className="relative isolate bg-black pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <RevealGroup className="space-y-5">
            {solutionsDetail.map((solution, index) => (
              <RevealItem key={solution.id}>
                <Panel id={solution.id} className="scroll-mt-32 p-8 sm:p-10 md:p-12">
                  <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-4">
                        <PanelIcon icon={solution.icon} />
                        <div className="flex items-center gap-3">
                          <PanelLabel>{solution.tag}</PanelLabel>
                          <span className="font-mono text-[11px] tabular-nums text-white/20">
                            0{index + 1} / 0{solutionsDetail.length}
                          </span>
                        </div>
                      </div>

                      <h2 className="mt-8 text-2xl font-medium tracking-tighter text-white sm:text-3xl md:text-4xl">
                        {solution.title}
                      </h2>
                      <p className="mt-4 text-lg font-medium leading-snug tracking-tight text-white/80 text-pretty">
                        {solution.tagline}
                      </p>
                      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 text-pretty">
                        {solution.description}
                      </p>

                      <BookCallButton
                        variant="secondary"
                        size="md"
                        className="mt-8"
                        formId="vt3flmg8"
                      >
                        <span>Discuss {solution.title}</span>
                        <ArrowRight className="size-4" />
                      </BookCallButton>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-7 lg:col-span-5">
                      <PanelLabel>Core deliverables</PanelLabel>

                      <ul className="mt-6 space-y-4">
                        {solution.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white/70" />
                            <span className="text-sm leading-relaxed text-white/70 text-pretty">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection
        title="Ready to implement enterprise AI?"
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
