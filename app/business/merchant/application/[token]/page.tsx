import type { Metadata } from "next";
import { ApplicationStatusPage } from "@/components/merchant/merchant-application-pages";

export const metadata: Metadata = {
  title: "Merchant application status",
  description: "Track the status of your Syka merchant application.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MerchantApplicationStatusPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ApplicationStatusPage token={token} />;
}
