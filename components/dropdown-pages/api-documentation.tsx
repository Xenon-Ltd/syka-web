"use client";

import { APIDocs } from "@/assets/images";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import Image from "next/image";

export default function ApiDocumentationPage() {
  return (
    <section className="mt-8 flex min-h-[85vh] items-center px-5 sm:px-6 xl:mt-0 xl:px-0">
      <div className="mx-auto w-full max-w-[1292px] rounded-[28px]  px-6 py-8 sm:px-8 sm:py-10 xl:px-10 xl:py-12">
        <div className="grid items-center gap-10 xl:grid-cols-2">
          <div className="max-w-[560px]">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#9AA5B8] uppercase">
              Payment SDK
            </p>
            <h1 className="mt-5 text-[38px] leading-[1.02] font-semibold tracking-[-0.04em] text-[#445066] sm:text-[44px] xl:text-[52px]">
              Developer-friendly Payment SDKs
            </h1>
            <p className="mt-5 max-w-[420px] text-[16px] leading-[1.6] text-[#93A0B4] sm:text-[17px]">
              Integrate global payments, wallets and payouts with just a few
              lines of code.
            </p>
            <Link
              href="#"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#1E88D8] px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(30,136,216,0.28)] transition-colors hover:bg-[#1879C1]"
            >
              View Docs
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[14px]">
              <Image
                src={APIDocs}
                alt="API documentation preview"
                className="w-full max-w-[800px] rounded-[14px]"
                sizes="(max-width: 1280px) 100vw, 500px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
