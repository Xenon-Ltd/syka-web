"use client";

import Image from "next/image";
import { useRef } from "react";
import { CA, GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import StoreBadges from "@/components/business/store-badges";
import BusinessAction from "@/components/business/business-action";
import PhoneGlobe from "@/components/hero-globe/phone-globe";
import { personalLinks } from "@/lib/business-links";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
  riseIn,
} from "@/lib/animation";

function Hero() {
  const countryFlags = [
    { src: CA, name: "Canada" },
    { src: GH, name: "Ghana" },
    { src: NG, name: "Nigeria" },
    { src: GB, name: "United Kingdom" },
    { src: US, name: "United States" },
    { src: MORE, name: "and more countries" },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section aria-labelledby="personal-hero-heading" className="overflow-x-clip">
      <div ref={ref} className="mx-auto w-full max-w-[1168px] px-5 pt-6 pb-4 sm:px-6 lg:pt-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div
            variants={riseIn}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-lg leading-[22px] text-[#8893A4]"
          >
            <p>Supported in</p>
            <div className="flex items-center gap-1">
              {countryFlags.map(({ src, name }) => (
                <Image
                  key={name}
                  src={src}
                  alt={name}
                  width={28}
                  height={28}
                  className="size-7 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          <motion.h1
            id="personal-hero-heading"
            variants={riseIn}
            className="mx-auto mt-7 max-w-[980px] text-[42px] leading-[1.06] font-black tracking-[-0.028em] text-balance text-xenon-gray md:text-[58px] lg:text-[72px]"
          >
            Send Money <span className="text-xenon-brand">Globally</span>, Without the heavy fees.
          </motion.h1>

          <motion.p
            variants={riseIn}
            className="mx-auto mt-6 max-w-[560px] text-xl leading-[31px] text-[#8893A4]"
          >
            Syka is payment infrastructure built for African entrepreneurs to send, receive, and store value globally using stablecoins instantly, cheaply, and without discrimination.
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center"
          >
            <BusinessAction href={personalLinks.signup} className="min-h-12 rounded-lg bg-xenon-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_20px_-10px_rgba(19,119,188,0.4)] sm:w-fit">
              Get Started for free
            </BusinessAction>
            <BusinessAction href="/#how-it-works" className="min-h-12 rounded-lg border border-[#D0ECFF] px-6 py-3 text-sm font-semibold text-xenon-sky hover:bg-[#F5F8FC] sm:w-fit">
              See How It Works
            </BusinessAction>
          </motion.div>
        </motion.div>

        <PhoneGlobe className="mx-auto mt-2 max-w-[1100px]" />

        {/* Fades up after the hero copy. */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          <p className="max-w-[820px] text-3xl leading-tight font-black tracking-[-0.01em] text-balance text-xenon-gray md:text-[38px]">
            Moves digital dollars across borders in minutes
          </p>
          <p className="mt-5 text-lg leading-[26px] text-[#8893A4]">
            Simple, fast, and transparent global payments
          </p>
          <StoreBadges className="mt-6" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
