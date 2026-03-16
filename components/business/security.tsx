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
      className="mt-16 bg-[#26216F] py-14 lg:mt-20 lg:flex lg:min-h-[90vh] lg:items-center lg:py-16"
    >
      <div className="mx-auto flex w-full max-w-[1292px] flex-col items-center gap-10 px-5 sm:px-6 lg:flex-row lg:justify-between lg:gap-16 lg:px-0">

        {/* Text column — slides in from left, children stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full lg:w-[570px]"
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-[13px] font-semibold tracking-[0.18em] text-[#B4B8F7] uppercase lg:text-left"
          >
            SECURITY
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-center text-[35px] leading-[1.1] font-bold text-white sm:text-[44px] lg:text-left"
          >
            Your Assets and Data Are Always{" "}
            <span className="text-[#8FE0FF]">Safe</span>
          </motion.h2>

          <div className="mt-6 grid gap-2 lg:grid-cols-2">
            {securityPoints.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.2 + index * 0.1 }}
                className="rounded-2xl px-4 py-4 text-center backdrop-blur-sm lg:text-left"
              >
                <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-white/12 text-[#8FE0FF] lg:mx-0">
                  {index === 0 ? (
                    <ShieldCheck size={24} />
                  ) : (
                    <LockKeyhole size={24} />
                  )}
                </div>
                <h3 className="text-[15px] font-bold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#D7DBFF]">
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
          className="flex h-[380px] w-full max-w-[520px] items-center justify-center rounded-2xl bg-[#1D1856] p-6"
        >
          <Image
            src={SecurityLock}
            alt="security-lock"
            sizes="(max-width: 1280px) 100vw, 520px"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
