import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import { cookieSections } from "@/components/legal/legal-content";

export const metadata: Metadata = { title: "Cookies and Tracking Technologies", description: "Learn how Syka uses cookies and manage your cookie preferences." };

export default function CookiesPage() {
  return <LegalPage title="Cookies and Tracking Technologies" updated="EFFECTIVE DATE: JULY 27, 2026 · VERSION 1.0" intro="We use cookies and similar tracking technologies on our website and applications. Cookies help us keep the platform secure, remember your preferences, and understand how our services are used." sections={cookieSections} flat />;
}
