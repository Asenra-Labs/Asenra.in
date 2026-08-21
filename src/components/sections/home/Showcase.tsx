import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcasePanels } from "./showcase.data";
import { ShowcasePanelBody } from "./ShowcasePanelBody";
import { ShowcaseRail, ShowcaseScrollItem } from "./ShowcaseSequence";

/**
 * What Asenra actually ships, as a scroll sequence.
 *
 * Replaces the phone mockup that used to sit inside the hero card: a 240-line
 * hand-drawn iPhone, rendered at scale-[0.4], cycling seven screens on a
 * 3.5-second timer whether or not anyone was looking at it.
 *
 * A Server Component. All copy renders as HTML; the two client leaves it
 * composes only move what is already there.
 */
export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative isolate overflow-hidden border-t border-white/5 bg-black py-24 md:py-32"
    >
      <GridBackdrop className="opacity-60" />
      <GlowField
        intensity="faint"
        className="right-0 top-1/4 h-[600px] w-[600px] translate-x-1/3"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/*
            Sticky via CSS, not via a scroll-jacking library: the document
            keeps scrolling normally underneath it.
          */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Systems in production"
              title={
                <>
                  Built to run,
                  <br />
                  not to demo.
                </>
              }
              lede="Every engagement ends with something operating inside the business — instrumented, governed, and measured on the numbers below."
            />
          </div>

          <div className="lg:col-span-7">
            <ShowcaseRail>
              <div className="space-y-5">
                {showcasePanels.map((panel) => (
                  <ShowcaseScrollItem key={panel.index}>
                    <ShowcasePanelBody {...panel} />
                  </ShowcaseScrollItem>
                ))}
              </div>
            </ShowcaseRail>
          </div>
        </div>
      </div>
    </section>
  );
}
