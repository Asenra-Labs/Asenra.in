import { GlowField } from "./GlowField";
import { cn } from "@/lib/utils";

/**
 * Closing call-to-action block.
 *
 * Nearly every page ended with its own version of this — same shape, but
 * headline sizes from text-3xl to text-5xl, `font-black` throughout, and
 * button shadows ranging from a 25px white glow to a 40px one.
 */
export function CtaSection({
  title,
  lede,
  actions,
  className,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-t border-white/5 bg-black py-24 md:py-32",
        className
      )}
    >
      <GlowField
        intensity="base"
        className="left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center md:px-10">
        <h2 className="text-3xl font-medium leading-[0.95] tracking-tighter text-white text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>

        {lede ? (
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/50 text-pretty sm:text-lg">
            {lede}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {actions}
        </div>
      </div>
    </section>
  );
}
