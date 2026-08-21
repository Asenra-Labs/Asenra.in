import { PageHeader } from "./PageHeader";
import { Panel, PanelLabel } from "./Panel";

export interface LegalSection {
  title: string;
  content: string;
}

/**
 * Shared layout for the policy pages.
 *
 * /privacy and /terms were byte-for-byte identical below their content
 * arrays — same header, same numbered sections, same card, mirrored only in
 * which corner the background blur sat in. One component now, two data sets.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: React.ReactNode;
  /** Human-readable revision date, e.g. "April 2026". */
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lede={`Last updated ${updated}.`}
      />

      <section className="relative isolate bg-black py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
          <ol className="space-y-12">
            {sections.map((section, index) => (
              <li key={section.title}>
                <PanelLabel>
                  {String(index + 1).padStart(2, "0")}. {section.title}
                </PanelLabel>

                <Panel interactive={false} className="mt-5">
                  <p className="text-sm leading-relaxed text-white/50 text-pretty">
                    {section.content}
                  </p>
                </Panel>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
