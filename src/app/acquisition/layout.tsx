import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness & Website Growth Audit | Asenra",
  description:
    "Evaluate your digital infrastructure and generate an instant website growth assessment tailored for ambitious businesses. Powered by Asenra Intelligence.",
  keywords: [
    "AI readiness assessment",
    "website growth audit",
    "digital infrastructure audit",
    "business website assessment",
    "AI implementation roadmap",
    "Asenra audit tool",
  ],
  openGraph: {
    title: "AI Readiness & Website Growth Audit | Asenra",
    description:
      "Run a live technical audit on your current digital presence and receive an actionable growth assessment.",
    url: "https://asenra.in/acquisition",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asenra AI Readiness Assessment",
      },
    ],
  },
};

export default function AcquisitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
