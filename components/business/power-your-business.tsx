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
      className="mx-auto mt-8 max-w-[1292px] px-5 sm:px-6 xl:mt-14 xl:px-0"
    >
      {/* Hero text — staggered children */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-[740px] text-center"
      >
        <motion.div
          variants={fadeIn}
          className="flex items-center justify-center gap-1.5"
        >
          {countryFlags.map((flag, index) => (
            <Image
              key={index}
              src={flag}
              alt="country flag"
              width={24}
              height={24}
              className="size-6"
            />
          ))}
          <p className="ml-2 text-left text-[13px] text-[#657089] sm:text-[16px]">
            Over 3000 businesses in 7 countries use SYKA
          </p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-4 mx-auto max-w-[350px] text-[32px] leading-[1.1] font-bold text-[#121733] md:max-w-full md:text-[37px] sm:text-[57px]"
        >
          Power Your Business With{" "}
          <span className="text-xenon">Borderless</span> Payments.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-[470px] text-[15px] leading-[1.7] text-[#505A6E] sm:text-[16px]"
        >
          Level the playing ground for African businesses.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-7 flex justify-center gap-3 sm:flex-row"
        >
          <button className="h-11 rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-xenon-600">
            Get started for free
          </button>
          <button className="h-11 rounded-lg border border-xenon px-7 text-[15px] font-semibold text-xenon transition-colors duration-200 hover:bg-[#F3F7FB]">
            See How It Works
          </button>
        </motion.div>
      </motion.div>

      {/* World map Lottie — fades in after hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
        className="mt-16"
      >
        <Lottie animationData={WorldMapAnimation} loop={true} autoplay />
      </motion.div>

      {/* Tagline + store badges + marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
        className="mt-14 flex flex-col items-center text-center xl:mt-16 md:mb-16"
      >
        <p className="text-[31px] leading-[1.2] font-bold text-[#121733] sm:text-[40px]">
          Instant Payments, <span className="text-xenon">Zero</span> Limits
        </p>
        <p className="mt-2 text-[13px] text-[#657089] sm:text-[16px]">
          Simple, fast and transparent global payments
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            aria-label="Google Play"
            className="transition-transform duration-150"
          >
            <Image
              src={PlayStoreBadgeIcon}
              alt="google-play-badge"
              className="h-10 w-[135px]"
            />
          </button>
          <button
            aria-label="App Store"
            className="transition-transform duration-150"
          >
            <Image
              src={AppStoreBadgeIcon}
              alt="app-store-badge"
              className="h-10 w-[135px]"
            />
          </button>
        </div>

        <CompaniesMarquee />
      </motion.div>
    </section>
  );
}
