"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { CATEGORIES } from "./pricing.data";
import { Panel, PanelIcon, PanelLabel } from "@/components/ui/Panel";
import { ctaVariants } from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

/**
 * Package tabs and the card grid beneath them.
 *
 * The only interactive part of the pricing section, so it is the only part
 * that ships as a Client Component. Its predecessor drove entrance animations
 * with four GSAP timelines plus a mouse-tracking sheen that wrote --mouse-x
 * on every pointer move; all of it is gone, and the section no longer pulls
 * GSAP onto /packages.
 */
export function PricingTabs() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((category) => category.id === activeTab);

  return (
    <>
      <div
        role="tablist"
        aria-label="Package categories"
        className="flex w-fit flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      >
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const selected = category.id === activeTab;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] tracking-tight transition-colors",
                selected
                  ? "bg-white text-black"
                  : "text-white/45 hover:text-white"
              )}
            >
              <Icon className="size-3.5" />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {active?.packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <Panel
              key={pkg.id}
              className={cn(
                "justify-between",
                pkg.popular && "border-white/25 bg-white/[0.04]"
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <PanelIcon icon={Icon} />
                  {pkg.popular ? (
                    <span className="rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-black">
                      Most active
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-8 text-xl font-medium tracking-tight text-white">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/40 text-pretty">
                  {pkg.description}
                </p>

                <p className="mt-7 flex items-baseline gap-1.5">
                  <span className="text-lg text-white/40">₹</span>
                  <span className="text-4xl font-medium tracking-tighter text-white">
                    {pkg.price}
                  </span>
                </p>
                <PanelLabel className="mt-3 block">
                  AMC ₹{pkg.amc}/year · 50% advance, 50% on delivery
                </PanelLabel>

                <ul className="mt-7 space-y-3 border-t border-white/[0.07] pt-7">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-white/70" />
                      <span className="text-xs leading-relaxed text-white/50 text-pretty">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/918956634577?text=${encodeURIComponent(
                  `I am interested in the ${pkg.name} ${active.name} package.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(ctaVariants({ variant: "primary", size: "md" }), "mt-8 w-full")}
              >
                <span>Enquire on WhatsApp</span>
                <ArrowRight className="size-4" />
              </a>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
