"use client";

import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";

import {
  SolutionsDashboardMockup,
  WavyBackgroundDesign,
} from "@/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BusinessAction from "./business-action";
import { businessLinks } from "@/lib/business-links";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

type Institution = {
  title: string;
  body: string;
};

const institutions: Institution[] = [
  {
    title: "Rural Banks & Credit Unions",
    body: "Offer your customers fast, affordable cross-border payments without building the infrastructure yourself. Syka's merchant platform integrates directly into your operations. Your tellers process transactions, we handle everything underneath.",
  },
  {
    title: "Fintechs & Payment Companies",
    body: "Power your cross-border product with Syka's API and settlement infrastructure. White-label our platform or build on top of our rails. Launch faster, stay compliant, and scale without limits.",
  },
  {
    title: "FX Operators & Exchange Bureaus",
    body: "Licensed FX operators use Syka's merchant platform to digitize client transactions, automate settlement workflows, and access competitive stablecoin-powered rates, without changing how they serve their clients.",
  },
  {
    title: "Corporates & Treasury Teams",
    body: "Institutions moving money across borders use Syka to consolidate payouts, manage multi-currency balances, and earn yield on idle funds, all from a single platform.",
  },
];

export default function SolutionsAndPlatform() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section id="solutions" ref={ref} className="relative isolate overflow-hidden bg-xenon-primary">
      <Image
        src={WavyBackgroundDesign}
        alt=""
        aria-hidden
        priority={false}
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover select-none"
      />

      <div className={cn(businessStyles.sectionSpacing, "relative z-0 mx-auto max-w-[1268px] px-5 sm:px-6")}>
        {/* Solutions header + dashboard mockup, over wavy backdrop */}
        <div className="relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative mx-auto max-w-[1028px] text-center"
          >
            <motion.p
              variants={fadeUp}
              className={cn(businessStyles.eyebrow, "text-white/50")}
            >
              Solutions
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className={"mt-3 text-4xl font-bold leading-tight text-white xl:text-[62px] xl:leading-[80.6px]"}
            >
              Low-Cost Payments Built Specifically For{" "}
              <span className="text-xenon-brand">Emerging</span> Markets.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            className="relative mx-auto mt-12 max-w-[1220px] overflow-hidden rounded-2xl lg:mt-16 lg:rounded-lg"
          >
            <Image
              src={SolutionsDashboardMockup}
              alt="Syka merchant dashboard overview"
              placeholder="blur"
              sizes="(max-width: 1279px) 100vw, 1220px"
              className="h-auto w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-xenon-primary" />
          </motion.div>
        </div>

        {/* One platform for every institution */}
        <div className="institution-section relative mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left"
          >
            <h2 className={cn(businessStyles.sectionHeading, "max-w-[620px] text-white")}>
              One Platform For{" "}
              <span className="text-xenon-brand">Every Institution</span> That
              Moves Money.
            </h2>
            <BusinessAction href={businessLinks.signup} className={cn(businessStyles.button, "shrink-0 bg-[#413787] text-white transition-colors duration-200 hover:bg-[#51469c]")}>
              Get started
            </BusinessAction>
          </motion.div>

          <div className="mt-10 space-y-6 lg:mt-12">
            {[institutions.slice(0, 2), institutions.slice(2, 4)].map(
              (row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid gap-6 sm:grid-cols-2 lg:gap-6 ${rowIndex === 0
                    ? "xl:grid-cols-[718px_478px]"
                    : "xl:grid-cols-[478px_718px]"
                    }`}
                >
                  {row.map((institution, i) => {
                    const index = rowIndex * 2 + i;
                    return (
                      <motion.div
                        key={institution.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          ease: EASE_OUT,
                          delay: index * 0.08,
                        }}
                        className="relative flex flex-col overflow-hidden rounded-2xl bg-[#1377bc] p-8 text-white md:p-10 xl:min-h-[398px] lg:rounded-2xl [&:nth-child(2)]:bg-[#29aae1]"
                      >
                        <Image
                          src={WavyBackgroundDesign}
                          alt=""
                          aria-hidden
                          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-60 mix-blend-soft-light"
                        />
                        <h3 className={cn("relative text-2xl font-semibold xl:text-[32px] xl:leading-9", index > 0 && "font-poppins")}>
                          {institution.title}
                        </h3>
                        <p className={"relative mt-6 text-lg leading-7 text-[#fdfdfd] xl:text-[24px] xl:leading-9"}>
                          {institution.body}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
