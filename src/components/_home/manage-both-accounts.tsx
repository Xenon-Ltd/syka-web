import { Switch } from "@/assets/images";
import Image from "next/image";
import React from "react";

const ManageBothAccounts = () => {
  return (
    <section className="xl:h-[458px] h-[427px] relative flex flex-col items-center py-12 xl:py-16 px-7 xl:px-0 bg-[#E4F4FB]">
      <div className="flex flex-col items-center gap-6 xl:w-[880px]">
        <p className="text-2xl xl:text-[43px] font-dmSans font-bold text-xenon-text text-center text-balance">
          Manage <span className="text-xenon-500">both</span> your accounts from
          one app
        </p>
        <p className="text-base xl:text-2xl text-[#8893A4] xl:text-balance text-center">
          Easily switch between both accounts for a smoother experience. Track
          your spending and be notified of any activity for both accounts, all
          from your Syka app.
        </p>
      </div>
      <div className="relative w-full">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 xl:w-[600px] w-screen max-w-[600px] shrink-0">
          <Image
            src={Switch}
            className="w-full h-full xl:aspect-auto object-cover"
            alt="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ManageBothAccounts;
