"use client";

import {
  ForCrossBorderBusinesses,
  ForGlobalTeamsAndContractors,
  ForSMEsAndStartupsBiz,
} from "@/assets/images";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type IndustryCard = {
  title: string;
  description: string;
  bg: string;
  image: StaticImageData;
  textColor?: string;
};

const industries: IndustryCard[] = [
  {
    title: "SMEs & Startups",
    description:
      "Receive global payments, manage multi-currency wallets, and grow without banking limits.",
    bg: "bg-linear-to-r from-[#1377BC] via-[#434FBB] to-[#9762B8]",
    image: ForSMEsAndStartupsBiz,
    textColor: "text-white",
  },
  {
    title: "Global Teams & Contractors",
    description:
      "Pay remote staff and freelancers worldwide in stable dollars, instantly and compliantly.",
    bg: "bg-[#E4F4FB]",
    image: ForGlobalTeamsAndContractors,
    textColor: "text-[#223047]",
  },
  {
    title: "Cross-Border Businesses",
    description:
      "Send, receive, and settle international transactions without delays or hidden fees.",
    bg: "bg-[#29AAE1]",
    image: ForCrossBorderBusinesses,
    textColor: "text-white",
  },
];

export default function SolutionsThatFitBusiness() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 xl:mt-20 xl:px-0">
      <div className="mb-8 xl:mb-10">
        <h2 className="text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Solutions That Fit
        </h2>
        <p className="mt-2 text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Your <span className="text-xenon">Industry</span>
        </p>
      </div>

      <div
        className="hidden h-[338px] gap-3 xl:flex"
        onMouseLeave={() => setActiveIndex(0)}
      >
        {industries.map((card, index) => {
          const isExpanded = index === activeIndex;
          const textColor = card.textColor ?? "text-[#223047]";

          return (
            <motion.div
              key={card.title}
              layout
              onMouseEnter={() => setActiveIndex(index)}
              className={`${card.bg} relative cursor-pointer overflow-hidden rounded-2xl`}
              animate={{ flex: isExpanded ? 2.2 : 1 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div layout className="h-full p-6">
                <AnimatePresence mode="wait" initial={false}>
                  {isExpanded ? (
                    <motion.div
                      key={`expanded-industry-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-full flex-col ${textColor}`}
                    >
                      <h3 className="text-[26px] leading-[1.2] font-bold">
                        {card.title}
                      </h3>
                      <p className="mt-2 max-w-[360px] text-[15px] leading-[1.7]">
                        {card.description}
                      </p>
                      <div className="relative mt-4 flex-1 overflow-hidden rounded-xl">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 1279px) 100vw, 33vw"
                          placeholder="blur"
                          className="object-cover object-center"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`collapsed-industry-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-full items-center justify-center text-center ${textColor}`}
                    >
                      <h3 className="text-[26px] leading-[1.2] font-bold">
                        {card.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="xl:hidden flex flex-col gap-4">
        {industries.map((card) => {
          const textColor = card.textColor ?? "text-[#223047]";

          return (
            <div
              key={card.title}
              className={`${card.bg} overflow-hidden rounded-2xl p-5`}
            >
              <div className={`flex flex-col ${textColor}`}>
                <h3 className="text-[22px] font-bold">{card.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.7]">{card.description}</p>
                <div className="relative mt-4 h-[190px] overflow-hidden rounded-xl">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
