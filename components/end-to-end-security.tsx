"use client";

import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
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
      className="mx-auto mt-16 flex max-w-[1292px] flex-col-reverse items-center justify-between gap-10 px-5 sm:px-6 lg:mt-24 lg:flex-row-reverse lg:gap-16 lg:px-0"
    >
      {/* Image — slides in from right */}
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="w-full lg:w-[520px]"
      >
        <Image
          src={EndToEndSecurityImage}
          alt="endtoend"
          sizes="(max-width: 1280px) 100vw, 520px"
          className="w-full scale-x-[-1]"
        />
      </motion.div>

      {/* Text — staggered fade up */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex w-full flex-col text-center lg:w-[460px] lg:text-left"
      >
        <motion.p
          variants={fadeUp}
          className="text-[13px] font-semibold tracking-[0.18em] text-[#7688A2] uppercase"
        >
          END-TO-END SECURITY
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-3 text-[35px] leading-[1.1] font-bold tracking-[-0.01em] text-[#121733] sm:text-[44px] sm:leading-[1.08]"
        >
          Send Money <span className="text-xenon">Globally</span> in Three
          Simple Steps
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.7] text-[#4E576A] sm:text-[16px] lg:mx-0"
        >
          Fund your Syka wallet, move money instantly across borders, convert
          currencies when needed, and manage spending or invoice payments from a
          single platform.
        </motion.p>
        <motion.div variants={fadeUp}>
          <button className="mt-7 h-11 w-full rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 sm:mx-auto sm:w-fit lg:mx-0">
            Get Started for free
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default EndToEndSecurity;
