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
    <div className="flex items-center gap-3 w-fit px-4 md:px-8 py-1 rounded-full bg-gray-100 my-0">
      <Image
        src={icon}
        alt={`${name} flag`}
        width={20}
        height={20}
        className="border rounded-full"
      />
      <p>{name}</p>
    </div>
  );
}

export default function CountriesSupported() {
  return (
    <section className="max-w-[1092px] mx-auto px-6 xl:px-0 mb-80 sm:mb-20">
      <p className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 text-center">
        Countries We Currently Support
      </p>

      <div className="flex gap-3 flex-wrap mt-8 items-center justify-center">
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
