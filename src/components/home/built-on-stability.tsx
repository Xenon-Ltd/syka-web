import {
  BankGradeSecurity,
  StablecoinPowered,
  TransparentWallet,
} from "@/assets/images";
import Image from "next/image";
import React from "react";

function BuiltOnStability() {
  return (
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0">
      <div className="text-center mb-12">
        <h2 className="text-3xl xl:text-4xl font-bold text-gray-900">
          Built on <span className="text-xenon-500">Stability,</span>
        </h2>
        <p className="text-3xl xl:text-4xl font-bold text-gray-900">
          Guarded by <span className="text-xenon-500">Security</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <Image src={StablecoinPowered} alt="Stablecoin Powered" width={150} />
          <p className="text-xl font-bold text-gray-900 mb-2">
            Stablecoin-Powered
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            We use fully-backed, regulated stablecoins for predictable value
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <Image
            src={BankGradeSecurity}
            alt="Bank Grade Security"
            width={150}
          />
          <p className="text-xl font-bold text-gray-900 mb-2">
            Bank-Grade Security
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            SOC 2 compliant, encryption, and multi-sig custody protocols,
            operating within global compliance frameworks.
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <Image src={TransparentWallet} alt="Transparent Wallet" width={150} />
          <p className="text-xl font-bold text-gray-900 mb-2">
            Transparent Wallet
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            You control your funds, with clear balances, real-time visibility,
            and no hidden restrictions
          </p>
        </div>
      </div>
    </section>
  );
}

export default BuiltOnStability;
