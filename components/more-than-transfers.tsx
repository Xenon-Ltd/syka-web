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
    <section className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 xl:mt-24 xl:px-0">
      <div className="mb-10 xl:mb-12">
        <h2 className="text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          More Than Transfers.
        </h2>
        <p className="mt-2 text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Your Complete <span className="text-xenon">Treasury</span> Toolkit
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.03fr_0.77fr]">
        <div className="grid gap-4">
          <article className="group flex min-h-[255px] flex-col overflow-hidden rounded-2xl bg-[#2CA4E8] text-white md:flex-row">
            <div className="flex flex-1 flex-col items-start justify-center p-5 text-left sm:p-7">
              <h3 className="max-w-[320px] text-[26px] leading-[1.15] font-bold sm:text-[29px]">
                Get Paid Faster, On Your Terms
              </h3>
              <p className="mt-3 max-w-[340px] text-[15px] leading-[1.6] text-white/90">
                Generate links or invoices, integrate our API, and accept USDT,
                USDC, and cards globally with funds arriving in seconds.
              </p>
              <button className="mt-4 flex items-center gap-2 text-[15px] text-white transition-[gap] duration-300 ease-out group-hover:gap-3">
                <span>Get Now</span>
                <ArrowRightCircleIcon size={18} />
              </button>
            </div>
            <div className="relative h-52 w-full shrink-0 md:min-h-[255px] md:h-auto md:w-[230px]">
              <Image
                src={GetPaidFaster}
                alt="Get Paid Faster"
                fill
                sizes="(max-width: 768px) 100vw, 230px"
                placeholder="blur"
                className="p-0 object-contain object-center md:object-right-bottom transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </article>

          <article className="group flex min-h-[255px] flex-col overflow-hidden rounded-2xl bg-[#F5F8FC] md:flex-row">
            <div className="flex flex-1 flex-col items-start justify-center p-5 text-left sm:p-7">
              <h3 className="max-w-[280px] text-[26px] leading-[1.15] font-bold text-[#121733] sm:text-[29px]">
                Lightning-Flow Transfers
              </h3>
              <p className="mt-3 max-w-[320px] text-[15px] leading-[1.6] text-[#505A6E]">
                Send USDT globally, pay multiple recipients, and automate
                recurring payments with no banks or delays.
              </p>
              <button className="mt-4 flex items-center gap-2 text-[15px] text-xenon transition-[gap] duration-300 ease-out group-hover:gap-3">
                <span>Get Now</span>
                <ArrowRightCircleIcon size={18} />
              </button>
            </div>
            <div className="relative h-52 w-full shrink-0 md:min-h-[255px] md:h-auto md:w-[230px]">
              <Image
                src={LightningFlowTransfers}
                alt="Lightning-Flow Transfers"
                fill
                sizes="(max-width: 768px) 100vw, 230px"
                className="p-0 object-contain object-center md:object-right-bottom transition-transform duration-500 ease-out group-hover:scale-125"
              />
            </div>
          </article>
        </div>

        <article className="group flex min-h-[470px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#2A85D8] to-[#5E49C7] p-5 text-white sm:min-h-[524px] sm:p-7">
          <h3 className="text-[26px] leading-[1.15] font-bold sm:text-[29px]">
            Spendable Balance
          </h3>
          <p className="mt-3 max-w-[290px] text-[15px] leading-[1.6] text-white/90">
            Create secure, disposable virtual debit cards directly from your
            Syka balance
          </p>
          <button className="mt-6 flex items-center gap-2 text-[15px] text-white transition-[gap] duration-300 ease-out group-hover:gap-3">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
          <div className="relative mt-auto h-[260px] w-full sm:h-[330px] mb-[-30px]">
            <Image
              src={SpendableBalance}
              alt="Spendable Balance"
              fill
              sizes="(max-width: 640px) 100vw, 420px"
              placeholder="blur"
              className="origin-bottom object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
        </article>
      </div>

      <article className="group mt-4 flex min-h-[364px] flex-col overflow-hidden rounded-2xl bg-[#CFF1F4] md:flex-row">
        <div className="flex flex-1 flex-col items-start justify-center p-5 text-left sm:p-7">
          <h3 className="max-w-[300px] text-[26px] leading-[1.15] font-bold text-[#121733] sm:text-[29px]">
            Your Local Presence, Anywhere
          </h3>
          <p className="mt-3 max-w-[360px] text-[15px] leading-[1.6] text-[#505A6E]">
            Hold USDT or USDC, convert when needed, and manage multi-currency
            (USD, EUR, GBP) balances in real time.{" "}
          </p>
          <button className="mt-4 flex items-center gap-2 text-[15px] text-xenon transition-[gap] duration-300 ease-out group-hover:gap-3">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
        </div>
        <div className="relative h-56 w-full shrink-0 md:min-h-[264px] md:h-[400px] md:w-[355px]">
          <Image
            src={LocalPresence}
            alt="Local Presence"
            fill
            sizes="(max-width: 768px) 100vw, 355px"
            placeholder="blur"
            className="object-cover object-right md:pr-10 md:mt-10 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </article>
    </section>
  );
}
