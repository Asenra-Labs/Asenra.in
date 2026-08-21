import { Playfair_Display, Italiana, Outfit } from "next/font/google";

/**
 * The demo templates are the only surface that uses these display faces.
 * They used to arrive via a render-blocking Google Fonts `@import` at the top
 * of globals.css, which charged every route on the site for fonts only this
 * one renders. `next/font` self-hosts them and scopes them here.
 */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default function DemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${playfair.variable} ${italiana.variable} ${outfit.variable}`}>
      {children}
    </div>
  );
}
