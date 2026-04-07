"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Blocks, Clock3, Code, type LucideIcon } from "lucide-react";

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
  number: string;
  title: string;
  description: string;
};

type CodeLine = {
  content: ReactNode;
  className?: string;
};

const featureCards: FeatureCard[] = [
  {
    title: "SDKs in the languages you already use",
    description: "JavaScript, Python, Curl. Drop in, configure once, go live.",
    Icon: Code,
    bgClass: "bg-[#23284F]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/72",
  },
  {
    title: "One API For Every Fintech product.",
    description:
      "Payments, wallets, virtual accounts, payouts, all accessible from a single integration.",
    Icon: Blocks,
    bgClass: "bg-[#EEF3FF]",
    iconColorClass: "text-[#98A7C4]",
    titleColorClass: "text-[#1C2433]",
    bodyColorClass: "text-[#9AA7BC]",
  },
  {
    title: "Production-ready in hours, not weeks",
    description:
      "Sandbox environment, full test coverage, and clear docs from day one.",
    Icon: Clock3,
    bgClass: "bg-[#2C7FC0]",
    iconColorClass: "text-white/75",
    titleColorClass: "text-white",
    bodyColorClass: "text-white/76",
  },
];

const steps: Step[] = [
  {
    number: "1",
    title: "Install the SDK",
    description:
      "A single command. Works with Node, Python, or any REST client. No complex setup.",
  },
  {
    number: "2",
    title: "Authenticate with your API key",
    description:
      "Your key is generated instantly from the dashboard. Sandbox and production keys are separate and clearly labelled.",
  },
  {
    number: "3",
    title: "Call the endpoint & ship feature",
    description:
      "Initiate transfers, check balances, create virtual accounts, all through the same consistent API structure.",
  },
];

