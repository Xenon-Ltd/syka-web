import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { PayGlobe, PayHeroDialog } from "@/assets/images";
import Image from "next/image";
import React from "react";

const PayHeroSection = () => {
  return (
    <section className="relative flex flex-col xl:flex-row items-center justify-between gap-14 xl:h-[572px] xl:w-[1092px] mx-auto px-6 xl:px-0 xl:my-12 my-4">
      <div className="flex flex-col items-start w-auto xl:w-[545px] z-10">
        <h1 className="font-dmSans mb-3 xl:mb-6 font-bold text-2xl xl:text-[40px] text-start text-xenon-gray leading-[34px] xl:leading-[50px]">
          <span className="text-xenon">Syka Pay</span>, A Streamlined{" "}
          <span className="text-xenon">Cross-Border Payments</span> for Your
          Global Business
        </h1>
        <div className="mb-6 xl:mb-12 flex flex-col gap-1.5">
          <p className="text-base xl:text-lg leading-[28px] text-[#8893A4] text-start">
            Designed to simplify and accelerate international transactions, Syka
            Pay expands your business horizons effortlessly.
          </p>
        </div>
        <div className="hidden xl:flex flex-row gap-4 mb-8 ">
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
        <button className="h-12 w-fit px-20 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
          Start Now
        </button>
      </div>
      <div className="xl:w-[408px] shrink-0 z-10 backdrop-blur-md rounded-xl overflow-clip">
        <Image
          src={PayHeroDialog}
          className="w-full h-full xl:aspect-auto object-cover"
          alt="hero-image"
        />
      </div>
      <div className="absolute xl:w-[602px] shrink-0 z-0 xl:left-[72%] xl:top-12 top-[50%]">
        <Image
          src={PayGlobe}
          className="w-full h-full xl:aspect-auto object-cover"
          alt="hero-image"
        />
      </div>
    </section>
  );
};

export default PayHeroSection;
