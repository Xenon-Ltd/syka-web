"use client";

import {
  ForFreelancersAndRemoteWorkers,
  ForSMEsAndStartups,
  ForDigitalNomadsAndExpats,
} from "@/assets/images";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Solution {
  title: string;
  description: string;
  image: StaticImageData;
  bg: string;
}

const solutions: Solution[] = [
  {
    title: "For Freelancers & Remote Workers",
    description:
      "Invoice clients globally, get paid in USD or EUR, and convert to your local currency with minimal loss.",
    image: ForFreelancersAndRemoteWorkers,
    bg: "bg-[#E4F4FB]",
  },
  {
    title: "For SMEs & Startups",
    description:
      "Pay global contractors and suppliers instantly, while managing multi-currency cash flow without high bank fees.",
    image: ForSMEsAndStartups,
    bg: "bg-[#E8F5E8]",
  },
  {
    title: "For Digital Nomads & Expats",
    description:
      "Send money home affordably and spend anywhere online with your virtual card with no foreign transaction fees.",
    image: ForDigitalNomadsAndExpats,
    bg: "bg-[#FDE8E8]",
  },
];

function SolutionsThatFit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);

  return (
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900">
          Solutions That Fit
        </h2>
        <p className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900">
          Your <span className="text-xenon">Workflow</span>
        </p>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden xl:flex gap-4 h-[420px]">
        {solutions.map((solution, index) => {
          const isExpanded = index === activeIndex;
          return (
            <motion.div
              key={index}
              layout
              onClick={() => setActiveIndex(index)}
              className={`${solution.bg} rounded-2xl overflow-hidden cursor-pointer relative`}
              animate={{ flex: isExpanded ? 3 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div layout className="h-full p-6">
                <AnimatePresence mode="wait" initial={false}>
                  {isExpanded ? (
                    <motion.div
                      key={`expanded-desktop-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-full flex-col"
                    >
                      <h3 className="text-lg font-bold text-gray-900">
                        {solution.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {solution.description}
                      </p>
                      <div className="relative mt-4 flex-1 overflow-hidden rounded-xl">
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`collapsed-desktop-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-full items-center justify-center text-center"
                    >
                      <h3 className="text-lg font-bold text-gray-900">
                        {solution.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Stacked Layout */}
      <div className="xl:hidden flex flex-col gap-6">
        {solutions.map((solution, index) => {
          const isExpanded = mobileActiveIndex === index;
          return (
            <motion.div
              key={index}
              layout
              onClick={() => setMobileActiveIndex(index)}
              className={`${solution.bg} cursor-pointer overflow-hidden rounded-2xl p-5`}
              animate={{ height: isExpanded ? 430 : 180 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isExpanded ? (
                  <motion.div
                    key={`expanded-mobile-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-full flex-col"
                  >
                    <h3 className="text-base font-bold text-gray-900 md:text-lg">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {solution.description}
                    </p>
                    <div className="relative mt-4 flex-1 overflow-hidden rounded-xl">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`collapsed-mobile-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-full items-center justify-center text-center"
                  >
                    <h3 className="text-base font-bold text-gray-900 md:text-lg">
                      {solution.title}
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionsThatFit;
