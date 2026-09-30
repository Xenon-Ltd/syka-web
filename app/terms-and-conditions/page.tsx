import type { Metadata } from "next";
import LegalPage from "@/components/legal/legal-page";
import { termsSections } from "@/components/legal/legal-content";

export const metadata: Metadata = { title: "Terms and Conditions", description: "Read the terms that apply to Syka services." };

export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" intro={'These Terms and Conditions ("Terms") govern your access to and use of the Syka platform, including our website at sykabank.com, mobile applications, web applications, merchant platform, and all related payment processing services (collectively, the "Services"), operated by Xenon Technologies Inc. (Delaware, USA), Xenon Technology Solutions (Canada) Inc., and Xenon Ltd. (Ghana) (together "Syka", "we", "us", or "our").'} notice={'PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE SERVICES. BY CREATING AN ACCOUNT, ACCESSING THE SERVICES, OR CLICKING “I AGREE”, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL POLICIES INCORPORATED HEREIN BY REFERENCE, INCLUDING OUR PRIVACY POLICY AT sykabank.com/privacy. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE SERVICES.'} closing={'These Terms constitute a legally binding agreement between you and Syka. If you use the Services for a business or other legal entity, you represent that you have authority to bind that entity.'} sections={termsSections} />;
}
