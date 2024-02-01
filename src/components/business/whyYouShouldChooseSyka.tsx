import {
  Advanced,
  Customer,
  MultiLayered,
  Seamless,
  Security,
  Transactions,
} from "@/assets/images/whyChooseSyka";
import { cn } from "@/utils";
import Image from "next/image";
import React from "react";

const whys = [
  {
    title: "Swift Transactions, Unmatched Speed",
    description:
      "At Syka, we understand the importance of time in business. Experience lightning-fast transactions, quick approvals, and instant updates.",
    Image: Transactions,
  },
  {
    title: "Excellence in Customer Service",
    description:
      " Enjoy personalized support that goes beyond transactions – it's a partnership focused on your business growth.",
    Image: Customer,
  },
  {
    title: "Fortified Security at Every Step",
    description:
      "We employ cutting-edge technology to safeguard your transactions, data, and sensitive information.",
    Image: Security,
  },
  {
    title: "Seemless Integration, Effortless Operations",
    description:
      "From invoicing to expenses, payments to analytics, experience a unified platform that simplifies financial operations.",
    Image: Seamless,
  },
  {
    title: "Multi-Layered Security Protocols",
    description:
      "Syka employs multi-layered security protocols to ensure your financial data is protected at every level. Your peace of mind is our top priority",
    Image: MultiLayered,
  },
  {
    title: "Advanced Analytics",
    description:
      "From expense tracking to revenue projections, make informed decisions backed by data.",
    Image: Advanced,
  },
];

const WhyYouShouldChooseSyka = () => {
  return (
    <section className="xl:w-[1211px] mx-auto flex flex-col gap-16 items-center mb-24">
      <h3 className="font-dmSans font-bold text-2xl xl:text-4.5xl text-xenon-gray">
        Why You Should Choose Syka
      </h3>
      <div className="flex flex-row flex-wrap items-center gap-11 justify-center">
        {whys.map((why, index) => (
          <div
            key={index}
            className="flex flex-col p-8 gap-4 w-[325px] h-[394px] bg-[#EFF8FB] rounded-2xl"
          >
            <p className="font-bold text-lg text-xenon leading-[18px]">
              {why.title}
            </p>
            <p className="">{why.description}</p>
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={why.Image}
                alt="icon"
                className={cn(
                  index < 2 && "w-full",
                  index === 2 && "w-[160px]",
                  index === 3 && "w-[160px]",
                  index === 4 && "w-[125px]",
                  index === 5 && "w-[188px]",
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyYouShouldChooseSyka;
