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
      className="mx-auto mt-4 max-w-[1292px] px-5 sm:px-6 lg:mt-8 lg:px-0"
    >
      <div className="mt-6 flex flex-col items-center justify-between gap-10 lg:mt-18 lg:flex-row lg:gap-16">
        {/* Text side — staggered children */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center lg:w-[510px] lg:text-left"
        >
          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-3 text-[13px] text-[#6A7284] sm:text-[16px] lg:justify-start lg:gap-4 lg:text-[18px]"
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
                  className="size-6"
                />
              ))}
            </div>
          </motion.div>

          <div className="mt-5">
            <motion.h1
              variants={fadeUp}
              className="mx-auto max-w-[470px] text-[37px] leading-[1.08] font-bold tracking-[-0.01em] text-[#121733] sm:text-[42px] lg:mx-0"
            >
              Send Money <span className="text-xenon">Globally,</span> Without
              the heavy fees.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.7] text-[#4E576A] sm:text-[16px] lg:mx-0"
            >
              Go beyond transfers spend, receive, and manage your global
              business with virtual accounts &amp; cards.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex justify-center gap-3 lg:justify-start"
            >
              <button className="h-11 w-full rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 sm:w-fit">
                Get Started
              </button>
              <button className="h-11 w-full rounded-lg border border-[#C6D5E3] px-7 text-[15px] font-semibold text-[#31435D] transition-colors duration-200 hover:bg-[#F5F8FC] sm:w-fit">
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
          className="relative w-full lg:w-[520px]"
        >
          <Image
            src={PhoneWithFrame}
            alt="phone-image"
            width={480}
            sizes="(max-width: 1280px) 100vw, 480px"
            placeholder="blur"
            priority
            className="relative z-10 w-full max-w-[480px] lg:ml-auto"
          />
        </motion.div>
      </div>

      {/* Bottom tagline — fades up after hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
        className="mt-16 flex flex-col items-center text-center lg:mt-24"
      >
        <p className="text-[26px] leading-[1.25] font-bold text-[#121733] sm:text-[34px]">
          Moves Digital Dollars Across Borders In Minutes
        </p>
        <p className="mt-2 px-2 text-[13px] text-[#677287] sm:text-[16px]">
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
      </motion.div>
    </section>
  );
}

export default Hero;
