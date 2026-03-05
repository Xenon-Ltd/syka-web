import {
  GetPaidFaster,
  LightningFlowTransfers,
  LocalPresence,
  SpendableBalance,
} from "@/assets/images";
import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";

export default function MoreThanTransfers() {
  return (
    <section className="mx-auto mt-16 max-w-[1092px] px-5 sm:px-6 xl:mt-24 xl:px-0">
      <div className="mb-10 xl:mb-12">
        <h2 className="text-[30px] leading-[1.1] font-bold text-[#121733] sm:text-[35px]">
          More Than Transfers.
        </h2>
        <p className="mt-2 text-[30px] leading-[1.1] font-bold text-[#121733] sm:text-[35px]">
          Your Complete <span className="text-xenon">Treasury</span> Toolkit
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.03fr_0.77fr]">
        <div className="grid gap-4">
          <article className="flex min-h-[255px] flex-col overflow-hidden rounded-2xl bg-[#2CA4E8] text-white md:flex-row">
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <h3 className="max-w-[320px] text-[22px] leading-[1.15] font-bold sm:text-[26px]">
                Get Paid Faster, On Your Terms
              </h3>
              <p className="mt-3 max-w-[340px] text-sm leading-[1.6] text-white/90">
                Generate links or invoices, integrate our API, and accept USDT,
                USDC, and cards globally with funds arriving in seconds.
              </p>
              <button className="mt-auto flex items-center gap-2 pt-4 text-sm text-white">
                <span>Get Now</span>
                <ArrowRightCircleIcon size={18} />
              </button>
            </div>
            <div className="relative h-52 w-full shrink-0 md:min-h-[255px] md:h-auto md:w-[230px]">
              <Image
                src={GetPaidFaster}
                alt="Get Paid Faster"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </article>

          <article className="flex min-h-[255px] flex-col overflow-hidden rounded-2xl bg-[#F5F8FC] md:flex-row">
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <h3 className="max-w-[280px] text-[22px] leading-[1.15] font-bold text-[#121733] sm:text-[26px]">
                Lightning-Flow Transfers
              </h3>
              <p className="mt-3 max-w-[320px] text-sm leading-[1.6] text-[#505A6E]">
                Send USDT globally, pay multiple recipients, and automate
                recurring payments with no banks or delays.
              </p>
              <button className="mt-auto flex items-center gap-2 pt-4 text-sm text-xenon">
                <span>Get Now</span>
                <ArrowRightCircleIcon size={18} />
              </button>
            </div>
            <div className="relative h-52 w-full shrink-0 md:min-h-[255px] md:h-auto md:w-[230px]">
              <Image
                src={LightningFlowTransfers}
                alt="Lightning-Flow Transfers"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </article>
        </div>

        <article className="flex min-h-[470px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#2A85D8] to-[#5E49C7] p-5 text-white sm:min-h-[524px] sm:p-7">
          <h3 className="text-[22px] leading-[1.15] font-bold sm:text-[26px]">
            Spendable Balance
          </h3>
          <p className="mt-3 max-w-[290px] text-sm leading-[1.6] text-white/90">
            Create secure, disposable virtual debit cards directly from your
            Syka balance
          </p>
          <button className="mt-6 flex items-center gap-2 text-sm text-white">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
          <div className="relative mt-auto h-[260px] w-full sm:h-[330px] mb-[-30px]">
            <Image
              src={SpendableBalance}
              alt="Spendable Balance"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </article>
      </div>

      <article className="mt-4 flex min-h-[364px] flex-col overflow-hidden rounded-2xl bg-[#CFF1F4] md:flex-row">
        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <h3 className="max-w-[300px] text-[22px] leading-[1.15] font-bold text-[#121733] sm:text-[26px]">
            Your Local Presence, Anywhere
          </h3>
          <p className="mt-3 max-w-[360px] text-sm leading-[1.6] text-[#505A6E]">
            Hold USDT or USDC, convert when needed, and manage multi-currency
            (USD, EUR, GBP) balances in real time.{" "}
          </p>
          <button className="mt-auto flex items-center gap-2 pt-4 text-sm text-xenon">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
        </div>
        <div className="relative h-56 w-full shrink-0 md:min-h-[264px] md:h-auto md:w-[355px]">
          <Image
            src={LocalPresence}
            alt="Local Presence"
            fill
            className="object-cover object-bottom md:mt-6 md:pr-16"
          />
        </div>
      </article>
    </section>
  );
}
