import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Link-shaped call to action.
 *
 * A Server Component on purpose: the site's CTAs are navigation, and
 * navigation should not require hydration. The shadcn `Button` stays for
 * genuinely interactive controls (it is a Base UI client component).
 */
const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-[background-color,border-color,color,opacity] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  {
    variants: {
      variant: {
        /** The one loud element on a section. Use at most once. */
        primary: "bg-white text-black hover:bg-white/90",
        /** Glass. Sits beside a primary without competing with it. */
        secondary:
          "border border-white/10 bg-white/[0.03] text-white backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.07]",
        /** Barely a button. For tertiary "read more" affordances. */
        quiet:
          "px-0 text-white/50 hover:text-white [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface CtaButtonProps
  extends VariantProps<typeof ctaVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function CtaButton({
  href,
  children,
  className,
  variant,
  size,
  ...props
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(ctaVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export { ctaVariants };
