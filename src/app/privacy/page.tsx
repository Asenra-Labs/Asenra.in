import { LegalPage, type LegalSection } from "@/components/ui/LegalPage";

const sections: LegalSection[] = [
  {
    title: "Introduction",
    content: "Asenra respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
  },
  {
    title: "The Data We Collect",
    content: "Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data including Identity Data (name, username), Contact Data (email, telephone), and Technical Data (IP address, browser type, usage patterns)."
  },
  {
    title: "How We Use Your Data",
    content: "We will only use your personal data when the law allows us to. Most commonly, we will use your data to perform the contract we are about to enter into or have entered into with you, where it is necessary for our legitimate interests, or where we need to comply with a legal obligation."
  },
  {
    title: "Data Security",
    content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this privacy policy or our privacy practices, please contact us at care@asenra.in."
  }
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy."
      updated="April 2026"
      sections={sections}
    />
  );
}
