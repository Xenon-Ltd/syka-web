"use client";

import {
  BankGradeSecurity,
  StablecoinPowered,
  TransparentWallet,
} from "@/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

const cards = [
  {
    src: StablecoinPowered,
    alt: "Stablecoin Powered",
    title: "Stablecoin-Powered",
    body: "We use fully-backed, regulated stablecoins for predictable value.",
  },
  {
    src: BankGradeSecurity,
    alt: "Bank Grade Security",
    title: "Bank-Grade Security",
    body: "SOC 2 compliant, encryption, and multi-sig custody protocols, operating within global compliance frameworks.",
  },
  {
    src: TransparentWallet,
    alt: "Transparent Wallet",
    title: "Transparent Wallet",
    body: "You control your funds, with clear balances, real-time visibility, and no hidden restrictions",
  },
];

function BuiltOnStability() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1440px] px-5 py-16 sm:px-6 md:py-24 lg:flex lg:min-h-[95vh] lg:flex-col lg:justify-center lg:px-0 lg:py-32"
    >
      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10 text-center lg:mb-16 lg:text-left"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl leading-tight font-semibold text-[#121733] md:text-[36px] lg:text-[40px] lg:leading-[1.08]"
        >
          Built on <span className="text-xenon">Stability,</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-3xl leading-tight font-semibold text-[#121733] md:text-[36px] lg:text-[40px] lg:leading-[1.08]"
        >
          Guarded by <span className="text-xenon">Security</span>
        </motion.p>
      </motion.div>

      {/* Cards — staggered entrance */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-3 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.1 }}
            className="flex min-h-[248px] flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm md:p-10 lg:min-h-[420px] lg:items-start lg:rounded-[28px] lg:p-10 lg:text-left"
          >
            <Image
              src={card.src}
              alt={card.alt}
              width={180}
              className="h-auto w-[140px] lg:w-[180px]"
            />
            <p className="mobile-card-title mt-4 text-[#121733] md:text-2xl lg:mt-6 lg:text-[34px] lg:leading-[1.15]">
              {card.title}
            </p>
            <p className="mobile-body mt-3 text-[#546076] lg:mt-4 lg:text-lg">
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BuiltOnStability;
