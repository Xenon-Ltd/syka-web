"use client";

import {
  CA,
  GH,
  BJ,
  BF,
  AU,
  AE,
  AR,
  BR,
  CL,
  EURO,
  GB,
  ID,
  IN,
  KE,
  MX,
  NG,
  PE,
  PH,
  TH,
  TG,
  TR,
  VN,
  US,
  CN,
  CM,
  CF,
  CI,
  TD,
  CG,
  GQ,
  GA,
  GW,
  ML,
  NE,
  SN,
  TZ,
  UG,
  ZA,
} from "@/assets/icons/countries";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { businessStyles } from "@/lib/business-styles";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

interface CountryItemProps {
  icon: string;
  name: string;
  currency: string;
  compact?: boolean;
}

type CountriesSupportedProps = {
  headingClassName?: string;
  variant?: "default" | "personal" | "business";
};

const countries = [
  { name: "Canada", currency: "CAD", icon: CA },
  { name: "Ghana", currency: "GHS", icon: GH },
  { name: "United Arab Emirates", currency: "AED", icon: AE },
  { name: "Argentina", currency: "ARS", icon: AR },
  { name: "Brazil", currency: "BRL", icon: BR },
  { name: "Chile", currency: "CLP", icon: CL },
  { name: "Eurozone countries", currency: "EUR", icon: EURO },
  { name: "United Kingdom", currency: "GBP", icon: GB },
  { name: "Indonesia", currency: "IDR", icon: ID },
  { name: "India", currency: "INR", icon: IN },
  { name: "Mexico", currency: "MXN", icon: MX },
  { name: "Nigeria", currency: "NGN", icon: NG },
  { name: "Peru", currency: "PEN", icon: PE },
  { name: "China", currency: "CNY", icon: CN },
  { name: "United States", currency: "USD", icon: US },
  { name: "Thailand", currency: "THB", icon: TH },
  { name: "Turkey", currency: "TRY", icon: TR },
  { name: "Vietnam", currency: "VND", icon: VN },
  { name: "Australia", currency: "AUD", icon: AU },
  { name: "Philippines", currency: "PHP", icon: PH },
  { name: "South Africa", currency: "ZAR", icon: ZA },
  { name: "Tanzania", currency: "TZS", icon: TZ },
  { name: "Uganda", currency: "UGX", icon: UG },
  { name: "Kenya", currency: "KES", icon: KE },
  { name: "Cameroon", currency: "XAF", icon: CM },
  { name: "Central African Republic", currency: "XAF", icon: CF },
  { name: "Chad", currency: "XAF", icon: TD },
  { name: "Republic of the Congo", currency: "XAF", icon: CG },
  { name: "Equatorial Guinea", currency: "XAF", icon: GQ },
  { name: "Gabon", currency: "XAF", icon: GA },
  { name: "Benin", currency: "XOF", icon: BJ },
  { name: "Burkina Faso", currency: "XOF", icon: BF },
  { name: "Côte d'Ivoire", currency: "XOF", icon: CI },
  { name: "Guinea-Bissau", currency: "XOF", icon: GW },
  { name: "Mali", currency: "XOF", icon: ML },
  { name: "Niger", currency: "XOF", icon: NE },
  { name: "Senegal", currency: "XOF", icon: SN },
  { name: "Togo", currency: "XOF", icon: TG },
];

function CountryItem({ icon, name, currency, compact = false }: CountryItemProps) {
  return (
    <div
      tabIndex={0}
      aria-label={`${name}, supported currency ${currency}`}
      className={cn(
        "group relative flex w-fit items-center rounded-full bg-[#F2F4F7] outline-none focus-visible:ring-2 focus-visible:ring-xenon",
        compact ? "gap-2 px-3 py-2 lg:px-4" : "gap-3 px-5 py-3 md:px-6 md:py-3.5 lg:gap-4 lg:px-7 lg:py-3",
      )}
    >
      <Image
        src={icon}
        alt={`${name} flag`}
        width={24}
        height={24}
        className={cn("rounded-full border border-[#D4DEE9]", compact ? "size-5 lg:size-6" : "lg:h-9 lg:w-9")}
      />
      <p className={cn("leading-relaxed text-[#344054]", compact ? "text-sm lg:text-base" : "text-sm md:text-base lg:text-[18px] lg:leading-[1.3]")}>
        {name}
      </p>
      <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-xenon-primary px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {currency}
      </span>
    </div>
  );
}

export default function CountriesSupported({
  headingClassName = "",
  variant = "default",
}: CountriesSupportedProps) {
  const isCompact = variant !== "default";
  const [showAllCountries, setShowAllCountries] = useState(false);
  const mobileCountries = showAllCountries ? countries : countries.slice(0, 5);
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);
  const headingSizeClasses =
    headingClassName || "md:text-5xl lg:text-[64px] lg:leading-[1.02]";

  return (
    <section
      ref={ref}
      id="supported-countries"
      className={cn("mx-auto scroll-mt-8 px-5 py-16 sm:px-6 md:py-24", isCompact ? cn(businessStyles.sectionSpacing, "max-w-[1288px]") : "max-w-[1440px] lg:flex lg:min-h-[55vh] lg:flex-col lg:justify-center lg:py-32 xl:px-0")}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={`mobile-section-title mx-auto max-w-[320px] text-center text-xenon-gray sm:max-w-none lg:max-w-[900px] ${headingSizeClasses}`}
      >
        Countries We Currently Support
      </motion.h2>

      {/* Mobile — staggered pills */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 md:gap-x-6 md:gap-y-5 lg:hidden">
        {mobileCountries.map((country, i) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.04 }}
          >
            <CountryItem icon={country.icon} name={country.name} currency={country.currency} compact={isCompact} />
          </motion.div>
        ))}
      </div>

      {!showAllCountries && (
        <div className="mt-6 flex justify-center lg:hidden">
          <button
            type="button"
            onClick={() => setShowAllCountries(true)}
            className="rounded-lg border border-xenon px-8 py-4 text-base font-semibold text-xenon transition-colors duration-200 hover:bg-[#F3F7FB]"
          >
            Show all countries we support
          </button>
        </div>
      )}

      {/* Desktop — staggered pills */}
      <div className={cn("hidden flex-wrap items-center justify-center lg:flex", isCompact ? "mx-auto mt-[61px] max-w-[1240px] gap-x-3 gap-y-4" : "mt-12 gap-x-6 gap-y-4 lg:mt-14")}>
        {countries.map((country, i) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.03 }}
          >
            <CountryItem icon={country.icon} name={country.name} currency={country.currency} compact={isCompact} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
