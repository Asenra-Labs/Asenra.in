import { cn } from "@/lib/utils";

/**
 * The one card surface used across the marketing sections.
 *
 * Four sections previously hand-rolled the same idea with different radii
 * (2rem vs 2.5rem), different gradients (to-b vs to-br), different hover
 * borders (white/20 vs white/25) and different padding. They all layered
 * `.premium-depth-card` — a heavy four-shadow treatment shared with /admin and
 * /portal — plus a `.card-sheen` element that tracks a `--mouse-x` variable
 * only the deleted hero ever set, so it rendered a static blob on every page.
 *
 * This is a hairline border, a barely-there fill, and nothing else. Those
 * legacy classes are left untouched for the 24 files still using them.
 */
export function Panel({
  children,
  className,
  as: Tag = "div",
  interactive = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  /** Set false for panels that are not links and should not respond to hover. */
  interactive?: boolean;
  /** Anchor target, for panels that are deep-linked from elsewhere. */
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm",
        interactive &&
          "transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.035]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Square icon chip that sits at the top of a panel. Kept here so the size,
 * radius and border match everywhere they appear.
 */
export function PanelIcon({
  icon: Icon,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white",
        className
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

/** Mono label used for tags, sectors and stage markers. */
export function PanelLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.2em] text-white/35",
        className
      )}
    >
      {children}
    </span>
  );
}
