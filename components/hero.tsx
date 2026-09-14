"use client";

import Image from "next/image";
import { useRef } from "react";
import { GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import StoreBadges from "@/components/business/store-badges";
import BusinessAction from "@/components/business/business-action";
import { businessLinks } from "@/lib/business-links";
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
      className="mx-auto w-full max-w-[1168px] px-5 pt-10 pb-16 sm:px-6"
    >
      <div className="personal-hero-row">
        {/* Text side — staggered children */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center xl:text-left"
        >
          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-4 text-[#8893A4] text-lg leading-[22px] xl:justify-start"
          >
            <p>Available in</p>
            <div className="flex items-center gap-1">
              {countryFlags.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt="country-flag"
                  width={24}
                  height={24}
                  className="size-6 lg:size-9"
                />
              ))}
            </div>
          </motion.div>

          <div className="mt-8">
            <motion.h1
              variants={fadeUp}
              className="personal-hero-title mx-auto text-xenon-gray"
            >
              Send Money <span className="text-xenon-brand">Globally</span>,<br className="hidden xl:block" /> Without
              the heavy fees.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-[547px] text-xl leading-[31px] text-[#8893A4] xl:mx-0"
            >
              Syka is payment infrastructure built for African entrepreneurs to send, receive, and store value globally using stablecoins instantly, cheaply, and without discrimination.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col justify-center gap-4 sm:flex-row xl:justify-start xl:h-[54px] xl:items-start"
            >
              <BusinessAction href={businessLinks.signup} className="min-h-12 w-full rounded-lg bg-xenon-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_20px_-10px_rgba(19,119,188,0.4)] sm:w-fit">
                Get Started for free
              </BusinessAction>
              <BusinessAction href="/#how-it-works" className="min-h-12 w-full rounded-lg border border-[#D0ECFF] px-6 py-3 text-sm font-semibold text-xenon-sky hover:bg-[#F5F8FC] sm:w-fit">
                See How It Works
              </BusinessAction>
            </motion.div>
          </div>
        </motion.div>

        {/* Phone image — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[425px]"
        >
          <Image
            src={PhoneWithFrame}
            alt="phone-image"
            width={600}
            sizes="(max-width: 1280px) 100vw, 600px"
            placeholder="blur"
            priority
            className="relative z-10 w-full xl:h-[545px] object-contain"
          />
        </motion.div>
      </div>

      {/* Bottom tagline — fades up after hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
        className="personal-hero-tagline flex flex-col items-center text-center"
      >
        <p className="text-3xl font-bold text-xenon-gray md:text-[36px] lg:text-[40px] lg:leading-[52px]">
          Moves digital dollars across borders in minutes
        </p>
        <p className="mt-6 text-lg leading-[26px] text-[#8893A4]">
          Simple, fast, and transparent global payments
        </p>
        <StoreBadges className="mt-6" />
      </motion.div>
    </section>
  );
}

export default Hero;
