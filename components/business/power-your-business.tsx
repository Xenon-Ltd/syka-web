"use client";

import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { GH, GB, NG, US, MORE } from "@/assets/icons/countries";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import WorldMapAnimation from "@/assets/lottie-files/Map.json";
import CompaniesMarquee from "@/components/business/companies-marquee";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

// Defer Lottie to client-side — removes it from the SSR bundle
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const countryFlags = [GH, NG, GB, US, MORE];

export default function PowerYourBusiness() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto mt-8 max-w-[1292px] px-5 sm:px-6 lg:flex lg:min-h-[95vh] lg:flex-col lg:justify-center xl:mt-14 xl:px-0"
    >
      {/* Hero text — staggered children */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-[860px] text-center"
      >
        <motion.div
          variants={fadeIn}
          className="flex items-center justify-center gap-1.5 lg:gap-3"
        >
          {countryFlags.map((flag, index) => (
            <Image
              key={index}
              src={flag}
              alt="country flag"
              width={24}
              height={24}
              className="size-6 lg:size-8"
            />
          ))}
          <p className="mobile-meta ml-2 max-w-[180px] text-left text-[#657089] sm:max-w-none lg:ml-3 lg:text-[20px] lg:leading-[1.4]">
            Over 3000 businesses in 7 countries use SYKA
          </p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mobile-hero-title mt-4 mx-auto max-w-[350px] text-[#121733] md:max-w-full lg:mt-6 lg:max-w-[920px] lg:text-[72px] lg:leading-[0.98]"
        >
          Power Your Business With{" "}
          <span className="text-xenon">Borderless</span> Payments.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mobile-body mx-auto mt-4 max-w-[310px] text-[#505A6E] sm:max-w-[470px] lg:mt-6 lg:max-w-[620px] lg:text-[22px] lg:leading-[1.7]"
        >
          Level the playing ground for African businesses.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-7 flex flex-col justify-center gap-3 md:flex-row sm:flex-row lg:mt-10 lg:gap-5"
        >
          <button className="mobile-button h-11 rounded-lg bg-xenon px-7 text-white transition-colors duration-200 hover:bg-xenon-600 lg:h-14 lg:px-10 lg:text-[17px]">
            Get started for free
          </button>
          <button className="mobile-button h-11 rounded-lg border border-xenon px-7 text-xenon transition-colors duration-200 hover:bg-[#F3F7FB] lg:h-14 lg:px-10 lg:text-[17px]">
            See How It Works
          </button>
        </motion.div>
      </motion.div>

      {/* World map Lottie — fades in after hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
        className="mt-16 -mx-32 flex justify-center overflow-hidden sm:mx-0 lg:mt-20"
      >
        <Lottie
          animationData={WorldMapAnimation}
          loop={true}
          autoplay
          className="w-[160vw] max-w-none sm:w-full lg:w-[120%]"
        />
      </motion.div>

      {/* Tagline + store badges + marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
        className="mt-14 flex flex-col items-center text-center md:mb-16 xl:mt-18"
      >
        <p className="mobile-section-title max-w-[260px] text-[#121733] sm:max-w-none lg:max-w-[980px] lg:text-[58px] lg:leading-[1.02]">
          Instant Payments, <span className="text-xenon">Zero</span> Limits
        </p>
        <p className="mobile-meta mt-2 text-[#657089] lg:mt-4 lg:text-[22px] lg:leading-[1.5]">
          Simple, fast and transparent global payments
        </p>
        <div className="mt-5 flex items-center gap-3 lg:mt-8 lg:gap-5">
          <button
            aria-label="Google Play"
            className="transition-transform duration-150"
          >
            <Image
              src={PlayStoreBadgeIcon}
              alt="google-play-badge"
              className="h-10 w-[135px] lg:h-12 lg:w-[162px]"
            />
          </button>
          <button
            aria-label="App Store"
            className="transition-transform duration-150"
          >
            <Image
              src={AppStoreBadgeIcon}
              alt="app-store-badge"
              className="h-10 w-[135px] lg:h-12 lg:w-[162px]"
            />
          </button>
        </div>

        <CompaniesMarquee />
      </motion.div>
    </section>
  );
}
