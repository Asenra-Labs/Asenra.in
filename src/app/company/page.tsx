import { PhoneCall } from "lucide-react";

import { BookCallButton } from "@/components/ui/BookCallButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { PanelLabel } from "@/components/ui/Panel";
import { Prose, ProseLede } from "@/components/ui/Prose";

/**
 * Founder essay. Copy is carried over verbatim; only the structure around it
 * changed. The section headings were `h2` elements styled as mono labels,
 * which is now what PanelLabel is for.
 */
const essay = [
  {
    heading: "01 / Why Asenra exists",
    paragraphs: [
      "Asenra was founded on a simple realization: ambitious companies spend millions operating legacy software, manual back-offices, and fragmented spreadsheets that slow down execution.",
      "We don't operate as a generic digital marketing agency or a temporary dev shop. We operate as an enterprise systems integrator and AI consultancy. We build the core digital infrastructure that lets businesses automate repetitive tasks, scale operations without exploding headcount, and dominate their category.",
    ],
  },
  {
    heading: "02 / Why artificial intelligence matters",
    paragraphs: [
      "Artificial Intelligence is not a marketing gimmick or a party trick. It represents a fundamental shift in how human work is structured.",
      "For the first time in computing history, software can parse unstructured data, reason over complex business rules, and execute multi-step workflows autonomously. When applied correctly to enterprise operations, AI transforms hours of manual friction into milliseconds of computational certainty.",
      "However, off-the-shelf AI widgets fail because they lack domain context and security controls. Real business impact requires custom AI pipelines fine-tuned on proprietary operational data and integrated deeply into existing enterprise infrastructure.",
    ],
  },
  {
    heading: "03 / What future we're building",
    paragraphs: [
      "We are building a future where every ambitious business runs on intelligent, self-optimizing infrastructure.",
      "A future where routine administrative burden is handled by autonomous background agents, allowing human teams to focus exclusively on high-level strategy, creative direction, and relationship building.",
      "We measure our success not by awards or vanity metrics, but by the tangible ROI, operational speed, and profit expansion we unlock for our partners.",
    ],
  },
];

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Founder philosophy & manifesto"
        title="Why Asenra exists."
      />

      <article className="relative isolate bg-black py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <ProseLede>
            Most software built for businesses today is fragile, complex, and
            unnecessarily bloated. We believe software should create immediate,
            measurable business impact.
          </ProseLede>

          <div className="mt-16 space-y-14 border-t border-white/[0.07] pt-14">
            {essay.map((section) => (
              <section key={section.heading}>
                <PanelLabel>{section.heading}</PanelLabel>
                <Prose className="mt-6">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>
              </section>
            ))}
          </div>

          <footer className="mt-16 border-t border-white/[0.07] pt-10">
            <p className="text-base font-medium text-white">
              The Asenra Leadership Team
            </p>
            <PanelLabel className="mt-3 block">
              Engineered with conviction · Operations Pan-India & Global
            </PanelLabel>
          </footer>
        </div>
      </article>

      <CtaSection
        title="Build the system your business should already be running on."
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
