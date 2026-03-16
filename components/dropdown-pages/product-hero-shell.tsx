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
      className="mt-8 flex min-h-[85vh] items-center px-5 sm:px-6 xl:mt-0 xl:px-0"
    >
      <div className="mx-auto grid h-full w-full max-w-[1292px] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 xl:grid-cols-[1fr_1.12fr] xl:gap-20">

        {/* Text — staggered fade up */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center lg:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.08em] text-[#7A89A2] uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[660px] text-[35px] leading-[1.05] font-semibold text-[#3E4A5E] sm:text-[56px] lg:mx-0"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[560px] text-[18px] leading-[1.5] text-[#77859C] lg:mx-0"
          >
            {description}
          </motion.p>
          <motion.div variants={fadeUp}>
            <button className="mt-8 h-12 rounded-lg bg-xenon px-6 text-lg font-medium text-white transition-colors duration-200 hover:bg-xenon-600">
              {ctaLabel}
            </button>
          </motion.div>
        </motion.div>

        {/* Right slot (Lottie / image) — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
