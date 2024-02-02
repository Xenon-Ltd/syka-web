import { TickCircleIcon } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const everythingYouGet = [
  "Fully-fledged digital sign-up",
  "24/7 cutomerr support",
  "Mobile and online banking",
  "Expense categorized",
  "Overdraft management",
  "Instant card security",
  "Global tranfers (for additional charge)",
  "Splitting Bills",
  "Financial tips",
  "Overdraft facilities",
  "QR payment",
  "Interbank transaction",
  "Free SMS alerts",
  "Mobile and online banking",
  "Access bank statements",
  "Invoicing",
  "Linking Wallets",
  "Manage transaction threshold",
];

const EverythingYouGet = () => {
  return (
    <section className="xl:w-[1045px] flex flex-col items-center gap-14 mx-auto px-5 xl:px-0">
      <p className="text-2xl xl:text-[32px] font-dmSans font-bold text-xenon-primary text-center text-balance gap-12">
        Everything <span className="text-xenon-sky">you</span> get with Syka
      </p>
      <div className="w-full flex flex-col xl:flex-row justify-between gap-16">
        {Array(3)
          .fill("a")
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-5">
              {Array(6)
                .fill("b")
                .map((_, j) => (
                  <div
                    key={`item-${i * 6 + j}`}
                    className="flex flex-row gap-5"
                  >
                    <Image
                      src={TickCircleIcon}
                      alt="tick-circle"
                      className="w-6 h-6"
                    />
                    <p className="">{everythingYouGet[i * 6 + j]}</p>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </section>
  );
};

export default EverythingYouGet;
