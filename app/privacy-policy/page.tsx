import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import { privacySections } from "@/components/legal/legal-content";

export const metadata: Metadata = { title: "Privacy Policy", description: "Learn how Syka collects, uses, and protects personal information." };

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" updated="EFFECTIVE DATE: JULY 27, 2026 · VERSION 1.0" intro="This Privacy Policy explains how Xenon Technologies Inc. (Delaware, USA), Xenon Technology Solutions (Canada) Inc., and Xenon Ltd. (Ghana), together operating as Syka, collect, use, store, share, and protect your personal information when you use our website, mobile applications, web applications, and payment processing services (collectively, the Services). Please read this Privacy Policy carefully. By accessing or using the Services, you acknowledge that you have read and agree to be bound by this Privacy Policy." sections={privacySections} />;
}
