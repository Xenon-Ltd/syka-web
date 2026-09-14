"use client";

import {
  AE,
  AR,
  AU,
  BR,
  CA,
  CL,
  CN,
  EURO,
  GB,
  GH,
  ID,
  IN,
  MX,
  NG,
  PE,
  PH,
  TH,
  TR,
  US,
  VN,
} from "@/assets/icons/countries";
import { ContourPattern } from "@/assets/images";
import BusinessAction from "@/components/business/business-action";
import { businessLinks, personalLinks } from "@/lib/business-links";
import { EASE_OUT } from "@/lib/animation";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Shared layout/typography building blocks for the product dropdown pages
// (virtual-account, virtual-card, payments, treasury-management, invoicing).
// Keep these here so every page stays pixel-consistent by construction
// instead of drifting through copy-pasted local copies.

export const CONTENT = "mx-auto w-full max-w-[1220px] px-5 sm:px-6 xl:px-0";

export const CTA_BUTTON_CLASS =
  "mt-8 min-h-12 rounded-lg bg-xenon-brand px-6 py-3 text-sm leading-5 font-semibold text-white shadow-[0_12px_20px_-10px_rgba(19,119,188,0.4)] transition-colors duration-200 hover:bg-xenon-700";

export function ProductCTA({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const href = pathname.startsWith("/business") ? businessLinks.signup : personalLinks.signup;

  return <BusinessAction href={href} className={CTA_BUTTON_CLASS}>{children}</BusinessAction>;
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export type Point = {
  Icon: LucideIcon;
  text: string;
};

export function IconBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#4484CD] text-white">
      <Icon className="size-6" strokeWidth={1.75} />
    </div>
  );
}

export function PointList({ points }: { points: Point[] }) {
  return (
    <div className="mt-6 space-y-6">
      {points.map((point, i) => (
        <div key={`${point.text}-${i}`} className="flex items-start gap-6 lg:items-center">
          <IconBadge Icon={point.Icon} />
          <p className="text-base leading-6 text-[#8893A4] lg:text-lg lg:leading-6">{point.text}</p>
        </div>
      ))}
    </div>
  );
}

export function ContourImageBox({
  className,
  flip = false,
  children,
}: {
  className?: string;
  flip?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#E6F2FB] ${className ?? ""}`}>
      <div
        aria-hidden
        className="absolute inset-0 bg-[#6CA9E6]"
        style={{
          maskImage: `url(${ContourPattern.src})`,
          maskSize: "cover",
          maskPosition: flip ? "right center" : "left center",
          WebkitMaskImage: `url(${ContourPattern.src})`,
          WebkitMaskSize: "cover",
          WebkitMaskPosition: flip ? "right center" : "left center",
          transform: flip ? "rotate(180deg)" : undefined,
        }}
      />
      {children}
    </div>
  );
}

type Country = {
  flag: StaticImageData;
  label: string;
};

export const AVAILABLE_COUNTRIES: Country[] = [
  { flag: GH, label: "Ghana" },
  { flag: AE, label: "United Arab Emirates (AED)" },
  { flag: AR, label: "Argentina (ARS)" },
  { flag: BR, label: "Brazil (BRL)" },
  { flag: CL, label: "Chile (CLP)" },
  { flag: EURO, label: "Eurozone countries (EUR)" },
  { flag: GB, label: "United Kingdom (GBP)" },
  { flag: ID, label: "Indonesia (IDR)" },
  { flag: IN, label: "India (INR)" },
  { flag: MX, label: "Mexico (MXN)" },
  { flag: NG, label: "Nigeria (NGN)" },
  { flag: PE, label: "Peru (PEN)" },
  { flag: CN, label: "China (CNY)" },
  { flag: US, label: "United States (USD)" },
  { flag: TH, label: "Thailand (THB)" },
  { flag: TR, label: "Turkey (TRY)" },
  { flag: VN, label: "Vietnam (VND)" },
  { flag: AU, label: "Australia (AUD)" },
  { flag: CA, label: "Canada (CAD)" },
  { flag: PH, label: "Philippines (PHP)" },
];

export function AvailableCountries() {
  return (
    <section className={`${CONTENT} py-16 md:py-24 lg:py-32`}>
      <Reveal className="flex flex-col items-center gap-8 lg:gap-[61px]">
        <h2 className="mobile-section-title text-center text-xenon-gray md:text-4xl lg:text-[40px] lg:leading-[50px]">
          Countries We Currently Support
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
          {AVAILABLE_COUNTRIES.map(({ flag, label }) => (
            <div
              key={label}
              className="mix-blend-multiply flex items-center gap-2 rounded-full bg-[#F2F4F7] py-2 pr-5 pl-3.5"
            >
              <Image src={flag} alt="" width={24} height={24} className="size-6 shrink-0 rounded-full" />
              <p className="text-sm whitespace-nowrap text-[#344054] lg:text-base">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
