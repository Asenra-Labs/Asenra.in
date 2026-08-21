import { Workflow, TrendingUp, ShieldCheck } from "lucide-react";

import { GlowField } from "@/components/ui/GlowField";
import { Panel, PanelIcon } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    icon: Workflow,
    title: "Seamless Workflow Integration",
    description:
      "Most companies adopt AI by adding another standalone tool. We redesign core business operations around intelligent systems that integrate directly into your existing software and workflows.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Business Outcomes",
    description:
      "Every implementation is engineered with clear metrics in mind—reducing operational overhead, accelerating throughput velocity, and delivering verifiable return on investment.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Architecture",
    description:
      "Engineered around enterprise-grade security principles. Your data remains private, isolated, and protected under strict access governance and industry best practices.",
  },
];

export function WhyAsenra() {
  return (
    <section
      id="why-asenra"
      className="relative isolate overflow-hidden border-t border-white/5 bg-black py-24 md:py-32"
    >
      <GlowField
        intensity="faint"
        className="left-1/2 top-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Why businesses choose Asenra"
          title={
            <>
              Intelligent systems.
              <br />
              Measurable outcomes.
            </>
          }
          lede="Most companies adopt AI by adding another tool. We redesign business operations around intelligent systems that integrate seamlessly into your existing workflows."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.title} className="flex">
              <Panel className="w-full">
                <PanelIcon icon={pillar.icon} />

                <h3 className="mt-8 text-xl font-medium tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/45 text-pretty">
                  {pillar.description}
                </p>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
