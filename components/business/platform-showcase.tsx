"use client";

import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";

import { CA, GH, NG, GB, US, EURO, MORE } from "@/assets/icons/countries";
import {
  MerchantPlatformMockup,
  CrossBorderPaymentMockup,
  TreasuryDashboardMockup,
  KYCComplianceMockup,
} from "@/assets/images";
import Image from "next/image";
import BusinessAction from "./business-action";
import { businessLinks } from "@/lib/business-links";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

const corridorFlags = [CA, GH, NG, GB, US, EURO, MORE];

export default function PlatformShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      id="platform"
      className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] scroll-mt-8 px-5 sm:px-6")}
    >
      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10"
      >
        <motion.p
          variants={fadeUp}
          className={cn(businessStyles.eyebrow, "text-[#7A89A2]")}
        >
          The Platform
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className={cn(businessStyles.sectionHeading, "mt-3 max-w-[643px] text-xenon-gray lg:mt-5")}
        >
          Everything Your Institution Needs To Execute{" "}
          <span className="text-xenon-brand">Cross-Border</span> Payments.
        </motion.h2>
      </motion.div>

      <div className="space-y-10">
        {/* Row 1 — Syka Merchant Platform */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="platform-row grid items-center gap-8 overflow-hidden rounded-2xl bg-[#fbfbf2] p-6 md:p-8 lg:grid-cols-2 lg:gap-10 lg:rounded-2xl lg:p-10"
        >
          <div>
            <h3 className={cn(businessStyles.cardHeading, "text-xenon-gray")}>
              Syka Merchant Platform
            </h3>
            <p className={cn(businessStyles.body, "mt-4 max-w-[620px] text-[#8893A4]")}>
              The Syka Merchant Platform is a desktop application for banks,
              FinTech&apos;s, and FX operators. Your team processes
              cross-border transactions for clients directly from the
              platform. We handle the rest: conversion, settlement, payout,
              and confirmation.
            </p>
            <BusinessAction href={businessLinks.sales} className={cn(businessStyles.button, "mt-8 bg-[#413787] text-white transition-colors duration-200 hover:bg-xenon-primary/90")}>
              Book a Demo
            </BusinessAction>
          </div>
          <div className="relative h-[260px] w-full lg:h-[340px]">
            <Image
              src={MerchantPlatformMockup}
              alt="Syka Merchant Platform transaction approvals dashboard"
              fill
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Row 2 — Cross-Border Payment Processing */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
          className="platform-row grid items-center gap-8 overflow-hidden rounded-2xl bg-[#fafafa] p-6 md:p-8 lg:grid-cols-2 lg:gap-10 lg:rounded-2xl lg:p-10"
        >
          <div className="lg:order-2">
            <h3 className={cn(businessStyles.cardHeading, "text-xenon-gray")}>
              Cross-Border Payment Processing
            </h3>
            <p className={cn(businessStyles.body, "mt-4 max-w-[620px] text-[#8893A4]")}>
              Syka processes cross-border payments using stablecoin rails,
              converting local fiat to USDC at the point of send, settling
              across borders in minutes, paying out in the recipient&apos;s
              local currency.
            </p>
            <div className="mt-6 flex items-center gap-2 lg:mt-8 lg:gap-3">
              {corridorFlags.map((flag, index) => (
                <Image
                  key={index}
                  src={flag}
                  alt="corridor country flag"
                  width={36}
                  height={36}
                  className="size-8 rounded-full lg:size-9"
                />
              ))}
            </div>
            <BusinessAction href="/business#supported-countries" className={cn(businessStyles.button, "mt-8 bg-[#413787] text-white transition-colors duration-200 hover:bg-xenon-primary/90")}>
              See Supported Corridors
            </BusinessAction>
          </div>
          <div className="relative h-[220px] w-full lg:order-1 lg:h-[300px]">
            <Image
              src={CrossBorderPaymentMockup}
              alt="Cross-border payment transaction list"
              fill
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain object-left"
            />
          </div>
        </motion.div>

        {/* Row 3 — Treasury Management and Yield */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.16 }}
          className="platform-row grid items-center gap-8 overflow-hidden rounded-2xl bg-[#fbfbf2] p-6 md:p-8 lg:grid-cols-2 lg:gap-10 lg:rounded-2xl lg:p-10"
        >
          <div>
            <h3 className={cn(businessStyles.cardHeading, "text-xenon-gray")}>
              Treasury Management and Yield
            </h3>
            <p className={cn(businessStyles.body, "mt-4 max-w-[620px] text-[#8893A4]")}>
              Businesses and institutions holding USDC or USDT balances on
              Syka earn yield on idle funds through our treasury management
              suite with full liquidity. Treasury tools give your institution
              full control over currency strategy.
            </p>
            <BusinessAction href="/business?product=treasury-management" className={cn(businessStyles.button, "mt-8 bg-[#413787] text-white transition-colors duration-200 hover:bg-xenon-primary/90")}>
              Learn About Treasury
            </BusinessAction>
          </div>
          <div className="relative h-[260px] w-full lg:h-[340px]">
            <Image
              src={TreasuryDashboardMockup}
              alt="Treasury management dashboard with multi-currency wallets and FX rates"
              fill
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain object-right"
            />
          </div>
        </motion.div>

        {/* Row 4 — KYC and Compliance Infrastructure */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.24 }}
          className="platform-row grid items-center gap-8 overflow-hidden rounded-2xl bg-[#fafafa] p-6 md:p-8 lg:grid-cols-2 lg:gap-10 lg:rounded-2xl lg:p-10"
        >
          <div className="lg:order-2">
            <h3 className={cn(businessStyles.cardHeading, "text-xenon-gray")}>
              KYC and Compliance Infrastructure
            </h3>
            <p className={cn(businessStyles.body, "mt-4 max-w-[620px] text-[#8893A4]")}>
              Syka takes on the compliance burden so your institution does
              not have to. Every merchant and end customer onboarded through
              the Syka platform is subject to Syka&apos;s full KYC and AML
              process, powered by best-in-class identity verification and
              sanctions screening technology.
            </p>
            <BusinessAction href={businessLinks.sales} className={cn(businessStyles.button, "mt-8 bg-[#413787] text-white transition-colors duration-200 hover:bg-xenon-primary/90")}>
              Talk to Our Compliance Team
            </BusinessAction>
          </div>
          <div className="relative h-[260px] w-full lg:order-1 lg:h-[340px]">
            <Image
              src={KYCComplianceMockup}
              alt="KYC and compliance infrastructure connecting exchanges, banks, and platforms"
              fill
              placeholder="blur"
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain object-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
