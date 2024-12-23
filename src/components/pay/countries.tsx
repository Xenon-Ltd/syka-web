import * as COUNTRIES_ICON from "@/assets/icons/countries";
import Image from "next/image";
import React from "react";

const countries = [
  {
    name: "Ghana",
    Icon: COUNTRIES_ICON.GH,
    pending: false,
  },
  {
    name: "United Arab Emirates (AED) ",
    Icon: COUNTRIES_ICON.AE,
    pending: false,
  },
  {
    name: "Argentina (ARS)",
    Icon: COUNTRIES_ICON.AR,
    pending: false,
  },
  {
    name: "Brazil (BRL) ",
    Icon: COUNTRIES_ICON.BR,
    pending: false,
  },
  {
    name: "Chile (CLP)",
    Icon: COUNTRIES_ICON.CL,
    pending: false,
  },
  {
    name: "Eurozone countries (EUR) ",
    Icon: COUNTRIES_ICON.EURO,
    pending: false,
  },
  {
    name: "United Kingdom (GBP)",
    Icon: COUNTRIES_ICON.GB,
    pending: false,
  },
  {
    name: "Indonesia (IDR)",
    Icon: COUNTRIES_ICON.ID,
    pending: false,
  },
  {
    name: "India (INR)",
    Icon: COUNTRIES_ICON.IN,
    pending: false,
  },
  {
    name: "Mexico (MXN)",
    Icon: COUNTRIES_ICON.MX,
    pending: false,
  },
  {
    name: "Nigeria (NGN)",
    Icon: COUNTRIES_ICON.NG,
    pending: false,
  },
  {
    name: "Peru (PEN)",
    Icon: COUNTRIES_ICON.PE,
    pending: false,
  },
  {
    name: "Philippines (PHP)",
    Icon: COUNTRIES_ICON.PH,
    pending: false,
  },
  {
    name: "Turkey (TRY)",
    Icon: COUNTRIES_ICON.TH,
    pending: false,
  },
  {
    name: "Turkey (TRY)",
    Icon: COUNTRIES_ICON.TR,
    pending: false,
  },
  {
    name: "Vietnam (VND)",
    Icon: COUNTRIES_ICON.VN,
    pending: false,
  },
  // {
  //   name: "Chad",
  //   Icon: COUNTRIES_ICON.ChadIcon,
  //   pending: false,
  // },
  // {
  //   name: "Equatorial Guinea",
  //   Icon: COUNTRIES_ICON.GuineaIcon,
  //   pending: false,
  // },
  // {
  //   name: "Gabon",
  //   Icon: COUNTRIES_ICON.GabonIcon,
  //   pending: false,
  // },
  // {
  //   name: "Congo",
  //   Icon: COUNTRIES_ICON.CongoIcon,
  //   pending: false,
  // },
  // {
  //   name: "Benin",
  //   Icon: COUNTRIES_ICON.BeninIcon,
  //   pending: true,
  // },
  // {
  //   name: "Togo",
  //   Icon: COUNTRIES_ICON.TogoIcon,
  //   pending: true,
  // },
];

const CountriesWeSupport = () => {
  return (
    <section className="xl:w-[1240px] mx-auto flex flex-col gap-12 items-center">
      <h2 className="font-dmSans font-bold text-lg xl:text-4.5xl text-xenon-gray">
        Countries We Currently Support
      </h2>
      <div className="flex flex-col xl:flex-row xl:flex-wrap items-stretch xl:items-center justify-center gap-5 ">
        {countries.map((country, index) => (
          <div
            key={index}
            className="flex flex-row gap-3 items-center bg-gray-100 rounded-full py-2 px-4"
          >
            <div className="w-6 h-6 rounded-full overflow-clip bg-gray-300">
              <Image
                src={country.Icon}
                alt="country-icon"
                className="w-full h-full"
              />
            </div>
            <p className="text-base">{country.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountriesWeSupport;
