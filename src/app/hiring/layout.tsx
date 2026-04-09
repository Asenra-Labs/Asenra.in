import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Asenra Forge | Elite Engineering Recruitment Protocol",
  description: "Join the elite cohort at Asenra. We are recruiting high-agency engineers to architect and ship proprietary high-impact products.",
  openGraph: {
    title: "The Asenra Forge | Recruitment Protocol",
    description: "Architect systems for scale. Ship production-grade solutions.",
    images: ["/logo.png"],
  },
};

export default function HiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
