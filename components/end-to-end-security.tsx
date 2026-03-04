import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
import React from "react";

function EndToEndSecurity() {
  return (
    <section className="mx-auto mt-20 flex max-w-[1092px] flex-col items-center justify-between gap-10 px-6 xl:mt-24 xl:flex-row-reverse xl:gap-16 xl:px-0">
      <div className="w-full xl:w-[520px]">
        <Image
          src={EndToEndSecurityImage}
          alt="endtoend"
          className="w-full scale-x-[-1]"
        />
      </div>
      <div className="flex w-full flex-col xl:w-[460px]">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#7688A2] uppercase">
          END-TO-END SECURITY
        </p>
        <h2 className="mt-3 text-[40px] leading-[1.08] font-bold tracking-[-0.01em] text-[#121733]">
          Send Money <span className="text-xenon">Globally</span> in Three
          Simple Steps
        </h2>
        <p className="mt-4 max-w-[440px] text-[15px] leading-[1.7] text-[#4E576A]">
          Fund your Syka wallet, move money instantly across borders, convert
          currencies when needed, and manage spending or invoice payments from a
          single platform.
        </p>
        <button className="mt-7 h-11 w-fit rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
          Get Started for free
        </button>
      </div>
    </section>
  );
}

export default EndToEndSecurity;
