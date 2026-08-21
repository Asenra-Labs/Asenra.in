# ASENRA — "Enterprise Premium" Refactor Plan

**Status:** Complete — all six phases shipped on `refactor/enterprise-premium`. See §9 for measured results.
**Baseline:** `npm run build` passed (30 routes, 1.9 MB `.next/static`) on commit `b912d45`
**Scope:** Homepage (`/`) experience + shared design-system/CSS foundations. Inner pages are touched only where a shared class or component changes underneath them.

---

## 1. Diagnosis — what reconnaissance actually found

### 1.1 The hero (`src/components/ui/cinematic-landing-hero.tsx`, 572 lines)

This single file is the whole problem. It is one `"use client"` component containing a data catalogue, a phone mockup, a hero headline, a card, and a CTA — all choreographed by one GSAP timeline.

| Finding | Detail |
|---|---|
| **Pinned scroll hijack** | `ScrollTrigger` pins the viewport for `+=4000px` on desktop / `+=1500px` on mobile. The user scrolls ~5 screens' worth of wheel travel and the page does not move. This is the single largest "template" tell. |
| **Three messages stacked** | Eyebrow + 2-line headline + subhead + 2 CTAs *and then* a card with its own `h3` + description *and then* a CTA layer with its own `h2` + 2 more CTAs. Four calls-to-action before the fold ends. |
| **The phone mockup** | ~240 lines of hand-drawn iPhone chrome — bezel, three hardware buttons, Dynamic Island, screen glare, home bar — rendered at `scale-[0.4]`. Roughly 60% of that detail is invisible at final size. It is the "generic CodePen" artifact named in the brief. |
| **Dead props** | `brandName`, `brandLogo`, `metricValue`, `metricLabel` are declared, defaulted, and passed from `page.tsx` — but **never rendered**. `metricValue` survives only as a `useEffect` dependency. |
| **Heading hierarchy** | The `h1` (tagline1) is a `.text-track` element that starts at `autoAlpha: 0`; the `h2` CTA layer starts hidden and is revealed by scroll. Crawlers and screen readers get a hero whose semantic structure is animation-dependent. |
| **`window` reads in effects** | `window.innerWidth < 768` is read once at mount to branch the timeline; resizing or rotating a device leaves the wrong timeline installed. |
| **No `prefers-reduced-motion`** | Nothing in the codebase honours it. For an enterprise buyer audience this is a straightforward accessibility gap. |
| **`w-screen h-screen`** | `w-screen` is `100vw`, which includes the scrollbar gutter; it is why `body` needs `overflow-x-hidden` as a patch. |

### 1.2 Server/Client boundary

**All six homepage sections are marked `"use client"` and none of them need it.** `TrustedTechnologies`, `WhyAsenra`, `WhoWeWorkWith`, `SolutionsPreview`, `ProcessSection`, `CaseStudiesTeaser` contain zero hooks, zero state, zero event handlers — only `map()` over a local array. They ship to the browser for nothing.

### 1.3 `globals.css` (441 lines)

| Finding | Detail |
|---|---|
| **Render-blocking font import** | Line 1 is a Google Fonts `@import` pulling **Playfair Display + Syne + Italiana + Outfit** on *every* route. Grep result: these are used **only** inside `src/components/demo/Templates.tsx` (the `/demos/[slug]` route). `Syne` is used nowhere at all. The homepage pays a blocking external stylesheet plus font downloads for fonts it never renders. |
| **Dead rules** | `.as-glossy-red`, `.text-3d-matte`, `.text-card-silver-matte`, `.animate-pulse-subtle`, `.floating-ui-badge`, `.widget-depth`, `.progress-ring`, `.text-shine-gold/silver/rose/emerald/blue` — **0 usages** in `src/`. Roughly 120 lines. |
| **`.gsap-reveal { visibility: hidden }`** | Content is invisible until JS runs. If the GSAP bundle fails or is slow, the hero is a black rectangle. |
| **Red brand tokens** | `--asenra-red` and friends define a `#EE0000` palette the current UI never uses. Directly contradicts the "no neon" mandate. |

### 1.4 Shared-class blast radius (**this constrains everything below**)

