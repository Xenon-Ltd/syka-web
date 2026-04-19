"use client";

import { SecurityLock } from "@/assets/images";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

const securityPoints = [
  {
    title: "Anti-Fraud Measures",
    description:
      "Constant monitoring to detect and prevent suspicious activity.",
  },
  {
    title: "Two-Factor Authentication",
    description: "Adds an extra layer of security to protect your account.",
  },
];

export default function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="bg-[#26216F] py-16 md:py-24 lg:flex lg:min-h-[95vh] lg:items-center lg:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-5 sm:px-6 lg:flex-row lg:justify-between lg:gap-24 lg:px-12 xl:px-0">

        {/* Text column — slides in from left, children stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full lg:w-[680px]"
        >
          <motion.p
            variants={fadeUp}
            className="mobile-eyebrow text-center text-[#B4B8F7] lg:text-left lg:text-[15px] lg:tracking-[0.24em]"
          >
            SECURITY
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-center text-3xl font-semibold leading-tight tracking-tight text-white md:text-[36px] lg:mt-5 lg:text-left lg:text-[40px] lg:leading-[1.08]"
          >
            Your Assets and Data Are Always{" "}
            <span className="text-[#8FE0FF]">Safe</span>
          </motion.h2>

          <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-6">
            {securityPoints.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.2 + index * 0.1 }}
                className="rounded-2xl py-8 text-center backdrop-blur-sm md:py-10 lg:min-h-[260px] lg:rounded-[28px] lg:py-8 lg:text-left"
              >
                <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-white/12 text-[#8FE0FF] lg:mx-0 lg:mb-5 lg:size-14">
                  {index === 0 ? (
                    <ShieldCheck size={24} />
                  ) : (
                    <LockKeyhole size={24} />
                  )}
                </div>
                <h3 className="text-xl font-semibold leading-snug text-white lg:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#D7DBFF] md:text-lg lg:mt-3 lg:text-lg">
                  {point.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Image card — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="flex h-[380px] w-full max-w-[520px] items-center justify-center rounded-2xl bg-[#1D1856] p-6 lg:h-[600px] lg:max-w-[680px] lg:rounded-[30px] lg:p-10"
        >
          <Image
            src={SecurityLock}
            alt="security-lock"
            sizes="(max-width: 1280px) 100vw, 620px"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
