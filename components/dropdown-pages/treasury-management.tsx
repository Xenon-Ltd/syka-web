"use client";

import TreasuryAnimation from "@/assets/lottie-files/Treasury.json";
import {
  ArrowUpRight,
  Coins,
  Rows3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
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

type SavingsPoint = {
  text: string;
};

type MetricCard = {
  label: string;
  value: string;
  badge: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "4-6% yield on idle balances",
    description: "USDC and USDT earn automatically while waiting to pay suppliers.",
    Icon: ArrowUpRight,
    bgClass: "bg-[#2C7FC0]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/75",
  },
  {
    title: "FX rate locking",
    description: "Lock today's rate for next month's payment. Stop bleeding to daily swings.",
    Icon: Coins,
    bgClass: "bg-[#D8F3EF]",
    iconColorClass: "text-[#61B3AC]",
    titleColorClass: "text-[#41526B]",
    bodyColorClass: "text-[#6B8298]",
  },
  {
    title: "Bulk payments in minutes",
    description: "Upload a CSV. Pay 50 suppliers across 3 currencies before lunch.",
    Icon: Rows3,
    bgClass: "bg-[#23284F]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/70",
  },
];

const savingsPoints: SavingsPoint[] = [
  { text: "Save percentages on FX by converting smart" },
  { text: "Earn yield on average $15k idle" },
  { text: "Save 55 hours/yr on payment admin" },
  { text: "Zero missed supplier payments" },
];

const metricCards: MetricCard[] = [
  {
    label: "Yield Earned MTD",
    value: "$412",
    badge: "5.1% APY",
  },
  {
    label: "FX Savings MTD",
    value: "$3,190",
    badge: "4.2% saved",
  },
];

export default function TreasuryManagementPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="TREASURY MANAGEMENT"
        title="Manage Your Fund Like a CFO"
        description="Monitor balances, optimize liquidity, and protect your funds with powerful treasury tools built for modern businesses."
        ctaLabel="Get started with SYKA"
      >
        <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px] lg:h-[680px] lg:max-w-[840px]">
          <Lottie
            animationData={TreasuryAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      </ProductHeroShell>

      <section className="px-5 pt-6 pb-24 sm:px-6 lg:flex lg:min-h-[95vh] lg:items-center lg:pt-10 lg:pb-12 xl:px-0">
        <div className="mx-auto max-w-[1292px]">
          <div className="w-full text-center lg:text-left">
            <h2 className="w-full text-[26px] leading-[1.15] font-semibold text-[#42536A] sm:text-[34px] lg:text-[58px] lg:leading-[1.02]">
              Pay Anyone <span className="text-xenon">Anywhere</span>
            </h2>
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

          <div className="mt-18 grid items-center gap-10 lg:mt-28 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-center lg:gap-24">
            <div className="mx-auto w-full text-center lg:mx-0 lg:max-w-[500px] lg:text-left">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#9AA8BA] uppercase lg:text-[14px] lg:tracking-[0.2em]">
                The Numbers
              </p>
              <h3 className="mt-4 text-[32px] leading-[1.15] font-semibold text-[#42536A] lg:text-[56px] lg:leading-[1.02]">
                $44,750 Saved
                <br />
                <span className="text-xenon">Per Year</span>
              </h3>

              <ul className="mx-auto mt-7 max-w-[340px] space-y-3.5 text-left lg:mx-0 lg:mt-9 lg:max-w-none lg:space-y-4">
                {savingsPoints.map((point) => (
                  <li key={point.text} className="flex items-start gap-3 lg:gap-4">
                    <span className="mt-[7px] inline-flex size-2 shrink-0 rounded-full bg-xenon lg:mt-[10px] lg:size-2.5" />
                    <span className="text-[14px] leading-[1.6] text-[#96A5B6] lg:text-[18px] lg:leading-[1.7]">
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 mx-auto block w-fit rounded-lg bg-xenon px-5 py-3 text-[14px] font-medium text-white shadow-[0_14px_24px_rgba(0,142,219,0.25)] transition-colors duration-200 hover:bg-xenon-600 lg:mx-0 lg:mt-10 lg:px-8 lg:py-4 lg:text-[16px]">
                Get started with SYKA
              </button>
            </div>

            <div className="w-full max-w-[560px] rounded-[18px] bg-[#2C7FC0] p-6 text-white shadow-[0_20px_45px_rgba(27,98,160,0.22)] lg:max-w-none lg:rounded-[30px] lg:p-10">
              <p className="text-[12px] font-semibold tracking-[0.12em] text-white/75 uppercase lg:text-[14px] lg:tracking-[0.18em]">
                Treasury Overview
              </p>

              <div className="mt-5 rounded-[14px] bg-white/10 px-5 py-4 lg:mt-8 lg:rounded-[18px] lg:px-6 lg:py-5">
                <p className="text-[11px] text-white/70 lg:text-[13px]">Total Balance (USD Eq.)</p>
                <p className="mt-2 text-[36px] leading-none font-semibold text-white lg:text-[46px]">
                  $148,320
                </p>
                <p className="mt-2 text-[11px] text-white/65 lg:text-[13px]">
                  +$3,210 this month
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-5 lg:gap-4">
                {metricCards.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[14px] bg-white/10 px-5 py-4 lg:rounded-[18px] lg:px-6 lg:py-5"
                  >
                    <p className="text-[11px] text-white/70 lg:text-[13px]">{metric.label}</p>
                    <p className="mt-2 text-[32px] leading-none font-semibold text-white lg:text-[40px]">
                      {metric.value}
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex rounded-full bg-[#D7FFF0] px-2.5 py-1 text-[10px] font-semibold text-[#1D9766] lg:px-3 lg:py-1.5 lg:text-[12px]">
                        {metric.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 lg:mt-6 lg:rounded-[18px] lg:px-5 lg:py-4">
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-white/14 lg:size-11">
                  <ShieldCheck className="size-4 text-white/75 lg:size-5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white lg:text-[18px]">
                    Risk-managed treasury
                  </p>
                  <p className="mt-1 text-[11px] text-white/65 lg:text-[13px] lg:leading-[1.6]">
                    Monitor, convert, and deploy balances from one controlled dashboard.
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
