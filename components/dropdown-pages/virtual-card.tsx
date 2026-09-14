"use client";

import { VirtualCardHeroIllustration, VirtualCardUseCase } from "@/assets/images";
import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  SlidersHorizontal,
  SquarePen,
  Wallet,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import CustomerTestimonials from "../customer-testimonials";
import FrequentlyAskedQuestions from "../frequently-asked-questions";
import MarketingCTA from "../marketing-cta";
import CompaniesMarquee from "../business/companies-marquee";
import ProductHeroShell from "./product-hero-shell";
import { CONTENT, ContourImageBox, PointList, ProductCTA, Reveal, type Point } from "./shared";

const CTA_LABEL = "Create Syka Card";

type FeatureCard = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const featureCards: FeatureCard[] = [
  {
    Icon: WalletCards,
    title: "Unlimited cards for all employee",
    description: "Instantly create cards and start using it immediately for each subscription, supplier, campaign, or team member.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Flexible Configuration",
    description: "Set a monthly cap, a per-transaction cap. Restrict a card so it only works with one specific merchant or subscriptions you want to control precisely",
  },
  {
    Icon: BadgeCheck,
    title: "Every charge, as it happens",
    description: "Real-time notifications and a running record for every card. Know exactly what has been spent, and where.",
  },
];

const internationalPoints: Point[] = [
  {
    Icon: ShieldCheck,
    text: "Every Syka Card is issued through our licensed card issuing partnership backed by regulatory and security standards.",
  },
  {
    Icon: SquarePen,
    text: "Name the card, set a spending limit, and choose which balance it draws from. Takes about thirty seconds.",
  },
  {
    Icon: CreditCard,
    text: "Paste card details into any checkout, subscription form, or ad account right away.",
  },
  {
    Icon: Wallet,
    text: "Every charge appears, tagged to that specific card. Change limit, freeze, or cancel it entirely whenever you need to.",
  },
];

const faqItems = [
  {
    question: "What currency are cards issued in?",
    answer: "Cards are issued in US dollars, drawing from your Syka balance.",
  },
  {
    question: "Is there a limit to how many cards I can create?",
    answer: "No. Create as many as your business needs — one per subscription, per team member, or per campaign.",
  },
  {
    question: "What happens if a card is compromised?",
    answer: "Freeze it instantly from your dashboard, then cancel and reissue if needed. No charges can be made on a frozen card.",
  },
  {
    question: "Can I give cards to my employees?",
    answer: "Yes. Assign a card to any team member on your account, with its own limit and its own visibility.",
  },
  {
    question: "Where are the cards accepted?",
    answer: "Anywhere that accepts standard international card payments online, including cloud providers, advertising platforms, software subscriptions, and international suppliers.",
  },
];

export default function VirtualCardPage() {
  return (
    <>
      <ProductHeroShell variant="cream"
        eyebrow="Virtual Cards"
        title="Cards that work the way your business actually spends"
        description="Generate secure virtual cards for teams, subscriptions, and vendors, with real-time tracking and built-in spending limits."
        ctaLabel={CTA_LABEL}
      >
        <div className="relative mx-auto aspect-[613/588] w-full max-w-[613px]">
          <Image
            src={VirtualCardHeroIllustration}
            alt="Syka virtual card illustration"
            fill
            sizes="(max-width: 1023px) 100vw, 613px"
            className="object-contain"
            priority
          />
        </div>
      </ProductHeroShell>

      <div className={`${CONTENT} flex justify-center`}>
        <CompaniesMarquee />
      </div>

      {/* The card that works internationally */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <Reveal className="max-w-[770px]">
          <h2 className="product-section-title">
            The card that works <span className="text-xenon">internationally</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-6 lg:text-xl lg:leading-[1.55]">
            Syka Virtual Cards fixes the gaps of running an international business. Issued specifically for every subscription, every campaign, every team member. Created in seconds, controlled precisely, and visible in real time.
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

      {/* Free cards for all international transactions */}
      <section className="product-panel">
        <div aria-hidden className="absolute top-0 right-1/2 bottom-0 left-1/2 -z-10 -mr-[50vw] -ml-[50vw] w-screen bg-[#FCFBF1]" />
        <div className={CONTENT}>
          <div className="product-feature-row">
            <Reveal>
              <h2 className="product-section-title">
                Free cards for all international transactions
              </h2>
              <PointList points={internationalPoints} />
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

      {/* Built for how businesses spend abroad */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <div className="product-use-case">
          <Reveal>
            <div className="relative aspect-[608/512] w-full overflow-hidden rounded-2xl">
              <Image
                src={VirtualCardUseCase}
                alt="Business owner paying with a Syka virtual card"
                fill
                sizes="(max-width: 1023px) 100vw, 608px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:pl-10">
            <h2 className="mobile-section-title max-w-[420px] text-xenon-gray lg:text-[32px] lg:leading-[1.25]">
              Built for how businesses spend abroad
            </h2>
            <p className="mt-4 max-w-[380px] text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-5 lg:text-xl lg:leading-[1.4]">
              For software and cloud subscriptions, lock cards to specific merchants to ensure clarity and control.
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
        heading="Stop losing time to declined cards"
        description="Create your first card in under a minute, and see exactly what a card built for your business feels like."
      />

      <FrequentlyAskedQuestions variant="business" items={faqItems} />
    </>
  );
}
