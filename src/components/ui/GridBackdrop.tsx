import { cn } from "@/lib/utils";

/**
 * Precise 1px technical grid, radially masked at the edges.
 *
 * Replaces the floating-blob background treatment: it reads as engineering
 * drawing rather than decoration, and costs nothing but a gradient.
 */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid-backdrop pointer-events-none absolute inset-0", className)}
    />
  );
}
