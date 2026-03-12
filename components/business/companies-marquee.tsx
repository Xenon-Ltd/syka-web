"use client";

import { JSSquared, Maryhealth, SonaQode } from "@/assets/images";
import Image, { StaticImageData } from "next/image";

type CompanyLogo = {
  name: string;
  image: StaticImageData;
};

const companyLogos: CompanyLogo[] = [
  { name: "Mary Health", image: Maryhealth },
  { name: "SonaQode", image: SonaQode },
  { name: "JS Squared", image: JSSquared },
];

const marqueeLogos = [...companyLogos, ...companyLogos];

export default function CompaniesMarquee() {
  return (
    <div className="mt-10 w-full rounded-[24px] bg-[#F4F6F8] py-5">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-14 px-6 sm:gap-20">
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="relative h-10 w-[150px] shrink-0 sm:h-12 sm:w-[190px]"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                sizes="(max-width: 640px) 150px, 190px"
                placeholder="blur"
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: company-marquee 18s linear infinite;
        }

        @keyframes company-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
