"use client";

import {
  BankGradeSecurity,
  StablecoinPowered,
  TransparentWallet,
} from "@/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

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
    <section ref={ref} className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 lg:mt-24 lg:px-0">
      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10 text-center lg:mb-12 lg:text-left"
      >
        <motion.h2 variants={fadeUp} className="text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Built on <span className="text-xenon">Stability,</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-2 text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Guarded by <span className="text-xenon">Security</span>
        </motion.p>
      </motion.div>

      {/* Cards — staggered entrance */}
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.1 }}
            className="flex min-h-[248px] flex-col items-center rounded-2xl bg-white p-7 text-center shadow-sm lg:items-start lg:text-left"
          >
            <Image src={card.src} alt={card.alt} width={74} />
            <p className="mt-4 text-[22px] leading-[1.2] font-bold text-[#121733]">
              {card.title}
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-[#546076]">
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BuiltOnStability;
