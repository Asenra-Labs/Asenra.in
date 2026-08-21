import { cn } from "@/lib/utils";

/**
 * Labelled text input.
 *
 * Every form on the site rolled its own: black uppercase 10px labels,
 * rounded-2xl inputs at py-3.5, and an icon absolutely positioned against a
 * hand-tuned offset. This is one input, and it wires label to control with a
 * real `htmlFor`, which none of the originals did.
 */
export function Field({
  id,
  label,
  icon: Icon,
  action,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional control rendered opposite the label, e.g. "Forgot password?". */
  action?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45"
        >
          {label}
        </label>
        {action}
      </div>

      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />
        ) : null}

        <input
          id={id}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pr-4 text-sm text-white",
            "placeholder:text-white/25",
            "transition-colors outline-none focus:border-white/35 focus:bg-white/[0.05]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            Icon ? "pl-11" : "pl-4",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
