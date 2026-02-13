import Image from "next/image";
import React from "react";
import { GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import { SendMoneyGlobally } from "@/assets/images";
import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";

function Hero() {
  const countryFlags = [GH, NG, GB, US, MORE];
  return (
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0 xl:mt-12 mt-4">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-14">
        <div className="w-full xl:w-1/2">
          <div className="text-base md:text-2xl flex gap-4 items-center">
            <p>Available in</p>
            <div className="flex items-center gap-1">
              {countryFlags.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt="country-flag"
                  width={32}
                  height={32}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-2xl md:text-3xl xl:text-4xl font-bold leading-tight my-4 text-gray-900">
              Send Money <span>Globally,</span> Without the heavy fees.
            </p>
            <p className="text-base text-gray-600">
              Go beyong transfers. spend, receive, and manage your global
              business with virtual accounts & cards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="h-12 w-fit px-10 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
                Get Started
              </button>
              <button className="h-12 border px-10 rounded-lg border-xenon-300">
                See How It Works
              </button>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <Image src={SendMoneyGlobally} alt="phone-image" width={500} className="w-full max-w-[500px]" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
