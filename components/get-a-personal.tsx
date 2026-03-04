import { WomanSmilingAtPhoneNew } from "@/assets/images";
import Image from "next/image";
import React from "react";

const GetAPersonalAccount = () => {
  return (
    <section className="mt-20 bg-[#E4F4FB] py-16 xl:mt-24 xl:py-14">
      <div className="mx-auto flex max-w-[1092px] flex-col-reverse items-center justify-between gap-12 px-6 xl:flex-row xl:gap-16 xl:px-0">
        <div className="w-full xl:w-[520px] xl:shrink-0">
          <Image
            src={WomanSmilingAtPhoneNew}
            className="h-full w-full object-cover"
            alt="hero-image"
          />
        </div>
        <div className="flex w-full flex-col xl:w-[476px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#7688A2] uppercase">
            GET A SYKA PERSONAL ACCOUNT
          </p>
          <h2 className="mt-3 text-[40px] leading-[1.08] font-bold tracking-[-0.01em] text-[#111831]">
            The Modern Financial Stack for a{" "}
            <span className="text-xenon">Borderless</span> World
          </h2>
          <p className="mt-4 max-w-[430px] text-[15px] leading-[1.7] text-[#4E576A]">
            A modern, borderless payments platform that helps businesses send,
            receive, and manage global payments faster, with transparent pricing
            and no unnecessary complexity.
          </p>
          <button className="mt-7 h-11 w-fit rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
            Get Started for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetAPersonalAccount;
