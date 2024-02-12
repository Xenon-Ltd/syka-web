import React from "react";
import {
  PayCrossBorder,
  PayGlobe,
  PayInvoices,
  PayTransactions,
} from "@/assets/images";
import { GlyphBg, MultiCurrency } from "@/assets/images/OurBusinessOffering";
import Image from "next/image";
import { cn } from "@/utils";

const offerings = [
  {
    title: "Transparent and Competition Rates",
    description:
      "Syka Pay believes in transparency. Benefit from straightforward pricing and competitive rates, allowing you to make informed decisions without unexpected expenses.",
    image: MultiCurrency,
  },
  {
    title: "Rapid and Secure Transactions",
    description:
      "Syka Pay ensures swift and secure cross-border transactions, utilizing advanced technology to guarantee efficiency without compromising on the safety of your payments.",
    image: PayTransactions,
  },
  {
    title: "Extensive Regional Coverage",
    description:
      "Syka Pay facilitates cross-border payments across every country in Central Africa, Ghana, and Nigeria, providing your business with unmatched access to diverse markets.",
    image: PayGlobe,
  },
  {
    title: "Multi Currency Mastery",
    description:
      "Syka Pay's multi-currency support empowers your business to operate effortlessly in various international currencies, simplifying the complexities of global trade.",
    image: PayCrossBorder,
  },
  {
    title: "Expert Support in Cross-Border Excellence",
    description:
      "Syka Pay provides dedicated support for all your cross-border transactions. Rely on our experts for assistance with regulatory compliance, currency fluctuations, and any challenges that may arise.",
    image: PayInvoices,
  },
];

const UnlockTheSykaPay = () => {
  return (
    <section className="flex flex-col items-center gap-12">
      <h2 className="font-dmSans font-bold text-2xl xl:text-4.5xl text-xenon-gray">
        Our Business Offering
      </h2>
      <div className="flex flex-col items-center gap-24 xl:gap-6 w-full">
        {offerings.map((offering, index) => (
          <div
            key={offering.title}
            className="relative w-full overflow-visible"
          >
            <Image
              src={GlyphBg}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen z-10"
              alt="bg-glyph"
            />
            <div
              className={cn(
                "xl:h-[400px] xl:w-[1211px] overflow-visible mx-auto flex flex-col-reverse px-6 xl:px-0 items-center justify-between xl:my-14 z-20",
                index % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse",
              )}
            >
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
                    index === 0 && "xl:h-[440px] xl:max-h-[440px]",
                    index === 3 && "xl:h-[500px] xl:max-h-[500px]",
                    index === 4 && "xl:h-[500px] xl:max-h-[500px]",
                    // index < 5 && "scale-[120%]",
                    // index === 4 && "h-auto aspect-[350/275]",
                    // index === 5 && "h-auto xl:h-[300px] aspect-[375/228]",
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

export default UnlockTheSykaPay;
