import type { Metadata } from "next";
import MerchantFlow from "@/components/merchant/merchant-flow";

export const metadata: Metadata = {
  title: "Merchant registration",
  description: "Register your business with Syka and submit the information required for approval.",
  robots: {
    index: false,
    follow: false,
  },
  // Application links carry a private token; never pass it on to other sites.
  referrer: "no-referrer",
};

export default function MerchantRegistrationPage() {
  return <MerchantFlow />;
}
