import { Search, Compass, Code, Activity, ArrowRight } from "lucide-react";

import { CtaButton } from "@/components/ui/CtaButton";
import { GlowField } from "@/components/ui/GlowField";
import { Panel, PanelIcon } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const processSteps = [
  {
    step: "01",
    title: "Discover",
    icon: Search,
    description:
      "Understand business operations, audit existing workflows, and identify high-value AI and automation opportunities.",
  },
  {
    step: "02",
    title: "Architect",
    icon: Compass,
    description:
      "Design the right AI models, software architecture, and integration protocols tailored to your technical ecosystem.",
  },
  {
    step: "03",
    title: "Implement",
    icon: Code,
    description:
      "Build and integrate intelligent systems seamlessly into your business operations with zero disruption to daily workflows.",
  },
  {
    step: "04",
    title: "Optimize",
    icon: Activity,
    description:
      "Continuously monitor performance, refine system capabilities, and measure tangible business outcomes and efficiency gains.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative isolate overflow-hidden border-t border-white/5 bg-black py-20 md:py-28"
    >
      <GlowField
        intensity="faint"
        className="right-1/4 top-1/2 h-[300px] w-[500px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Structured process.
              <br />
              Predictable execution.
            </>
          }
          lede="We operate with absolute clarity and accountability. Our four-stage process ensures seamless integration from initial audit through ongoing optimization."
        />

        <RevealGroup as="ul" className="mt-16 space-y-4 md:mt-20">
          {processSteps.map((item) => (
            <RevealItem key={item.step} as="li">
              <Panel className="flex-row items-start gap-6 sm:items-center sm:gap-8">
                <span className="font-mono text-3xl font-medium tabular-nums text-white/15 sm:text-4xl">
                  {item.step}
                </span>

                <PanelIcon icon={item.icon} className="hidden sm:inline-flex" />

                <div className="min-w-0">
                  <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45 text-pretty">
                    {item.description}
                  </p>
                </div>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <CtaButton href="/process" variant="secondary" size="md">
            Explore the complete process
            <ArrowRight className="size-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
