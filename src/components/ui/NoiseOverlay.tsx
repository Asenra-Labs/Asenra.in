import { cn } from "@/lib/utils";

/**
 * Faint film grain over a section.
 *
 * The predecessor (`.film-grain`) was paired with `visibility: hidden` content
 * and disabled outright below 768px. This one is inert CSS: it never hides
 * anything, so a failed script can't leave the page blank.
 */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grain-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.035]",
        className
      )}
    />
  );
}
