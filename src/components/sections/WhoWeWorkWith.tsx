import { Factory, HeartPulse, Landmark, ShoppingBag, Briefcase } from "lucide-react";

import { Panel, PanelIcon } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const industries = [
  {
    icon: Factory,
    name: "Manufacturing & Logistics",
    desc: "Automated inventory tracking, predictive maintenance, and supply chain dispatch automation.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & Diagnostics",
    desc: "HIPAA-aligned clinical document intelligence, automated triage pipelines, and patient record processing.",
  },
  {
    icon: Landmark,
    name: "Financial Services",
    desc: "Automated compliance auditing, document processing, and intelligent risk evaluation systems.",
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-Commerce",
    desc: "Customer operations automation, dynamic fulfillment intelligence, and inventory optimization.",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    desc: "Knowledge management engines, automated reporting workflows, and custom client portals.",
  },
];

export function WhoWeWorkWith() {
  return (
    <section
      id="who-we-work-with"
      className="relative isolate overflow-hidden border-t border-white/5 bg-black py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Client sectors"
          title="Industries we serve."
          lede="We partner with ambitious leadership teams across critical business sectors to architect and implement domain-specific intelligent systems."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <RevealItem key={industry.name} as="li" className="flex">
              <Panel as="div" className="w-full">
                <PanelIcon icon={industry.icon} />

                <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45 text-pretty">
                  {industry.desc}
                </p>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
