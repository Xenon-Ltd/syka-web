import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { ManNotificationReceived } from "@/assets/images";
import UnlockSykaPayAdvantage from "@/components/home/unlockSykaPayAdvantage";
import Image from "next/image";
import React from "react";

export default function pay() {
  return (
    <main className="flex flex-col gap-[200px] min-h-screen w-[1211px] mx-auto">
      <section className="relative flex flex-row items-center justify-between gap-14 h-[572px]">
        <div className="flex flex-col z-10">
          <h1 className="font-dmSans mb-6 font-bold text-4.5xl text-xenon-gray leading-[50px] text-balance">
            <span className="text-xenon">Syka Pay</span>, A Streamlined
            <span className="text-xenon"> Cross-Border Payments</span> for Your
            Global Business
          </h1>
          <p className="text-lg w-[85%] mb-11">
            Designed to simplify and accelerate international transactions, Syka
            Pay expands your business horizons effortlessly.
          </p>
          <div className="flex flex-row gap-4 mb-11">
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
          <button className="h-12 w-[200px] px-8 bg-xenon hover:bg-xenon-600 rounded-lg text-white duration-100">
            Start Now
          </button>
        </div>
        <div
          style={{
            borderTopRightRadius: "50%",
          }}
          className="w-[681px] h-full overflow-clip shrink-0 z-10"
        >
          <Image
            src={ManNotificationReceived}
            className="w-full h-full object-cover"
            alt="hero-image"
          />
        </div>
      </section>
      <UnlockSykaPayAdvantage />
      <section className="h-32"></section>
      {/* <OurBusinessOfferings />
      <section className="relative w-full rounded-[32px] h-[470px] bg-xenon flex flex-row">
        <div className="flex flex-col justify-between text-white h-full p-14 z-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-dmSans font-bold text-4.5xl w-[520px]">
              Syka Business Banking, Your Growth Partner.
            </h3>
            <p className="w-[600px] text-lg">
              In a world that never stops, your business needs a financial
              partner that keeps pace. Syka Business Banking is designed to
              empower entrepreneurs like you. Join us in reshaping the future of
              digital business finance.
            </p>
          </div>
          <button className="h-12 bg-white hover:bg-white/90 rounded-lg text-xenon w-fit px-8 duration-75">
            Get Started Now
          </button>
        </div>
        <Image
          src={GrowthPartner}
          alt="growth-partner"
          className="absolute w-[610px] h-[432px] bottom-0 right-8 z-10"
        />
        <Image
          className="absolute top-[90%] left-[90%] h-[358px] z-0"
          src={LineGridPattern}
          alt="line-grid"
        />
      </section>
      <WhyYouShouldChooseSyka />
      <section className="h-32"></section> */}
    </main>
  );
}
