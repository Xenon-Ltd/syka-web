"use client";

import { GH, KE, NG } from "@/assets/icons/countries";
import { EASE_OUT } from "@/lib/animation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

type Testimonial = {
  flag: StaticImageData;
  country: string;
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    flag: GH,
    country: "Ghana",
    quote: "Finally, a financial tool that speaks my language: fast, digital, and borderless. Getting paid in USD as a freelancer was never this easy.",
    name: "Alex C.",
    role: "Tech Startup Founder",
  },
  {
    flag: NG,
    country: "Nigeria",
    quote: "Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients.",
    name: "Alex C.",
    role: "Tech Startup Founder",
  },
  {
    flag: KE,
    country: "Kenya",
    quote: "Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients.",
    name: "Alex C.",
    role: "Tech Startup Founder",
  },
  {
    flag: KE,
    country: "Kenya",
    quote: "Syka cut our international vendor payment costs by 85% and eliminated the 3-day wait. The virtual EUR accounts have been a game-changer for our EU clients.",
    name: "Alex C.",
    role: "Tech Startup Founder",
  },
];

const CONTENT = "mx-auto w-full max-w-[1164px] px-5 sm:px-6 xl:px-0";

export default function CustomerTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.85;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 lg:min-h-[514px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="px-5 text-center"
      >
        <h2 className="mobile-section-title text-xenon-gray md:text-4xl lg:text-[40px] lg:leading-[48px]">
          What Our <span className="text-xenon-sky">Customers</span> Have to Say
        </h2>
      </motion.div>

      <div className="relative mt-10 lg:mt-[78px]">
        <div
          ref={trackRef}
          className={`${CONTENT} flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {testimonials.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="flex w-[300px] shrink-0 snap-start flex-col justify-between gap-8 rounded-[24px] bg-[#F7F7F7] p-8 shadow-xenon_card sm:w-[360px] lg:w-[419px] lg:min-h-[383px] lg:rounded-[32px]"
            >
              <div className="flex flex-col items-start gap-6">
                <Image src={t.flag} alt={`${t.country} flag`} width={64} height={64} className="size-16 lg:size-20 rounded-full shadow-xenon_card" />
                <p className="text-lg leading-7 text-[#8893A4] lg:text-xl">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-xenon-gray lg:text-xl">{t.name}</p>
                <p className="text-sm text-xenon-gray lg:text-base">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Show next testimonial"
          className="absolute top-1/2 right-6 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-xenon-gray text-white transition-colors hover:bg-xenon-gray/90 lg:right-10 lg:flex"
        >
          <ArrowRight className="size-6" strokeWidth={1.75} />
        </button>
      </div>
    </section>
  );
}
