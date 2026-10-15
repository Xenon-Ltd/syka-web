import type { Metadata } from "next";
import ContactSupport from "@/components/support/contact-support";
import QuickAnswers from "@/components/support/quick-answers";
import SupportHero from "@/components/support/support-hero";

export const metadata: Metadata = {
  title: "Support",
  description: "Clear answers about sending money with Syka, how verification works, and what to do if something goes wrong.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <main>
      <SupportHero />
      <ContactSupport />
      <QuickAnswers />
    </main>
  );
}
