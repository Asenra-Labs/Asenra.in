import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PremiumFooter from "@/components/ui/premium-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asenra | High-Performance Digital Architecture & AI Agents",
  description: "Bespoke websites, autonomous AI agents, and custom software engineered for high-growth Indian businesses. Engineering excellence for the global market.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: ["AI Agents", "React.js Development", "Web Design India", "Autonomous Bots", "Custom Software", "Asenra"],
  authors: [{ name: "Asenra Team" }],
  openGraph: {
    title: "Asenra | Digital Engineering for Small Businesses",
    description: "Cinematic digital real estate and autonomous AI employees. Engineered for performance.",
    images: ["/logo.png"],
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-black font-sans antialiased text-zinc-50 overflow-x-hidden`}>
        {children}
        <PremiumFooter />
      </body>
    </html>
  );
}