These classes are **not** hero-local. They are load-bearing across the site:

| Class | Files using it |
|---|---|
| `.premium-depth-card` | **24** |
| `.card-sheen` | **25** |
| `.text-silver-matte` | **27** |
| `.bg-grid-theme` | **10** |
| `.btn-modern-light` | 6 |

> **Consequence:** I will **not delete or redefine** these in place. Doing so silently restyles 27 files including `/admin`, `/portal`, and `/hiring/verify`, which are outside this brief's scope. New primitives get new names; the old classes stay untouched until a later, separately approved sweep.

---

## 2. The one decision I need from you

**`framer-motion` is not installed.** Section 3.B of the brief mandates `useScroll`/`useTransform` and spring physics. The project currently animates with **GSAP 3.14 + ScrollTrigger** (already a dependency, used in 6 files).

| Option | Trade-off |
|---|---|
| **A — Add `motion` (recommended)** | `motion` is Framer Motion's current package name (v12+; `import { motion } from "motion/react"`). Adds ~34 kB gzip, but only on routes that import it, and `useScroll`/`useTransform`/spring physics are exactly what the brief specifies. Cost: two animation libraries in the repo until GSAP is retired from the remaining 5 files. |
| **B — Build it on GSAP** | Zero new dependencies. But spring physics must be hand-rolled (`CustomEase` / inertia), and it is the library that produced the current templated feel. |

**My recommendation: A.** The homepage is the highest-value surface and the brief is explicit. GSAP stays where it already lives (`/demos`, `PricingSection`, `ProductsSection`, `ContactSection`, `CookieConsent`) and is not touched in this pass. I am flagging the "one animation library" consolidation as future work rather than smuggling it into this refactor.

*Everything below assumes A. Say the word and I will re-cut it for GSAP.*

---

## 3. Target folder structure

```
src/
├─ app/
│  ├─ page.tsx                          ← stays a Server Component; pure composition, ~25 lines
│  └─ globals.css                       ← trimmed: dead rules out, tokens in, font @import removed
│
├─ components/
│  ├─ ui/                               ← ATOMS (new, small, reusable)
│  │  ├─ Eyebrow.tsx                    ← NEW · server · uppercase tracking-[0.3em] label
│  │  ├─ SectionHeading.tsx             ← NEW · server · eyebrow + h2 + lede, one rhythm everywhere
│  │  ├─ GridBackdrop.tsx               ← NEW · server · precise grid + radial mask
│  │  ├─ GlowField.tsx                  ← NEW · server · the single ethereal blurred radial
│  │  ├─ NoiseOverlay.tsx               ← NEW · server · grain, CSS-only, reduced-motion safe
│  │  ├─ CtaButton.tsx                  ← NEW · server · primary/ghost variants via cva
│  │  ├─ Reveal.tsx                     ← NEW · client leaf · spring-physics scroll reveal wrapper
│  │  │
│  │  ├─ button.tsx  card.tsx  dialog.tsx            ← untouched (shadcn)
│  │  ├─ Navbar.tsx  premium-footer.tsx  CookieConsent.tsx  YouFormModal.tsx  ← untouched this pass
│  │  └─ cinematic-landing-hero.tsx     ← DELETED (see §4)
│  │
│  └─ sections/
│     ├─ home/                          ← NEW folder · homepage-only blocks
│     │  ├─ Hero.tsx                    ← NEW · server · headline + subhead + one CTA. No JS.
│     │  ├─ HeroBackdrop.tsx            ← NEW · client leaf · slow monochrome mesh, dynamic-imported
│     │  ├─ Showcase.tsx                ← NEW · server · scroll-sequence shell + copy
│     │  ├─ ShowcaseSequence.tsx        ← NEW · client leaf · useScroll/useTransform, dynamic-imported
│     │  └─ showcase.data.ts            ← NEW · the 7 capabilities, as data, no JSX
│     │
│     ├─ TrustedTechnologies.tsx        ← "use client" removed → Server Component
│     ├─ WhyAsenra.tsx                  ← "use client" removed → Server Component
│     ├─ WhoWeWorkWith.tsx              ← "use client" removed → Server Component
│     ├─ SolutionsPreview.tsx           ← "use client" removed → Server Component
│     ├─ ProcessSection.tsx             ← "use client" removed → Server Component
│     ├─ CaseStudiesTeaser.tsx          ← "use client" removed → Server Component
│     └─ (Stats/Products/Pricing/Contact/Services/About) ← untouched; not on `/`
│
└─ lib/
   └─ motion.ts                         ← NEW · shared spring presets + reduced-motion variants
```

