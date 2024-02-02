import { DashboardShot, WavyLineMouse } from "@/assets/images";
import Image from "next/image";
import React from "react";

const InvestInGlobal = () => {
  return (
    <section className="flex flex-row items-center justify-center px-4">
      <div className="xl:w-[1110px] xl:h-[420px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-10 rounded-[32px] overflow-clip bg-gradient-to-br from-[#1377BC] via-[#434FBB] to-[#9762B8]">
        <div className="flex flex-1 h-full flex-col pt-14 px-8 xl:py-16 xl:pl-11">
          <p className="text-2xl font-bold text-white xl:w-[460px] leading-[32px]">
            Invest in global companies’ shares buy, sell, and send digital
            currencies at the touch of a button
          </p>
          <div className="xl:w-[480px] shrink-0">
            <Image
              src={WavyLineMouse}
              className="w-full h-full xl:aspect-auto object-cover"
              alt="hero-image"
            />
          </div>
        </div>
        <div className="xl:w-[480px] xl:h-full relative pl-8 xl:pl-0">
          <div className="xl:w-[480px] h-auto xl:absolute -bottom-[1px] shrink-0">
            <Image
              src={DashboardShot}
              className="w-full h-full xl:aspect-auto object-cover"
              alt="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestInGlobal;
