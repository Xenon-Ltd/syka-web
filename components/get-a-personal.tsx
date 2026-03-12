import { WomanSmilingAtPhoneNew } from "@/assets/images";
import Image from "next/image";
import React from "react";

const GetAPersonalAccount = () => {
  return (
    <section className="mt-16 bg-[#E4F4FB] py-14 xl:mt-24 xl:py-14">
      <div className="mx-auto flex max-w-[1292px] flex-col-reverse items-center justify-between gap-10 px-5 sm:px-6 xl:flex-row xl:gap-16 xl:px-0">
        <div className="w-full xl:w-[520px] xl:shrink-0">
          <Image
            src={WomanSmilingAtPhoneNew}
            className="h-full w-full object-cover"
            alt="hero-image"
            sizes="(max-width: 1280px) 100vw, 520px"
            placeholder="blur"
          />
        </div>
        <div className="flex w-full flex-col xl:w-full">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-[#7688A2] uppercase">
            GET A SYKA PERSONAL ACCOUNT
          </p>
          <h2 className="mt-3 text-[35px] leading-[1.1] font-bold tracking-[-0.01em] text-[#111831] sm:text-[44px] sm:leading-[1.08]">
            The Modern Financial Stack for a{" "}
            <span className="text-xenon">Borderless</span> World
          </h2>
          <p className="mt-4 max-w-full text-[15px] leading-[1.7] text-[#4E576A] sm:text-[16px]">
            Built for African entrepreneurs facing systemic payment barriers,
            our modern borderless platform enables fast, transparent global
            transactions without unnecessary complexity.
          </p>
          <button className="mt-7 h-11 w-full rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors hover:bg-xenon-600 sm:w-fit">
            Get Started for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetAPersonalAccount;
