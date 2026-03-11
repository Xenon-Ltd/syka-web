"use client";

import { GH, NG, GB } from "@/assets/icons/countries";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  countryFlag: StaticImageData | string;
  feedback: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    countryFlag: GH,
    feedback:
      '"Finally, a financial tool that speaks my language: fast, digital, and borderless. Getting paid in USD as a freelancer was never this easy."',
    name: "Esi K.",
    title: "Freelancer",
  },
  {
    countryFlag: NG,
    feedback:
      "“Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients.”",
    name: "Obi J.",
    title: "Finance Associate",
  },
  {
    countryFlag: GB,
    feedback:
      "Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients.",
    name: "Liam W.",
    title: "Startup Founder",
  },
  {
    countryFlag: GH,
    feedback:
      "Our cross-border collections now settle the same day, and reconciliation has become much easier for our operations team.",
    name: "Ama T.",
    title: "Operations Manager",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex min-h-[230px] w-full max-w-[350px] flex-col justify-between rounded-2xl bg-white p-6">
      <div>
        <div className="mb-4">
          <Image
            src={testimonial.countryFlag}
            alt="country flag"
            width={44}
            height={44}
            className="size-11 rounded-full border border-[#DEE5EF]"
          />
        </div>
        <p className="text-sm leading-[1.7] text-[#4D576C]">
          {testimonial.feedback}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-8">
        <div>
          <p className="text-sm font-bold text-[#121733]">{testimonial.name}</p>
          <p className="text-xs text-[#758198]">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(testimonials.length / 3);
  const totalPagesMobile = testimonials.length;

  const goToPage = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goToPreviousDesktop = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNextDesktop = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPreviousMobile = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalPagesMobile) % totalPagesMobile);
  };

  const goToNextMobile = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalPagesMobile);
  };

  const desktopCards = testimonials.slice(activeIndex * 3, activeIndex * 3 + 3);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="mt-16 bg-[#1E1A63] py-14 xl:mt-24 xl:flex xl:min-h-[90vh] xl:items-center xl:py-20">
      <div className="mx-auto max-w-[1292px] px-5 sm:px-6 xl:px-0">
        <div className="mb-8 text-center xl:mb-10 max-w-[1092px] mx-auto">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/65 uppercase">
            SOCIAL PROOF
          </p>
          <h2 className="text-[30px] leading-[1.1] font-bold text-white sm:text-[35px]">
            What Our <span className="text-xenon">Customers</span> Have to Say
          </h2>
        </div>

        <div className="relative hidden xl:block">
          <button
            onClick={goToPreviousDesktop}
            aria-label="Previous testimonials"
            className="absolute top-1/2 left-0 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/25"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNextDesktop}
            aria-label="Next testimonials"
            className="absolute top-1/2 right-0 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/25"
          >
            <ChevronRight size={18} />
          </button>

          <div className="overflow-hidden px-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-3 gap-6"
              >
                {desktopCards.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${activeIndex}-${i}`}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Go to testimonial page ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  i === activeIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative xl:hidden">
          <button
            onClick={goToPreviousMobile}
            aria-label="Previous testimonial"
            className="absolute top-1/2 left-0 z-30 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/25"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={goToNextMobile}
            aria-label="Next testimonial"
            className="absolute top-1/2 right-0 z-30 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/25"
          >
            <ChevronRight size={16} />
          </button>

          <div className="overflow-hidden px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) {
                    setDirection(1);
                    setActiveIndex((prev) => (prev + 1) % totalPagesMobile);
                  } else if (info.offset.x > 50) {
                    setDirection(-1);
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + totalPagesMobile) % totalPagesMobile,
                    );
                  }
                }}
                className="mx-auto max-w-sm"
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPagesMobile }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === activeIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
