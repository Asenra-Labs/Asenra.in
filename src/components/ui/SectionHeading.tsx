import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

/**
 * The one heading rhythm used by every section on the site.
 *
 * Before this existed, six sections each hand-rolled the same
 * eyebrow / h2 / lede stack with slightly different sizes, weights and
 * margins. Routing them all through here is what makes the page read as
 * one designed system rather than six similar ones.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "start",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}

      <Tag className="text-4xl font-medium leading-[0.95] tracking-tighter text-white text-balance sm:text-5xl md:text-6xl">
        {title}
      </Tag>

      {lede ? (
        <p className="mt-6 text-base leading-relaxed text-white/50 text-pretty sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
