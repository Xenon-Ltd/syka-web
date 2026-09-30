import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import { securitySections } from "@/components/legal/legal-content";

export const metadata: Metadata = { title: "Data Security", description: "How Syka protects personal information and responds to security incidents." };

export default function DataSecurityPage() {
  return <LegalPage title="Data Security" updated="EFFECTIVE DATE: JULY 27, 2026 · VERSION 1.0" intro="We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, loss, and destruction." sections={securitySections} />;
}
