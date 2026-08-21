import { Brain, Cpu, Workflow, Layers, Layout, ArrowRight } from "lucide-react";

import { CtaButton } from "@/components/ui/CtaButton";
import { GlowField } from "@/components/ui/GlowField";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  {
    icon: Brain,
    title: "AI Consulting",
    description:
      "Identify where AI creates measurable business value. We audit your existing workflows, evaluate ROI viability, and deliver an actionable implementation roadmap.",
    tag: "Strategy & Audit",
  },
  {
    icon: Cpu,
    title: "AI Implementation",
    description:
      "Custom AI models and intelligent systems integrated directly into your core business operations. Private, secure, and fine-tuned on your domain data.",
    tag: "Core Systems",
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    description:
      "Reduce manual work and operational friction through intelligent automated workflows. Streamline processes across finance, operations, customer service, and HR.",
    tag: "Operational Scale",
  },
  {
    icon: Layers,
    title: "Custom Software Systems",
    description:
      "Internal tools, operational portals, and business management platforms engineered specifically around your complex operational mechanics.",
    tag: "Custom Platforms",
  },
  {
    icon: Layout,
    title: "Digital Infrastructure",
    description:
      "Conversion-focused, high-performance web applications and digital interfaces built to establish strong online authority for ambitious brands.",
    tag: "Brand & Performance",
  },
];

export function SolutionsPreview() {
  return (
    <section
      id="capabilities"
      className="relative isolate overflow-hidden border-t border-white/5 bg-black py-20 md:py-28"
    >
      <GlowField
        intensity="faint"
        className="left-1/2 top-1/3 h-[300px] w-[600px] -translate-x-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="What we build."
          lede="We move beyond superficial AI hype. We engineer robust AI systems and intelligent automation platforms tailored to your business operations."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <RevealItem
              key={capability.title}
              className={index === 0 ? "flex lg:col-span-2" : "flex"}
            >
              <Panel className="w-full justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <PanelIcon icon={capability.icon} />
                    <PanelLabel>{capability.tag}</PanelLabel>
                  </div>

                  <h3 className="mt-8 text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {capability.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/45 text-pretty">
                    {capability.description}
                  </p>
                </div>

                <CtaButton
                  href="/solutions"
                  variant="quiet"
                  size="sm"
                  className="mt-8 self-start"
                  aria-label={`Learn more about ${capability.title}`}
                >
                  Learn more
                  <ArrowRight className="size-3.5" />
                </CtaButton>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <CtaButton href="/solutions" variant="secondary" size="md">
            View all capabilities
            <ArrowRight className="size-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
