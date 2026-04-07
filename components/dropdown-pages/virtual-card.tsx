"use client";

import { GB, GH, US } from "@/assets/icons/countries";
import VirtualCardsAnimation from "@/assets/lottie-files/Virtual-cards.json";
import { CreditCard, Gauge, Lock, type LucideIcon } from "lucide-react";
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

type CardRow = {
  flag: StaticImageData;
  title: string;
  lastDigits: string;
  limit: string;
  status: string;
  statusClass: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "One card per use case",
    description:
      "Subscriptions, vendors, team expenses with a dedicated card for each.",
    Icon: CreditCard,
    bgClass: "bg-[#2C7FC0]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/75",
  },
  {
    title: "Per-card spending limits",
    description: "Set a cap. When it's hit, the card declines automatically.",
    Icon: Gauge,
    bgClass: "bg-[#EEF3FF]",
    iconColorClass: "text-[#909CB7]",
    titleColorClass: "text-[#1C2433]",
    bodyColorClass: "text-[#9AA7BC]",
  },
  {
    title: "Instant freeze anytime",
    description: "Pause or cancel any card in one tap. No calls to a bank.",
    Icon: Lock,
    bgClass: "bg-[#23284F]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/70",
  },
];

const cardRows: CardRow[] = [
  {
    flag: GH,
    title: "GHC Card",
    lastDigits: "4421",
    limit: "£2,000",
    status: "Active",
    statusClass: "bg-[#D7FFF0] text-[#1D9766]",
  },
  {
    flag: US,
    title: "USD Card",
    lastDigits: "2710",
    limit: "$500",
    status: "Active",
    statusClass: "bg-[#D7FFF0] text-[#1D9766]",
  },
  {
    flag: GB,
    title: "GBP Card",
    lastDigits: "7783",
    limit: "£300",
    status: "Frozen",
    statusClass: "bg-[#FFE6E6] text-[#D44C4C]",
  },
];

export default function VirtualCardPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="VIRTUAL CARDS"
        title="Issue Cards. Control Every Spend."
        description="Generate secure virtual cards for teams, subscriptions, and vendors, with real-time tracking and built-in spending limits."
        ctaLabel="Create a Card"
      >
        <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px] lg:h-[680px] lg:max-w-[840px]">
          <Lottie
            animationData={VirtualCardsAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      </ProductHeroShell>

      <section className="px-5 pt-6 pb-24 sm:px-6 lg:flex lg:min-h-[95vh] lg:items-center lg:pt-10 lg:pb-12 xl:px-0">
        <div className="mx-auto max-w-[1292px]">
          <div className="w-full text-center lg:text-left">
            <h2 className="w-full text-[26px] leading-[1.15] font-semibold text-[#42536A] sm:text-[34px] lg:text-[58px] lg:leading-[1.02]">
              Issue Cards
            </h2>
            <p className="mt-1 w-full text-[26px] leading-[1.15] font-semibold text-xenon sm:text-[34px] lg:text-[58px] lg:leading-[1.02]">
              Control Every Spend
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-8">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className={`flex min-h-[224px] flex-col items-center rounded-[22px] p-6 text-center md:items-start md:text-left lg:min-h-[320px] lg:rounded-[28px] lg:p-9 ${card.bgClass}`}
              >
                <div
                  className={`inline-flex size-9 items-center justify-center rounded-xl border border-white/40 bg-white/20 lg:size-12 ${card.iconColorClass}`}
                >
                  <card.Icon className="size-4 lg:size-5" strokeWidth={2.2} />
                </div>
                <h3
                  className={`mt-10 w-full text-[24px] leading-[1.2] font-semibold lg:text-[34px] lg:leading-[1.08] ${card.titleColorClass}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-5 w-full text-[14px] leading-[1.55] lg:text-[18px] lg:leading-[1.75] ${card.bodyColorClass}`}
                >
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-18 grid items-center gap-10 lg:mt-28 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1fr)] lg:items-center lg:gap-24">
            <div className="mx-auto w-full text-center lg:mx-0 lg:max-w-[500px] lg:text-left">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#9AA8BA] uppercase lg:text-[14px] lg:tracking-[0.2em]">
                Full Visibility
              </p>
              <h3 className="mt-4 text-[32px] leading-[1.15] font-semibold text-[#42536A] lg:text-[56px] lg:leading-[1.02]">
                Every team spend
                <br />
                One <span className="text-xenon">view</span>
              </h3>
              <p className="mt-5 w-full text-[15px] leading-[1.65] text-[#96A5B6] lg:mt-6 lg:text-[19px] lg:leading-[1.75]">
                Issue cards to team members, vendors, or agencies. See every
                charge in real time. No reimbursements. No surprises at month
                end.
              </p>
              <button className="mt-8 mx-auto block w-fit rounded-lg bg-xenon px-5 py-3 text-[14px] font-medium text-white shadow-[0_14px_24px_rgba(0,142,219,0.25)] transition-colors duration-200 hover:bg-xenon-600 lg:mx-0 lg:mt-10 lg:px-8 lg:py-4 lg:text-[16px]">
                Create a Card
              </button>
            </div>

            <div className="w-full max-w-[560px] rounded-[18px] bg-[#23284F] p-6 text-white shadow-[0_20px_45px_rgba(24,28,61,0.22)] lg:max-w-none lg:rounded-[30px] lg:p-10">
              <p className="text-[12px] font-semibold tracking-[0.12em] text-white/75 uppercase lg:text-[14px] lg:tracking-[0.18em]">
                Active Cards
              </p>
              <div className="mt-5 space-y-3 lg:mt-8 lg:space-y-4">
                {cardRows.map((card) => (
                  <div
                    key={card.title}
                    className="flex items-center justify-between rounded-xl bg-white/12 px-4 py-3 lg:rounded-[18px] lg:px-6 lg:py-4"
                  >
                    <div className="flex items-center gap-3 lg:gap-4">
                      <Image
                        src={card.flag}
                        alt={`${card.title} flag`}
                        width={18}
                        height={18}
                        className="rounded-full border border-white/15 lg:h-7 lg:w-7"
                      />
                      <div>
                        <p className="text-[14px] font-semibold text-white lg:text-[18px]">
                          {card.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/65 lg:text-[13px]">
                          •••• {card.lastDigits} · Limit {card.limit}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold lg:px-3 lg:py-1.5 lg:text-[12px] ${card.statusClass}`}
                    >
                      {card.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-white/12 px-4 py-4 lg:mt-6 lg:rounded-[18px] lg:px-6 lg:py-5">
                <div>
                  <p className="text-[10px] text-white/55 lg:text-[12px]">Cards Issued</p>
                  <p className="mt-2 text-[20px] leading-none font-semibold text-white lg:text-[28px]">
                    3
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/55 lg:text-[12px]">Spent This Month</p>
                  <p className="mt-2 text-[20px] leading-none font-semibold text-white lg:text-[28px]">
                    $4,230
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/55 lg:text-[12px]">Alerts</p>
                  <p className="mt-2 text-[20px] leading-none font-semibold text-white lg:text-[28px]">
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
