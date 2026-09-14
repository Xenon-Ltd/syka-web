"use client";

import {
  VirtualAccountCity,
  VirtualAccountDashboardCard,
  VirtualAccountHero,
} from "@/assets/images";
import {
  Banknote,
  CircleUserRound,
  Contact,
  HandCoins,
  LaptopMinimalCheck,
  ShieldCheck,
  UserCheck,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import CustomerTestimonials from "../customer-testimonials";
import FrequentlyAskedQuestions from "../frequently-asked-questions";
import MarketingCTA from "../marketing-cta";
import CompaniesMarquee from "../business/companies-marquee";
import ProductHeroShell from "./product-hero-shell";
import { CONTENT, ContourImageBox, PointList, ProductCTA, Reveal, type Point } from "./shared";

const CTA_LABEL = "Create a Virtual Account";

const dedicatedPoints: Point[] = [
  {
    Icon: ShieldCheck,
    text: "Syka Virtual Accounts are issued in partnership with our regulated banking infrastructure backed by safeguarding and compliance standards.",
  },
  {
    Icon: Wallet,
    text: "Share bank details with client and receive payments in your Syka balance without wire transfer or unfamiliar processes.",
  },
];

const multiCurrencyPoints: Point[] = [
  {
    Icon: HandCoins,
    text: "Most payments land in your Syka balance within hours of being sent.",
  },
  {
    Icon: LaptopMinimalCheck,
    text: "Every incoming payment shows the payer's name and reference, matched automatically to an outstanding invoice.",
  },
];

const verificationPoints: Point[] = [
  {
    Icon: UserCheck,
    text: "Complete verification once. Most businesses are approved within two working days.",
  },
  {
    Icon: Contact,
    text: "Get dedicated account details in your business's name, for each currency you choose to enable.",
  },
  {
    Icon: CircleUserRound,
    text: "Add the details to your invoices, or send them directly. Your client pays exactly as they would pay a local supplier.",
  },
  {
    Icon: Banknote,
    text: "Payments arrive in your Syka balance, ready to hold, convert, or pay out.",
  },
];

const faqItems = [
  {
    question: "Is this a real bank account?",
    answer: "It functions as one for receiving purposes — your business is issued genuine account details in its own name, held through our regulated banking partners.",
  },
  {
    question: "How long does it take to open an account?",
    answer: "Most verified businesses are approved and issued account details within two working days.",
  },
  {
    question: "Can I receive payments in more than one currency?",
    answer: "Yes. Enable US dollar, British pound, and euro accounts individually, each with its own dedicated details.",
  },
  {
    question: "What happens to the money once it arrives?",
    answer: "It lands in your Syka balance, where you can hold it, convert it to another currency, or pay it out.",
  },
  {
    question: "Do my clients need to do anything unusual to pay me?",
    answer: "No. From their side, it is an ordinary domestic payment to a local account.",
  },
];

export default function VirtualAccountPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="Virtual Account"
        title="Get paid anywhere in the world"
        description="Receive dedicated account details in your business's own name, in US dollars, British pounds, or euros, without opening a bank account in another country."
        ctaLabel={CTA_LABEL}
      >
        <div className="relative aspect-square w-full max-w-[608px] overflow-hidden rounded-2xl">
          <div className="absolute top-[-46.55%] left-[-42.94%] h-[248%] w-[185.94%]">
            <Image
              src={VirtualAccountHero}
              alt="Syka dashboard open on a laptop"
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

      {/* How it works */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <Reveal className="max-w-[845px]">
          <h2 className="product-section-title">
            International client payments made simple
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-6 lg:text-xl lg:leading-[1.55]">
            Syka Virtual Accounts eliminate cross-border payment barriers. We provide complete local account details, including routing and account numbers under your official business name, so you can receive payments as seamlessly as any resident company.
          </p>
        </Reveal>

        <div className="product-feature-row">
          <Reveal>
            <h3 className="product-feature-title">
              Dedicated in your account name
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              These are not shared or pooled account details. When your client pays, they see your business&apos;s own name and details
            </p>
            <PointList points={dedicatedPoints} />
          </Reveal>
          <Reveal className="order-first xl:order-last">
            <ContourImageBox className="aspect-square w-full lg:aspect-auto lg:h-[515px]">
              <div className="absolute top-[13%] left-1/2 h-[85%] w-[68%] -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-[#BCCED9]">
                <Image
                  src={VirtualAccountDashboardCard}
                  alt="Syka virtual account balances and transactions"
                  fill
                  sizes="(max-width: 1023px) 60vw, 414px"
                  className="object-cover"
                />
              </div>
            </ContourImageBox>
          </Reveal>
        </div>

        <div className="product-feature-row product-feature-row-reverse">
          <Reveal>
            <ContourImageBox flip className="aspect-square w-full lg:aspect-auto lg:h-[515px]" />
          </Reveal>
          <Reveal>
            <h3 className="product-feature-title">
              Multiple currencies, one dashboard
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Hold and receive in US dollars, British pounds, and euros. Convert to your local currency whenever the timing suits you, rather than being forced to convert on arrival.
            </p>
            <PointList points={multiCurrencyPoints} />
          </Reveal>
        </div>
      </section>

      {/* Verification / local accounts */}
      <section className="product-panel">
        <div aria-hidden className="absolute top-0 right-1/2 bottom-0 left-1/2 -z-10 -mr-[50vw] -ml-[50vw] w-screen bg-[#FCFBF1]" />
        <div className={CONTENT}>
          <div className="product-feature-row">
            <Reveal>
              <h2 className="product-section-title">
                Local accounts, in every currency you need.
              </h2>
              <PointList points={verificationPoints} />
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

      {/* Built for cross-border businesses */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <div className="product-use-case">
          <Reveal>
            <div className="relative aspect-[608/512] w-full overflow-hidden rounded-2xl">
              <Image
                src={VirtualAccountCity}
                alt="City skyline representing global business reach"
                fill
                sizes="(max-width: 1023px) 100vw, 608px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:pl-10">
            <h2 className="mobile-section-title max-w-[420px] text-xenon-gray lg:text-[32px] lg:leading-[1.25]">
              Built for businesses that earn beyond their borders
            </h2>
            <p className="mt-4 max-w-[380px] text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-5 lg:text-xl lg:leading-[1.4]">
              Exporters, agencies and consultants bill international clients with virtual accounts without losing days to correspondent banking.
            </p>
            <ProductCTA>
              {CTA_LABEL}
            </ProductCTA>
          </Reveal>
        </div>
      </section>

      <CustomerTestimonials />

      <MarketingCTA
        variant="business"
        heading="Get paid the way local businesses get paid"
        description="Open your first virtual account and start receiving international payments without ever opening a foreign bank account."
      />

      <FrequentlyAskedQuestions variant="business" items={faqItems} />
    </>
  );
}
