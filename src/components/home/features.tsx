import {
  CardsIcon,
  Chart2Icon,
  EmptyWalletAddIcon,
  ExportIcon,
  PresentationChartIcon,
} from "@/assets/icons/Features";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const featuresData = [
  {
    Icon: ExportIcon,
    label: "Spend",
    description: "Make all your transactions from your phone.",
  },
  {
    Icon: PresentationChartIcon,
    label: "Invest",
    description:
      "Invest in treasury bills, mutual funds, fixed deposits, stocks, cryptos etc.",
  },
  {
    Icon: Chart2Icon,
    label: "Budget",
    description:
      "Create sub-accounts that allow you to easily budget and save money.",
  },
  {
    Icon: EmptyWalletAddIcon,
    label: "Save",
    description:
      "Set aside money for specific purposes and create savings goal with the Savings Jar.",
  },
  {
    Icon: CardsIcon,
    label: "Get Card",
    description:
      "Get a virtual card once you have completed the sign-up process. Request for your Syka card and it would be delivered to you.",
  },
];

const Features = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 xl:w-[1200px] mx-auto px-7 xl:px-0">
      <div className="xl:h-[246px] w-full flex flex-col xl:grid xl:grid-cols-3 gap-10">
        {featuresData.slice(0, 3).map((item) => (
          <div
            key={item.label}
            className="h-[246px] shrink-0 p-10 flex flex-col justify-between items-start bg-white shadow-xenon_card rounded-2xl xl:rounded-[40px]"
          >
            <div className="w-14 h-14 rounded-full bg-[#E4F4FB] flex items-center justify-center">
              <Image
                src={item.Icon}
                alt={`${item.label}-icon`}
                className="w-6 h-6"
              />
            </div>
            <p className="text-2xl font-bold">{item.label}</p>
            <p className="text-[#8893A4]">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="xl:h-[246px] w-full flex flex-col xl:grid xl:grid-cols-2 gap-10">
        {featuresData.slice(3, 5).map((item) => (
          <div
            key={item.label}
            className="h-[246px] shrink-0 p-10 flex flex-col justify-between items-start bg-white shadow-xenon_card rounded-2xl xl:rounded-[40px]"
          >
            <div className="w-14 h-14 rounded-full bg-[#E4F4FB] flex items-center justify-center">
              <Image
                src={item.Icon}
                alt={`${item.label}-icon`}
                className="w-6 h-6"
              />
            </div>
            <p className="text-2xl font-bold">{item.label}</p>
            <p className="text-[#8893A4]">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="w-fit mt-12 xl:mt-16">
        <Link href={"/signup"}>
          <button className="h-12 w-fit px-10 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Features;
