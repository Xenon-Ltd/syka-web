import {
  BankGradeSecurity,
  StablecoinPowered,
  TransparentWallet,
} from "@/assets/images";
import Image from "next/image";
import React from "react";

function BuiltOnStability() {
  return (
    <section className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 xl:mt-24 xl:px-0">
      <div className="mb-10 text-center xl:mb-12 xl:text-left">
        <h2 className="text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Built on <span className="text-xenon">Stability,</span>
        </h2>
        <p className="mt-2 text-[33px] leading-[1.1] font-bold text-[#121733] sm:text-[39px]">
          Guarded by <span className="text-xenon">Security</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex min-h-[248px] flex-col items-center rounded-2xl shadow-sm bg-white p-7 text-center md:items-start md:text-left">
          <Image src={StablecoinPowered} alt="Stablecoin Powered" width={74} />
          <p className="mt-4 text-[22px] leading-[1.2] font-bold text-[#121733]">
            Stablecoin-Powered
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#546076]">
            We use fully-backed, regulated stablecoins for predictable
            value.{" "}
          </p>
        </div>
        <div className="flex min-h-[248px] flex-col items-center rounded-2xl shadow-sm bg-white p-7 text-center md:items-start md:text-left">
          <Image src={BankGradeSecurity} alt="Bank Grade Security" width={74} />
          <p className="mt-4 text-[22px] leading-[1.2] font-bold text-[#121733]">
            Bank-Grade Security
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#546076]">
            SOC 2 compliant, encryption, and multi-sig custody protocols,
            operating within global compliance frameworks.
          </p>
        </div>
        <div className="flex min-h-[248px] flex-col items-center rounded-2xl shadow-sm bg-white p-7 text-center md:items-start md:text-left">
          <Image src={TransparentWallet} alt="Transparent Wallet" width={74} />
          <p className="mt-4 text-[22px] leading-[1.2] font-bold text-[#121733]">
            Transparent Wallet
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#546076]">
            You control your funds, with clear balances, real-time visibility,
            and no hidden restrictions
          </p>
        </div>
      </div>
    </section>
  );
}

export default BuiltOnStability;
