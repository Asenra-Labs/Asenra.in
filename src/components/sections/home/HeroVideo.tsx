"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Full-bleed background video for the hero.
 *
 * Treatment is deliberately heavy-handed: desaturated, held at low opacity,
 * and buried under a scrim. A background video at full saturation reads as a
 * stock-footage banner; at 35% and greyscale it reads as texture, and the
 * headline stays the loudest thing on the screen.
 *
 * If the file is missing the element renders transparent and the CSS mesh
 * behind it simply shows through, so the hero degrades to exactly what it
 * looked like before rather than to a black box.
 *
 * The only client component in the hero, and only because `prefers-reduced-
 * motion` cannot pause a video from CSS. It renders the same markup on both
 * sides of hydration — the effect just pauses playback — so there is no
 * mismatch and no flash.
 */
export function HeroVideo({
  src,
  poster,
  webm,
}: {
  src: string;
  poster?: string;
  webm?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduced) ref.current?.pause();
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={ref}
        className="size-full object-cover opacity-35 grayscale contrast-[1.1]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={src} type="video/mp4" />
      </video>

      {/*
        Scrim. Dark at the top so the fixed navbar keeps its contrast, dark at
        the bottom so the section edge does not cut mid-frame, and a left-side
        wash so the headline never sits on a bright patch of footage.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
    </div>
  );
}
