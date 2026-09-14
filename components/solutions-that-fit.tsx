"use client";

import {
  ForFreelancersAndRemoteWorkers,
  ForSMEsAndStartups,
  ForDigitalNomadsAndExpats,
} from "@/assets/images";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_IN_OUT,
} from "@/lib/animation";

type IndustryCard = {
  title: string;
  description: string;
  image: StaticImageData;
  bg: string;
  textColor?: string;
};

const industries: IndustryCard[] = [
  {
    title: "For Freelancers & Remote Workers",
    description:
      "Invoice clients globally, get paid in USD or EUR, and convert to your local currency with minimal loss.",
    image: ForFreelancersAndRemoteWorkers,
    bg: "bg-[#E4F4FB]",
    textColor: "text-[#223047]",
  },
  {
    title: "For SMEs & Startups",
    description:
      "Pay global contractors and suppliers instantly, while managing multi-currency cash flow without high bank fees.",
    image: ForSMEsAndStartups,
    bg: "bg-[#FDE8E8]",
    textColor: "text-[#223047]",
  },
  {
    title: "For Digital Nomads & Expats",
    description:
      "Send money home affordably and spend anywhere online with your virtual card with no foreign transaction fees.",
    image: ForDigitalNomadsAndExpats,
    bg: "bg-[#c9f5f6]",
    textColor: "text-[#223047]",
  },
];

function SolutionsThatFit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1268px] px-5 py-16 sm:px-6 md:py-24 lg:py-32"
    >
      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-4 text-center md:mb-4 lg:mb-10 lg:text-left"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold leading-tight text-xenon-gray md:text-[36px] lg:text-[40px] lg:leading-[52px]"
        >
          Solutions That Fit
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-3xl font-bold leading-tight text-xenon-gray md:text-[36px] lg:text-[40px] lg:leading-[52px]"
        >
          Your <span className="text-xenon-brand">Workflow</span>
        </motion.p>
      </motion.div>

      {/* Desktop accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_IN_OUT, delay: 0.15 }}
        className="hidden gap-6 lg:flex lg:h-[375px] lg:gap-6"
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
              onFocus={() => setActiveIndex(index)}
              tabIndex={0}
              className={`${card.bg} relative cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon`}
              animate={{ flex: isExpanded ? 2.2 : 1 }}
              transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            >
              <motion.div layout className="h-full p-4 lg:p-6">
                <AnimatePresence mode="wait" initial={false}>
                  {isExpanded ? (
                    <motion.div
                      key={`expanded-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE_IN_OUT }}
                      className={`flex h-full items-stretch gap-5 ${textColor}`}
                    >
                      <div className="flex min-w-0 flex-1 flex-col items-center justify-center text-center xl:items-start xl:text-left">
                        <h3 className="text-xl leading-snug font-semibold md:text-2xl lg:text-2xl lg:leading-snug">
                          {card.title}
                        </h3>
                        <p className="mt-3 max-w-[280px] text-base leading-relaxed lg:mt-4 lg:max-w-[360px] lg:text-lg">
                          {card.description}
                        </p>
                      </div>
                      <div className="relative w-[46%] overflow-hidden rounded-xl lg:rounded-[24px]">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 1023px) 100vw, 33vw"
                          placeholder="blur"
                          className="object-cover object-center"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`collapsed-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`flex h-full items-center justify-center text-center ${textColor}`}
                    >
                      <h3 className="text-xl leading-snug font-semibold md:text-2xl lg:px-4 lg:text-2xl lg:leading-snug">
                        {card.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile stack */}
      <div className="flex flex-col gap-6 lg:hidden">
        {industries.map((card, i) => {
          const textColor = card.textColor ?? "text-[#223047]";
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                ease: EASE_IN_OUT,
                delay: i * 0.08,
              }}
              className={`${card.bg} overflow-hidden rounded-2xl p-8 text-center`}
            >
              <div
                className={`flex h-full flex-col items-center text-center ${textColor}`}
              >
                <h3 className="mobile-card-title">{card.title}</h3>
                <p className="mobile-body mt-2 max-w-[32ch]">
                  {card.description}
                </p>
                <div className="relative mt-4 h-[260px] w-full overflow-hidden rounded-xl sm:h-[280px]">
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionsThatFit;