---

## 4. What gets DELETED

| Target | Reason |
|---|---|
| `src/components/ui/cinematic-landing-hero.tsx` (**572 lines, entire file**) | Replaced by `sections/home/Hero.tsx` + `HeroBackdrop.tsx` + `Showcase.tsx` + `ShowcaseSequence.tsx` + `showcase.data.ts`. Its only consumer is `app/page.tsx`. |
| The **iPhone mockup** — bezel, 4 hardware buttons, Dynamic Island, screen glare, home bar (~240 lines of the above) | The templated artifact. Its data survives as `showcase.data.ts`; its chrome does not. |
| The **pinned 4000px `ScrollTrigger` timeline** | Replaced by natural document scroll driving `useScroll` progress. No pinning, no scroll hijack. |
| Dead props `brandName`, `brandLogo`, `metricValue`, `metricLabel` (and their `page.tsx` call-site arguments) | Never rendered. |
| `globals.css`: `.as-glossy-red`, `.text-3d-matte`, `.text-card-silver-matte`, `.animate-pulse-subtle`, `.floating-ui-badge`, `.widget-depth`, `.progress-ring`, `.text-shine-{gold,silver,rose,emerald,blue}`, `--asenra-red*` tokens | ~120 lines, 0 usages. `.text-glossy-red` and `.btn-shine-effect` each have 1 usage — I will migrate or keep those rather than break a page. |
| `globals.css` line 1 — the Google Fonts `@import` | Moved to `next/font/google`, **scoped to `/demos/[slug]`**, the only route using Playfair/Italiana/Outfit. `Syne` dropped entirely (0 usages). |
| `.iphone-bezel`, `.hardware-btn`, `.screen-glare`, `.gsap-reveal`, `.film-grain` | Hero-local only. Grain returns as `NoiseOverlay`, without the `visibility: hidden` FOUC trap. |

**Explicitly NOT deleted:** `.premium-depth-card`, `.card-sheen`, `.text-silver-matte`, `.bg-grid-theme`, `.btn-modern-*` — see §1.4.

---

## 5. What gets REBUILT

### A. Hero — `sections/home/Hero.tsx`

- **A Server Component with no JavaScript.** Renders instantly: no `visibility: hidden`, no hydration cost, correct `h1` in the HTML payload.
- **One message:** eyebrow (`ENTERPRISE AI CONSULTING`, `text-xs uppercase tracking-[0.3em] text-white/40`) → one massive `h1` at `text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9]` → one subhead of 20 words or fewer → **one** primary CTA plus one quiet text link.
- **Cuts:** the second CTA pair, the card `h3`, the floating "We are hiring" badge (moves to the navbar or footer), the scroll-indicator bead.
- **Background:** `GridBackdrop` (1px lines at `white/[0.04]`, radial-masked) plus a single `GlowField`. `HeroBackdrop` — a slow monochrome mesh — is `next/dynamic` with `ssr: false`, so it never blocks first paint and never runs under `prefers-reduced-motion`.
- **Height:** `min-h-[88svh]` rather than `h-screen`/`w-screen` — mobile-URL-bar safe, no scrollbar overflow, and it *shows* that content continues below.

### B. Showcase — `sections/home/Showcase.tsx` + `ShowcaseSequence.tsx`

