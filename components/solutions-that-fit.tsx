"use client";

import {
  ForFreelancersAndRemoteWorkers,
  ForSMEsAndStartups,
  ForDigitalNomadsAndExpats,
} from "@/assets/images";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

type IndustryCard = {
  title: string;
  /** Revealed on hover or focus, over a navy panel. */
  description: string;
  image: StaticImageData;
  alt: string;
  /** Desktop placement in the 580px-tall row, as in the design. */
  offset: string;
  imageClass: string;
  /** Darkening behind the title so it reads on the photo. */
  shade: string;
  /** Title width and top inset, from the design. */
  titleClass: string;
};

const industries: IndustryCard[] = [
  {
    title: "For Freelancers & Remote Workers",
    description:
      "Invoice clients globally, get paid in USD or EUR, and convert to your local currency with minimal loss.",
    image: ForFreelancersAndRemoteWorkers,
    alt: "A freelancer working on a laptop from his sofa",
    offset: "lg:self-center",
    imageClass: "object-cover object-bottom",
    shade: "bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_21.8%,rgba(102,102,102,0)_63.5%)]",
    titleClass: "max-w-[320px] lg:mt-8",
  },
  {
    title: "For SMEs & Startups",
    description:
      "Pay global contractors and suppliers instantly, while managing multi-currency cash flow without high bank fees.",
    image: ForSMEsAndStartups,
    alt: "A small team talking over coffee in their office",
    offset: "lg:self-end",
    imageClass: "object-cover object-center",
    shade: "bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_14.4%,rgba(102,102,102,0)_67.5%)]",
    titleClass: "max-w-[300px] lg:mt-[54px]",
  },
  {
    title: "For Digital Nomads & Expats",
    description:
      "Send money home affordably and spend anywhere online with your virtual card with no foreign transaction fees.",
    image: ForDigitalNomadsAndExpats,
    alt: "A traveller checking her phone on a city street",
    offset: "lg:self-center",
    imageClass: "object-cover object-[55%_center]",
    shade: "bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(102,102,102,0.5)_37.8%)]",
    titleClass: "max-w-[292px] lg:mt-[54px]",
  },
];

function SolutionsThatFit() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1268px] px-5 py-16 sm:px-6 md:py-24 lg:py-32"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-8 text-center lg:mb-10 lg:text-left"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold leading-tight text-xenon-gray md:text-[36px] lg:text-[40px] lg:leading-[52px]"
        >
          Solutions That Fit
          <br />
          Your <span className="text-xenon-brand">Workflow</span>
        </motion.h2>
      </motion.div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:h-[480px] lg:grid-cols-3 xl:h-[580px]">
        {industries.map((card, index) => (
          <motion.li
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + index * 0.08 }}
            // Focusable so keyboard and touch users can reveal the description too.
            tabIndex={0}
            className={cn(
              "group relative isolate flex aspect-[390/471] flex-col overflow-hidden rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-xenon focus-visible:ring-offset-4 lg:rounded-[32px]",
              index === 2 && "sm:col-span-2 sm:aspect-[16/9] lg:col-span-1 lg:aspect-[390/471]",
              card.offset,
            )}
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              placeholder="blur"
              sizes={index === 2 ? "(max-width: 1023px) 100vw, 390px" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 390px"}
              className={cn("-z-10", card.imageClass)}
            />
            <div aria-hidden className={cn("absolute inset-0 -z-10", card.shade)} />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-xenon-primary opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            />
            <h3 className="px-6 pt-6 text-[26px] leading-[1.35] font-bold text-white lg:pt-0 xl:px-8 xl:text-[32px] xl:leading-[44.8px]">
              <span className={cn("block", card.titleClass)}>{card.title}</span>
            </h3>
            <p className="mt-auto max-w-[340px] translate-y-3 px-6 pb-6 text-base leading-[1.6] text-white opacity-0 transition-[opacity,translate] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none xl:px-8 xl:pb-10 xl:text-lg">
              {card.description}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default SolutionsThatFit;
