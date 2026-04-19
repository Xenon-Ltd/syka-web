"use client";

import Image from "next/image";
import { useRef } from "react";
import { GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { PhoneWithFrame } from "@/assets/images";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

function Hero() {
  const countryFlags = [GH, NG, GB, US, MORE];
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto mt-4 max-w-[1440px] px-5 py-4 sm:px-6 md:py-24 lg:mt-0 lg:flex lg:min-h-[95vh] lg:flex-col lg:justify-center lg:px-0 lg:py-28"
    >
      <div className="mt-0 flex flex-col items-center justify-between gap-10 lg:mt-0 lg:flex-row lg:items-center lg:gap-24">
        {/* Text side — staggered children */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center lg:w-[620px] lg:text-left"
        >
          <motion.div
            variants={fadeIn}
            className="mobile-meta flex items-center justify-center gap-3 text-[#6A7284] sm:text-base lg:justify-start lg:gap-5 lg:text-[20px]"
          >
            <p>Available in</p>
            <div className="flex items-center gap-1.5">
              {countryFlags.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt="country-flag"
                  width={24}
                  height={24}
                  className="size-6 lg:size-8"
                />
              ))}
            </div>
          </motion.div>

          <div className="mt-5">
            <motion.h1
              variants={fadeUp}
              className="mx-auto max-w-[470px] text-5xl leading-[1.1] font-semibold tracking-tight text-[#121733] md:text-[54px] lg:mx-0 lg:max-w-[620px] lg:text-[62px]"
            >
              Send Money <span className="text-xenon">Globally,</span> Without
              the heavy fees.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-[420px] text-lg leading-relaxed text-[#4E576A] md:text-[20px] lg:mx-0 lg:mt-6 lg:max-w-[560px] lg:text-[20px]"
            >
              Go beyond transfers spend, receive, and manage your global
              business with virtual accounts &amp; cards.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col justify-center gap-3 md:flex-row lg:mt-10 lg:gap-5 lg:justify-start"
            >
              <button className="w-full rounded-lg bg-xenon px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 sm:w-fit lg:text-lg">
                Get Started
              </button>
              <button className="w-full rounded-lg border border-[#C6D5E3] px-8 py-4 text-base font-semibold text-[#31435D] transition-colors duration-200 hover:bg-[#F5F8FC] sm:w-fit lg:text-lg">
                See How It Works
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Phone image — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="relative w-full lg:w-[620px]"
        >
          <Image
            src={PhoneWithFrame}
            alt="phone-image"
            width={600}
            sizes="(max-width: 1280px) 100vw, 600px"
            placeholder="blur"
            priority
            className="relative z-10 w-full max-w-[480px] lg:ml-auto lg:max-w-[600px]"
          />
        </motion.div>
      </div>

      {/* Bottom tagline — fades up after hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
        className="mt-16 flex flex-col items-center text-center lg:mt-28"
      >
        <p className="text-3xl leading-tight font-semibold text-[#121733] md:text-[36px] lg:max-w-[980px] lg:text-[40px] lg:leading-[1.08]">
          Move Digital Dollars Across Borders In Minutes
        </p>
        <p className="mt-2 px-2 text-base leading-relaxed text-[#677287] md:text-[20px] lg:mt-4 lg:text-[20px]">
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
      </motion.div>
    </section>
  );
}

export default Hero;
