import { WomanSmilingAtPhone } from "@/assets/images";
import Image from "next/image";
import React from "react";

const GetAPersonalAccount = () => {
  return (
    <section className="flex items-center justify-center xl:h-[700px] py-16 xl:py-0 px-7 xl:px-0 bg-[#E4F4FB]">
      <div className="w-[1128px] flex flex-col-reverse xl:flex-row gap-20 items-center justify-between mx-auto">
        <div className="xl:w-[525px] shrink-0">
          <Image
            src={WomanSmilingAtPhone}
            className="w-full h-full xl:aspect-auto object-cover"
            alt="hero-image"
          />
        </div>
        <div className="flex flex-col gap-3 xl:w-[492px]">
          <p className="text-sm xl:text-lg font-lato font-semibold text-[#7688A2] uppercase">
            GET A SYKA PERSONAL ACCOUNT
          </p>
          <p className="text-2xl xl:text-3xl font-dmSans font-bold text-xenon-text">
            Take <span className="text-xenon-500">control</span> of your
            financial life
          </p>
          <p className="text-base xl:text-2xl text-[#8893A4] xl:w-[439px]">
            Open a free account right from your phone. Create saving jar, split
            bills and do everything you used to do in a branch on your phone.
          </p>
          <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Join the waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetAPersonalAccount;
