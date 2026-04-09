import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asenra Services | Bespoke Digital Architecture & AI Agents",
  description: "From cinematic web experiences to autonomous AI agents and custom enterprise software. We build the technical engines that double your business revenue.",
  openGraph: {
    title: "Asenra | Digital Services & AI Engineering",
    description: "High-performance systems for elite businesses. Explore our architecture focus.",
    images: ["/logo.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
