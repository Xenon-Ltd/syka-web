"use client";

import VirtualAccountsAnimation from "@/assets/lottie-files/Virtual-accounts.json";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";

export default function VirtualAccountPage() {
  return (
    <ProductHeroShell
      eyebrow="VIRTUAL ACCOUNT"
      title="Get Paid Globally"
      description="Create dedicated virtual accounts to receive, hold, and manage funds across borders."
      ctaLabel="Create a Virtual Account"
    >
      <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px]">
        <Lottie
          animationData={VirtualAccountsAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
