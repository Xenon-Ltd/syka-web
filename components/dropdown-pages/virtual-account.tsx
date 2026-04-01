"use client";

import { GB, GH, US } from "@/assets/icons/countries";
import VirtualAccountsAnimation from "@/assets/lottie-files/Virtual-accounts.json";
import { Globe2, Landmark, ReceiptText, type LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";

type FeatureCard = {
  title: string;
  description: string;
  Icon: LucideIcon;
  bgClass: string;
  iconColorClass: string;
  titleColorClass: string;
  bodyColorClass: string;
};

type AccountRow = {
  flag: StaticImageData;
  code: string;
  accountNumber: string;
  balance: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "Dedicated account numbers",
    description: "One per currency. GHC, USD, GBP, EUR. Share and start receiving immediately.",
    Icon: Landmark,
    bgClass: "bg-[#D8F3EF]",
    iconColorClass: "text-[#61B3AC]",
    titleColorClass: "text-[#41526B]",
    bodyColorClass: "text-[#6B8298]",
  },
  {
    title: "Accept from any bank globally",
    description: "Your account works with any wire or bank transfer system, anywhere in the world.",
    Icon: Globe2,
    bgClass: "bg-[#21264F]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/70",
  },
  {
    title: "Auto-reconciled inflows",
    description: "Every payment is logged and matched. Your records stay clean automatically.",
    Icon: ReceiptText,
    bgClass: "bg-[#DCEEFF]",
    iconColorClass: "text-[#7BB4E7]",
    titleColorClass: "text-[#1C2433]",
    bodyColorClass: "text-[#92A6BA]",
  },
];

const accountRows: AccountRow[] = [
  {
    flag: GH,
    code: "GHC",
    accountNumber: "Acct • 1234567890",
    balance: "¢11,247",
  },
  {
    flag: US,
    code: "USA",
    accountNumber: "Acct • 3876543210",
    balance: "$8,430",
  },
  {
    flag: GB,
    code: "GBP",
    accountNumber: "Acct • 5543332211",
    balance: "£2,900",
  },
];

export default function VirtualAccountPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="VIRTUAL ACCOUNT"
        title="Get Paid Globally"
        description="Create dedicated virtual accounts to receive, hold, and manage funds across borders."
        ctaLabel="Create a Virtual Account"
      >
        <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px]">
          <Lottie
            animationData={VirtualAccountsAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      </ProductHeroShell>

      <section className="px-5 pt-6 pb-24 sm:px-6 lg:pt-8 lg:pb-28 xl:px-0">
        <div className="mx-auto max-w-[1292px]">
          <div className="w-full text-center lg:text-left">
            <h2 className="w-full whitespace-nowrap text-[26px] leading-[1.15] font-semibold text-[#42536A] sm:text-[34px] lg:text-[42px]">
              A Real Account Number
            </h2>
            <p className="mt-1 w-full text-[26px] leading-[1.15] font-semibold text-xenon sm:text-[34px] lg:text-[42px]">
              Zero Paperwork
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className={`flex min-h-[224px] flex-col items-center rounded-[22px] p-6 text-center md:items-start md:text-left lg:min-h-[245px] lg:p-7 ${card.bgClass}`}
              >
                <div className={`inline-flex size-9 items-center justify-center rounded-xl border border-white/40 bg-white/20 ${card.iconColorClass}`}>
                  <card.Icon className="size-4" strokeWidth={2.2} />
                </div>
                <h3 className={`mt-10 w-full text-[24px] leading-[1.2] font-semibold ${card.titleColorClass}`}>
                  {card.title}
                </h3>
                <p className={`mt-5 w-full text-[14px] leading-[1.55] ${card.bodyColorClass}`}>
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-18 grid items-center gap-10 lg:mt-24 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="mx-auto w-full text-center lg:mx-0 lg:max-w-[420px] lg:text-left">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#9AA8BA] uppercase">
                Multi-Currency
              </p>
              <h3 className="mt-4 text-[32px] leading-[1.15] font-semibold text-[#42536A] lg:text-[44px]">
                <span className="whitespace-nowrap">Hold multiple currencies</span>
                <br />
                One <span className="text-xenon">dashboard</span>
              </h3>
              <p className="mt-5 w-full text-[15px] leading-[1.65] text-[#96A5B6]">
                Create separate virtual accounts for every currency you operate in. Each one has its own account number, so your currencies stay clean and separate.
              </p>
              <button className="mt-8 mx-auto block w-fit rounded-lg bg-xenon px-5 py-3 text-[14px] font-medium text-white shadow-[0_14px_24px_rgba(0,142,219,0.25)] transition-colors duration-200 hover:bg-xenon-600 lg:mx-0">
                Create a Virtual Account
              </button>
            </div>

            <div className="w-full max-w-[560px] rounded-[18px] bg-[#1E8A69] p-6 text-white shadow-[0_20px_45px_rgba(18,71,53,0.18)] lg:max-w-none lg:p-8">
              <p className="text-[12px] font-semibold tracking-[0.12em] text-white/75 uppercase">
                Your Accounts
              </p>
              <div className="mt-5 space-y-3">
                {accountRows.map((account) => (
                  <div
                    key={account.code}
                    className="flex items-center justify-between rounded-xl bg-white/9 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={account.flag}
                        alt={`${account.code} flag`}
                        width={18}
                        height={18}
                        className="rounded-full border border-white/15"
                      />
                      <div>
                        <p className="text-[14px] font-semibold text-white">
                          {account.code}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/65">
                          {account.accountNumber}
                        </p>
                      </div>
                    </div>
                    <p className="text-[22px] leading-none font-semibold text-white">
                      {account.balance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
