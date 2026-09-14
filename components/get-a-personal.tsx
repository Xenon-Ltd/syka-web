"use client";

import { WomanSmilingAtPhoneNew } from "@/assets/images";
import Image from "next/image";
import BusinessAction from "@/components/business/business-action";
import { personalLinks } from "@/lib/business-links";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

const GetAPersonalAccount = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="personal-value bg-[#E4F4FB] py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1268px] flex-col-reverse items-center justify-between gap-12 px-5 sm:px-6 md:gap-14 xl:flex-row-reverse xl:gap-20 xl:min-h-[567px]">
        {/* Image — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="w-full xl:w-[608px] xl:shrink-0"
        >
          <Image
            src={WomanSmilingAtPhoneNew}
            className="h-full w-full object-cover xl:h-[567px] lg:rounded-2xl"
            alt="hero-image"
            sizes="(max-width: 1280px) 100vw, 620px"
            placeholder="blur"
          />
        </motion.div>

        {/* Text — staggered fade up */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex w-full flex-col text-center xl:max-w-[532px] lg:justify-center lg:text-left"
        >
          <motion.p
            variants={fadeIn}
            className="text-lg leading-[22px] text-[#8893A4]"
          >
            GET A SYKA PERSONAL ACCOUNT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl leading-tight font-bold text-xenon-gray md:text-[36px] lg:mt-3 lg:text-[40px] lg:leading-[56px]"
          >
            The Modern Financial Stack for a{" "}
            <span className="text-xenon-brand">Borderless</span> World
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[445px] text-xl leading-7 text-[#8893A4]"
          >
            Built for African entrepreneurs facing systemic payment barriers, our modern borderless platform enables fast, transparent global transactions without unnecessary complexity.
          </motion.p>
          <motion.div variants={fadeUp}>
            <BusinessAction href={personalLinks.signup} className="mt-7 mx-auto w-fit rounded-lg bg-xenon-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 sm:mx-auto lg:mt-10 lg:mx-0 lg:text-sm">
              Get Started for free
            </BusinessAction>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetAPersonalAccount;
