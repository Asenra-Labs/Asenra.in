"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { MotionFeatures } from "@/components/ui/MotionFeatures";

import { fadeUp, staggerGroup, REVEAL_VIEWPORT } from "@/lib/motion";

/**
 * Scroll-triggered entrance, on the shared spring.
 *
 * Deliberately a leaf: it takes already-rendered children from a Server
 * Component and does nothing but move them. No copy, no data, no layout
 * decisions live here.
 *
 * No-JS safety: Motion serialises `initial` into the SSR markup, so without
 * hydration these elements would stay at `opacity: 0`. The `data-reveal`
 * attribute exists so the `<noscript>` rule in the root layout can force them
 * back to visible — the same failure mode that made the old
 * `.gsap-reveal { visibility: hidden }` rule dangerous.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const reduced = useReducedMotion() ?? false;
  const Component = m[as];

  return (
    <MotionFeatures>
      <Component
        data-reveal=""
        className={className}
        variants={fadeUp(reduced, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={REVEAL_VIEWPORT}
      >
        {children}
      </Component>
    </MotionFeatures>
  );
}

/**
 * Staggers direct `RevealItem` children. Use for card grids, where items
 * arriving together reads as a page load and items arriving in sequence
 * reads as intent.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const reduced = useReducedMotion() ?? false;
  const Component = m[as];

  return (
    <MotionFeatures>
      <Component
        data-reveal=""
        className={className}
        variants={staggerGroup(reduced)}
        initial="hidden"
        whileInView="visible"
        viewport={REVEAL_VIEWPORT}
      >
        {children}
      </Component>
    </MotionFeatures>
  );
}

/** A single child of `RevealGroup`. Inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion() ?? false;
  const Component = m[as];

  return (
    <Component data-reveal="" className={className} variants={fadeUp(reduced)}>
      {children}
    </Component>
  );
}
