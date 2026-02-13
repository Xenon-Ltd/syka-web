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
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-3">
          More Than Transfers.
        </h2>
        <p className="text-xl xl:text-2xl text-gray-600">
          Your Complete <span className="text-[#29AAE1]">Treasury</span> Toolkit
        </p>
      </div>

      {/* Cards Layout */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full xl:w-1/2">
          <div className="flex flex-col gap-6">
            {/* Get Paid Faster Card */}
            <div className="text-white rounded-3xl bg-[#29AAE1] flex items-end justify-between overflow-hidden">
              <div className="flex-1 p-8 pr-0">
                <h3 className="font-bold text-2xl mb-3">
                  Get Paid Faster, On Your Terms
                </h3>
                <p className="text-white/90 text-sm mb-5 leading-relaxed">
                  Generate and send sleek, professional invoices in multiple
                  currencies.
                </p>
                <button className="flex items-center gap-2 text-white hover:gap-3 transition-all text-sm">
                  <span className="font-normal">Get Now</span>
                  <ArrowRightCircleIcon size={18} />
                </button>
              </div>
              <div className="flex-shrink-0 w-52 self-end">
                <Image src={GetPaidFaster} alt="Get Paid Faster" />
              </div>
            </div>

            {/* Lightning-Flow Transfers Card */}
            <div className="rounded-3xl bg-gray-50 flex items-end justify-between overflow-hidden">
              <div className="flex-1 p-8 pr-0">
                <h3 className="font-bold text-2xl text-gray-900 mb-3">
                  Lightning-Flow Transfers
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  Create secure, disposable virtual debit cards directly from
                  your Syka balance.
                </p>
                <button className="flex items-center gap-2 text-[#29AAE1] hover:gap-3 transition-all text-sm">
                  <span className="font-normal">Get Now</span>
                  <ArrowRightCircleIcon size={18} />
                </button>
              </div>
              <div className="flex-shrink-0 w-52 self-end">
                <Image
                  src={LightningFlowTransfers}
                  alt="Lightning-Flow Transfers"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Spendable Balance Card */}
        <div className="text-white px-8 pt-8 rounded-3xl w-full xl:w-1/2 bg-gradient-to-br from-[#4169B8] via-[#5850B6] to-[#6F38B4]">
          <div className="mb-8">
            <h3 className="font-bold text-2xl mb-3">Spendable Balance</h3>
            <p className="text-white/90 text-sm leading-relaxed mb-5">
              Create secure, disposable virtual debit cards directly from your
              Syka balance.
            </p>
            <button className="flex items-center gap-2 text-white hover:gap-3 transition-all text-sm">
              <span className="font-normal">Get Now</span>
              <ArrowRightCircleIcon size={18} />
            </button>
          </div>
          <div className="flex justify-center mt-12">
            <Image src={SpendableBalance} alt="Spendable Balance" width={305} />
          </div>
        </div>
      </div>

      {/* Your Local Presence Card */}
      <div className="mt-6 px-8 pt-8  rounded-3xl bg-[#D4F4F4] flex items-center justify-between">
        <div className="flex-1 pr-6">
          <h3 className="font-bold text-2xl text-gray-900 mb-3">
            Your Local Presence, Anywhere
          </h3>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Get dedicated virtual account details in major currencies (USD, EUR,
            GBP).
          </p>
          <button className="flex items-center gap-2 text-[#29AAE1] hover:gap-3 transition-all text-sm">
            <span className="font-normal">Get Now</span>
            <ArrowRightCircleIcon size={18} />
          </button>
        </div>
        <div className="flex-shrink-0">
          <Image src={LocalPresence} alt="Local Presence" width={250} />
        </div>
      </div>
    </section>
  );
}
