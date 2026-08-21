import { ArrowRight, Check, CreditCard, ShieldCheck, XCircle } from "lucide-react";

import { PricingTabs } from "./pricing/PricingTabs";
import { CtaButton } from "@/components/ui/CtaButton";
import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const amcIncluded = [
  "Domain renewal",
  "Hosting continuation",
  "Bug fixes",
  "Minor content updates",
  "Uptime monitoring",
  "Performance checks",
];

const amcExcluded = [
  "New features / modules",
  "Full redesign",
  "New integrations",
  "Third-party API charges",
];

const paymentPhases = [
  { phase: "Phase 01", label: "Advance, before start", share: "50%" },
  { phase: "Phase 02", label: "Final handover", share: "50%" },
];

/**
 * Pricing.
 *
 * Was a 462-line Client Component running four GSAP timelines and a
 * pointer-tracking sheen. The catalogue is now a data module, the tabs are a
 * small client leaf, and this shell renders on the server — which also takes
 * GSAP off /packages.
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-black pb-20 pt-14 md:pb-28 md:pt-20"
    >
      <GridBackdrop className="opacity-50" />
      <GlowField
        intensity="faint"
        className="left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Pricing models"
          title={
            <>
              Transparent scale for
              <br />
              elite businesses.
            </>
          }
          lede="Choose your engine. From kinematic websites to autonomous AI agents, we architect for high-impact growth."
        />

        <div className="mt-12 md:mt-16">
          <PricingTabs />
        </div>

        <Panel
          interactive={false}
          className="mt-20 flex-col items-start justify-between gap-8 p-8 sm:p-10 md:flex-row md:items-center"
        >
          <div className="max-w-2xl">
            <PanelLabel>Interactive gap analysis</PanelLabel>
            <h3 className="mt-4 text-xl font-medium tracking-tight text-white sm:text-2xl">
              Not sure which package fits?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/45 text-pretty">
              Run a live technical audit on your current website and generate a
              customized mock layout instantly with our Asenra Demo Engine.
            </p>
          </div>

          <CtaButton href="/acquisition" variant="primary" size="md" className="shrink-0">
            <span>Launch demo engine</span>
            <ArrowRight className="size-4" />
          </CtaButton>
        </Panel>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Panel interactive={false} className="p-8 sm:p-10">
            <div className="flex items-center gap-4">
              <PanelIcon icon={ShieldCheck} />
              <div>
                <h3 className="text-lg font-medium tracking-tight text-white">
                  AMC coverage
                </h3>
                <PanelLabel className="mt-1 block">
                  Included in annual maintenance
                </PanelLabel>
              </div>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <PanelLabel className="text-white/70">Included</PanelLabel>
                <ul className="mt-5 space-y-3">
                  {amcIncluded.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="size-3.5 shrink-0 text-white/70" />
                      <span className="text-xs text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <PanelLabel>Not included</PanelLabel>
                <ul className="mt-5 space-y-3">
                  {amcExcluded.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <XCircle className="size-3.5 shrink-0 text-white/25" />
                      <span className="text-xs text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>

          <Panel interactive={false} className="p-8 sm:p-10">
            <div className="flex items-center gap-4">
              <PanelIcon icon={CreditCard} />
              <div>
                <h3 className="text-lg font-medium tracking-tight text-white">
                  Payment structure
                </h3>
                <PanelLabel className="mt-1 block">
                  Fair milestone-based billables
                </PanelLabel>
              </div>
            </div>

            <dl className="mt-9 space-y-4">
              {paymentPhases.map((phase) => (
                <div
                  key={phase.phase}
                  className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/40 p-6"
                >
                  <div>
                    <PanelLabel>{phase.phase}</PanelLabel>
                    <dt className="mt-2 text-base font-medium tracking-tight text-white">
                      {phase.label}
                    </dt>
                  </div>
                  <dd className="text-3xl font-medium tracking-tighter tabular-nums text-white">
                    {phase.share}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/25">
              Transparent · Professional · High integrity
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
