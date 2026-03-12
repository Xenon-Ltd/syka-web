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
    >
      <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px]">
        <Lottie
          animationData={TreasuryAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
