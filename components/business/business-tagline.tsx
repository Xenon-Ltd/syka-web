"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import { EASE_OUT, IN_VIEW_OPTS } from "@/lib/animation";
import CompaniesMarquee from "./companies-marquee";
import StoreBadges from "./store-badges";

/** Tagline, store badges and company marquee on the dark background between the globe and Solutions. */
export default function BusinessTagline() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <div ref={ref} className="relative z-10 px-5 py-16 sm:px-6 md:py-24 lg:py-32">
      <motion.div
        initial={{ y: 20 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="flex flex-col items-center text-center"
      >
        <p className={cn(businessStyles.sectionHeading, "max-w-[300px] text-white sm:max-w-none md:max-w-[620px] lg:max-w-[980px]")}>
          Instant Payments, <span className="text-xenon-sky">Zero</span> Limits
        </p>
        <p className="mt-6 text-lg leading-[26px] text-white/70">
          Simple, fast, and transparent global payments
        </p>
        <StoreBadges className="mt-6" />

        <div className="mt-16 flex w-full justify-center xl:mt-[150px]"><CompaniesMarquee /></div>
      </motion.div>
    </div>
  );
}
