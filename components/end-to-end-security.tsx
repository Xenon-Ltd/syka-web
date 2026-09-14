"use client";

import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
import BusinessAction from "@/components/business/business-action";
import { businessLinks } from "@/lib/business-links";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

function EndToEndSecurity() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="personal-how mx-auto flex max-w-[1268px] flex-col-reverse items-center justify-between gap-12 px-5 py-16 sm:px-6 md:gap-14 md:py-24 lg:flex-row-reverse lg:items-center lg:gap-16 lg:py-32"
    >
      {/* Image — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="w-full lg:w-1/2 lg:shrink-0"
        >
          <Image
            src={EndToEndSecurityImage}
            alt="endtoend"
            sizes="(max-width: 1280px) 100vw, 620px"
            className="mx-auto w-full max-w-[500px] scale-x-[-1]"
          />
        </motion.div>

      {/* Text — staggered fade up */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex w-full flex-col text-center lg:w-1/2 lg:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="text-lg leading-[22px] text-[#8893A4]"
          >
            END-TO-END SECURITY
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl leading-tight font-bold text-xenon-gray md:text-[36px] lg:mt-5 lg:text-[40px] lg:leading-[48px]"
          >
            Send Money <span className="text-xenon-brand">Globally</span> in Three
            Simple Steps
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[520px] text-xl leading-7 text-[#8893A4] lg:mx-0"
          >
            Fund your Syka wallet, move money instantly across borders, convert
            currencies when needed, and manage spending or invoice payments from a
            single platform.
          </motion.p>
          <motion.div variants={fadeUp}>
            <BusinessAction href={businessLinks.signup} className="mt-7 w-full rounded-lg bg-xenon-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 sm:mx-auto sm:w-fit lg:mt-10 lg:mx-0 lg:text-sm">
              Get Started for free
            </BusinessAction>
          </motion.div>
        </motion.div>
    </section>
  );
}

export default EndToEndSecurity;
