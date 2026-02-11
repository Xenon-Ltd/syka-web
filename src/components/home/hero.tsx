import Image from "next/image";
import React from "react";
import { GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import { SendMoneyGlobally } from "@/assets/images";
import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";

function Hero() {
  const countryFlags = [GH, NG, GB, US, MORE];
  return (
    <div>
      <div className="flex w-full items-center justify-center mx-auto">
        <div className="w-1/2">
          <div className="text-2xl flex gap-4 items-center">
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
            <p className="text-4xl font-bold leading-tight my-4">
              Send Money <span>Globally,</span> <br />
              Without the heavy fees.
            </p>
            <p>
              Go beyong transfers. spend, receive, and manage your global <br />
              business with virtual accounts & cards.
            </p>

            <div className="flex gap-4 mt-6">
              <button className="h-12 w-fit px-10 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
                Get Started
              </button>
              <button className="border px-10 rounded-lg border-xenon-300">
                See How It Works
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Image src={SendMoneyGlobally} alt="phone-image" width={500} />
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-4xl font-semibold">
          Move digital dollars across borders in minutes.
        </p>
        <p className="text-xl mt-4">
          Simple, fast and transparent global payments.
        </p>

        <div className="flex flex-row mt-6 gap-4 justify-center">
          <button>
            <Image
              src={PlayStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="play-store-badge"
            />
          </button>
          <button>
            <Image
              src={AppStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="app-store-badge"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
