"use client";

import { GH, NG, GB, IN, BR, US } from "@/assets/icons/countries";
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
      '"Finally, a financial tool that speaks my language: fast, digital, and borderless. Getting paid in USD as a freelancer was never this easy."',
    name: "Alex C.",
    title: "Tech Startup Founder",
  },
  {
    countryFlag: NG,
    feedback:
      '"Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients."',
    name: "Alex C.",
    title: "Tech Startup Founder",
  },
  {
    countryFlag: GB,
    feedback:
      '"Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients."',
    name: "Alex C.",
    title: "Tech Startup Founder",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-[280px] w-full">
      <div>
        <div className="mb-4">
          <Image
            src={testimonial.countryFlag}
            alt="country flag"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {testimonial.feedback}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.title}</p>
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
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="py-16 xl:py-24 bg-[#25205C]">
      <div className="max-w-[1092px] mx-auto px-6 xl:px-0">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-2">
            SOCIAL PROOF
          </p>
          <h2 className="text-3xl xl:text-4xl font-bold text-white">
            What Our <span className="text-xenon-400">Customers</span> Have to
            Say
          </h2>
        </div>

        {/* Desktop Carousel (3 cards) */}
        <div className="hidden xl:block relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
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

          {/* Desktop Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  i === activeIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Carousel (1 card) */}
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

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPagesMobile }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
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
