import { WomanSmilingAtPhoneNew } from "@/assets/images";
import Image from "next/image";
import React from "react";

const GetAPersonalAccount = () => {
  return (
    <section className="py-16 xl:py-24 bg-[#E4F4FB]">
      <div className="max-w-[1092px] mx-auto px-6 xl:px-0 flex flex-col-reverse xl:flex-row gap-12 xl:gap-20 items-center justify-between">
        <div className="xl:w-[525px] shrink-0">
          <Image
            src={WomanSmilingAtPhoneNew}
            className="w-full h-full xl:aspect-auto object-cover"
            alt="hero-image"
          />
        </div>
        <div className="flex flex-col gap-3 xl:w-[492px]">
          <p className="text-sm xl:text-lg font-lato font-semibold text-[#7688A2] uppercase">
            GET A SYKA PERSONAL ACCOUNT
          </p>
          <p className="text-3xl xl:text-4xl font-dmSans font-bold text-gray-900">
            The Modern Financial Stack for a{" "}
            <span className="text-xenon-500">Borderless</span> World
          </p>
          <p className="text-base xl:text-lg text-gray-600 max-w-md">
            A modern, borderless payments platform that helps businesses send,
            receive, and manage global payments faster, with transparent pricing
            and no unnecessary complexity.{" "}
          </p>
          <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Get Started for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetAPersonalAccount;
