import {
  PartnerJSSquared,
  PartnerMaryHealthIcon,
  PartnerOwlTing,
  PartnerPartna,
  PartnerSonaQode,
  PartnerSwipelux,
  PartnerSwyChr,
} from "@/assets/images";
import Image, { type StaticImageData } from "next/image";

// Company logo strip used on the business page and every product page
// (Figma node 7950:10270).
// Sizes are the desktop values from Figma, multiplied by --logo-scale so the
// strip shrinks on smaller screens. It loops endlessly: the set renders twice
// and the track slides by half its width (the `marquee` keyframe in globals.css).

type Logo = {
  name: string;
  image: StaticImageData;
  /** Box size in px at desktop scale. */
  width: number;
  height: number;
  /** Figma's crop of the source image inside the box, in % of the box. */
  crop: { width: number; height: number; left: number; top: number };
};

const LOGOS: Logo[] = [
  { name: "Partna", image: PartnerPartna, width: 171, height: 61, crop: { width: 179.98, height: 263.32, left: -39.48, top: -76.49 } },
  { name: "OwlTing", image: PartnerOwlTing, width: 253, height: 73, crop: { width: 125.79, height: 264.36, left: -12.05, top: -77.09 } },
  { name: "Swipelux", image: PartnerSwipelux, width: 277, height: 66, crop: { width: 109.5, height: 457, left: -5.58, top: -172.43 } },
  { name: "SwyChr", image: PartnerSwyChr, width: 196, height: 64, crop: { width: 141.97, height: 211.89, left: -21.65, top: -56.22 } },
  { name: "JS Squared", image: PartnerJSSquared, width: 172.124, height: 64, crop: { width: 118.24, height: 212.01, left: -9.85, top: -30.02 } },
  { name: "SonaQode", image: PartnerSonaQode, width: 209.875, height: 73, crop: { width: 139.13, height: 400, left: -20.67, top: -150 } },
];

const GAP = 82;

const scaled = (n: number) => `calc(${n}px * var(--logo-scale))`;

function CroppedLogo({ logo, decorative }: { logo: Logo; decorative: boolean }) {
  const { crop } = logo;
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: scaled(logo.width), height: scaled(logo.height), marginRight: scaled(GAP) }}
    >
      <Image
        src={logo.image}
        alt={decorative ? "" : logo.name}
        sizes={`${Math.ceil((logo.width * crop.width) / 100)}px`}
        className="absolute max-w-none"
        style={{ width: `${crop.width}%`, height: `${crop.height}%`, left: `${crop.left}%`, top: `${crop.top}%` }}
      />
    </div>
  );
}

// Mary Health is an icon plus live text in the design, not a single image.
function MaryHealthLogo({ decorative }: { decorative: boolean }) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: scaled(12.549), marginRight: scaled(GAP) }}>
      <div className="relative shrink-0" style={{ width: scaled(45.864), height: scaled(64) }}>
        <Image src={PartnerMaryHealthIcon} alt="" fill sizes="46px" className="object-cover" />
      </div>
      <p
        aria-hidden={decorative || undefined}
        className="font-poppins font-semibold whitespace-nowrap text-black"
        style={{ fontSize: scaled(23.425), lineHeight: scaled(26.771) }}
      >
        Mary
        <br />
        Health
      </p>
    </div>
  );
}

function LogoSet({ decorative }: { decorative: boolean }) {
  return (
    <div aria-hidden={decorative || undefined} className="flex shrink-0 items-center">
      {LOGOS.map((logo) => (
        <CroppedLogo key={logo.name} logo={logo} decorative={decorative} />
      ))}
      <MaryHealthLogo decorative={decorative} />
    </div>
  );
}

export default function CompaniesMarquee() {
  return (
    <div
      aria-label="Trusted by these companies"
      className="group flex h-[72px] w-full max-w-[1123px] items-center overflow-hidden rounded-[32px] bg-[#f4f4f4] [--logo-scale:0.6] md:h-[88px] md:[--logo-scale:0.8] xl:h-[100px] xl:[--logo-scale:1]"
    >
      <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        <LogoSet decorative={false} />
        <LogoSet decorative />
      </div>
    </div>
  );
}
