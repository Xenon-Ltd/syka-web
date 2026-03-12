"use client";

import PaymentsAnimation from "@/assets/lottie-files/Send.json";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";

export default function PaymentsPage() {
  return (
    <ProductHeroShell
      eyebrow="PAYMENTS"
      title="Move Money Without Borders"
      description="Pay suppliers, contractors, and partners anywhere in the world, instantly, securely, and at competitive rates."
      ctaLabel="Get started with SYKA"
    >
      <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px]">
        <Lottie
          animationData={PaymentsAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
