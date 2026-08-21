import { cn } from "@/lib/utils";

/**
 * Small uppercase label that sits above a heading.
 *
 * The counterweight to the tight-tracked display type: where headings pull
 * letters together, the eyebrow pushes them apart. Server Component.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.3em] text-white/40 select-none",
        className
      )}
    >
      {children}
    </p>
  );
}
