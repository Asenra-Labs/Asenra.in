import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asenra Vision | Engineering the Future of Digital India",
  description: "Our 10-year mission to provide the digital infrastructure for Indian small businesses. Aesthetic excellence, autonomous systems, and digital sovereignty.",
  openGraph: {
    title: "Asenra Vision | The 10-Year View",
    description: "Architecting the operating systems for the next generation of India's economy.",
    images: ["/logo.png"],
  },
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
