import type { Readout } from "./showcase.data";

/**
 * The inner face of a showcase panel.
 *
 * A Server Component, so the panel's content ships as HTML and the client
 * wrapper around it only has to move it. Every readout is flat and precise:
 * mono labels, a hairline rule, one number that matters. No device chrome.
 */
export function ShowcasePanelBody({
  index,
  label,
  metric,
  caption,
  readout,
}: {
  index: string;
  label: string;
  metric: string;
  caption: string;
  readout: Readout;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:p-9">
      <header className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] pb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
          {label}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-white/25">
          {index}
        </span>
      </header>

      <p className="mt-7 text-3xl font-medium leading-none tracking-tighter text-white sm:text-4xl">
        {metric}
      </p>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45 text-pretty">
        {caption}
      </p>

      <div className="mt-8">
        <ReadoutView readout={readout} />
      </div>
    </article>
  );
}

function ReadoutView({ readout }: { readout: Readout }) {
  if (readout.kind === "meter") {
    return (
      <div>
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-white/35">{readout.label}</span>
          <span className="tabular-nums text-white">{readout.value}</span>
        </div>
        <div className="mt-3 h-px w-full bg-white/10">
          <div
            className="h-px bg-white"
            style={{ width: `${Math.round(readout.fill * 100)}%` }}
          />
        </div>
      </div>
    );
  }

  if (readout.kind === "series") {
    const peak = Math.max(...readout.points);
    return (
      <div>
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-white/35">{readout.label}</span>
          <span className="tabular-nums text-white">{readout.value}</span>
        </div>
        <div className="mt-4 flex h-12 items-end gap-1.5" aria-hidden="true">
          {readout.points.map((point, i) => (
            <div
              key={i}
              className="flex-1 bg-white/20 last:bg-white"
              style={{ height: `${(point / peak) * 100}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <dl className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
      {readout.rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between py-2.5">
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
            {row.label}
          </dt>
          <dd className="font-mono text-[11px] tabular-nums text-white/85">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
