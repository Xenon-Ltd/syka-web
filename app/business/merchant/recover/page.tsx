import type { Metadata } from "next";
import { RecoverApplicationPage } from "@/components/merchant/merchant-application-pages";

export const metadata: Metadata = {
  title: "Recover merchant application",
  description: "Get back to your Syka merchant application with a code sent to your email.",
  robots: {
    index: false,
    follow: false,
  },
  // Application links carry a private token; never pass it on to other sites.
  referrer: "no-referrer",
};

export default function MerchantRecoverPage() {
  return <RecoverApplicationPage />;
}
