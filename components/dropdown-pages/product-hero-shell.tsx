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
      className="mt-4 px-5 pt-8 pb-8 sm:px-6 md:pt-0 md:pb-18 lg:flex lg:min-h-[95vh] lg:items-center lg:pt-2 lg:pb-16 xl:mt-0 xl:px-0"
    >
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 md:gap-14 lg:min-h-[95vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24 xl:gap-28">
        {/* Text — staggered fade up */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto w-full max-w-[540px] text-center lg:mx-0 lg:max-w-[620px] lg:text-left xl:max-w-[660px]"
        >
          <motion.p
            variants={fadeUp}
            className="mobile-eyebrow text-[#7A89A2] lg:text-[15px] lg:tracking-[0.22em]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[520px] text-5xl leading-[1.1] font-semibold tracking-tight text-[#3E4A5E] md:text-[54px] lg:mx-0 lg:mt-5 lg:max-w-[680px] lg:text-[62px] lg:leading-[1.02]"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[460px] text-lg leading-relaxed text-[#77859C] md:text-[20px] sm:max-w-[520px] lg:mx-0 lg:mt-6 lg:max-w-[580px] lg:text-[20px] lg:leading-[1.65]"
          >
            {description}
          </motion.p>
          <motion.div variants={fadeUp}>
            <button className="mt-8 rounded-lg bg-xenon px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 md:text-lg lg:mt-10">
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
