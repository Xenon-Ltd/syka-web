"use client";

import { Zap, MessageSquare, Globe2, ShieldCheck, Smartphone } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

type Feature = {
  title: string;
  description: string;
  bg: string;
  textColor: string;
  bodyColor: string;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: "Instant Settlement in Local Currency",
    description:
      "Receive stable dollar payments instantly, without delays or intermediaries.",
    bg: "bg-[#1B5EA7]",
    textColor: "text-white",
    bodyColor: "text-white/80",
    iconBg: "bg-white/15",
    iconColor: "text-white",
    icon: Zap,
  },
  {
    title: "WhatsApp and SMS Native",
    description:
      "Adapted to send and receive payments directly through WhatsApp or SMS.",
    bg: "bg-[#F0F4F8]",
    textColor: "text-[#121733]",
    bodyColor: "text-[#4E576A]",
    iconBg: "bg-[#DDE8F4]",
    iconColor: "text-[#1B5EA7]",
    icon: MessageSquare,
  },
  {
    title: "Accept any currency",
    description:
      "Optimized for low bandwidth so payments go through, even on unstable networks.",
    bg: "bg-[#1A1F3C]",
    textColor: "text-white",
    bodyColor: "text-white/75",
    iconBg: "bg-white/12",
    iconColor: "text-white",
    icon: Globe2,
  },
  {
    title: "Full Compliance",
    description:
      "Fully compliant infrastructure with fair access for African businesses.",
    bg: "bg-[#C8EDD8]",
    textColor: "text-[#121733]",
    bodyColor: "text-[#3A5248]",
    iconBg: "bg-[#A4DFC0]",
    iconColor: "text-[#0F6E42]",
    icon: ShieldCheck,
  },
  {
    title: "Mobile-first",
    description: "Up to 5× cheaper than a traditional bank wire.",
    bg: "bg-[#F0E6D2]",
    textColor: "text-[#121733]",
    bodyColor: "text-[#5A4A30]",
    iconBg: "bg-[#E2D0B0]",
    iconColor: "text-[#7A5820]",
    icon: Smartphone,
  },
];

export default function BuiltForAfricanReality() {
  const topRowFeatures = features.slice(0, 3);
  const bottomRowFeatures = features.slice(3);
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  const renderFeatureCard = (feature: Feature, i: number) => (
    <motion.article
      key={feature.title}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.09 }}
      className={`${feature.bg} flex flex-col rounded-2xl p-8 md:p-10 lg:rounded-3xl lg:p-10`}
    >
      <div
        className={`${feature.iconBg} mb-5 inline-flex size-10 items-center justify-center rounded-xl lg:mb-6`}
      >
        <feature.icon className={`${feature.iconColor} size-5`} />
      </div>
      <h3
        className={`text-xl font-semibold leading-snug md:text-2xl lg:text-[32px] lg:leading-[1.1] ${feature.textColor}`}
      >
        {feature.title}
      </h3>
      <p className={`mt-4 text-base leading-relaxed md:text-lg ${feature.bodyColor}`}>
        {feature.description}
      </p>
    </motion.article>
  );

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1440px] px-5 py-16 sm:px-6 md:py-24 lg:flex lg:min-h-[95vh] lg:flex-col lg:justify-center lg:px-12 lg:py-32 xl:px-0"
    >
      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12 lg:mb-16"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center text-3xl font-semibold leading-tight text-[#121733] md:text-[36px] lg:text-start lg:text-[40px] lg:leading-[1.08]"
        >
          Built for African <span className="text-xenon">Reality</span>
        </motion.h2>
      </motion.div>

      {/* Feature cards */}
      <div className="space-y-6 lg:space-y-8">
        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 lg:gap-8">
          {topRowFeatures.map((feature, i) => renderFeatureCard(feature, i))}
        </div>
        {/* Bottom row — 2 cards, centered to match top card widths */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mx-auto lg:w-2/3 lg:gap-8">
          {bottomRowFeatures.map((feature, i) =>
            renderFeatureCard(feature, i + 3),
          )}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.5 }}
        className="mt-10 text-center lg:mt-12"
      >
        <button className="rounded-lg bg-xenon px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-xenon-600 lg:text-lg">
          Get started for free
        </button>
      </motion.div>
    </section>
  );
}
