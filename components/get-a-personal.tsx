"use client";

import { WomanSmilingAtPhoneNew } from "@/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

const GetAPersonalAccount = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mt-16 bg-[#E4F4FB] py-16 md:py-24 lg:mt-24 lg:flex lg:min-h-[95vh] lg:items-center lg:py-32"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col-reverse items-center justify-between gap-12 px-5 sm:px-6 md:gap-14 lg:flex-row-reverse lg:gap-20 lg:px-0">
        {/* Image — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="w-full lg:w-[620px] lg:shrink-0"
        >
          <Image
            src={WomanSmilingAtPhoneNew}
            className="h-full w-full object-cover lg:max-h-[720px] lg:rounded-[32px]"
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
          className="flex w-full flex-col text-center lg:max-w-[580px] lg:justify-center lg:text-left"
        >
          <motion.p
            variants={fadeIn}
            className="mobile-eyebrow text-[#7688A2] lg:text-[15px] lg:tracking-[0.24em]"
          >
            GET A SYKA PERSONAL ACCOUNT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-[#111831] md:text-[36px] lg:mt-5 lg:text-[40px] lg:leading-[1.08]"
          >
            The Modern Financial Stack for a{" "}
            <span className="text-xenon">Borderless</span> World
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mobile-body mt-4 max-w-full text-[#4E576A] md:text-[20px] lg:mt-6 lg:max-w-[560px] lg:text-[20px]"
          >
            A modern, borderless payments platform that helps businesses send,
            receive, and manage global payments faster, with transparent pricing
            and no unnecessary complexity.
          </motion.p>
          <motion.div variants={fadeUp}>
            <button className="mt-7 mx-auto w-fit rounded-lg bg-xenon px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 sm:mx-auto lg:mt-10 lg:mx-0 lg:text-lg">
              Get Started for free
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetAPersonalAccount;
