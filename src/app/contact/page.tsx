import { CheckCircle2, PhoneCall } from "lucide-react";

import { BookCallButton } from "@/components/ui/BookCallButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel, PanelLabel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const briefingIncludes = [
  "Zero sales pitch — pure technical review",
  "Custom ROI estimation & architecture roadmap",
  "Full confidentiality / NDA available upon request",
];

const directChannels = [
  {
    label: "Direct email & inquiries",
    value: "contact@asenra.in",
    href: "mailto:contact@asenra.in",
    note: "For RFP submissions, enterprise partnerships, and media inquiries.",
  },
  {
    label: "Direct telephone",
    value: "+91 8956634577",
    href: "tel:+918956634577",
    note: "Monday – Saturday · 9:00 AM to 8:00 PM IST",
  },
  {
    label: "Engineering headquarters",
    value: "Asenra Technology Labs · Maharashtra, India",
    note: "Serving enterprise clients across India & global markets.",
  },
];

/**
 * Merged in from the retired /audit page, which opened the same booking modal
 * this page does — it was a second front door to one form.
 */
const auditIncludes = [
  {
    title: "01. Operational workflow audit",
    desc: "Complete mapping of your manual processes, employee time allocation, and repetitive administrative bottlenecks.",
  },
  {
    title: "02. AI feasibility & ROI benchmark",
    desc: "Rigorous evaluation of where fine-tuned LLMs, automated agents, or RAG vector pipelines generate measurable ROI.",
  },
  {
    title: "03. Data security & architecture review",
    desc: "Analysis of your database structures, API access controls, and compliance requirements (HIPAA, SOC2, GDPR).",
  },
  {
    title: "04. Custom 90-day implementation roadmap",
    desc: "Step-by-step technical blueprint outlining recommended software stack, milestone timelines, and cost projections.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Executive consultation"
        title={
          <>
            Book an AI
            <br />
            strategy session.
          </>
        }
        lede="Direct access to our lead AI architects and systems engineers. We review your current operations and outline high-value automation opportunities."
      />

      <section className="relative isolate bg-black pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
            <Panel interactive={false} className="p-8 sm:p-10 lg:col-span-7">
              <h2 className="text-2xl font-medium tracking-tighter text-white sm:text-3xl">
                Schedule a technical discovery call
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 text-pretty">
                During this 30-minute executive briefing, our engineering team will
                evaluate your software ecosystem, data availability, and automation
                feasibility.
              </p>

              <ul className="mt-8 space-y-4 border-t border-white/[0.07] pt-7">
                {briefingIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white/70" />
                    <span className="text-sm leading-relaxed text-white/70 text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <BookCallButton
                variant="primary"
                size="lg"
                className="mt-9 w-full sm:w-auto"
                formId="vt3flmg8"
              >
                <PhoneCall className="size-4" />
                <span>Start the booking briefing</span>
              </BookCallButton>
            </Panel>

            <RevealGroup className="space-y-5 lg:col-span-5">
              {directChannels.map((channel) => (
                <RevealItem key={channel.label}>
                  <Panel>
                    <PanelLabel>{channel.label}</PanelLabel>

                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="mt-4 block text-lg font-medium tracking-tight text-white transition-colors hover:text-white/70"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-4 text-base font-medium tracking-tight text-white text-pretty">
                        {channel.value}
                      </p>
                    )}

                    <p className="mt-3 text-xs leading-relaxed text-white/40 text-pretty">
                      {channel.note}
                    </p>
                  </Panel>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="relative isolate border-t border-white/5 bg-black py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Free enterprise evaluation"
            title="What the readiness audit covers."
            lede="Pinpoint exactly where enterprise AI and intelligent automation can eliminate manual friction, reduce overhead, and accelerate your business execution."
          />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2">
            {auditIncludes.map((item) => (
              <RevealItem key={item.title} className="flex">
                <Panel className="w-full justify-between p-8 sm:p-10">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-white text-pretty">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/45 text-pretty">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 shrink-0 text-white/70" />
                    <PanelLabel>Included in the free audit</PanelLabel>
                  </div>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
