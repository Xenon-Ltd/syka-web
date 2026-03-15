import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
import React from "react";

function EndToEndSecurity() {
  return (
    <section className="mx-auto mt-16 flex max-w-[1292px] flex-col items-center justify-between gap-10 px-5 sm:px-6 xl:mt-24 xl:flex-row-reverse xl:gap-16 xl:px-0">
      <div className="w-full xl:w-[520px]">
        <Image
          src={EndToEndSecurityImage}
          alt="endtoend"
          sizes="(max-width: 1280px) 100vw, 520px"
          className="w-full scale-x-[-1]"
        />
      </div>
      <div className="flex w-full flex-col text-center xl:w-[460px] xl:text-left">
        <p className="text-[13px] font-semibold tracking-[0.18em] text-[#7688A2] uppercase">
          END-TO-END SECURITY
        </p>
        <h2 className="mt-3 text-[35px] leading-[1.1] font-bold tracking-[-0.01em] text-[#121733] sm:text-[44px] sm:leading-[1.08]">
          Send Money <span className="text-xenon">Globally</span> in Three
          Simple Steps
        </h2>
        <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.7] text-[#4E576A] sm:text-[16px] xl:mx-0">
          Fund your Syka wallet, move money instantly across borders, convert
          currencies when needed, and manage spending or invoice payments from a
          single platform.{" "}
        </p>
        <button className="mt-7 h-11 w-full rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors hover:bg-xenon-600 sm:mx-auto sm:w-fit xl:mx-0">
          Get Started for free
        </button>
      </div>
    </section>
  );
}

export default EndToEndSecurity;
