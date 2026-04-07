"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

type ProductHeroShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  children: ReactNode;
};

export default function ProductHeroShell({
  eyebrow,
  title,
  description,
  ctaLabel,
  children,
}: ProductHeroShellProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mt-8 px-5 sm:px-6 lg:flex lg:min-h-[95vh] lg:items-center xl:mt-0 xl:px-0"
    >
      <div className="mx-auto grid w-full max-w-[1292px] items-center gap-12 py-6 lg:min-h-[95vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24 lg:py-10 xl:gap-28">
        {/* Text — staggered fade up */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto w-full max-w-[540px] text-center lg:mx-0 lg:max-w-[620px] lg:text-left xl:max-w-[660px]"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.08em] text-[#7A89A2] uppercase lg:text-[15px] lg:tracking-[0.22em]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[500px] text-[35px] leading-[1.05] font-semibold text-[#3E4A5E] sm:text-[48px] lg:mx-0 lg:mt-5 lg:max-w-[620px] lg:text-[68px] lg:leading-[0.98]"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[440px] text-[17px] leading-[1.55] text-[#77859C] sm:max-w-[520px] lg:mx-0 lg:mt-6 lg:max-w-[560px] lg:text-[22px] lg:leading-[1.65]"
          >
            {description}
          </motion.p>
          <motion.div variants={fadeUp}>
            <button className="mt-8 h-11 rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 lg:mt-10 lg:h-14 lg:px-10 lg:text-[17px]">
              {ctaLabel}
            </button>
          </motion.div>
        </motion.div>

        {/* Right slot (Lottie / image) — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
          className="flex w-full justify-center lg:justify-end"
        >
          <div className="w-full max-w-[880px]">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
