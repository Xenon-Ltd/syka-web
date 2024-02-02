import { ManHoldingCupTalking } from "@/assets/images";
import Image from "next/image";
import React from "react";

const OpenABusinessAccount = () => {
  return (
    <section className="xl:w-[1163px] flex flex-col xl:flex-row items-center justify-between gap-12 py-4 xl:py-0 px-7 xl:px-0 mx-auto">
      <div className="flex flex-col gap-3 xl:w-[500px]">
        <p className="text-sm xl:text-lg font-lato font-semibold text-[#7688A2] uppercase">
          OPEN A SYKA BUSINESS ACCOUNT
        </p>
        <p className="text-2xl xl:text-3xl font-dmSans font-bold text-xenon-text">
          Your <span className="text-xenon-500">business</span>, our app, your
          financial growth
        </p>
        <p className="text-base xl:text-2xl text-[#8893A4] xl:w-[439px]">
          If you have a Ghana registered business, it’s easy to open a business
          account with Syka to keep your personal and company finances separate.
          Effortlessly manage and track your spending for both accounts in a
          single app.
        </p>
        <div className="w-fit hidden xl:block">
          <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Join the waitlist
          </button>
        </div>
      </div>
      <div className="xl:w-[641px] shrink-0">
        <Image
          src={ManHoldingCupTalking}
          className="w-full h-full xl:aspect-auto object-cover"
          alt="hero-image"
        />
      </div>
      <div className="w-fit xl:hidden block">
        <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
          Join the waitlist
        </button>
      </div>
    </section>
  );
};

export default OpenABusinessAccount;
