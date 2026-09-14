"use client";

import { ContourPattern } from "@/assets/images";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/animation";

const features = [
  {
    title: "Stable-Coin Powered",
    body: "We use fully-backed, regulated stablecoins for predictable value.",
    points: ["Fully-backed, regulated stablecoins", "Predictable value for global payments"],
  },
  {
    title: "Bank-Grade Security",
    body: "SOC 2 compliant, encryption, and multi-sig custody protocols, operating within global compliance frameworks.",
    points: ["Encryption and multi-sig custody protocols", "Operating within global compliance frameworks"],
  },
  {
    title: "Transparent Wallet",
    body: "You control your funds, with clear balances, real-time visibility, and no hidden restrictions.",
    points: ["Clear balances and real-time visibility", "No hidden restrictions"],
  },
];

export default function BuiltOnStability() {
  return (
    <section aria-labelledby="stability-heading" className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] px-5 sm:px-6")}>
      <h2 id="stability-heading" className={cn(businessStyles.sectionHeading, "mb-10 max-w-[457px] text-xenon-gray")}>
        Built on <span className="text-xenon-brand">Stability,</span><br />
        Guarded by <span className="text-xenon-brand">Security</span>
      </h2>
      <div className="space-y-8 lg:space-y-10">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className={cn("stability-row", index % 2 === 1 && "stability-row-reverse")}
          >
            <div aria-hidden="true" className={cn("relative aspect-[608/515] overflow-hidden rounded-2xl bg-[#e4f3ff]", index % 2 === 1 && "xl:order-2")}>
              <div
                className="absolute inset-0 bg-[#6ca9e6]"
                style={{
                  maskImage: `url(${ContourPattern.src})`,
                  maskSize: "cover",
                  maskPosition: index % 2 === 1 ? "right center" : "left center",
                  transform: index % 2 === 1 ? "rotate(180deg)" : undefined,
                }}
              />
            </div>
            <div className={cn("py-2 md:py-6", index % 2 === 1 && "xl:order-1")}>
              <h3 className={"product-feature-title"}>{feature.title}</h3>
              <p className={"mt-6 text-xl leading-[26px] text-[#8893A4] xl:text-[24px]"}>{feature.body}</p>
              <ul className="mt-6 space-y-6 text-lg leading-6 text-[#8893A4]">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-6">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#4484cd] text-white"><Check aria-hidden="true" className="size-6" strokeWidth={2} /></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
