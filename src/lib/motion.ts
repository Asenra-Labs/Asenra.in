import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language for Asenra.
 *
 * Every animation in the marketing surface pulls its transition from here.
 * Nothing uses a default ease: default easing is what makes an interface feel
 * templated, and these springs are what make it feel weighty.
 */

/** Primary spring. Weighty, settles without visible bounce. Use for reveals. */
export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.9,
};

/** Slower and heavier. For large surfaces that should feel expensive to move. */
export const springHeavy: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 18,
  mass: 1.2,
};

/** Tight and responsive. For micro-interactions that must track the pointer. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.6,
};

/** Smoothing applied to raw scroll progress before it drives a transform. */
export const scrollSpring: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 26,
  mass: 0.7,
  restDelta: 0.0005,
};

/** Distance, in px, that revealed content travels up into place. */
export const REVEAL_DISTANCE = 24;

/** Stagger between siblings in a revealed group, in seconds. */
export const REVEAL_STAGGER = 0.08;

/**
 * Standard entrance: rise and fade, on the primary spring.
 * `reduced` collapses travel to zero and swaps in a short opacity fade, so the
 * content still arrives but nothing moves.
 */
export function fadeUp(reduced: boolean, delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : REVEAL_DISTANCE },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0.2, delay: 0 }
        : { ...spring, delay },
    },
  };
}

/** Parent variant that staggers `fadeUp` children. */
export function staggerGroup(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : REVEAL_STAGGER,
      },
    },
  };
}

/** Viewport config shared by scroll-triggered reveals. */
export const REVEAL_VIEWPORT = { once: true, amount: 0.35 } as const;
