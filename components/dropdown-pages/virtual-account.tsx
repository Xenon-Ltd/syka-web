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
      frameClassName="bg-[#272165]"
    >
      <div className="mx-auto h-[380px] w-full max-w-[600px] sm:h-[420px] sm:p-4">
        <Lottie
          animationData={VirtualAccountsAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
