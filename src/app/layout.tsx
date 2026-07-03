import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PremiumFooter from "@/components/ui/premium-footer";
import CookieConsent from "@/components/ui/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://asenra.in"),
  title: "Asenra | Web Development & AI Agents Agency India",
  description: "Bespoke websites, autonomous AI agents, and custom software engineered for high-growth Indian businesses. Engineering excellence for the global market.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Asenra Team" }],
  openGraph: {
    title: "Asenra | Web Development & AI Agents for Indian Businesses",
    description: "Cinematic websites, autonomous AI agents & custom software — engineered for high-growth Indian businesses.",
    url: "https://asenra.in",
    siteName: "Asenra",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asenra | Web Development & AI Agents Agency India",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asenra | Web Development & AI Agents Agency India",
    description: "Bespoke websites, autonomous AI agents, and custom software engineered for high-growth Indian businesses.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://asenra.in",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-black font-sans antialiased text-zinc-50 overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://asenra.in/#organization",
                  "name": "Asenra",
                  "url": "https://asenra.in",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://asenra.in/logo.png"
                  },
                  "description": "High-performance digital architecture and autonomous AI agents for high-growth Indian businesses.",
                  "foundingDate": "2024",
                  "areaServed": "India",
                  "sameAs": [
                    "https://www.linkedin.com/company/asenra/",
                    "https://www.instagram.com/asenra.in/"
                  ]
                },
                {
                  "@type": "ProfessionalService",
                  "name": "Asenra",
                  "image": "https://asenra.in/og-image.png",
                  "@id": "https://asenra.in/#service",
                  "url": "https://asenra.in",
                  "priceRange": "₹₹₹",
                  "telephone": "+91-8956634577",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN",
                    "addressRegion": "Maharashtra"
                  },
                  "areaServed": [
                    { "@type": "Country", "name": "India" }
                  ],
                  "serviceType": [
                    "Web Development",
                    "AI Agent Development",
                    "Custom Software"
                  ],
                  "description": "Bespoke websites, autonomous AI agents, and custom software engineered for high-growth Indian businesses.",
                  "sameAs": [
                    "https://www.linkedin.com/company/asenra/",
                    "https://www.instagram.com/asenra.in/"
                  ]
                }
              ]
            })
          }}
        />
        {children}
        <PremiumFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
