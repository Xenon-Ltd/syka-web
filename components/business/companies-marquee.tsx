"use client";

import { JSSquared, Maryhealth, OwlTing, SonaQode } from "@/assets/images";
import Image, { StaticImageData } from "next/image";

type CompanyLogo = {
  name: string;
  image: StaticImageData;
};

const companyLogos: CompanyLogo[] = [
  { name: "Mary Health", image: Maryhealth },
  { name: "OwlTing", image: OwlTing },
  { name: "SonaQode", image: SonaQode },
  { name: "JS Squared", image: JSSquared },
];

export default function CompaniesMarquee() {
  return (
    <div aria-label="Trusted by these companies" className="grid w-full max-w-[1123px] grid-cols-2 items-center gap-x-8 gap-y-6 rounded-[32px] bg-[#f4f4f4] px-6 py-6 sm:grid-cols-4 sm:gap-10 lg:h-[100px] lg:px-[30px] lg:py-3">
      {companyLogos.map((logo) => (
        <div key={logo.name} className="relative h-10 sm:h-12 lg:h-14">
          <Image src={logo.image} alt={logo.name} fill sizes="(max-width: 639px) 35vw, (max-width: 1199px) 20vw, 210px" placeholder="blur" className="object-contain" />
        </div>
      ))}
    </div>
  );
}
