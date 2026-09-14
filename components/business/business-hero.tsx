"use client";

import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";

import StoreBadges from "./store-badges";
import BusinessAction from "./business-action";
import { businessLinks } from "@/lib/business-links";
import { GH, GB, NG, US, MORE } from "@/assets/icons/countries";
import { WorldMap, HeroMapAvatars } from "@/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CompaniesMarquee from "@/components/business/companies-marquee";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

const countryFlags = [GH, NG, GB, US, MORE];

export default function BusinessHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1268px] px-5 pt-10 pb-16 sm:px-6 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32"
    >
      {/* Hero text — staggered children */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-[837px] text-center"
      >
        <motion.div
          variants={fadeIn}
          className="flex flex-wrap items-center justify-center gap-1"
        >
          {countryFlags.map((flag, index) => (
            <Image
              key={index}
              src={flag}
              alt="country flag"
              width={24}
              height={24}
              className="size-6 lg:size-9"
            />
          ))}
          <p className="ml-3 max-w-[368px] text-left text-[#8893A4] text-lg leading-[22px]">
            Over 3000 businesses in 7 countries use SYKA
          </p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mobile-hero-title mt-8 mx-auto md:text-[54px] xl:text-[62px] xl:leading-[80.6px] text-xenon-gray"
        >
          The Payment Infrastructure Built For Emerging{" "}
          <span className="text-xenon-brand">Markets</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-[547px] text-lg leading-[29px] text-[#8893A4]"
        >
          Trusted by financial institutions across Africa and the Caribbean.
          Built on stablecoin rails. Backed by enterprise-grade compliance.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col justify-center gap-4 sm:flex-row xl:h-[54px] xl:items-start"
        >
          <BusinessAction href={businessLinks.signup} className={cn(businessStyles.button, "bg-xenon-brand text-white transition-colors duration-200 hover:bg-xenon-600")}>
            Get started for free
          </BusinessAction>
          <BusinessAction href="/business#platform" className={cn(businessStyles.button, "border border-[#D0ECFF] text-xenon-sky transition-colors duration-200 hover:bg-[#F3F7FB]")}>
            See How It Works
          </BusinessAction>
        </motion.div>
      </motion.div>

      {/* Static dotted world map — replaces the previous Lottie animation */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
        className="relative mx-auto mt-10 flex w-full max-w-[1017px] justify-center overflow-hidden xl:mt-0 xl:h-[410.33px]"
      >
        <div className="relative w-full">
          <Image
            src={WorldMap}
            alt="Countries where SYKA operates"
            className="w-full h-full object-contain"
            priority
          />
          <Image
            src={HeroMapAvatars}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-[9%] left-[12%] h-auto w-[72%] mix-blend-multiply"
            sizes="(max-width: 1232px) 72vw, 850px"
          />
        </div>
      </motion.div>

      {/* Tagline + store badges + marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
        className="mt-16 flex flex-col items-center text-center xl:mt-[150px]"
      >
        <p className={cn(businessStyles.sectionHeading, "max-w-[300px] text-xenon-gray sm:max-w-none md:max-w-[620px] lg:max-w-[980px]")}>
          Instant Payments, <span className="text-xenon-brand">Zero</span> Limits
        </p>
        <p className="mt-6 text-lg leading-[26px] text-[#8893A4]">
          Simple, fast, and transparent global payments
        </p>
        <StoreBadges className="mt-6" />

        <div className="mt-16 w-full flex justify-center xl:mt-[150px]"><CompaniesMarquee /></div>
      </motion.div>
    </section>
  );
}
