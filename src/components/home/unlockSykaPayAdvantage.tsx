"use client";
import {
  Card,
  Invoicing,
  MultiCurrency,
  Scheduled,
  Seamless,
  Secure,
} from "@/assets/images/OurOfferings";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

const MotionImage = motion(Image);

const offerings = [
  {
    title: "Extensive Regional Coverage",
    description:
      "Syka Pay facilitates cross-border payments across every country in Central Africa, Ghana, and Nigeria, providing your business with unmatched access to diverse markets.",
    image: Invoicing,
  },
  {
    title: "Rapid and Secure Transactions",
    description:
      "Syka Pay ensures swift and secure cross-border transactions, utilizing advanced technology to guarantee efficiency without compromising on the safety of your payments.",
    image: Seamless,
  },
  {
    title: "Transparent and Competitive Rates",
    description:
      "Syka Pay believes in transparency. Benefit from straightforward pricing and competitive rates, allowing you to make informed decisions without unexpected expenses.",
    image: Secure,
  },
  {
    title: "Multicurrency Mastery",
    description:
      "Syka Pay's multi-currency support empowers your business to operate effortlessly in various international currencies, simplifying the complexities of global trade.",
    image: Scheduled,
  },
  {
    title: "Expert Support for Cross-Border Excellence",
    description:
      "Syka Pay provides dedicated support for all your cross-border transactions. Rely on our experts for assistance with regulatory compliance, currency fluctuations, and any challenges that may arise.",
    image: MultiCurrency,
  },
];

const UnlockSykaPayAdvantage = () => {
  const [currentItem, setCurrentItem] = useState(0);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % offerings.length);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [currentItem]);

  return (
    <section className="flex flex-col items-center gap-16 bg-[#E4F3FB] py-20">
      <h2 className="font-dmSans font-bold text-4.5xl text-xenon-gray">
        Our Business Offering
      </h2>
      <div className="w-full px-10 flex flex-row items-center justify-between">
        <div className="flex flex-col">
          {offerings.map((offering, index) => (
            <div
              key={index}
              onClick={() => setCurrentItem(index)}
              className={cn(
                "flex flex-col border-l-[4px] w-[583px] px-6 py-4 cursor-pointer duration-75",
                index === currentItem ? "border-xenon" : "border-gray-200",
              )}
            >
              <p
                className={cn(
                  "text-lg font-semibold mb-1.5 duration-75",
                  index === currentItem ? "text-xenon" : "text-black",
                )}
              >
                {offering.title}
              </p>
              <p className={cn("text-xenon-gray mb-4")}>
                {offering.description}
              </p>
            </div>
          ))}
        </div>
        <div className="h-[805px] w-[523px] relative">
          <AnimatePresence mode="wait">
            {offerings.map((offering, index) => (
              <MotionImage
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentItem ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}
                src={offering.image}
                className="absolute right-0 top-0 h-full w-full object-contain"
                alt="offerings"
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default UnlockSykaPayAdvantage;
