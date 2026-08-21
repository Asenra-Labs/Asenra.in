import { Eyebrow } from "./Eyebrow";
import { GlowField } from "./GlowField";
import { GridBackdrop } from "./GridBackdrop";
import { cn } from "@/lib/utils";

/**
 * The opening block of every inner page.
 *
 * Each page previously hand-rolled its own: different eyebrow treatments
 * (some with a silver gradient clip, some plain), headline sizes ranging from
 * text-5xl to text-8xl, `font-black` on some and `font-bold` on others, and
 * top padding anywhere between pt-24 and pt-40. This is one block with one
 * set of decisions, so a visitor moving between pages stops noticing the
 * chrome and starts reading the content.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Optional CTAs rendered under the lede. */
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden border-b border-white/5 bg-black pb-14 pt-32 md:pb-16 md:pt-40",
        className
      )}
    >
      <GridBackdrop className="opacity-70" />
      <GlowField
        intensity="base"
        className="left-1/4 top-0 h-[420px] w-[680px] -translate-y-1/3"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}

        <h1 className="max-w-[20ch] text-4xl font-medium leading-[0.95] tracking-tighter text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        {lede ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/50 text-pretty">
            {lede}
          </p>
        ) : null}

        {actions ? (
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
