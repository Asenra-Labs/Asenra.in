import { GlowField } from "@/components/ui/GlowField";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Centred shell for the sign-in and sign-up screens.
 *
 * Both pages previously carried their own copy of the backdrop — two blurred
 * blobs and a grid at slightly different opacities — plus their own header
 * block. This is a Server Component; only the form inside each page needs to
 * be a client leaf.
 */
export function AuthShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pb-20 pt-28">
      <GridBackdrop className="opacity-60" />
      <GlowField
        intensity="base"
        className="left-1/2 top-1/3 h-[460px] w-[720px] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 w-full max-w-md">
        <header className="text-center">
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h1 className="text-3xl font-medium tracking-tighter text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/45 text-pretty">
            {lede}
          </p>
        </header>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
