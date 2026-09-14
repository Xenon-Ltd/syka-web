"use client";

import { InvoicingUseCase } from "@/assets/images";
import {
  CircleUserRound,
  FileCheck2,
  RotateCw,
  Send,
  Share2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import CustomerTestimonials from "../customer-testimonials";
import FrequentlyAskedQuestions from "../frequently-asked-questions";
import MarketingCTA from "../marketing-cta";
import CompaniesMarquee from "../business/companies-marquee";
import { CONTENT, ContourImageBox, CTA_BUTTON_CLASS, PointList, Reveal, type Point } from "./shared";

const CTA_LABEL = "Create Invoice";

const detailsPoints: Point[] = [
  {
    Icon: ShieldCheck,
    text: "Invoicing is included with every Syka business account, at no additional cost. Standard fees apply only when a payment is received.",
  },
  {
    Icon: FileCheck2,
    text: "When a payment lands, Syka checks it against your open invoices and marks the right one paid. If nothing matches, you're prompted to link it yourself.",
  },
];

const remindersPoints: Point[] = [
  {
    Icon: RotateCw,
    text: "Set an invoice to repeat on a schedule for clients you bill regularly, and let it run without recreating it each time.",
  },
  {
    Icon: Share2,
    text: "Every invoice, every payment, every reference, exportable in full for your own books or for whoever manages them.",
  },
];

const backAndForthPoints: Point[] = [
  {
    Icon: CircleUserRound,
    text: "Add your client, your line items, and the currency. Syka fills in your account details automatically.",
  },
  {
    Icon: Send,
    text: "Email it directly from Syka, or download a PDF to send however you prefer.",
  },
  {
    Icon: FileCheck2,
    text: "Syka matches the incoming payment to the invoice and lets you know the moment it lands.",
  },
];

const faqItems = [
  {
    question: "Can I invoice in a currency I don't yet hold an account in?",
    answer: "",
  },
  {
    question: "What happens if a client only pays part of an invoice?",
    answer: "The invoice is marked partly paid, showing exactly how much has arrived and how much remains outstanding.",
  },
  {
    question: "Can I set up an invoice to repeat automatically?",
    answer: "",
  },
  {
    question: "Will my client see any Syka branding?",
    answer: "",
  },
  {
    question: "Can I still download a PDF if I want to send it myself?",
    answer: "",
  },
];

export default function InvoicingPage() {
  return (
    <>
      <section className="product-hero product-hero-cream">
        <div className={`${CONTENT} product-hero-inner`}>
          <Reveal className="product-hero-copy">
            <p>Invoicing</p>
            <h1>Invoice the world, and get paid without follow-up</h1>
            <p className="product-hero-description">
              Send professional invoices with your international account details built in, and let incoming payments match themselves against what&apos;s outstanding.
            </p>
            <button className={CTA_BUTTON_CLASS}>{CTA_LABEL}</button>
          </Reveal>
        </div>
      </section>

      <div className={`${CONTENT} flex justify-center`}>
        <CompaniesMarquee />
      </div>

      {/* Invoicing and payment collection in one step */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <Reveal className="max-w-[845px]">
          <h2 className="product-section-title">
            Invoicing and payment collection in one step
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-6 lg:text-xl lg:leading-[1.55]">
            Syka Invoices carries the correct account details for the currency you&apos;re billing. When payment arrives, Syka matches it to the invoice automatically. No manual reconciliation, no chasing.
          </p>
        </Reveal>

        <div className="product-feature-row">
          <Reveal>
            <h3 className="product-feature-title">
              Your details, already attached
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Every invoice is generated with the correct virtual account details for its currency, drawn directly from your Syka account. There is nothing extra to send.
            </p>
            <PointList points={detailsPoints} />
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
              Automated Reminders
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#8893A4] md:text-xl lg:mt-5 lg:leading-[1.4]">
              Automatic notices before and after the due date, so an overdue invoice does not depend on you remembering to chase it.
            </p>
            <PointList points={remindersPoints} />
          </Reveal>
        </div>
      </section>

      {/* Get paid without the back and forth */}
      <section className="product-panel">
        <div aria-hidden className="absolute top-0 right-1/2 bottom-0 left-1/2 -z-10 -mr-[50vw] -ml-[50vw] w-screen bg-[#FCFBF1]" />
        <div className={CONTENT}>
          <div className="product-feature-row">
            <Reveal>
              <h2 className="product-section-title">
                Get paid without the back and forth.
              </h2>
              <PointList points={backAndForthPoints} />
              <button className={CTA_BUTTON_CLASS}>
                {CTA_LABEL}
              </button>
            </Reveal>
            <Reveal className="order-first xl:order-last">
              <ContourImageBox className="aspect-square w-full lg:aspect-auto lg:h-[606px]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Built for the way service businesses bill */}
      <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
        <div className="product-use-case">
          <Reveal>
            <div className="relative aspect-[608/512] w-full overflow-hidden rounded-2xl">
              <Image
                src={InvoicingUseCase}
                alt="Colleagues celebrating a payment received"
                fill
                sizes="(max-width: 1023px) 100vw, 608px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:pl-10">
            <h2 className="mobile-section-title max-w-[380px] text-xenon-gray lg:text-[32px] lg:leading-[1.25]">
              Built for the way service businesses bill
            </h2>
            <p className="mt-4 max-w-[380px] text-base leading-relaxed text-[#8893A4] md:text-lg lg:mt-5 lg:text-xl lg:leading-[1.4]">
              Agencies bill international clients without a second system. Exporters keep payment terms and shipments connected. Freelancers send an invoice abroad and get paid, and reconciled as simply as one sent across town.
            </p>
            <button className={CTA_BUTTON_CLASS}>
              {CTA_LABEL}
            </button>
          </Reveal>
        </div>
      </section>

      <CustomerTestimonials />

      <MarketingCTA
        variant="business"
        heading="Send your next invoice properly"
        description="Create an invoice that already carries your account details, and let the payment find its way home on its own."
      />

      <FrequentlyAskedQuestions variant="business" items={faqItems} />
    </>
  );
}
