/**
 * Slow monochrome mesh behind the hero headline.
 *
 * The plan budgeted this as a dynamically-imported client component. It turned
 * out not to need one: the drift has no state and no pointer input, so it is
 * three CSS-animated radial gradients and a Server Component. That is one
 * fewer client bundle on the homepage, and the global reduced-motion guard in
 * globals.css already stills it for users who ask.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="mesh-layer mesh-a -left-[10%] top-[-20%] h-[70vh] w-[70vw] bg-[radial-gradient(circle,rgba(255,255,255,0.13)_0%,transparent_62%)]" />
      <div className="mesh-layer mesh-b -right-[15%] top-[10%] h-[60vh] w-[60vw] bg-[radial-gradient(circle,rgba(190,196,214,0.10)_0%,transparent_64%)]" />
      <div className="mesh-layer mesh-c left-[20%] bottom-[-25%] h-[55vh] w-[65vw] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_68%)]" />
    </div>
  );
}
