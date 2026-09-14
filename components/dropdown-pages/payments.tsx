"use client";

import { PaymentsUseCase, VirtualAccountHero } from "@/assets/images";
import {
  BadgeCheck,
  ClipboardCheck,
  HandCoins,
  RefreshCw,
  Send,
  ShieldCheck,
  UserRound,
  Wallet,
  Zap,
  type LucideIcon,
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
  CTA_BUTTON_CLASS,
  PointList,
  Reveal,
  type Point,
} from "./shared";

const CTA_LABEL = "Get started with SYKA";

type FeatureCard = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const featureCards: FeatureCard[] = [
  {
    Icon: Zap,
    title: "Fast, secure and affordable payments",
    description: "No intermediaries adjusting the amount on the way through. The figure shown before you confirm is the figure that arrives.",
  },
  {
    Icon: HandCoins,
    title: "Arrives in the account your recipient uses",
    description: "Bank account or mobile money wallet, in their own currency. Syka routes to the right endpoint and handles the conversion",
  },
  {
    Icon: BadgeCheck,
    title: "Handles the volume your business runs at",
    description: "Bulk payments, scheduled transfers, role-based approvals, and a full transaction record for every one of them.",
  },
];

const enterDetailsPoints: Point[] = [
  {
    Icon: Send,
    text: "Send to a bank account or a mobile money wallet, in their local currency.",
  },
  {
    Icon: UserRound,
    text: "Save recipient details so repeat payments take seconds",
  },
  {
    Icon: ShieldCheck,
    text: "Set a second approver for larger transfers before any funds are released.",
  },
];

const settleRecipientsPoints: Point[] = [
  {
    Icon: Wallet,
    text: "Lands in a bank account or mobile money wallet, in their local currency.",
  },
  {
    Icon: ClipboardCheck,
    text: "You get a confirmation and a reference number the moment it clears.",
  },
  {
    Icon: RefreshCw,
    text: "Every payment is logged automatically, with a full statement available to download whenever you need it.",
  },
];

const faqItems = [
  {
    question: "How fast does a payment actually arrive?",
    answer: "Most transfers within our supported corridors settle within thirty minutes. International corridors outside our core markets typically settle within two business hours.",
  },
  {
    question: "Do I need to understand stablecoins or hold any digital currency myself?",
    answer: "No. You send and receive in ordinary currency — dollars, cedis, naira, pounds, whatever your business uses. The settlement technology underneath is entirely invisible to you.",
  },
  {
    question: "What happens if a payment fails?",
    answer: "Funds that cannot be delivered are returned to your balance automatically, and you're notified with the reason.",
  },
  {
    question: "Is there a minimum or maximum transaction size?",
    answer: "Limits depend on your account's verification tier. Higher tiers with enhanced verification support significantly larger transactions.",
  },
  {
    question: "How is my payment screened?",
    answer: "Every transaction is checked against international sanctions and politically exposed person lists before it is processed, as part of our standard compliance process.",
  },
];

export default function PaymentsPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="Syka Payments"
        title="Cross-border payments, without the wait"
        description="Pay suppliers, contractors, and partners anywhere in the world, instantly, securely, and at competitive rates."
        ctaLabel={CTA_LABEL}
      >
        <div className="relative aspect-square w-full max-w-[608px] overflow-hidden rounded-2xl bg-xenon-primary">
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

      {/* Pay anyone Anywhere */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <Reveal className="max-w-[770px]">
          <h2 className="product-section-title">
            Pay anyone <span className="text-xenon">Anywhere</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-6 lg:text-xl lg:leading-[1.55]">
            Cross-border payments fail businesses in the same three places: delivery, operations, and record-keeping. Here&apos;s how Syka handles all of them.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-6 lg:mt-10">
          {featureCards.map((card) => (
            <Reveal key={card.title}>
              <article className="flex h-full flex-col items-start gap-3 rounded-[24px] border-[0.5px] border-[#E6F2FB] bg-[#E4F4FB] p-8 lg:rounded-[32px] lg:p-[35px]">
                <div className="flex size-10 items-center justify-center rounded-lg text-xenon-brand">
                  <card.Icon className="size-8" strokeWidth={1.75} />
                </div>
                <h3 className="text-2xl leading-snug font-bold text-[#1F1A0B] lg:text-[32px] lg:leading-[36px]">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-xenon-gray lg:text-lg lg:leading-[26px]">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Make payment with Syka in three simple steps */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <Reveal className="max-w-[845px]">
          <h2 className="product-section-title">
            Make payment with Syka in three simple steps
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-6 lg:text-xl lg:leading-[1.55]">
            Most of the complexity stays on our side. You enter the details, confirm exactly what your recipient receives, and we handle everything in between.
          </p>
        </Reveal>

        <div className="product-feature-row">
          <Reveal>
            <h3 className="product-feature-title">
              Enter the details
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Amount, recipient, and how they&apos;ll be paid. Before you confirm, Syka shows you the exact rate, the fee, and the figure your recipient will receive.
            </p>
            <PointList points={enterDetailsPoints} />
          </Reveal>
          <Reveal className="order-first xl:order-last">
            <ContourImageBox className="aspect-square w-full lg:aspect-auto lg:h-[515px]" />
          </Reveal>
        </div>

        <div className="product-feature-row product-feature-row-reverse">
          <Reveal>
            <ContourImageBox flip className="aspect-square w-full lg:aspect-auto lg:h-[515px]" />
          </Reveal>
          <Reveal>
            <h3 className="product-feature-title">
              We settle Recipients
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Funds convert and route directly through our settlement network. No correspondent chain passing your payment through intermediaries
            </p>
            <PointList points={settleRecipientsPoints} />
          </Reveal>
        </div>
      </section>

      <CustomerTestimonials />

      {/* Built for how you pay people */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <div className="product-use-case">
          <Reveal>
            <div className="relative aspect-[608/512] w-full overflow-hidden rounded-2xl">
              <Image
                src={PaymentsUseCase}
                alt="Business owner sending a payment from their phone"
                fill
                sizes="(max-width: 1023px) 100vw, 608px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:pl-10">
            <h2 className="mobile-section-title max-w-[420px] text-xenon-gray lg:text-[32px] lg:leading-[1.25]">
              Built for how you pay people
            </h2>
            <p className="mt-4 max-w-[380px] text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-5 lg:text-xl lg:leading-[1.4]">
              Syka Payments works both ways — businesses use it to pay suppliers, contractors, and international clients, while banks and fintechs run it as the settlement layer beneath their own products.
            </p>
            <button className={CTA_BUTTON_CLASS}>
              {CTA_LABEL}
            </button>
          </Reveal>
        </div>
      </section>

      <AvailableCountries />

      <MarketingCTA
        variant="business"
        heading="Ready to move money properly?"
        description="Whether you're paying a single supplier or building the payments layer for your own product, Syka gives you the rails to do it properly."
      />

      <FrequentlyAskedQuestions variant="business" items={faqItems} />
    </>
  );
}
