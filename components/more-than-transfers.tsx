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
    <section className="mx-auto mt-20 max-w-[1092px] px-6 xl:mt-24 xl:px-0">
      <div className="mb-10 xl:mb-12">
        <h2 className="text-[35px] leading-[1.1] font-bold text-[#121733]">
          More Than Transfers.
        </h2>
        <p className="mt-2 text-[35px] leading-[1.1] font-bold text-[#121733]">
          Your Complete <span className="text-xenon">Treasury</span> Toolkit
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.03fr_0.77fr]">
        <div className="grid gap-4">
          <article className="flex min-h-[255px] flex-col overflow-hidden rounded-2xl bg-[#2CA4E8] text-white md:flex-row">
            <div className="flex flex-1 flex-col p-7">
              <h3 className="max-w-[320px] text-[26px] leading-[1.15] font-bold">
                Get Paid Faster, On Your Terms
              </h3>
              <p className="mt-3 max-w-[340px] text-sm leading-[1.6] text-white/90">
                Generate and send sleek, professional invoices in multiple
                currencies.
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
            <div className="flex flex-1 flex-col p-7">
              <h3 className="max-w-[280px] text-[26px] leading-[1.15] font-bold text-[#121733]">
                Lightning-Flow Transfers
              </h3>
              <p className="mt-3 max-w-[320px] text-sm leading-[1.6] text-[#505A6E]">
                Send transfers instantly across supported regions with full
                tracking and transparent conversion rates.
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

        <article className="flex min-h-[524px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#2A85D8] to-[#5E49C7] p-7 text-white">
          <h3 className="text-[26px] leading-[1.15] font-bold">
            Spendable Balance
          </h3>
          <p className="mt-3 max-w-[290px] text-sm leading-[1.6] text-white/90">
            Keep a card-ready balance for online payments and subscriptions,
            with instant visibility and controls.
          </p>
          <button className="mt-6 flex items-center gap-2 text-sm text-white">
            <span>Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
          <div className="relative mt-auto h-[330px] w-full">
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
        <div className="flex flex-1 flex-col p-7">
          <h3 className="max-w-[300px] text-[26px] leading-[1.15] font-bold text-[#121733]">
            Your Local Presence, Anywhere
          </h3>
          <p className="mt-3 max-w-[360px] text-sm leading-[1.6] text-[#505A6E]">
            Access local account details in major currencies so clients can pay
            you with less friction and better confidence.
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
            className="object-cover object-bottom pr-16 mt-6"
          />
        </div>
      </article>
    </section>
  );
}