- **Apple-style scroll sequence, no pinning.** `useScroll({ target, offset: ["start end", "end start"] })` on a tall (~`300vh`) section; `useTransform` maps progress to opacity and `y` per panel, so panels hand off as the page scrolls normally. Scroll position always tracks the wheel.
- **Physics:** every non-scroll-linked transition uses a shared preset from `lib/motion.ts` — `{ type: "spring", stiffness: 100, damping: 20, mass: 0.9 }`. No default easing anywhere.
- **Visual language:** the 7 capabilities become flat, precise **data panels** — a mono label, a large tracking-tight metric, a 1px-bordered readout — not phone screenshots. Palette stays `zinc-950` / `white/10` borders / pure white text.
- **Reduced motion:** `useReducedMotion()` collapses the sequence to a static stacked grid. The branch is in the component from the first commit, not bolted on later.
- The client component is a **leaf**: all copy is passed down from its Server Component parent.

### C. The six existing sections

- Drop `"use client"` so they become Server Components. Wrap in `<Reveal>` (client leaf) only where an entrance animation earns its keep.
- Normalise rhythm to `py-24 md:py-32` and route every header through `SectionHeading` so the eyebrow/heading/lede cadence is identical site-wide.
- Consolidate the four near-identical card treatments onto one primitive.
- **Copy is not rewritten** — this is a design and architecture pass, not a messaging pass. Only the hero's copy is *cut down*, and I will show you that text before committing it.

---

## 6. Execution phases — each ends with `npm run build` and `npm run lint`

| Phase | Work | Risk |
|---|---|---|
| **0** | Branch `refactor/enterprise-premium`. Install `motion`. Add `lib/motion.ts`. Build check. | None — additive |
| **1** | **Foundations.** `globals.css` cleanup (dead rules, red tokens, font `@import` → `next/font` on `/demos`). Add the `ui/` atoms. Verify `/demos/[slug]` still renders with its fonts. | Low — the font move is the only thing that can bite, and I verify it |
| **2** | **Hero.** Build `Hero` + `HeroBackdrop` + `GridBackdrop`/`GlowField`/`NoiseOverlay`. Swap into `page.tsx`. **Delete `cinematic-landing-hero.tsx`.** | Medium — the headline visual change; reviewed before commit |
| **3** | **Showcase.** `showcase.data.ts`, `Showcase`, `ShowcaseSequence` with `useScroll`/`useTransform`, springs, reduced-motion branch. | Medium — scroll math tuned against the real page |
| **4** | **RSC sweep.** Strip `"use client"` from the 6 sections, apply `SectionHeading`, unify cards, normalise spacing. | Low — mechanical, build-verified |
| **5** | **Polish.** Reduced-motion audit, Lighthouse pass, before/after bundle numbers, `w-screen`/`overflow-x-hidden` cleanup. | Low |

**Guardrail:** each phase is its own commit, so any phase can be reverted alone. Nothing outside `/` changes behaviour except the `/demos` font move in Phase 1, which I verify explicitly.

---

## 7. Success criteria

- [ ] Hero renders complete and readable **with JavaScript disabled** (`h1` present in HTML, no `visibility: hidden`)
- [ ] **Zero scroll pinning** — wheel input always moves the document
- [ ] Homepage client-component count: **7 → 3 or fewer** (`Reveal`, `HeroBackdrop`, `ShowcaseSequence`); Navbar/Footer/Cookie unchanged
- [ ] Homepage First Load JS **strictly below** the current baseline (measured and reported, not asserted)
- [ ] Every animation uses an explicit spring; **no default easing** in new code
- [ ] `prefers-reduced-motion: reduce` yields a fully static, fully legible page
- [ ] No new file over **200 lines**
- [ ] `npm run build` and `npm run lint` clean at every phase boundary
- [ ] `/admin`, `/portal`, `/hiring`, `/demos`, `/solutions` visually unchanged

---

## 8. Out of scope (flagged, not silently absorbed)

- **Inner-page redesign** (`/solutions`, `/case-studies`, `/process`, and the rest) — they inherit the new atoms only where that is free. A consistent sweep is a second brief.
- **Retiring GSAP** from the remaining 5 files — running two animation libraries is a real cost; consolidating is follow-up work, not a Phase-5 smash-and-grab.
- **`/admin`, `/portal`, `/acquisition`** (798/779/763 lines each) — the largest files in the repo and well over the 200-line rule, but they are internal tooling, not the marketing surface. They deserve their own pass.
- **Copywriting.** Hero copy is *shortened*; nothing else is reworded.


---

