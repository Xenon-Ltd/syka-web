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
const marqueeSegmentLogos = [...companyLogos, ...companyLogos, ...companyLogos];

export default function CompaniesMarquee() {
  return (
    <div className="mt-10 w-full rounded-[24px] bg-[#F4F6F8] py-5 lg:mt-14 lg:rounded-[30px] lg:py-7">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((groupIndex) => (
            <div
              key={`group-${groupIndex}`}
              className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20 lg:gap-28 lg:pr-28"
            >
              {marqueeSegmentLogos.map((logo, logoIndex) => (
                <div
                  key={`${logo.name}-${groupIndex}-${logoIndex}`}
                  className="relative h-10 w-[150px] shrink-0 sm:h-12 sm:w-[190px] lg:h-16 lg:w-[240px]"
                >
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 640px) 150px, (max-width: 1023px) 190px, 240px"
                    placeholder="blur"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          will-change: transform;
          animation: company-marquee 24s linear infinite;
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
