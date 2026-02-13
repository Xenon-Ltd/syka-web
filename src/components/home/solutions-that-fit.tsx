"use client";

import {
  ManNotificationReceived,
  ManHoldingCupTalking,
  WomanStanding,
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

  return (
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl xl:text-4xl font-bold text-gray-900">
          Solutions That Fit
        </h2>
        <p className="text-3xl xl:text-4xl font-bold text-gray-900">
          Your <span className="text-xenon">Workflow</span>
        </p>
      </div>

      {/* Desktop Accordion */}
      <div className="hidden xl:flex gap-4 h-[420px]">
        {solutions.map((solution, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={index}
              layout
              onClick={() => setActiveIndex(index)}
              className={`${solution.bg} rounded-2xl overflow-hidden cursor-pointer relative`}
              animate={{ flex: isActive ? 3 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div layout className="p-6 h-full flex flex-col">
                <motion.h3
                  layout="position"
                  className="text-lg font-bold text-gray-900"
                >
                  {solution.title}
                </motion.h3>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`content-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="flex flex-col flex-1 mt-2"
                    >
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {solution.description}
                      </p>
                      <div className="mt-4 flex-1 relative rounded-xl overflow-hidden">
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
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
        {solutions.map((solution, index) => (
          <div
            key={index}
            className={`${solution.bg} rounded-2xl overflow-hidden`}
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900">
                {solution.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                {solution.description}
              </p>
            </div>
            <div className="relative h-[280px] w-full">
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SolutionsThatFit;
