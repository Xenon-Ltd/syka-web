"use client";

import { TreasuryHero, TreasuryUseCase } from "@/assets/images";
import {
  ArrowLeftRight,
  BellRing,
  Coins,
  Lock,
  PiggyBank,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import CustomerTestimonials from "../customer-testimonials";
import FrequentlyAskedQuestions from "../frequently-asked-questions";
import MarketingCTA from "../marketing-cta";
import CompaniesMarquee from "../business/companies-marquee";
import ProductHeroShell from "./product-hero-shell";
import {
  AvailableCountries,
  CONTENT,
  ContourImageBox,
  PointList,
  ProductCTA,
  Reveal,
  type Point,
} from "./shared";

const CTA_LABEL = "Get started with SYKA";

const schedulePoints: Point[] = [
  {
    Icon: ArrowLeftRight,
    text: "Keep balances in dollar-denominated stablecoin, while still being able to convert and spend whenever you need to.",
  },
  {
    Icon: ArrowLeftRight,
    text: "Enable yield on funds sitting idle between transactions, every balance remains available for withdrawal at any time.",
  },
];

const forecastPoints: Point[] = [
  {
    Icon: BellRing,
    text: "Set a target rate and be notified the moment it's reached.",
  },
  {
    Icon: Lock,
    text: "Funds remain yours throughout, and a withdrawal request is typically available within twenty-four to forty-eight hours.",
  },
  {
    Icon: RefreshCw,
    text: "Every payment is logged automatically, with a full statement available to download whenever you need it.",
  },
];

const yieldPoints: Point[] = [
  {
    Icon: PiggyBank,
    text: "Eligible balances enrolled are deployed to established, audited lending protocols.",
  },
  {
    Icon: TrendingUp,
    text: "Generated return is credited back to your balance after a performance fee.",
  },
  {
    Icon: Coins,
    text: "While the underlying protocols are selected for their track record and security, no return is ever guaranteed.",
  },
  {
    Icon: Lock,
    text: "Funds remain yours throughout, and a withdrawal request is typically available within twenty-four to forty-eight hours.",
  },
];

const faqItems = [
  {
    question: "Is my money safe if I enable yield?",
    answer: "Funds are deployed to established, independently audited protocols, but as with any yield-generating product, there is no guarantee against loss. We recommend enabling yield only for balances you are comfortable holding in this way.",
  },
  {
    question: "Can I withdraw at any time?",
    answer: "Yes. There is no lock-up period. Withdrawal requests are typically available within twenty-four to forty-eight hours.",
  },
  {
    question: "Is this the same as trading cryptocurrency?",
    answer: "No. You are not buying, selling, or speculating on any asset. Your balance is held in dollar-denominated stablecoin and, if you choose, deployed to generate a return — you interact with it entirely in ordinary currency terms.",
  },
  {
    question: "What if the exchange rate moves against me while I'm waiting for a target rate?",
    answer: "Nothing happens until your target is reached. If it never is, your order simply expires and no conversion takes place.",
  },
  {
    question: "Do I need a minimum balance to use treasury tools?",
    answer: "No minimum balance is required to use conversion tools. Yield eligibility depends on your account's verification tier.",
  },
];

export default function TreasuryManagementPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="Treasury Management"
        title="Put your business's money to work, on your own terms"
        description="Decide when to convert, protect what you hold against currency depreciation, and earn on balances that would otherwise sit idle between transactions."
        ctaLabel={CTA_LABEL}
      >
        <div className="relative aspect-square w-full max-w-[608px] overflow-hidden rounded-2xl">
          <div className="absolute top-[-12.73%] left-[-33.5%] h-[125.46%] w-[167%]">
            <Image
              src={TreasuryHero}
              alt="Business owner reviewing treasury balances on a laptop"
              fill
              sizes="(max-width: 1023px) 100vw, 608px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </ProductHeroShell>

      <div className={`${CONTENT} flex justify-center`}>
        <CompaniesMarquee />
      </div>

      {/* Idle money is not neutral */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <Reveal className="max-w-[845px]">
          <h2 className="product-section-title">
            Idle money is not neutral
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-6 lg:text-xl lg:leading-[1.55]">
            Syka bridges the gap between losing to depreciation and losing to a bad rate. Your idle balances earn yield while you wait, and you convert when the rate works for you, not when a payment forces your hand.
          </p>
        </Reveal>

        <div className="product-feature-row">
          <Reveal>
            <h3 className="product-feature-title">
              Convert on your own schedule
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Set a target exchange rate, or spread a conversion gradually across days or weeks, and Syka converts automatically the moment it&apos;s reached.
            </p>
            <PointList points={schedulePoints} />
          </Reveal>
          <Reveal className="order-first xl:order-last">
            <ContourImageBox className="aspect-square w-full lg:aspect-auto lg:h-[515px]" />
          </Reveal>
        </div>

        <div className="product-feature-row product-feature-row-reverse">
          <Reveal className="order-first">
            <ContourImageBox flip className="aspect-square w-full lg:aspect-auto lg:h-[515px]" />
          </Reveal>
          <Reveal>
            <h3 className="product-feature-title">
              See what&apos;s coming before it arrives
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Cash flow projections built from your own transaction history, so decisions about when to convert are based on where your balance is heading.
            </p>
            <PointList points={forecastPoints} />
          </Reveal>
        </div>
      </section>

      {/* How Treasury Management works */}
      <section className="product-panel">
        <div aria-hidden className="absolute top-0 right-1/2 bottom-0 left-1/2 -z-10 -mr-[50vw] -ml-[50vw] w-screen bg-[#FCFBF1]" />
        <div className={CONTENT}>
          <div className="product-feature-row">
            <Reveal>
              <h2 className="product-section-title">
                How Treasury Management works
              </h2>
              <PointList points={yieldPoints} />
              <ProductCTA>
                {CTA_LABEL}
              </ProductCTA>
            </Reveal>
            <Reveal className="order-first xl:order-last">
              <ContourImageBox className="aspect-square w-full lg:aspect-auto lg:h-[606px]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Manage your business across borders */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <div className="product-use-case">
          <Reveal>
            <div className="relative aspect-[608/512] w-full overflow-hidden rounded-2xl">
              <Image
                src={TreasuryUseCase}
                alt="Business owners reviewing finances over coffee"
                fill
                sizes="(max-width: 1023px) 100vw, 608px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:pl-10">
            <h2 className="mobile-section-title max-w-[420px] text-xenon-gray lg:text-[32px] lg:leading-[1.25]">
              Manage your business across borders
            </h2>
            <p className="mt-4 max-w-[380px] text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-5 lg:text-xl lg:leading-[1.4]">
              Importers hold reserves ahead of a payment, exporters spread large conversions to avoid volatility. Any business earning in one currency and spending in another needs to manage that gap deliberately.
            </p>
            <ProductCTA>
              {CTA_LABEL}
            </ProductCTA>
          </Reveal>
        </div>
      </section>

      <CustomerTestimonials />

      <AvailableCountries />

      <MarketingCTA
        variant="business"
        heading="Manage your money the way a treasury desk would"
        description="Start by seeing exactly where your balances stand, and decide from there what deserves to be converted, protected, or put to work."
      />

      <FrequentlyAskedQuestions variant="business" items={faqItems} />
    </>
  );
}
