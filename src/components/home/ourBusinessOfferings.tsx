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
    title: "Invoicing Made Effortlesss",
    description:
      "Say goodbye to manual invoicing hassles. Syka's user-friendly platform allows you to create, send, and track professional invoices with just a few clicks.",
    image: Invoicing,
  },
  {
    title: "Seamless Payment Links",
    description:
      "Now, receiving payments from clients across the country is as simple as sharing a link. Enhance your cash flow and eliminate payment delays, empowering your business to thrive.",
    image: Seamless,
  },
  {
    title: "Secure Checkouts Services",
    description:
      "Provide your customers with a seamless and secure checkout experience. Syka ensures every transaction is protected, giving both you and your clients peace of mind.",
    image: Secure,
  },
  {
    title: "Scheduled Payments",
    description:
      "Take control of your financial schedule with Syka's scheduled payment feature. Set up recurring payments, automate transactions, and stay organized without missing a beat. ",
    image: Scheduled,
  },
  {
    title: "Multi Currency Capabilities",
    description:
      "Expand your horizons with Syka's multi currency support. Conduct business globally, accept payments in different currencies, and watch your business reach new heights. ",
    image: MultiCurrency,
  },
  {
    title: "Card Services Tailored for Corporates",
    description:
      "Empower your corporate entities with Syka's card services. Whether virtual or physical, our cards provide the flexibility and control your business needs.",
    image: Card,
  },
];

const OurBusinessOfferings = () => {
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
    <section className="flex flex-col items-center gap-16">
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

export default OurBusinessOfferings;
