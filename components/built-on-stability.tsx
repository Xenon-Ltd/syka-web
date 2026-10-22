"use client";

import { StabilitySecurity, StabilityStablecoin, StabilityWallet } from "@/assets/images";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/animation";

const features: { title: string; body: string; image: StaticImageData; alt: string }[] = [
  {
    title: "Stable-Coin Powered",
    body: "We use fully-backed, regulated stablecoins for predictable value.",
    image: StabilityStablecoin,
    alt: "Gold coins held in an open hand beside a steady balance chart",
  },
  {
    title: "Bank-Grade Security",
    body: "SOC 2 compliant, encryption, and multi-sig custody protocols, operating within global compliance frameworks.",
    image: StabilitySecurity,
    alt: "A hand on a laptop beside a shield and bank lock illustration",
  },
  {
    title: "Transparent Wallet",
    body: "You control your funds, with clear balances, real-time visibility, and no hidden restrictions.",
    image: StabilityWallet,
    alt: "A smiling woman beside a card showing money in and money out",
  },
];

export default function BuiltOnStability() {
  return (
    <section aria-labelledby="stability-heading" className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] px-5 sm:px-6")}>
      <h2 id="stability-heading" className={cn(businessStyles.sectionHeading, "mb-10 max-w-[457px] text-xenon-gray lg:mb-[100px]")}>
        Built on <span className="text-xenon-brand">Stability,</span><br />
        Guarded by <span className="text-xenon-brand">Security</span>
      </h2>
      <div className="space-y-12 lg:space-y-[100px]">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className={cn("stability-row", index % 2 === 1 && "stability-row-reverse")}
          >
            <div className={cn("relative aspect-[608/515] overflow-hidden rounded-2xl md:max-lg:aspect-[16/9]", index % 2 === 1 && "lg:order-2")}>
              <Image src={feature.image} alt={feature.alt} fill placeholder="blur" sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 52vw, 608px" className="object-cover" />
            </div>
            <div className={cn("py-2 md:py-6", index % 2 === 1 && "lg:order-1")}>
              <h3 className="product-feature-title">{feature.title}</h3>
              <p className={cn("mt-6 text-xl leading-[26px] text-[#8893A4] xl:text-[24px]", index % 2 === 1 && "xl:max-w-[358px]", index === 2 && "xl:max-w-[373px]")}>{feature.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
