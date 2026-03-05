"use client";

import { GH, NG, GB } from "@/assets/icons/countries";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      '"The onboarding was simple and payments started flowing immediately. We finally have a reliable way to collect international client payments."',
    name: "Esi K.",
    title: "Freelancer",
  },
  {
    countryFlag: NG,
    feedback:
      '"We now pay suppliers across borders from one dashboard. Reconciliation is easier and transfer delays are no longer a blocker."',
    name: "Obi J.",
    title: "Finance Associate",
  },
  {
    countryFlag: GB,
    feedback:
      '"The virtual cards are practical for SaaS subscriptions and online spend controls. It removed a lot of manual overhead from our team."',
    name: "Liam W.",
    title: "Startup Founder",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex min-h-[248px] w-full flex-col justify-between rounded-2xl bg-white p-6">
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
      <div className="mt-5 flex items-center gap-3">
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

  const advance = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const interval = setInterval(advance, 5000);
    return () => clearInterval(interval);
  }, [advance]);

  const goToPage = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const desktopCards = testimonials.slice(activeIndex * 3, activeIndex * 3 + 3);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="mt-16 bg-[#1E1A63] py-14 xl:mt-24 xl:py-20">
      <div className="mx-auto max-w-[1092px] px-5 sm:px-6 xl:px-0">
        <div className="mb-8 text-center xl:mb-10">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/65 uppercase">
            SOCIAL PROOF
          </p>
          <h2 className="text-[30px] leading-[1.1] font-bold text-white sm:text-[35px]">
            What Our <span className="text-xenon">Customers</span> Have to Say
          </h2>
        </div>

        <div className="hidden xl:block relative overflow-hidden">
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

        <div className="xl:hidden relative overflow-hidden">
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
                    (prev) => (prev - 1 + totalPagesMobile) % totalPagesMobile,
                  );
                }
              }}
              className="max-w-sm mx-auto"
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>

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
