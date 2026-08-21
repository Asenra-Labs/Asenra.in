import { LegalPage, type LegalSection } from "@/components/ui/LegalPage";

const sections: LegalSection[] = [
  {
    title: "Agreement to Terms",
    content: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you') and Asenra Labs Inc. ('we', 'us', or 'our'), concerning your access to and use of the asenra.in website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto."
  },
  {
    title: "Intellectual Property Rights",
    content: "Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us."
  },
  {
    title: "User Representations",
    content: "By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise."
  },
  {
    title: "Prohibited Activities",
    content: "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us."
  },
  {
    title: "Limitation of Liability",
    content: "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE."
  }
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service."
      updated="April 2026"
      sections={sections}
    />
  );
}
