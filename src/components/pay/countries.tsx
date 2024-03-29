import { HourGlass03 } from "@/assets/icons";
import * as COUNTRIES_ICON from "@/assets/icons/countries";
import Image from "next/image";
import React from "react";

const countries = [
  {
    name: "Ghana",
    Icon: COUNTRIES_ICON.GhanaIcon,
    pending: false,
  },
  {
    name: "Nigeria",
    Icon: COUNTRIES_ICON.NigeriaIcon,
    pending: false,
  },
  {
    name: "Chad",
    Icon: COUNTRIES_ICON.ChadIcon,
    pending: false,
  },
  {
    name: "Equatorial Guinea",
    Icon: COUNTRIES_ICON.GuineaIcon,
    pending: false,
  },
  {
    name: "Gabon",
    Icon: COUNTRIES_ICON.GabonIcon,
    pending: false,
  },
  {
    name: "Congo",
    Icon: COUNTRIES_ICON.CongoIcon,
    pending: false,
  },
  {
    name: "Benin",
    Icon: COUNTRIES_ICON.BeninIcon,
    pending: true,
  },
  {
    name: "Togo",
    Icon: COUNTRIES_ICON.TogoIcon,
    pending: true,
  },
];

const CountriesWeSupport = () => {
  return (
    <section className="xl:w-[1211px] mx-auto flex flex-col gap-12 items-center">
      <h2 className="font-dmSans font-bold text-lg xl:text-4.5xl text-xenon-gray">
        Countries We Currently Support
      </h2>
      <div className="flex flex-col xl:flex-row xl:flex-wrap items-stretch xl:items-center justify-center gap-16">
        {countries.map((country, index) => (
          <div
            key={index}
            className="flex flex-row gap-3 items-center bg-gray-100 rounded-full py-2 px-6"
          >
            <div className="w-6 h-6 xl:w-10 xl:h-10 rounded-full overflow-clip bg-gray-300">
              <Image
                src={country.Icon}
                alt="country-icon"
                className="w-full h-full"
              />
            </div>
            <p className="text-base xl:text-2xl">{country.name}</p>
            {index >= 6 && (
              <Image src={HourGlass03} alt="country-icon" className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountriesWeSupport;
