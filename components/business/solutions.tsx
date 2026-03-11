"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SendAnimation from "@/assets/lottie-files/Send.json";
import AccountsAnimation from "@/assets/lottie-files/Accounts.json";
import TreasuryAnimation from "@/assets/lottie-files/Treasury.json";
import Lottie from "lottie-react";

type SolutionStep = {
  id: string;
  heading: string;
  highlight?: string;
  description: string;
  animationData: object;
};

const solutionSteps: SolutionStep[] = [
  {
    id: "get-paid",
    heading: "Get Paid By Customers Worldwide",
    highlight: "Worldwide",
    description:
      "Get paid globally in USD, EUR, or GBP and convert instantly to USDT. Share payment links or use checkout pages, with instant settlement and no setup or monthly fees.",
    animationData: SendAnimation,
  },
  {
    id: "pay-teams",
    heading: "Pay Suppliers, Vendors, Teams",
    description:
      "Pay anyone, anywhere, instantly, in any currency. Make single or batch payouts, schedule recurring payments, and benefit from smart routing for the best rates.",
    animationData: AccountsAnimation,
  },
  {
    id: "treasury",
    heading: "Multi-Currency Treasury Management",
    highlight: "Treasury",
    description:
      "Hold, convert, and protect your money like a global CFO. Access multi-currency wallets, smart conversion tools, FX risk management, and real-time cash flow tracking.",
    animationData: TreasuryAnimation,
  },
];

export default function Solutions() {
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateActiveStep = () => {
      const track =
        window.innerWidth < 1280 ? mobileTrackRef.current : desktopTrackRef.current;
      if (!track) {
        return;
      }

      const scrollRange = track.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) {
        setActiveIndex(0);
        return;
      }

      const rect = track.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollRange);
      const progress = scrolled / scrollRange;
      const nextIndex = Math.min(
        solutionSteps.length - 1,
        Math.floor(progress * solutionSteps.length),
      );

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveStep);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const activeStep = solutionSteps[activeIndex];

  return (
    <>
      <section className="xl:hidden mt-16 bg-[#E8F4FB]">
        <div ref={mobileTrackRef} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="mx-auto flex w-full max-w-[1092px] flex-col gap-10 px-5 sm:px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeStep.id}-mobile-copy`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  className="mx-auto text-center"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#7A89A2] uppercase">
                    SOLUTIONS
                  </p>
                  <h2 className="mt-3 max-w-[560px] text-[32px] leading-[1.1] font-bold text-[#121733] sm:text-[38px]">
                    {activeStep.highlight ? (
                      <>
                        {activeStep.heading.split(activeStep.highlight)[0]}
                        <span className="text-xenon">{activeStep.highlight}</span>
                        {activeStep.heading.split(activeStep.highlight)[1]}
                      </>
                    ) : (
                      activeStep.heading
                    )}
                  </h2>
                  <p className="mt-4 max-w-[540px] text-sm leading-[1.7] text-[#4D576C] sm:text-[15px]">
                    {activeStep.description}
                  </p>
                  <button className="mx-auto mt-7 flex h-11 items-center gap-2 rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
                    <span>Get started for free</span>
                  </button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeStep.id}-mobile-card`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                >
                  <div className="mx-auto h-[320px] w-full max-w-[580px]">
                    <Lottie animationData={activeStep.animationData} loop autoplay />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden bg-[#E8F4FB] xl:block">
        <div ref={desktopTrackRef} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="mx-auto grid w-full max-w-[1640px]  grid-cols-[1fr_1.15fr] items-center h-full gap-24 px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  className="mx-auto w-full max-w-[720px]  flex flex-col items-start justify-center h-full text-left"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#7A89A2] uppercase">
                    SOLUTIONS
                  </p>
                  <h2 className="mt-3 max-w-[720px] text-[48px] leading-[1.08] font-bold text-[#121733]">
                    {activeStep.highlight ? (
                      <>
                        {activeStep.heading.split(activeStep.highlight)[0]}
                        <span className="text-xenon">
                          {activeStep.highlight}
                        </span>
                        {activeStep.heading.split(activeStep.highlight)[1]}
                      </>
                    ) : (
                      activeStep.heading
                    )}
                  </h2>
                  <p className="mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[#4D576C]">
                    {activeStep.description}
                  </p>
                  <button className="mt-7 flex h-11 items-center gap-2 rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
                    <span>Get started for free</span>
                  </button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeStep.id}-card`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="mx-auto h-[full] w-full max-w-[700px]">
                      <Lottie
                        animationData={activeStep.animationData}
                        loop
                        autoplay
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
