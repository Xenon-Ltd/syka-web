import {
  CardTickIcon,
  Receipt2Icon,
  ScanIcon,
} from "@/assets/icons/get-more-done";
import { WomanSmilingAtPhone2 } from "@/assets/images";
import Image from "next/image";
import React from "react";

const getmoredoneData = [
  {
    Icon: Receipt2Icon,
    label: "CREATE INVOICES",
    description:
      "With a Syka account ,you can create invoices right in your app and easily send to clients to be paid right away.",
  },
  {
    Icon: CardTickIcon,
    label: "MAKE AND ACCEPT PAYMENT",
    description:
      "Your contactless MasterCard debit card for business is the card you need on the go when shopping in-store or online anywhere in the world.",
  },
  {
    Icon: ScanIcon,
    label: "QR PAYMENTS",
    description:
      "Get paid in person hassle-free. No need to invest in point-of-sale hardware, all you need is a smartphone and the Syka app to start generating QR codes",
  },
];

const GetMoreDone = () => {
  return (
    <section className="flex flex-col items-center justify-center xl:h-[750px] bg-[#E4F4FB] py-16 xl:py-0 px-3.5 xl:px-0">
      <div className="xl:w-[1220px] mx-auto flex flex-col-reverse xl:flex-row justify-between gap-16 xl:gap-2">
        <div className="xl:w-[614px] p-6 xl:p-14 relative shrink-0">
          <Image
            src={WomanSmilingAtPhone2}
            className="w-full h-full xl:aspect-auto object-cover z-20 relative"
            alt="hero-image"
          />
          <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[calc(100%-3rem)] h-[calc(100%-3rem)] xl:w-[calc(100%-7rem)] xl:h-[calc(100%-7rem)] bg-[#DFA01E] rounded-3xl rotate-12"></div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl xl:text-3xl font-bold leading-[32px] xl:leading-[41px] xl:w-[512px]">
            Get more done with your Syka account
          </p>
          <div className="flex flex-col gap-3 xl:w-[500px]">
            {getmoredoneData.map((item) => (
              <div
                key={item.label}
                className="flex flex-row w-full items-center gap-8 px-7 py-5 rounded-2xl bg-white"
              >
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#E4F4FB] flex items-center justify-center">
                  <Image
                    src={item.Icon}
                    alt={`${item.label}-icon`}
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <p className="text-xs xl:text-sm font-bold font-dmSans text-xenon-text">
                    {item.label}
                  </p>
                  <p className="text-xs xl:text-sm text-[#8893A4]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetMoreDone;
