"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Feature bundle for the `m` components used across the site.
 *
 * Importing the full `motion` proxy pulls every feature Motion has, which
 * measured +42 kB gzip on the homepage — more than the whole refactor had
 * saved. `m` plus an explicit `domAnimation` bundle buys the animation,
 * variant and in-view features actually in use and leaves layout projection
 * and drag behind.
 *
 * Cheap to nest: LazyMotion deduplicates through context, so each client leaf
 * can wrap itself without a shared provider in the tree.
 */
export function MotionFeatures({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
