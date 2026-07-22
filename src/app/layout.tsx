import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import PremiumFooter from "@/components/ui/premium-footer";
import CookieConsent from "@/components/ui/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://asenra.in"),
  title: "Asenra | Enterprise AI Consulting & Intelligent Business Systems",
  description: "We help ambitious businesses transform operations through enterprise AI, intelligent automation, and modern digital infrastructure.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Asenra Enterprise AI Team" }],
  openGraph: {
    title: "Asenra | Enterprise AI Consulting & Intelligent Systems",
    description: "We help ambitious businesses transform operations through enterprise AI, intelligent automation, and modern digital infrastructure.",
    url: "https://asenra.in",
    siteName: "Asenra",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asenra | Enterprise AI Consulting & Intelligent Business Systems",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asenra | Enterprise AI Consulting & Intelligent Business Systems",
    description: "We help ambitious businesses transform operations through enterprise AI, intelligent automation, and modern digital infrastructure.",
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
                  "description": "Enterprise AI Consulting, Intelligent Business Automation, and Modern Digital Infrastructure.",
                  "foundingDate": "2024",
                  "areaServed": "Global",
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
                    { "@type": "Country", "name": "Global" }
                  ],
                  "serviceType": [
                    "Enterprise AI Consulting",
                    "Enterprise AI Implementation",
                    "Business Process Automation",
                    "Intelligent Software",
                    "Premium Digital Experiences"
                  ],
                  "description": "We help ambitious businesses transform operations through enterprise AI, intelligent automation, and modern digital infrastructure.",
                  "sameAs": [
                    "https://www.linkedin.com/company/asenra/",
                    "https://www.instagram.com/asenra.in/"
                  ]
                }
              ]
            })
          }}
        />
        <Navbar />
        {children}
        <PremiumFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
