"use client";

import {
  GH,
  AE,
  AR,
  BR,
  CL,
  EURO,
  GB,
  ID,
  IN,
  MX,
  NG,
  PE,
  PH,
  TH,
  TR,
  VN,
  US,
  CN,
} from "@/assets/icons/countries";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IN_VIEW_OPTS, EASE_OUT } from "@/lib/animation";

interface CountryItemProps {
  icon: string;
  name: string;
}

const countries = [
  { name: "Ghana (GHS)", icon: GH },
  { name: "United Arab Emirates (AED)", icon: AE },
  { name: "Argentina (ARS)", icon: AR },
  { name: "Brazil (BRL)", icon: BR },
  { name: "Chile (CLP)", icon: CL },
  { name: "Eurozone Countries (EUR)", icon: EURO },
  { name: "United Kingdom (GBP)", icon: GB },
  { name: "Indonesia (IDR)", icon: ID },
  { name: "India (INR)", icon: IN },
  { name: "Mexico (MXN)", icon: MX },
  { name: "Nigeria (NGN)", icon: NG },
  { name: "Peru (PEN)", icon: PE },
  { name: "China (CNY)", icon: CN },
  { name: "United States (USD)", icon: US },
  { name: "Thailand (THB)", icon: TH },
  { name: "Turkey (TRY)", icon: TR },
  { name: "Vietnam (VND)", icon: VN },
  { name: "Phillipines (PHP)", icon: PH },
];

function CountryItem({ icon, name }: CountryItemProps) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-full bg-[#F3F6FA] pt-[8px] pr-[25px] pb-[8px] pl-[18px]">
      <Image
        src={icon}
        alt={`${name} flag`}
        width={24}
        height={24}
        className="rounded-full border border-[#D4DEE9]"
      />
      <p className="text-base text-[#445066]">{name}</p>
    </div>
  );
}

export default function CountriesSupported() {
  const [showAllCountries, setShowAllCountries] = useState(false);
  const mobileCountries = showAllCountries ? countries : countries.slice(0, 5);
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      className="mx-auto mt-16 mb-14 max-w-[1292px] px-5 sm:px-6 xl:mt-20 xl:mb-44 xl:px-0"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="text-center text-[30px] leading-[1.1] font-bold text-[#121733] sm:text-[35px]"
      >
        Countries We Currently Support
      </motion.p>

      {/* Mobile — staggered pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-[28px] gap-y-[20px] lg:hidden">
        {mobileCountries.map((country, i) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.04 }}
          >
            <CountryItem icon={country.icon} name={country.name} />
          </motion.div>
        ))}
      </div>

      {!showAllCountries && (
        <div className="mt-6 flex justify-center lg:hidden">
          <button
            type="button"
            onClick={() => setShowAllCountries(true)}
            className="h-11 rounded-lg border border-xenon px-6 text-[15px] font-semibold text-xenon transition-colors duration-200 hover:bg-[#F3F7FB]"
          >
            Show all countries we support
          </button>
        </div>
      )}

      {/* Desktop — staggered pills */}
      <div className="mt-8 hidden flex-wrap items-center justify-center gap-x-[28px] gap-y-[20px] lg:flex">
        {countries.map((country, i) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.03 }}
          >
            <CountryItem icon={country.icon} name={country.name} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
