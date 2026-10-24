"use client";

import { TuitionDot, TuitionPaymentsImage, TuitionTriangle } from "@/assets/images";
import Image from "next/image";
import { motion } from "framer-motion";
import BusinessAction from "@/components/business/business-action";
import { personalLinks } from "@/lib/business-links";
import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/animation";

// Tuition payments card (Figma node 8750:18587). The decorations sit around
// the 436×350 photo; their offsets and sizes are the design's px values as a
// percentage of that box, so they scale with the photo on smaller screens.
// The outlines reach 9.86% past the photo's left edge and 17.7% past its
// right, so the photo keeps that room inside the card at every width.

/** A dashed rounded outline, rotated inside its bounding box as in the design. */
function DashedFrame({ box, frame, rotate, color }: { box: string; frame: string; rotate: string; color: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute flex items-center justify-center", box)}>
      <div className={cn("flex-none -scale-y-100 rounded-[18px] border-2 border-dashed", frame, rotate, color)} />
    </div>
  );
}

function TuitionVisual() {
  return (
    <div className="relative mr-[13.8%] ml-[7.7%] aspect-[436/350] w-[78%] max-w-[436px] shrink-0 sm:mx-auto lg:mr-10 lg:ml-0 lg:w-[436px]">
      <DashedFrame
        box="left-[10.67%] top-[11.89%] h-[82.94%] w-[107.04%]"
        frame="h-[90.73%] w-[96.75%]"
        rotate="rotate-[-176.52deg]"
        color="border-[#e9e9eb]"
      />
      <div aria-hidden className="absolute top-[73.4%] left-[-3.67%] h-[31.4%] w-[33.7%] rounded-2xl bg-[#dfa01e] shadow-[0px_20px_60px_0px_rgba(41,170,225,0.15)]" />
      <DashedFrame
        box="left-[-9.86%] top-[-7.71%] h-[87.73%] w-[102.58%]"
        frame="h-[67.76%] w-[91.02%]"
        rotate="rotate-[164.88deg]"
        color="border-[#d5d5d6]"
      />

      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Image
          src={TuitionPaymentsImage}
          alt="A university building with its banners hung between the columns"
          placeholder="blur"
          sizes="(max-width: 1023px) 138vw, 602px"
          className="absolute top-[-4.15%] left-[-23.57%] h-[135.35%] w-[138%] max-w-none"
        />
      </div>

      <div aria-hidden className="absolute top-[94.3%] left-[25.69%] flex h-10 w-[39px] items-center justify-center">
        <div className="relative h-9 w-[37px] flex-none rotate-[-94.64deg]">
          <Image src={TuitionTriangle} alt="" className="absolute top-0 left-1/2 -translate-x-1/2" />
        </div>
      </div>
      <Image src={TuitionDot} alt="" aria-hidden className="absolute top-[-4.57%] left-[78.9%]" />
    </div>
  );
}

export default function TuitionPayments() {
  return (
    <section aria-labelledby="tuition-heading" className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] px-5 sm:px-6")}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="overflow-hidden rounded-2xl border border-[#222] bg-xenon-primary px-6 py-12 drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)] sm:px-10 lg:py-14"
      >
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-11">
          <div className="w-full lg:max-w-[519px]">
            <p className={cn(businessStyles.eyebrow, "font-semibold text-[#f7f7f7]")}>Tuition Payments</p>
            <h2 id="tuition-heading" className={cn(businessStyles.sectionHeading, "mt-3 text-[#fdfdfd] lg:leading-[48px]")}>
              Send <span className="text-xenon">Tuition</span> Payments Across Borders Easily
            </h2>
            <p className={cn(businessStyles.body, "py-8 text-white/60 lg:max-w-[503px]")}>
              Syka helps international students pay Tuition Fees securely with better exchange rates and lower fees than traditional banks. Pay school fees with confidence. Get instant quotes, secure transactions, and complete visibility, all in one place.
            </p>
            <BusinessAction
              href={personalLinks.signup}
              className="min-h-12 rounded-lg bg-xenon-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_20px_-10px_rgba(19,119,188,0.4)]"
            >
              Pay Tuition Now
            </BusinessAction>
          </div>
          <TuitionVisual />
        </div>
      </motion.div>
    </section>
  );
}
