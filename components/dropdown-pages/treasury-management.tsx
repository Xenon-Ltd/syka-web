"use client";

import TreasuryAnimation from "@/assets/lottie-files/Treasury.json";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";

export default function TreasuryManagementPage() {
  return (
    <ProductHeroShell
      eyebrow="TREASURY MANAGEMENT"
      title="Manage Your Fund Like a CFO"
      description="Monitor balances, optimize liquidity, and protect your funds with powerful treasury tools built for modern businesses."
      ctaLabel="Get started with SYKA"
      frameClassName="bg-[#82B7CE]"
    >
      <div className="mx-auto h-[380px] w-full max-w-[600px] sm:h-[420px] sm:p-4">
        <Lottie
          animationData={TreasuryAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
