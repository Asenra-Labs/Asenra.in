import { cn } from "@/lib/utils";

/**
 * A single, very soft radial light source.
 *
 * One per section at most. Its whole job is to keep a black page from
 * reading as flat — it should be felt, never noticed.
 */
export function GlowField({
  className,
  intensity = "base",
}: {
  className?: string;
  /** `faint` for supporting sections, `strong` reserved for the hero. */
  intensity?: "faint" | "base" | "strong";
}) {
  const opacity = {
    faint: "opacity-[0.35]",
    base: "opacity-60",
    strong: "opacity-100",
  }[intensity];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-[140px]",
        "bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]",
        opacity,
        className
      )}
    />
  );
}
