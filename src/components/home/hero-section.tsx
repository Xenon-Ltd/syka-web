import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { HelloSyka } from "@/assets/images";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col xl:flex-row items-center justify-between gap-14 xl:h-[572px] xl:w-[1092px] mx-auto px-6 xl:px-0 xl:my-12 my-4">
      <div className="flex flex-col xl:items-start items-center w-auto xl:w-[545px] z-10">
        <h1 className="font-dmSans mb-3 xl:mb-6 font-bold text-4xl xl:text-5.5xl text-center xl:text-start text-xenon-gray leading-[49.3px] xl:leading-[76px]">
          Say <span className="text-xenon">Hello</span> to Digital Banking
        </h1>
        <div className="mb-6 xl:mb-12 flex flex-col gap-1.5">
          <p className="text-sm xl:text-lg leading-[14.74px] xl:leading-[21.6px] text-[#8893A4] text-center xl:text-start">
            Get your free bank account in just 10 minutes and manage your money
            right from your smartphone.
          </p>
          <p className="text-sm xl:text-lg leading-[14.74px] xl:leading-[21.6px] text-[#8893A4] text-center xl:text-start">
            No need for long queues anymore, discover smart features that give
            you more control over your finances.
          </p>
        </div>
        <button className="h-12 w-fit px-10 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
          Join the waitlist
        </button>
        <div className="hidden xl:flex flex-row gap-4 mt-8 ">
          <button>
            <Image
              src={AppStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="app-store-badge"
            />
          </button>
          <button>
            <Image
              src={PlayStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="app-store-badge"
            />
          </button>
        </div>
      </div>
      <div className="xl:w-[408px] shrink-0 z-10">
        <Image
          src={HelloSyka}
          className="w-full h-full xl:aspect-auto object-cover"
          alt="hero-image"
        />
      </div>
      <div className="flex xl:hidden flex-row gap-4 mt-8 ">
        <button>
          <Image
            src={AppStoreBadgeIcon}
            className="h-10 w-[135px]"
            alt="app-store-badge"
          />
        </button>
        <button>
          <Image
            src={PlayStoreBadgeIcon}
            className="h-10 w-[135px]"
            alt="app-store-badge"
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
