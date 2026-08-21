import { Factory, Stethoscope, Landmark, ShoppingBag, Building2, Hotel, GraduationCap, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";

import { BookCallButton } from "@/components/ui/BookCallButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const industries = [
  {
    id: "manufacturing",
    icon: Factory,
    name: "Manufacturing & Heavy Industry",
    tagline: "Predictive maintenance, automated quality inspection, and supply chain telemetry.",
    useCases: [
      "IoT telemetry & predictive machine failure alerting",
      "Computer vision automated assembly line QA",
      "Supplier inventory demand & replenishment forecasting",
      "ERP & warehouse management workflow automation",
    ],
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    name: "Healthcare & Diagnostics",
    tagline: "HIPAA-compliant clinical document AI, patient triage, and workflow pipelines.",
    useCases: [
      "Automated medical record & lab report extraction",
      "Intelligent patient inquiry & booking agents",
      "HIPAA-compliant data anonymization pipelines",
      "Diagnostic report synthesis & doctor review portals",
    ],
  },
  {
    id: "finance",
    icon: Landmark,
    name: "Banking & Financial Services",
    tagline: "Algorithmic compliance reporting, automated risk assessment, and fraud detection.",
    useCases: [
      "Automated financial reconciliation & audit tracking",
      "KYC & document verification intelligence",
      "Real-time transaction anomaly & fraud detection",
      "Executive portfolio analytics & reporting dashboards",
    ],
  },
  {
    id: "retail",
    icon: ShoppingBag,
    name: "Retail & D2C Brands",
    tagline: "Inventory demand forecasting, personalized customer AI, and conversion engines.",
    useCases: [
      "Dynamic pricing & competitor monitoring engines",
      "Personalized recommendation & AI search models",
      "Omnichannel inventory & order sync automation",
      "Customer support AI agents with instant order tracking",
    ],
  },
  {
    id: "real-estate",
    icon: Building2,
    name: "Real Estate & Development",
    tagline: "Automated lead qualification, property valuation models, and buyer portals.",
    useCases: [
      "24/7 lead qualification & scheduling AI agents",
      "Property valuation & market yield estimation models",
      "Automated tenant onboarding & lease agreement generation",
      "Cinematic digital property showcase platforms",
    ],
  },
  {
    id: "hospitality",
    icon: Hotel,
    name: "Hospitality & Luxury Resorts",
    tagline: "Guest experience automation, dynamic booking engines, and AI concierge.",
    useCases: [
      "AI Concierge for guest requests & room service routing",
      "Dynamic room rate optimization engines",
      "Direct booking engines with WhatsApp reservation bots",
      "Guest feedback sentiment analysis & management",
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    name: "Education & EdTech",
    tagline: "Administrative workflow automation, student intelligence, and adaptive platforms.",
    useCases: [
      "Student application & credential verification pipelines",
      "Automated grading assistance & feedback generation",
      "Adaptive learning path algorithms for course completion",
      "Institutional analytics & retention risk dashboards",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Industry solutions"
        title={
          <>
            Tailored AI for
            <br />
            domain dynamics.
          </>
        }
        lede="Generic AI models fail in complex enterprise environments. We deploy industry-specific solutions tailored to your unique operational and regulatory requirements."
      />

      <section className="relative isolate bg-black pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {industries.map((industry) => (
              <RevealItem key={industry.id} className="flex">
                <Panel
                  id={industry.id}
                  className="w-full scroll-mt-32 justify-between p-8 sm:p-10"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <PanelIcon icon={industry.icon} />
                      <h2 className="text-xl font-medium tracking-tight text-white text-pretty">
                        {industry.name}
                      </h2>
                    </div>

                    <p className="mt-6 text-sm font-medium leading-snug text-white/75 text-pretty">
                      {industry.tagline}
                    </p>

                    <div className="mt-8 border-t border-white/[0.07] pt-6">
                      <PanelLabel>Key AI implementations</PanelLabel>

                      <ul className="mt-5 space-y-3.5">
                        {industry.useCases.map((useCase) => (
                          <li key={useCase} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white/70" />
                            <span className="text-sm leading-relaxed text-white/50 text-pretty">
                              {useCase}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <BookCallButton
                    variant="secondary"
                    size="md"
                    className="mt-8 self-start"
                    formId="vt3flmg8"
                  >
                    <span>Discuss this blueprint</span>
                    <ArrowRight className="size-4" />
                  </BookCallButton>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection
        title="Don't see your industry?"
        lede="We architect custom AI engines for complex enterprise operations regardless of domain. Book a technical discovery call today."
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
