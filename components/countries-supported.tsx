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
} from "@/assets/icons/countries";
import Image from "next/image";

interface CountryItemProps {
  icon: string;
  name: string;
}

const countries = [
  // ghana uae argentina brazil chile european union uk indonesia india mexico nigera peru phillipines thailand turkey vietnam
  { name: "Ghana (GHS)", icon: GH },
  { name: "United Arab Emirates (AED)", icon: AE },
  { name: "Argentina (ARS)", icon: AR },
  { name: "Brazil (BRL)", icon: BR },
  { name: "Chile (CLP)", icon: CL },
  { name: "European Union (EUR)", icon: EURO },
  { name: "United Kingdom (GBP)", icon: GB },
  { name: "Indonesia (IDR)", icon: ID },
  { name: "India (INR)", icon: IN },
  { name: "Mexico (MXN)", icon: MX },
  { name: "Nigeria (NGN)", icon: NG },
  { name: "Peru (PEN)", icon: PE },
  { name: "Phillipines (PHP)", icon: PH },
  { name: "Thailand (THB)", icon: TH },
  { name: "Turkey (TRY)", icon: TR },
  { name: "Vietnam (VND)", icon: VN },
];

function CountryItem({ icon, name }: CountryItemProps) {
  return (
    <div className="my-0 flex w-fit items-center gap-2 rounded-full bg-[#F3F6FA] px-3 py-1.5 md:px-4">
      <Image
        src={icon}
        alt={`${name} flag`}
        width={16}
        height={16}
        className="rounded-full border border-[#D4DEE9]"
      />
      <p className="text-xs text-[#445066]">{name}</p>
    </div>
  );
}

export default function CountriesSupported() {
  return (
    <section className="mx-auto mt-16 mb-16 max-w-[1092px] px-6 xl:mt-20 xl:mb-10 xl:px-0">
      <p className="text-center text-[35px] leading-[1.1] font-bold text-[#121733]">
        Countries We Currently Support
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {countries.map((country) => (
          <CountryItem
            key={country.name}
            icon={country.icon}
            name={country.name}
          />
        ))}
      </div>
    </section>
  );
}
