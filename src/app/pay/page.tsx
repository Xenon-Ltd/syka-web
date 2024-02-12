import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { GrowthPartner } from "@/assets/images";
import CountriesWeSupport from "@/components/pay/countries";
import PayHeroSection from "@/components/pay/hero-section";
import HowItWorks from "@/components/pay/how-ti-works";
import UnlockTheSykaPay from "@/components/pay/unlock-the-syka-pay";
import Image from "next/image";
import React from "react";

export default function pay() {
  return (
    <main className="flex flex-col gap-[200px] min-h-screen">
      <PayHeroSection />
      <UnlockTheSykaPay />
      <HowItWorks />
      <section className="relative rounded-3xl xl:rounded-[32px] xl:h-[470px] bg-xenon flex flex-col xl:flex-row xl:w-[1211px] mx-6 xl:mx-auto xl:-mt-16">
        <div className="flex flex-col justify-between text-white h-full py-12 px-6 xl:p-14 z-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-dmSans font-bold text-3xl leading-[46px] xl:text-4.5xl xl:w-[520px]">
              Syka Pay, Where Global Commerce Finds Effortless Expression.
            </h3>
            <p className="xl:w-[600px] text-base leading-7 xl:text-lg">
              In a world where global transactions should be as straightforward
              as local ones, Syka Pay emerges as your gateway to simplified
              cross-border payments. Elevate your international transactions
              with a service crafted for efficiency, security, and convenience.
            </p>
          </div>
          <div className="flex flex-row mt-7 gap-4">
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
        <Image
          src={GrowthPartner}
          alt="growth-partner"
          className="xl:absolute xl:w-[610px] xl:h-[432px] bottom-0 xl:right-8 z-10 px-5 xl:px-0"
        />
      </section>
      <CountriesWeSupport />
      <section className="xl:h-32 h-96"></section>
    </main>
  );
}
