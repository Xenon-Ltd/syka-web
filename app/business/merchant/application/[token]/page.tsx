import type { Metadata } from "next";
import { ApplicationStatusPage } from "@/components/merchant/merchant-application-pages";

export const metadata: Metadata = {
  title: "Merchant application status",
  description: "Track the status of your Syka merchant application.",
  robots: {
    index: false,
    follow: false,
  },
  // Application links carry a private token; never pass it on to other sites.
  referrer: "no-referrer",
};

export default async function MerchantApplicationStatusPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  // Keyed by token so one application's details never show while another loads.
  return <ApplicationStatusPage key={token} token={token} />;
}
