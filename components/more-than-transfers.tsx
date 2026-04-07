"use client";

import {
  GetPaidFaster,
  LightningFlowTransfers,
  LocalPresence,
  SpendableBalance,
} from "@/assets/images";
import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

export default function MoreThanTransfers() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 lg:mt-24 lg:flex lg:min-h-[95vh] lg:flex-col lg:justify-center lg:px-0"
    >
      {/* Heading — staggered */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10 text-center lg:mb-16 lg:text-left"
      >
        <motion.h2
          variants={fadeUp}
          className="text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px] lg:text-[58px] lg:leading-[1.02]"
        >
          More Than Transfers.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px] lg:text-[58px] lg:leading-[1.02]"
        >
          Your Complete <span className="text-xenon">Treasury</span> Toolkit
        </motion.p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1.03fr_0.77fr] lg:gap-6">
        <div className="grid gap-4 lg:gap-6">
          {/* Card 1 */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
            className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl bg-[#2CA4E8] text-white lg:min-h-[320px] lg:flex-row lg:rounded-[30px]"
          >
            <div className="flex flex-1 flex-col items-start justify-center p-5 text-left sm:p-7 lg:p-10">
              <h3 className="max-w-[320px] text-[26px] leading-[1.15] font-bold sm:text-[29px] lg:max-w-[360px] lg:text-[38px] lg:leading-[1.05]">
                Get Paid Faster, On Your Terms
              </h3>
              <p className="mt-3 max-w-[340px] text-[15px] leading-[1.6] text-white/90 lg:mt-4 lg:max-w-[420px] lg:text-[18px] lg:leading-[1.75]">
                Generate and send sleek, professional invoices in multiple currencies.
              </p>
              <button className="mt-4 flex items-center gap-2 text-[15px] text-white transition-[gap] duration-300 ease-out group-hover:gap-3 lg:mt-6 lg:text-[17px]">
                <span>Get Now</span>
                <ArrowRightCircleIcon size={18} />
              </button>
            </div>
            <div className="relative h-52 w-full shrink-0 lg:min-h-[320px] lg:h-auto lg:w-[300px]">
              <Image
                src={GetPaidFaster}
                alt="Get Paid Faster"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                placeholder="blur"
                className="p-0 object-contain object-right-bottom transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </motion.article>

          {/* Card 2 */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.13 }}
            className="group flex min-h-[255px] flex-col overflow-hidden rounded-2xl bg-[#F5F8FC] lg:min-h-[320px] lg:flex-row lg:rounded-[30px]"
          >
            <div className="flex flex-1 flex-col items-start justify-center p-5 text-left sm:p-7 lg:p-10">
              <h3 className="max-w-[280px] text-[26px] leading-[1.15] font-bold text-[#121733] sm:text-[29px] lg:max-w-[360px] lg:text-[38px] lg:leading-[1.05]">
                Lightning-Flow Transfers
              </h3>
              <p className="mt-3 max-w-[320px] text-[15px] leading-[1.6] text-[#505A6E] lg:mt-4 lg:max-w-[420px] lg:text-[18px] lg:leading-[1.75]">
                Send USDT globally, pay multiple recipients, and automate recurring payments with no banks or delays.
              </p>
              <button className="mt-4 flex items-center gap-2 text-[15px] text-xenon transition-[gap] duration-300 ease-out group-hover:gap-3 lg:mt-6 lg:text-[17px]">
                <span>Get Now</span>
                <ArrowRightCircleIcon size={18} />
              </button>
            </div>
            <div className="relative h-52 w-full shrink-0 lg:min-h-[320px] lg:h-auto lg:w-[300px]">
              <Image
                src={LightningFlowTransfers}
                alt="Lightning-Flow Transfers"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="p-0 object-contain object-right-bottom transition-transform duration-500 ease-out group-hover:scale-125"
              />
            </div>
          </motion.article>
        </div>

        {/* Card 3 — tall right column */}
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.2 }}
          className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#2A85D8] to-[#5E49C7] p-5 text-left text-white lg:min-h-[650px] lg:rounded-[30px] lg:p-10"
        >
          <h3 className="text-[26px] leading-[1.15] font-bold sm:text-[29px] lg:text-[38px] lg:leading-[1.05]">
            Spendable Balance
          </h3>
          <p className="mt-3 max-w-[290px] text-[15px] leading-[1.6] text-white/90 lg:mt-4 lg:max-w-[360px] lg:text-[18px] lg:leading-[1.75]">
            Create secure, disposable virtual debit cards directly from your Syka balance
          </p>
          <button className="mt-6 flex items-center gap-2 text-[15px] text-white transition-[gap] duration-300 ease-out group-hover:gap-3 lg:mt-8 lg:text-[17px]">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
          <div className="relative mt-auto mb-[-30px] h-[260px] w-full lg:mb-[-40px] lg:h-[420px]">
            <Image
              src={SpendableBalance}
              alt="Spendable Balance"
              fill
              sizes="(max-width: 640px) 100vw, 420px"
              placeholder="blur"
              className="origin-bottom object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
        </motion.article>
      </div>

      {/* Card 4 — full width bottom */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.28 }}
        className="group mt-4 flex min-h-[430px] flex-col overflow-hidden rounded-2xl bg-[#CFF1F4] lg:mt-6 lg:min-h-[440px] lg:flex-row lg:rounded-[30px]"
      >
        <div className="flex flex-1 flex-col items-start justify-center p-5 text-left sm:p-7 lg:p-10">
          <h3 className="max-w-[300px] text-[26px] leading-[1.15] font-bold text-[#121733] sm:text-[29px] lg:max-w-[420px] lg:text-[38px] lg:leading-[1.05]">
            Your Local Presence, Anywhere
          </h3>
          <p className="mt-3 max-w-[360px] text-[15px] leading-[1.6] text-[#505A6E] lg:mt-4 lg:max-w-[460px] lg:text-[18px] lg:leading-[1.75]">
            Get dedicated virtual account details in major currencies (USD, EUR, GBP)
          </p>
          <button className="mt-4 flex items-center gap-2 text-[15px] text-xenon transition-[gap] duration-300 ease-out group-hover:gap-3 lg:mt-6 lg:text-[17px]">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
        </div>
        <div className="relative h-64 w-full shrink-0 lg:min-h-[340px] lg:h-[460px] lg:w-[430px]">
          <Image
            src={LocalPresence}
            alt="Local Presence"
            fill
            sizes="(max-width: 768px) 100vw, 430px"
            placeholder="blur"
            className="object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-105 lg:mt-6 lg:object-cover lg:object-right lg:pr-12"
          />
        </div>
      </motion.article>
    </section>
  );
}
