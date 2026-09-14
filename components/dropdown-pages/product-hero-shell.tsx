"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";
import { CONTENT, CTA_BUTTON_CLASS } from "./shared";

type ProductHeroShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  children: ReactNode;
  variant?: "standard" | "cream";
};

export default function ProductHeroShell({
  eyebrow,
  title,
  description,
  ctaLabel,
  children,
  variant = "standard",
}: ProductHeroShellProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className={`product-hero ${variant === "cream" ? "product-hero-cream" : ""}`}
    >
      <div className={`${CONTENT} product-hero-inner`}>
        {/* Text — staggered fade up */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="product-hero-copy"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#8893A4]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-xenon-gray"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="product-hero-description"
          >
            {description}
          </motion.p>
          <motion.div variants={fadeUp}>
            <button className={CTA_BUTTON_CLASS}>{ctaLabel}</button>
          </motion.div>
        </motion.div>

        {/* Right slot (Lottie / image) — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
          className="product-hero-visual"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
