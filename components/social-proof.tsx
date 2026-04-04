"use client";

import { GH, NG, GB } from "@/assets/icons/countries";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
  EASE_IN_OUT,
} from "@/lib/animation";

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
      "\u201cSyka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients.\u201d",
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

function TestimonialCard({
  testimonial,
  className = "",
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[230px] w-full max-w-[350px] flex-col justify-between rounded-2xl bg-white p-6 ${className}`}
    >
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
        <p className="mobile-body text-[#4D576C]">{testimonial.feedback}</p>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <div>
          <p className="mobile-body font-bold text-[#121733]">
            {testimonial.name}
          </p>
          <p className="mobile-meta text-[#758198]">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 220 : -220, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -220 : 220, opacity: 0 }),
};

function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const desktopCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const desktopScrollerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);
  const totalPagesMobile = testimonials.length;
  const desktopVisibleCards = Math.min(3, testimonials.length);
  const desktopMaxIndex = Math.max(testimonials.length - desktopVisibleCards, 0);
  const desktopTrackBasis =
    desktopVisibleCards === 1
      ? "100%"
      : desktopVisibleCards === 2
        ? "calc((100% - 1.5rem) / 2)"
        : "calc((100% - 3rem) / 3)";

  useEffect(() => {
    const desktopScroller = desktopScrollerRef.current;
    const targetCard = desktopCardRefs.current[desktopIndex];

    if (!desktopScroller || !targetCard) {
      return;
    }

    const scrollerRect = desktopScroller.getBoundingClientRect();
    const targetRect = targetCard.getBoundingClientRect();
    const nextScrollLeft =
      targetRect.left - scrollerRect.left + desktopScroller.scrollLeft;

    desktopScroller.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }, [desktopIndex]);

  const goToDesktopIndex = (index: number) => {
    setDesktopIndex(Math.max(0, Math.min(index, desktopMaxIndex)));
  };

  const goToPreviousDesktop = () => {
    goToDesktopIndex(desktopIndex - 1);
  };

  const goToNextDesktop = () => {
    goToDesktopIndex(desktopIndex + 1);
  };

  const goToPreviousMobile = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalPagesMobile) % totalPagesMobile);
  };

  const goToNextMobile = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalPagesMobile);
  };

  return (
    <section
      ref={ref}
      className="bg-black py-14 lg:flex lg:min-h-[90vh] lg:items-center lg:bg-[#1E1A63] lg:py-20"
    >
      <div className="mx-auto max-w-[1292px] px-5 sm:px-6 lg:px-0">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-8 max-w-[1092px] text-center lg:mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="mobile-eyebrow mb-2 text-white/65"
          >
            SOCIAL PROOF
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mobile-section-title mx-auto max-w-[320px] text-white sm:max-w-none lg:text-[39px] lg:leading-[1.1]"
          >
            What Our <span className="text-xenon">Customers</span> Have to Say
          </motion.h2>
        </motion.div>

        {/* Desktop carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.2 }}
          className="relative hidden overflow-visible lg:mt-12 lg:block lg:translate-y-8"
        >
          <button
            onClick={goToPreviousDesktop}
            aria-label="Previous testimonials"
            disabled={desktopIndex === 0}
            className="absolute top-1/2 left-2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/15"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToNextDesktop}
            aria-label="Next testimonials"
            disabled={desktopIndex === desktopMaxIndex}
            className="absolute top-1/2 right-2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/15"
          >
            <ChevronRight size={18} />
          </button>

          <div className="overflow-visible px-14">
            <div
              ref={desktopScrollerRef}
              className="[scrollbar-width:none] [-ms-overflow-style:none] overflow-x-auto overflow-y-visible scroll-smooth [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex gap-6 py-3">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${index}`}
                    ref={(node) => {
                      desktopCardRefs.current[index] = node;
                    }}
                    style={{ flex: `0 0 ${desktopTrackBasis}` }}
                    className="min-w-0 shrink-0 snap-start"
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      className="h-full max-w-none shadow-[0_24px_60px_rgba(9,14,39,0.26)] ring-1 ring-[#E7EDF6]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.2 }}
          className="lg:hidden"
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: EASE_IN_OUT }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
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
                className="mx-auto w-full max-w-[26rem]"
              >
                <TestimonialCard
                  testimonial={testimonials[activeIndex]}
                  className="max-w-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={goToPreviousMobile}
              aria-label="Previous testimonial"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-white/25"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goToNextMobile}
              aria-label="Next testimonial"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-white/25"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProof;