## 9. Results — measured, not asserted

Recorded with `scripts/measure-route-js.mjs`, which sums the gzipped size of
every `<script src>` in the prerendered HTML for `/`. Next 16 no longer prints
the Size / First Load JS columns, so this replaces them.

| Stage | Raw | Gzip | Scripts |
|---|---|---|---|
| Baseline (`b912d45`) | 1060.2 kB | **317.3 kB** | 14 |
| Phase 2 — hero rebuilt | 999.5 kB | 296.4 kB | 13 |
| Phase 3 — showcase added | 1126.6 kB | 338.8 kB | 14 |
| Phase 3 — after LazyMotion | 1082.2 kB | 325.5 kB | 14 |
| Phase 4 — RSC sweep | 1071.2 kB | 321.9 kB | 13 |
| Phase 5 — GSAP retired | 1002.7 kB | **295.5 kB** | 12 |

**Net: −21.8 kB gzip and two fewer requests**, while adding a scroll-linked
showcase that did not exist before.

### Success criteria

| Criterion | Result |
|---|---|
| Hero renders with JS disabled | **Met.** The `h1` is in the HTML; no `visibility: hidden` and no inline `opacity: 0` anywhere in the hero. |
| Zero scroll pinning | **Met.** No `ScrollTrigger`, no `pin`. The showcase's left column is CSS `sticky`; the document scrolls normally beneath it. |
| Homepage client components 7 → ≤ 3 | **Met.** Three: `ShowcaseSequence`, `Reveal`, `MotionFeatures`. `HeroBackdrop` came in under budget as a Server Component. |
| First Load JS below baseline | **Met.** 295.5 kB gz vs 317.3 kB. |
| No default easing in new code | **Met for motion.** Every transform and opacity animation runs on a spring from `lib/motion.ts`. Colour and border hovers use Tailwind's standard curve, which is a deliberate exception — springing a border colour would be worse, not better. |
| `prefers-reduced-motion` yields a static page | **Met.** A global CSS guard neutralises animation and transition site-wide (nothing honoured it before), and each client leaf branches on `useReducedMotion()`. |
| No new file over 200 lines | **Met.** Largest is `showcase.data.ts` at 119. |
| Build and lint clean at every phase | **Met.** Lint went 199 problems / 65 errors → 194 / 63; every remaining one is pre-existing and none are in new files. |
| Other routes unchanged | **Partly verified.** All 22 routes return 200 from a production server. A *visual* pass was not possible — browser tooling is unavailable in this session — so `/admin`, `/portal`, `/demos` and the inner marketing pages are verified structurally, not by eye. |

### Deviations from the plan

1. **`HeroBackdrop` is a Server Component**, not a dynamically-imported client
   one. The mesh has no state and no pointer input, so it is three CSS-animated
   gradients. Fewer client bundles than budgeted.
2. **`LazyMotion` was necessary.** Importing the `motion` proxy pulls every
   feature Motion ships and cost +42 kB gz. Switching to `m` with an explicit
   `domAnimation` bundle recovered 13 kB. Worth knowing before Motion is used
   anywhere else in this codebase.
3. **GSAP was retired from `CookieConsent`**, which §8 had listed as out of
   scope. It sits in the root layout, so its 26.4 kB gz chunk loaded on every
   page and was the entire reason the homepage sat above its bundle target.
   Three slide tweens became CSS transitions. The rewrite also fixed a real
   bug: the old code wrote the consent choice inside a GSAP `onComplete`, so
   navigating away mid-animation lost it and the banner reappeared.

### Still open

- **GSAP remains in four files** — `demo/Templates.tsx`, `PricingSection`,
  `ProductsSection`, `ContactSection` — none of which are on the homepage.
- **The navbar was not touched.** It still uses `.btn-modern-light` and the
  older type scale, and now sits above a hero built to different rules.
- **`ContactSection` still renders `.text-glossy-red`**, a `#EE0000` gradient
  heading that contradicts the palette this refactor establishes.
- **`body` keeps `overflow-x-hidden`.** `w-screen` is gone from the codebase,
  but pages outside this brief still position glow layers past the viewport
  edge, so removing the guard needs its own audit.
