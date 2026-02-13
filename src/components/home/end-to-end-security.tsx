import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
import React from "react";

function EndToEndSecurity() {
  return (
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0 flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-14">
      <div>
        <Image src={EndToEndSecurityImage} alt="endtoend" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm xl:text-base font-semibold uppercase text-[#7688A2] tracking-wide">
          END-TO-END SECURITY
        </p>
        <p className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mt-2">
          Send Money <span className="text-xenon-500">Globally</span> in
          Three Simple Steps
        </p>
        <p className="text-base text-gray-600 mt-3">
          Fund your Syka wallet, move money instantly across borders, convert
          currencies when needed, and manage spending or invoice payments from a
          single platform.
        </p>
        <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
          Get Started for free
        </button>
      </div>
    </section>
  );
}

export default EndToEndSecurity;
