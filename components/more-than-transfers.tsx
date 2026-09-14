"use client";

import { GetPaidFaster, LightningFlowTransfers, LocalPresence, SpendableBalance } from "@/assets/images";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/animation";

const smallCards = [
  {
    title: "Get Paid Faster, On Your Terms",
    body: "Generate links or invoices, integrate our API, and accept USDT, USDC, and cards globally with funds arriving in seconds.",
    image: GetPaidFaster,
    href: "/?product=invoicing",
    background: "bg-[#29aae1] text-white",
    text: "text-white/90",
    link: "text-white",
  },
  {
    title: "Lightning-Flow Transfers",
    body: "Send USDT globally, pay multiple recipients, and automate recurring payments with no banks or delays.",
    image: LightningFlowTransfers,
    href: "/?product=payments",
    background: "bg-[#e4f4fb] text-xenon-gray",
    text: "text-[#657089]",
    link: "text-xenon",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: EASE_OUT },
};
const linkStyle = "relative z-10 mt-4 inline-flex w-fit items-center gap-2 rounded text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

export default function MoreThanTransfers() {
  return (
    <section id="treasury-toolkit" aria-labelledby="toolkit-heading" className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] scroll-mt-8 px-5 sm:px-6")}>
      <h2 id="toolkit-heading" className={cn(businessStyles.sectionHeading, "mb-10 max-w-[579px] text-xenon-gray")}>
        More Than Transfers.<br />Your Complete <span className="text-xenon-brand">Treasury</span> Toolkit
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-6">
          {smallCards.map((card) => (
            <motion.article key={card.title} {...reveal} className={cn("relative isolate min-h-[398px] overflow-hidden rounded-2xl p-10 pb-28 lg:rounded-[32px]", card.background)}>
              <h3 className={cn(businessStyles.cardHeading, "relative z-10 max-w-[330px]")}>{card.title}</h3>
              <p className={cn(businessStyles.body, "relative z-10 mt-3 max-w-[408px]", card.text)}>{card.body}</p>
              <Link href={card.href} className={cn(linkStyle, card.link)}>Get Now <ArrowRightCircle aria-hidden="true" className="size-4" /></Link>
              <div className="pointer-events-none absolute right-0 bottom-0 h-[140px] w-[190px] lg:h-[160px] lg:w-[210px]">
                <Image src={card.image} alt="" fill sizes="210px" className="object-contain object-right-bottom" />
              </div>
            </motion.article>
          ))}
        </div>
        <motion.article {...reveal} className="flex min-h-[820px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#1377bc] to-[#7953ba] p-8 text-white lg:rounded-[32px]">
          <h3 className={businessStyles.cardHeading}>Spendable Balance</h3>
          <p className={cn(businessStyles.body, "mt-3 max-w-[330px] text-white/90")}>Create secure, disposable virtual debit cards directly from your Syka balance.</p>
          <Link href="/?product=virtual-card" className={cn(linkStyle, "text-[#55dbe6]")}>Get Now <ArrowRightCircle aria-hidden="true" className="size-4" /></Link>
          <div className="relative -mx-4 -mb-8 mt-auto h-[340px] lg:h-[400px]">
            <Image src={SpendableBalance} alt="Syka virtual debit card and wallet" fill sizes="(max-width: 1023px) 90vw, 550px" placeholder="blur" className="object-contain object-bottom" />
          </div>
        </motion.article>
        <motion.article {...reveal} className="grid overflow-hidden rounded-2xl bg-[#c9f5f6] lg:col-span-2 lg:grid-cols-2 lg:rounded-[32px]">
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <h3 className={cn(businessStyles.cardHeading, "max-w-[280px] text-xenon-gray")}>Your Local Presence, Anywhere</h3>
            <p className={cn(businessStyles.body, "mt-3 max-w-[360px] text-[#657089]")}>Hold USDT or USDC, convert when needed, and manage multi-currency (USD, EUR, GBP) balances in real time.</p>
            <Link href="/?product=virtual-account" className={cn(linkStyle, "text-xenon")}>Get Now <ArrowRightCircle aria-hidden="true" className="size-4" /></Link>
          </div>
          <div className="relative mx-6 mt-4 h-[320px] lg:mx-8 lg:mt-10 lg:h-[400px]">
            <Image src={LocalPresence} alt="Syka multi-currency account balances" fill sizes="(max-width: 1023px) 90vw, 520px" placeholder="blur" className="object-contain object-bottom" />
          </div>
        </motion.article>
      </div>
    </section>
  );
}
