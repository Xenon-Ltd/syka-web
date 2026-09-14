import type { StaticImageData } from "next/image";

import CA from "@/assets/icons/countries/CA.svg";
import GH from "@/assets/icons/countries/GH.svg";
import US from "@/assets/icons/countries/US.svg";

export interface OfficeLocation {
  id: string;
  name: string;
  flagUrl: StaticImageData;
  alt: string;
  address: string;
}

/** List of Xenon office locations displayed in the site footer. */
export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "usa",
    name: "USA",
    flagUrl: US,
    alt: "United States flag",
    address: "1415 Bali Court, San Jose, CA 95122, United States",
  },
  {
    id: "canada",
    name: "Canada",
    flagUrl: CA,
    alt: "Canada flag",
    address: "9 Clegg Rd, Markham, ON L6G 0H3, Canada",
  },
  {
    id: "ghana",
    name: "Ghana",
    flagUrl: GH,
    alt: "Ghana flag",
    address: "377 George Walker Bush Highway, Accra, Ghana",
  },
];
