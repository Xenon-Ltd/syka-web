"use client";

import {
  FullCompliance,
  InstantSettlement,
  MobileFirst,
  PatchyInternet,
  WhatsappSMSNative,
} from "@/assets/images";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

type Feature = {
  title: string;
  description: string;
  icon: StaticImageData;
};

const features: Feature[] = [
  {
    title: "Instant Settlement in USDT",
    description:
      "Receive stable dollar payments instantly, without delays or intermediaries.",
    icon: InstantSettlement,
  },
  {
    title: "WhatsApp and SMS Native",
    description:
      "Adapted to send and receive payments directly through WhatsApp or SMS.",
    icon: WhatsappSMSNative,
  },
  {
    title: "Patchy Internet Friendly",
    description:
      "Optimized for low bandwidth so payments go through, even on unstable networks.",
    icon: PatchyInternet,
  },
  {
    title: "Full Compliance",
    description:
      "Fully compliant infrastructure with fair access for African businesses.",
    icon: FullCompliance,
  },
  {
    title: "Mobile-first",
    description:
      "Designed for accessibility and effortless reach wherever you are",
    icon: MobileFirst,
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
      className="mx-auto flex w-full max-w-[360px] flex-col items-center rounded-2xl text-center"
    >
      <div className="mb-5 inline-flex size-[204px] items-center justify-center rounded-full border border-[#DCE9F7] bg-white">
        <Image
          src={feature.icon}
          alt={feature.title}
          width={88}
          height={88}
          className="mx-auto h-[88px] w-[88px] object-contain object-center"
        />
      </div>
      <h3 className="text-[26px] leading-[1.25] font-bold text-[#121733]">
        {feature.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.75] text-[#505A6E]">
        {feature.description}
      </p>
    </motion.article>
  );

  return (
    <section
      ref={ref}
      className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 lg:mt-20 lg:flex lg:min-h-[90vh] lg:flex-col lg:justify-center lg:px-0"
    >
      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-10"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center text-[30px] leading-[1.1] font-bold text-[#121733] sm:text-[44px] lg:text-start lg:text-[35px]"
        >
          Built for African <span className="text-xenon">Reality</span>
        </motion.h2>
      </motion.div>

      {/* Feature cards — staggered */}
      <div className="mb-16 space-y-12">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12">
          {topRowFeatures.map((feature, i) => renderFeatureCard(feature, i))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12">
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
        className="mt-8 text-center"
      >
        <button className="h-11 rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-xenon-600">
          Get started for free
        </button>
      </motion.div>
    </section>
  );
}
