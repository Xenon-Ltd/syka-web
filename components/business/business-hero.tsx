"use client";

import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";

import BusinessAction from "./business-action";
import HeroGlobe from "./hero-globe";
import Header from "@/components/layout/header";
import { businessLinks } from "@/lib/business-links";
import { GH, GB, NG, US, MORE } from "@/assets/icons/countries";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, IN_VIEW_OPTS, EASE_OUT, riseIn } from "@/lib/animation";

const countryFlags = [
  { src: GH, name: "Ghana" },
  { src: NG, name: "Nigeria" },
  { src: GB, name: "United Kingdom" },
  { src: US, name: "United States" },
  { src: MORE, name: "and more countries" },
];

/** Flags line, headline, subtext and CTAs, shared by the business heroes. */
export function BusinessHeroCopy({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative z-10 mx-auto max-w-[837px] px-5 pt-10 text-center sm:px-6 md:pt-16 lg:pt-[120px] xl:pt-[162px]"
    >
      <motion.div
        variants={riseIn}
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
      >
        <div className="flex items-center gap-1">
          {countryFlags.map(({ src, name }) => (
            <Image key={name} src={src} alt={name} width={36} height={36} className="size-7 lg:size-9" />
          ))}
        </div>
        <p className="text-base leading-[22px] text-[#F7F7F7] lg:text-lg">
          Over 3000 businesses in 7+ countries use SYKA
        </p>
      </motion.div>

      <motion.h1
        variants={riseIn}
        className="mx-auto mt-8 text-[40px] font-bold leading-[1.1] text-white capitalize md:text-[54px] xl:text-[62px] xl:leading-[80.6px]"
      >
        The Payment Infrastructure Built For Emerging{" "}
        <span className="text-xenon-sky">Markets</span>
      </motion.h1>

      <motion.p
        variants={riseIn}
        className="mx-auto mt-6 max-w-[547px] text-lg leading-[29px] text-white"
      >
        Trusted by financial institutions across Africa and the Caribbean.
        Built on stablecoin rails. Backed by enterprise-grade compliance.
      </motion.p>

      <motion.div
        variants={riseIn}
        className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start"
      >
        <span className="relative inline-flex">
          {/* Soft glow under the primary button, from the design. */}
          <span aria-hidden className="absolute inset-x-3 top-3 -bottom-1.5 rounded-lg bg-[rgba(19,119,188,0.4)] blur-[20px]" />
          <BusinessAction href={businessLinks.signup} className={cn(businessStyles.button, "relative bg-xenon-brand text-white transition-colors duration-200 hover:bg-xenon-600")}>
            Get started for free
          </BusinessAction>
        </span>
        <BusinessAction href="/business#platform" className={cn(businessStyles.button, "border border-[#D0ECFF] bg-[#0a1628]/60 text-xenon-sky transition-colors duration-200 hover:bg-[#13213a]")}>
          See How It Works
        </BusinessAction>
      </motion.div>
    </motion.div>
  );
}

export default function BusinessHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    // z-10 keeps the header's dropdowns and mobile menu above later sections.
    <section ref={ref} className="relative z-10 isolate overflow-hidden bg-[#0a1628]">
      {/* The hero renders the header (see ownHeaderRoutes in site-chrome) so the
          navy background runs behind the navigation, as in the design. */}
      <Header tone="dark" />

      <BusinessHeroCopy isInView={isInView} />

      {/* Globe — its top sits level with the buttons, as in the design. */}
      <motion.div
        initial={{ y: 24 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
        className="-mt-10 md:-mt-16 lg:-mt-24"
      >
        <HeroGlobe className="aspect-[8/5] max-h-[540px] md:aspect-[3/1]" />
      </motion.div>
    </section>
  );
}
