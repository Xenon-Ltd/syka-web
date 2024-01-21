"use client";
import {
  Card,
  GlyphBg,
  Invoicing,
  MultiCurrency,
  Scheduled,
  Seamless,
  Secure,
} from "@/assets/images/OurBusinessOffering";
import { cn } from "@/utils";
import Image from "next/image";
import React from "react";

const offerings = [
  {
    title: "Invoicing Made Effortlesss",
    description:
      "Syka's user-friendly platform allows you to create, send, and track professional invoices with just a few clicks. Streamline your billing process and focus on what matters most – growing your business.",
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
      "Syka ensures every transaction is protected, giving both you and your clients peace of mind. Build trust and foster lasting relationships with hassle-free payments.",
    image: Secure,
  },
  {
    title: "Scheduled Payments",
    description:
      "Take control of your financial schedule with Syka's scheduled payment feature. Set up recurring payments, automate transactions, and stay organized without missing a beat. Effortlessly manage your cash flow and focus on strategic business decisions.",
    image: Scheduled,
  },
  {
    title: "Multi Currency Capabilities",
    description:
      "Conduct business globally, accept payments in different currencies, and watch your business reach new heights. Break down barriers and tap into international markets effortlessly.",
    image: MultiCurrency,
  },
  {
    title: "Card Services Tailored for Corporates",
    description:
      "Whether virtual or physical, our cards provide the flexibility and control your business needs. Streamline expenses, manage transactions, and take charge of your finances.",
    image: Card,
  },
];

const OurBusinessOfferings = () => {
  return (
    <section className="flex flex-col items-center gap-12">
      <h2 className="font-dmSans font-bold text-2xl xl:text-4.5xl text-xenon-gray">
        Our Business Offering
      </h2>
      <div className="flex flex-col items-center gap-24 xl:gap-8 w-full">
        {offerings.map((offering, index) => (
          <div
            key={offering.title}
            className="relative w-full overflow-visible"
          >
            <div
              className={cn(
                "xl:h-[400px] xl:w-[1211px] overflow-visible mx-auto flex flex-col-reverse px-6 xl:px-0 items-center justify-between xl:my-14",
                index % 2 === 0 ? "xl:flex-row-reverse" : "xl:flex-row",
              )}
            >
              <Image
                src={GlyphBg}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen z-10"
                alt="bg-glyph"
              />
              <div className="w-full xl:hidden flex py-6">
                <button className="text-lg text-xenon-500 underline underline-offset-8 w-fit">
                  Get Started
                </button>
              </div>
              <div className="flex z-20">
                <Image
                  src={offering.image}
                  className={cn(
                    "h-auto xl:h-[400px] w-auto max-h-[350px] xl:max-h-[400px]",
                    index < 5 && "scale-[120%]",
                    index === 4 && "h-auto aspect-[350/275]",
                    index === 5 && "h-auto xl:h-[300px] aspect-[375/228]",
                  )}
                  alt="offering-image"
                />
              </div>

              <div className="xl:w-[560px] flex flex-col z-20">
                <p className="text-2xl font-medium text-xenon-500 leading-6 font-dmSans mb-2">
                  {offering.title}
                </p>
                <p className="leading-[30px] text-[#475467] mb-8">
                  {offering.description}
                </p>
                <button className="hidden xl:block text-lg text-xenon-500 underline underline-offset-8 w-fit">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurBusinessOfferings;
