"use client";

import VirtualCardsAnimation from "@/assets/lottie-files/Virtual-cards.json";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";

export default function VirtualCardPage() {
  return (
    <ProductHeroShell
      eyebrow="VIRTUAL CARDS"
      title="Issue Cards. Control Every Spend."
      description="Generate secure virtual cards for teams, subscriptions, and vendors, with real-time tracking and built-in spending limits."
      ctaLabel="Create a Card"
    >
      <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px]">
        <Lottie
          animationData={VirtualCardsAnimation}
          loop
          className="h-full w-full"
        />
      </div>
    </ProductHeroShell>
  );
}
