import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asenra | Digital Architecture for Small Businesses",
  description: "Bespoke websites, autonomous AI agents, and custom software engineered for Indian businesses. Based in Kolhapur, serving the world.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      </body>
    </html>
  );
}
