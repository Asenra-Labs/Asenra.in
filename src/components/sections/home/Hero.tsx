import { ArrowRight } from "lucide-react";

import { CtaButton } from "@/components/ui/CtaButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { HeroBackdrop } from "./HeroBackdrop";

/**
 * The hero copy, kept in one place so it can be revised without reading the
 * layout. The version this replaced said four things at once — an eyebrow, a
 * two-line headline, a subhead, a card heading and a second CTA headline —
 * with four calls to action stacked before the fold ended.
 */
const HERO = {
  eyebrow: "Enterprise AI Consulting",
  headline: "Intelligence, operationalised.",
  lede: "Asenra designs, builds, and runs the AI systems that ambitious companies put at the centre of their operations.",
  primary: { label: "Book a strategy session", href: "/contact" },
  secondary: { label: "See what we build", href: "/solutions" },
} as const;

/**
 * Homepage hero.
 *
 * A Server Component with no JavaScript at all. It renders complete in the
 * HTML payload — no `visibility: hidden`, no hydration gate, no scroll
 * pinning. Its predecessor hid the `h1` behind a GSAP timeline and held the
 * viewport for 4000px of wheel travel before releasing it.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden border-b border-white/5 bg-black">
      <HeroBackdrop />
      <GridBackdrop />
      <GlowField
        intensity="strong"
        className="left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2"
      />
      <NoiseOverlay />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-24 pt-36 md:px-10 md:pt-40">
        <Eyebrow>{HERO.eyebrow}</Eyebrow>

        <h1 className="mt-8 max-w-[16ch] text-[clamp(2.75rem,8.5vw,9rem)] font-medium leading-[0.86] tracking-[-0.045em] text-white text-balance">
          {HERO.headline}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50 text-pretty sm:text-xl">
          {HERO.lede}
        </p>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
          <CtaButton href={HERO.primary.href} variant="primary" size="lg">
            {HERO.primary.label}
          </CtaButton>

          <CtaButton href={HERO.secondary.href} variant="quiet" size="lg">
            {HERO.secondary.label}
            <ArrowRight className="size-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
