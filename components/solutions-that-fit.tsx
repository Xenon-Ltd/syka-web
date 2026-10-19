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
    image: ForFreelancersAndRemoteWorkers,
    alt: "A freelancer working on a laptop from his sofa",
    offset: "lg:self-center",
    imageClass: "object-cover object-bottom",
    shade: "bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_21.8%,rgba(102,102,102,0)_63.5%)]",
    titleClass: "max-w-[320px] lg:mt-8",
  },
  {
    title: "For SMEs & Startups",
    image: ForSMEsAndStartups,
    alt: "A small team talking over coffee in their office",
    offset: "lg:self-end",
    imageClass: "object-cover object-center",
    shade: "bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_14.4%,rgba(102,102,102,0)_67.5%)]",
    titleClass: "max-w-[300px] lg:mt-[54px]",
  },
  {
    title: "For Digital Nomads & Expats",
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

      <ul className="grid gap-6 sm:grid-cols-2 lg:h-[580px] lg:grid-cols-3">
        {industries.map((card, index) => (
          <motion.li
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + index * 0.08 }}
            className={cn(
              "relative isolate aspect-[390/471] overflow-hidden rounded-[24px] lg:rounded-[32px]",
              index === 2 && "sm:col-span-2 sm:aspect-[16/9] lg:col-span-1 lg:aspect-[390/471]",
              card.offset,
            )}
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 390px"
              className={cn("-z-10", card.imageClass)}
            />
            <div aria-hidden className={cn("absolute inset-0 -z-10", card.shade)} />
            <h3 className="px-6 pt-6 text-[26px] leading-[1.35] font-bold text-white lg:px-8 lg:pt-0 lg:text-[32px] lg:leading-[44.8px]">
              <span className={cn("block", card.titleClass)}>{card.title}</span>
            </h3>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default SolutionsThatFit;
