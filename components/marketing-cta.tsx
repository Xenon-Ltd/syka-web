import Image from "next/image";
import type { ReactNode } from "react";
import { WavyBackgroundDesign } from "@/assets/images";
import StoreBadges from "./business/store-badges";

type MarketingCTAProps = {
  variant?: "personal" | "business";
  heading?: ReactNode;
  description?: string;
};

export default function MarketingCTA({ variant = "personal", heading, description }: MarketingCTAProps) {
  const isBusiness = variant === "business";
  const headingId = `${variant}-cta-heading`;
  return (
    <section id="get-started" aria-labelledby={headingId} className="mx-auto max-w-[1268px] scroll-mt-8 px-5 sm:px-6">
      <div className="marketing-cta-panel relative isolate overflow-hidden rounded-2xl bg-xenon-primary text-center text-white">
        <Image src={WavyBackgroundDesign} alt="" aria-hidden fill sizes="(max-width: 1232px) 100vw, 1184px" className="pointer-events-none -z-10 object-cover" />
        <h2 id={headingId} className={`marketing-cta-title mx-auto ${heading ? "max-w-[870px]" : isBusiness ? "max-w-[1055px]" : "max-w-[461px]"}`}>
          {heading ?? (isBusiness ? "Ready To Bring World-Class Payment Infrastructure To Your Institution?" : <>Stop Paying The<br />Geography Tax.</>)}
        </h2>
        <p className={"marketing-cta-description mx-auto"}>
          {description ?? "Join thousands of African entrepreneurs competing globally with Syka."}
        </p>
        <StoreBadges  />
      </div>
    </section>
  );
}
