"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";

import { MotionFeatures } from "@/components/ui/MotionFeatures";

import { scrollSpring } from "@/lib/motion";

/**
 * Scroll-linked choreography for the showcase panels.
 *
 * A leaf: it receives already-rendered panels from a Server Component and does
 * nothing but move them. It holds no copy and no data.
 *
 * Deliberately *not* pinned. The old hero drove its sequence with GSAP
 * `ScrollTrigger` and `pin: true`, which froze the document for 4000px of
 * wheel travel. Here progress is read from natural document scroll, so the
 * scrollbar always tracks the wheel and the browser's own scroll restoration
 * keeps working.
 */

/** Vertical progress rail. Fills as the reader moves through the sequence. */
export function ShowcaseRail({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, scrollSpring);

  return (
    <MotionFeatures>
      <div ref={ref} className="relative">
        <div
          aria-hidden="true"
          className="absolute -left-6 top-1 hidden h-full w-px bg-white/[0.07] lg:block"
        >
          <m.div
            className="h-full w-px origin-top bg-white/50"
            style={reduced ? { scaleY: 1 } : { scaleY }}
          />
        </div>
        {children}
      </div>
    </MotionFeatures>
  );
}

/**
 * One panel's entrance. Opacity and travel are mapped from the panel's own
 * position in the viewport, so panels hand off to each other continuously
 * rather than firing a one-shot trigger.
 */
export function ShowcaseScrollItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.45"],
  });
  const eased = useSpring(scrollYProgress, scrollSpring);

  const opacity = useTransform(eased, [0, 1], [0.18, 1]);
  const y = useTransform(eased, [0, 1], [56, 0]);
  const scale = useTransform(eased, [0, 1], [0.97, 1]);

  return (
    <MotionFeatures>
      <m.div
        ref={ref}
        data-reveal=""
        className={className}
        style={reduced ? undefined : { opacity, y, scale }}
      >
        {children}
      </m.div>
    </MotionFeatures>
  );
}
