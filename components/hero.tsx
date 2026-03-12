import Image from "next/image";
import React from "react";
import { GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { PhoneWithFrame } from "@/assets/images";

function Hero() {
  const countryFlags = [GH, NG, GB, US, MORE];
  return (
    <section className="mx-auto mt-4 max-w-[1292px] px-5 sm:px-6 xl:mt-8 xl:px-0">
      <div className="mt-6 flex flex-col items-center justify-between gap-10 xl:mt-18 xl:flex-row xl:gap-16">
        <div className="w-full xl:w-[510px]">
          <div className="flex items-center gap-3 text-[13px] text-[#6A7284] sm:text-[16px] xl:gap-4 xl:text-[18px]">
            <p>Available in</p>
            <div className="flex items-center gap-1.5">
              {countryFlags.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt="country-flag"
                  width={24}
                  height={24}
                  className="size-6"
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h1 className="max-w-[470px] text-[37px] leading-[1.08] font-bold tracking-[-0.01em] text-[#121733] sm:text-[42px]">
              Send Money <span className="text-xenon">Globally,</span> Without
              the heavy fees.
            </h1>
            <p className="mt-4 max-w-[420px] text-[15px] leading-[1.7] text-[#4E576A] sm:text-[16px]">
              Syka is payment infrastructure built for African entrepreneurs to
              send, receive, and store value globally using stablecoins
              instantly, cheaply, and without discrimination.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button className="h-11 w-full rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors hover:bg-xenon-600 sm:w-fit">
                Get Started
              </button>
              <button className="h-11 w-full rounded-lg border border-[#C6D5E3] px-7 text-[15px] font-semibold text-[#31435D] transition-colors hover:bg-[#F5F8FC] sm:w-fit">
                See How It Works
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full xl:w-[520px]">
          <Image
            src={PhoneWithFrame}
            alt="phone-image"
            width={480}
            sizes="(max-width: 1280px) 100vw, 480px"
            placeholder="blur"
            priority
            className="relative z-10 w-full max-w-[480px] xl:ml-auto"
          />
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center text-center xl:mt-24">
        <p className="text-[26px] leading-[1.25] font-bold text-[#121733] sm:text-[34px]">
          Moves Digital Dollars Across Borders In Minutes
        </p>
        <p className="mt-2 px-2 text-[13px] text-[#677287] sm:text-[16px]">
          simple, fast and transparent global payments
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
      </div>
    </section>
  );
}

export default Hero;
