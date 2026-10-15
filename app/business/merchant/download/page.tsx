import type { Metadata } from "next";
import { MerchantAppDownloadPage } from "@/components/merchant/merchant-application-pages";

export const metadata: Metadata = {
  title: "Download the Syka Merchant app",
  description: "Download the Syka Merchant app for your computer and complete onboarding.",
  robots: {
    index: false,
    follow: false,
  },
  // Application links carry a private token; never pass it on to other sites.
  referrer: "no-referrer",
};

export default function MerchantDownloadPage() {
  return <MerchantAppDownloadPage />;
}
