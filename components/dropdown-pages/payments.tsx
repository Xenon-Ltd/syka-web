"use client";

import PaymentsAnimation from "@/assets/lottie-files/Send.json";
import {
  ArrowLeftRight,
  BadgeDollarSign,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";
import Image from "next/image";
import { Payments } from "@/assets/images";

type FeatureCard = {
  title: string;
  description: string;
  Icon: LucideIcon;
  bgClass: string;
  iconColorClass: string;
  titleColorClass: string;
  bodyColorClass: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "Instant cross-border transfers",
    description: "Send to 50+ countries in minutes. Not days.",
    Icon: ArrowLeftRight,
    bgClass: "bg-[#5742AE]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/75",
  },
  {
    title: "Competitive exchange rates",
    description: "Up to 5x cheaper than a traditional bank wire.",
    Icon: BadgeDollarSign,
    bgClass: "bg-[#F7EFE5]",
    iconColorClass: "text-[#C89F87]",
    titleColorClass: "text-[#1C2433]",
    bodyColorClass: "text-[#9AA7BC]",
  },
  {
    title: "99.8% payment success rate",
    description:
      "Reliable infrastructure built for business-critical transfers.",
    Icon: ShieldCheck,
    bgClass: "bg-[#2C7FC0]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/75",
  },
];

export default function PaymentsPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="PAYMENTS"
        title="Move Money Without Borders"
        description="Pay suppliers, contractors, and partners anywhere in the world, instantly, securely, and at competitive rates."
        ctaLabel="Get started with SYKA"
      >
        <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px] lg:h-[680px] lg:max-w-[840px]">
          <Lottie
            animationData={PaymentsAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      </ProductHeroShell>

      <section className="px-5 py-16 sm:px-6 md:py-24 lg:flex lg:min-h-[95vh] lg:items-center lg:py-32 xl:px-0">
        <div className="mx-auto max-w-[1440px]">
          <div className="w-full text-center lg:text-left">
            <h2 className="mobile-section-title w-full text-[#42536A] md:text-4xl lg:text-5xl lg:leading-[1.02]">
              Pay Anyone <span className="text-xenon">Anywhere</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-8">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className={`flex min-h-[240px] flex-col items-center rounded-[22px] p-8 text-center md:items-start md:p-10 md:text-left lg:min-h-[320px] lg:rounded-[28px] lg:p-10 ${card.bgClass}`}
              >
                <div
                  className={`inline-flex size-10 items-center justify-center rounded-xl border border-white/40 bg-white/20 lg:size-12 ${card.iconColorClass}`}
                >
                  <card.Icon className="size-4 lg:size-5" strokeWidth={2.2} />
                </div>
                <h3
                  className={`mt-8 w-full text-xl leading-snug font-semibold md:text-2xl lg:text-[32px] lg:leading-[1.08] ${card.titleColorClass}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-4 w-full text-base leading-relaxed md:text-lg lg:leading-[1.75] ${card.bodyColorClass}`}
                >
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-12 md:mt-20 lg:mt-28 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-24 xl:gap-28">
            <div className="mx-auto w-full text-center lg:mx-0 lg:max-w-[560px] lg:text-left">
              <p className="mobile-eyebrow text-[#9AA8BA] lg:text-[14px] lg:tracking-[0.2em]">
                Who It&apos;s For
              </p>
              <h3 className="mobile-section-title mt-4 text-[#42536A] md:text-4xl lg:text-5xl lg:leading-[1.02]">
                Built For Businesses
                <br />
                That Import To <span className="text-xenon">Grow</span>
              </h3>
              <p className="mt-5 w-full text-base leading-relaxed text-[#96A5B6] md:text-lg lg:mt-6 lg:text-[19px] lg:leading-[1.75]">
                Pay your suppliers in China, Turkey, India, or the UAE. Pay
                contractors globally. Send payroll to a distributed team, all
                from one place, at one flat fee.
              </p>
              <button className="mt-8 mx-auto block w-fit rounded-lg bg-xenon px-8 py-4 text-base font-semibold text-white shadow-[0_14px_24px_rgba(0,142,219,0.25)] transition-colors duration-200 hover:bg-xenon-600 lg:mx-0 lg:mt-10 lg:text-lg">
                Create Transfer
              </button>
            </div>

            <div className="flex w-full justify-center lg:justify-end">
              <Image
                src={Payments}
                width={720}
                height={560}
                alt="payments-image"
                sizes="(max-width: 1023px) 100vw, 720px"
                className="w-full max-w-[620px] rounded-[22px] shadow-[0_20px_45px_rgba(61,71,86,0.12)] lg:max-w-[720px] lg:rounded-[30px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