const codeLines: CodeLine[] = [
  {
    className: "text-white/35",
    content: "// 1. Install npm install syka-sdk",
  },
  {
    content: (
      <>
        <span className="text-[#F38ACB]">import</span>{" "}
        <span className="text-white">syka</span>{" "}
        <span className="text-[#F38ACB]">from</span>{" "}
        <span className="text-[#7DD3FC]">&quot;syka-sdk&quot;</span>
        <span className="text-white">;</span>
      </>
    ),
  },
  {
    content: "",
  },
  {
    className: "text-white/35",
    content: "// 2. Authenticate with Syka()",
  },
  {
    content: (
      <>
        <span className="text-[#F38ACB]">const</span>{" "}
        <span className="text-white">client</span>{" "}
        <span className="text-[#F38ACB]">=</span>{" "}
        <span className="text-[#C8B6FF]">new</span>{" "}
        <span className="text-[#7DD3FC]">Syka</span>
        <span className="text-white">({"{"}</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className="pl-4 text-white">apiKey:</span>{" "}
        <span className="text-[#7DD3FC]">&quot;sk_live••••••••••••&quot;</span>
      </>
    ),
  },
  {
    content: <span className="text-white">{"});"}</span>,
  },
  {
    content: "",
  },
  {
    className: "text-white/35",
    content: "// 3. Create a cross-border payment",
  },
  {
    content: (
      <>
        <span className="text-[#F38ACB]">const</span>{" "}
        <span className="text-white">payment</span>{" "}
        <span className="text-[#F38ACB]">=</span>{" "}
        <span className="text-[#C8B6FF]">await</span>{" "}
        <span className="text-white">client.</span>
        <span className="text-[#7DD3FC]">payments.create</span>
        <span className="text-white">({"{"}</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className="pl-4 text-white">amount:</span>{" "}
        <span className="text-[#FFD580]">12000</span>
        <span className="text-white">,</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className="pl-4 text-white">currency:</span>{" "}
        <span className="text-[#7DD3FC]">&quot;USD&quot;</span>
        <span className="text-white">,</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className="pl-4 text-white">recipient:</span>{" "}
        <span className="text-[#7DD3FC]">&quot;cus_guangzhou_01&quot;</span>
        <span className="text-white">,</span>
      </>
    ),
  },
  {
    content: (
      <>
        <span className="pl-4 text-white">description:</span>{" "}
        <span className="text-[#7DD3FC]">
          &quot;supplier invoice #4812&quot;
        </span>
      </>
    ),
  },
  {
    content: <span className="text-white">{"});"}</span>,
  },
];

export default function ApiDocumentationPage() {
  return (
    <section className="mt-8 px-5 pb-24 sm:px-6 lg:flex lg:min-h-[95vh] lg:items-center lg:pb-12 xl:mt-0 xl:px-0">
      <div className="mx-auto max-w-[1292px] py-10 sm:py-12 lg:py-16 xl:py-18">
        <div className="w-full text-center lg:text-left">
          <h1 className="w-full max-w-[760px] text-[26px] leading-[1.15] font-semibold text-[#42536A] sm:text-[34px] lg:max-w-[980px] lg:text-[64px] lg:leading-[0.98]">
            Everything You Need To Ship
            <br />
            Payments, <span className="text-xenon">Fast.</span>
          </h1>
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
              <h2
                className={`mt-10 w-full text-[24px] leading-[1.2] font-semibold lg:text-[34px] lg:leading-[1.08] ${card.titleColorClass}`}
              >
                {card.title}
              </h2>
              <p
                className={`mt-5 w-full text-[14px] leading-[1.55] lg:text-[18px] lg:leading-[1.75] ${card.bodyColorClass}`}
              >
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-18 grid items-center gap-10 lg:mt-28 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-center lg:gap-24">
          <div className="mx-auto w-full text-center lg:mx-0 lg:max-w-[700px] lg:text-left">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#9AA8BA] uppercase lg:text-[14px] lg:tracking-[0.2em]">
              How It Works
            </p>
            <h2 className="mt-4 text-[32px] leading-[1.15] font-semibold text-[#42536A] lg:text-[56px] lg:leading-[1.02]">
              A Few Lines Of Code
              <br />
              <span className="text-xenon">Global</span> Payments
            </h2>

            <div className="mx-auto mt-8 max-w-[540px] space-y-4 text-left lg:mx-0 lg:mt-10 lg:max-w-none lg:space-y-6">
              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-4 lg:gap-5">
                  <div className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-xenon text-[11px] font-semibold text-white lg:size-7 lg:text-[13px]">
                    {step.number}
                  </div>
                  <div className="w-full">
                    <p className="w-full text-[17px] leading-[1.35] font-medium text-[#42536A] lg:text-[24px] lg:leading-[1.25]">
                      {step.title}
                    </p>
                    <p className="mt-1.5 w-full max-w-[520px] text-[14px] leading-[1.55] text-[#9AA7BC] lg:max-w-[620px] lg:text-[18px] lg:leading-[1.7]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className="mt-8 inline-flex rounded-lg bg-xenon px-5 py-3 text-[14px] font-medium text-white shadow-[0_14px_24px_rgba(0,142,219,0.25)] transition-colors duration-200 hover:bg-xenon-600 lg:mt-10 lg:px-8 lg:py-4 lg:text-[16px]"
            >
              View full docs
            </Link>
          </div>

          <div className="overflow-hidden rounded-[18px] bg-[#141A33] text-white shadow-[0_20px_45px_rgba(18,24,48,0.24)] lg:rounded-[30px]">
            <div className="flex flex-wrap items-center gap-3 border-b border-white/8 bg-[#0B1024] px-4 py-3 sm:px-5 lg:px-6 lg:py-4">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#FF6A6A]" />
                <span className="size-2.5 rounded-full bg-[#FFD669]" />
                <span className="size-2.5 rounded-full bg-[#35D07F]" />
              </div>

              <div className="flex items-center gap-4 text-[11px] text-white/55 sm:ml-4 lg:text-[13px]">
                <span className="font-medium text-white lg:text-[14px]">JavaScript</span>
                <span>Python</span>
                <span>Curl</span>
              </div>

              <button className="ml-auto rounded-lg bg-white/8 px-3 py-1 text-[11px] font-medium text-white/80 transition-colors duration-200 hover:bg-white/12 lg:px-4 lg:py-1.5 lg:text-[13px]">
                Copy
              </button>
            </div>

            <div className="px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
              <div className="overflow-x-auto">
                <div className="min-w-[440px] lg:min-w-[560px]">
                  <pre className="font-mono text-[13px] leading-[1.95] whitespace-pre-wrap lg:text-[15px] lg:leading-[2.1]">
                    {codeLines.map((line, index) => (
                      <div
                        key={index}
                        className={line.className ?? "text-[#D7DDF0]"}
                      >
                        {line.content}
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
