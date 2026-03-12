"use client";
import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { GH, GB, NG, US, MORE } from "@/assets/icons/countries";
import Lottie from "lottie-react";
import Image from "next/image";
import WorldMapAnimation from "@/assets/lottie-files/Map.json";
import CompaniesMarquee from "@/components/business/companies-marquee";

const countryFlags = [GH, NG, GB, US, MORE];

export default function PowerYourBusiness() {
  return (
    <section className="mx-auto mt-8 max-w-[1292px] px-5 sm:px-6 xl:mt-14 xl:px-0">
      <div className="mx-auto max-w-[740px] text-center">
        <div className="flex items-center justify-center gap-1.5">
          {countryFlags.map((flag, index) => (
            <Image
              key={index}
              src={flag}
              alt="country flag"
              width={24}
              height={24}
              className="size-6"
            />
          ))}
          <p className="ml-2 text-xs text-[#657089] sm:text-sm">
            Over 2000 businesses in 27 countries and still growing
          </p>
        </div>

        <h1 className="mt-4 text-[34px] leading-[1.1] font-bold text-[#121733] sm:text-[52px]">
          Power Your Business With{" "}
          <span className="text-xenon">Borderless</span> Payments.
        </h1>
        <p className="mx-auto mt-4 max-w-[470px] text-sm leading-[1.7] text-[#505A6E] sm:text-[15px]">
          Level the playing ground for African businesses.{" "}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button className="h-11 rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
            Get started now
          </button>
          <button className="h-11 rounded-lg border border-[#C9D6E4] px-7 text-sm font-semibold text-[#324258] transition-colors hover:bg-[#F3F7FB]">
            See How It Works
          </button>
        </div>
      </div>

      <div className="mt-8"></div>
      <Lottie animationData={WorldMapAnimation} loop={true} autoplay />

      <div className="mt-14 flex flex-col items-center text-center xl:mt-16 md:mb-16">
        <p className="text-[28px] leading-[1.2] font-bold text-[#121733] sm:text-[36px]">
          Instant Payments, <span className="text-xenon">Zero</span> Limits
        </p>
        <p className="mt-2 text-xs text-[#657089] sm:text-sm">
          Simple, fast and transparent global payments
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button aria-label="Google Play">
            <Image
              src={PlayStoreBadgeIcon}
              alt="google-play-badge"
              className="h-10 w-[135px]"
            />
          </button>
          <button aria-label="App Store">
            <Image
              src={AppStoreBadgeIcon}
              alt="app-store-badge"
              className="h-10 w-[135px]"
            />
          </button>
        </div>

        <CompaniesMarquee />
      </div>
    </section>
  );
}
