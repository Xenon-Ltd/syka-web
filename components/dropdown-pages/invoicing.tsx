"use client";

import InvoicingAnimation from "@/assets/lottie-files/Invoicing.json";
import { Banknote, Clock3, FileText, type LucideIcon } from "lucide-react";
import Lottie from "lottie-react";
import ProductHeroShell from "./product-hero-shell";
import Image from "next/image";
import { Invoicing } from "@/assets/images";

type FeatureCard = {
  title: string;
  description: string;
  Icon: LucideIcon;
  bgClass: string;
  iconColorClass: string;
  titleColorClass: string;
  bodyColorClass: string;
};

type Step = {
  title: string;
  description: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "Professional invoices in seconds",
    description: "Branded, itemised, and ready to send. No spreadsheets.",
    Icon: FileText,
    bgClass: "bg-[#2C7FC0]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/75",
  },
  {
    title: "Real-time payment tracking",
    description: "See when invoices are viewed, paid, or overdue at a glance.",
    Icon: Clock3,
    bgClass: "bg-[#EEF3FF]",
    iconColorClass: "text-[#909CB7]",
    titleColorClass: "text-[#1C2433]",
    bodyColorClass: "text-[#9AA7BC]",
  },
  {
    title: "Accept any currency",
    description:
      "GBP, USD, EUR, GHC. Your clients pay in theirs, you receive in yours.",
    Icon: Banknote,
    bgClass: "bg-[#23284F]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/70",
  },
];

const steps: Step[] = [
  {
    title: "Create your invoice",
    description:
      "Add client, line items, and due date. Done in under a minute.",
  },
  {
    title: "Share a payment link",
    description: "Email it or share a link. No sign-up needed on their end.",
  },
  {
    title: "Funds hit your wallet",
    description: "Auto-reconciled. No manual matching, no admin.",
  },
];

export default function InvoicingPage() {
  return (
    <>
      <ProductHeroShell
        eyebrow="INVOICING"
        title="Get Paid Faster. Globally"
        description="Create professional invoices, track payments in real time, and accept global payments without friction."
        ctaLabel="Create Invoice"
      >
        <div className="mx-auto h-[430px] w-full max-w-[700px] sm:h-[560px] lg:h-[680px] lg:max-w-[840px]">
          <Lottie
            animationData={InvoicingAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      </ProductHeroShell>

      <section className="px-5 pt-6 pb-24 sm:px-6 lg:flex lg:min-h-[95vh] lg:items-center lg:pt-10 lg:pb-12 xl:px-0">
        <div className="mx-auto max-w-[1292px]">
          <div className="w-full text-center lg:text-left">
            <h2 className="w-full text-[26px] leading-[1.15] font-semibold text-[#42536A] sm:text-[34px] lg:text-[58px] lg:leading-[1.02]">
              Get Paid On Your <span className="text-xenon">Terms</span>
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

          <div className="mt-18 grid gap-10 lg:mt-28 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-24 xl:gap-28">
            <div className="mx-auto w-full text-center lg:mx-0 lg:max-w-[560px] lg:text-left">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#9AA8BA] uppercase lg:text-[14px] lg:tracking-[0.2em]">
                How It Works
              </p>
              <h3 className="mt-4 text-[32px] leading-[1.15] font-semibold text-[#42536A] lg:text-[56px] lg:leading-[1.02]">
                Create, Send,
                <br />
                &amp; Get <span className="text-xenon">Paid.</span>
              </h3>

              <div className="mx-auto mt-8 max-w-[520px] space-y-5 text-left lg:mx-0 lg:mt-10 lg:max-w-none lg:space-y-6">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4 lg:gap-5">
                    <div className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-xenon text-[11px] font-semibold text-white lg:size-7 lg:text-[13px]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-[17px] leading-[1.35] font-medium text-[#42536A] lg:text-[24px] lg:leading-[1.25]">
                        {step.title}
                      </p>
                      <p className="mt-1.5 max-w-[490px] text-[14px] leading-[1.55] text-[#9AA7BC] lg:text-[18px] lg:leading-[1.7]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 mx-auto block w-fit rounded-lg bg-xenon px-5 py-3 text-[14px] font-medium text-white shadow-[0_14px_24px_rgba(0,142,219,0.25)] transition-colors duration-200 hover:bg-xenon-600 lg:mx-0 lg:mt-10 lg:px-8 lg:py-4 lg:text-[16px]">
                Create Invoice
              </button>
            </div>

            <div className="flex w-full justify-center lg:justify-end">
              <Image
                src={Invoicing}
                alt="invoicing-screenshot"
                width={720}
                height={560}
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
