"use client";
import { ArrowRightCircleIcon } from "lucide-react";

// lottie files
import SendAnimation from "@/assets/lottie-files/Send.json";
import Lottie from "lottie-react";

export default function Solutions() {
  return (
    <section className="mt-16 bg-[#E8F4FB] py-14 xl:mt-20 xl:py-16">
      <div className="mx-auto flex max-w-[1092px] flex-col items-center gap-10 px-5 sm:px-6 xl:flex-row xl:justify-between xl:gap-16 xl:px-0">
        <div className="w-full xl:w-[470px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#7A89A2] uppercase">
            SOLUTIONS
          </p>
          <h2 className="mt-3 text-[32px] leading-[1.1] font-bold text-[#121733] sm:text-[38px]">
            <span className="text-xenon">Global</span> Payment Collection
          </h2>
          <p className="mt-4 max-w-[420px] text-sm leading-[1.7] text-[#4D576C] sm:text-[15px]">
            Collect, hold, and settle in multiple currencies with transparent
            conversion rates and complete control over your treasury.
          </p>
          <button className="mt-7 flex h-11 items-center gap-2 rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
            <span>Get started for free</span>
          </button>
        </div>

        <div className="flex h-[350px] w-full max-w-[420px] items-center justify-center ">
          <Lottie animationData={SendAnimation} />
        </div>
      </div>
    </section>
  );
}
