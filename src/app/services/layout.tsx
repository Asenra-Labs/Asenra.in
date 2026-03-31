import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Asenra",
  description: "Explore our specialized services including high-performance websites, AI-driven automations, and custom software for local businesses.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
