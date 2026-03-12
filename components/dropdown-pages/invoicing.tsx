"use client";

import InvoicingAnimation from "@/assets/lottie-files/Invoicing.json";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";

export default function InvoicingPage() {
  return (
    <ProductHeroShell
      eyebrow="INVOICING"
      title="Get Paid Faster. Globally"
      description="Create professional invoices, track payments in real time, and accept global payments without friction."
      ctaLabel="Create Invoice"
    >
      <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px]">
        <Lottie
          animationData={InvoicingAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
