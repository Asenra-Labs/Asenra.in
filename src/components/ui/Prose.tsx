import { cn } from "@/lib/utils";

/**
 * Long-form body copy.
 *
 * Sets measure, rhythm and colour once so essay pages stop declaring their
 * own. Kept narrow on purpose — a 3xl column is roughly 70 characters at this
 * size, which is where sustained reading stays comfortable.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl text-base leading-[1.75] text-white/55 text-pretty sm:text-lg",
        "[&_p+p]:mt-5",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Opening paragraph of an essay. Larger and brighter than the body. */
export function ProseLede({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-2xl text-xl font-light leading-snug tracking-tight text-white text-pretty sm:text-2xl">
      {children}
    </p>
  );
}
