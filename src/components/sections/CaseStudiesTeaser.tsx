import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

import { CtaButton } from "@/components/ui/CtaButton";
import { GlowField } from "@/components/ui/GlowField";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const caseStudies = [
  {
    client: "Healthcare Data Network",
    industry: "Healthcare & Diagnostics",
    headline: "Automated Clinical Document Intelligence Pipeline",
    metric: "70% Reduction",
    metricSub: "In processing time & operational friction",
    summary:
      "Implemented HIPAA-aligned document extraction and automated triage pipelines for a regional diagnostic network.",
    icon: ShieldCheck,
  },
  {
    client: "Global Logistics Group",
    industry: "Logistics & Supply Chain",
    headline: "Predictive Dispatch & Freight Automation",
    metric: "$1.2M Saved",
    metricSub: "Annual operational overhead eliminated",
    summary:
      "Replaced legacy manual dispatching with a custom intelligent routing agent and real-time inventory tracking platform.",
    icon: Zap,
  },
  {
    client: "Precision Manufacturing Corp",
    industry: "Industrial Manufacturing",
    headline: "Predictive Maintenance & Quality Inspection",
    metric: "99.4% Uptime",
    metricSub: "Zero unplanned machine downtime",
    summary:
      "Engineered automated inspection and telemetry analysis to catch defects before production line stoppage.",
    icon: BarChart3,
  },
];

export function CaseStudiesTeaser() {
  return (
    <section
      id="selected-work"
      className="relative isolate overflow-hidden border-t border-white/5 bg-black py-20 md:py-28"
    >
      <GlowField
        intensity="faint"
        className="left-1/4 top-1/3 h-[400px] w-[400px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Proven results.
                <br />
                Quantifiable impact.
              </>
            }
            className="max-w-2xl"
          />

          <CtaButton href="/case-studies" variant="quiet" size="sm" className="shrink-0">
            View all selected work
            <ArrowRight className="size-3.5" />
          </CtaButton>
        </div>

        <RevealGroup as="ul" className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
          {caseStudies.map((study) => (
            <RevealItem key={study.client} as="li" className="flex">
              <Panel className="w-full justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <PanelLabel className="max-w-[16ch]">{study.industry}</PanelLabel>
                    <PanelIcon icon={study.icon} className="size-9" />
                  </div>

                  <p className="mt-8 text-3xl font-medium leading-none tracking-tighter text-white">
                    {study.metric}
                  </p>
                  <p className="mt-3 text-xs text-white/45">{study.metricSub}</p>

                  <h3 className="mt-7 text-base font-medium leading-snug tracking-tight text-white text-pretty">
                    {study.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/45 text-pretty">
                    {study.summary}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <span className="text-xs font-medium text-white/70">{study.client}</span>
                  <PanelLabel>Case study</PanelLabel>
                </div>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
