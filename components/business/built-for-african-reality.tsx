import {
  FullCompliance,
  InstantSettlement,
  MobileFirst,
  PatchyInternet,
  WhatsappSMSNative,
} from "@/assets/images";
import Image, { StaticImageData } from "next/image";

type Feature = {
  title: string;
  description: string;
  icon: StaticImageData;
};

const features: Feature[] = [
  {
    title: "Instant Settlement in USDT",
    description:
      "Receive stable dollar payments instantly, without delays or intermediaries.",
    icon: InstantSettlement,
  },
  {
    title: "WhatsApp and SMS Native",
    description:
      "Adapted to send and receive payments directly through WhatsApp or SMS.",
    icon: WhatsappSMSNative,
  },
  {
    title: "Patchy Internet Friendly",
    description:
      "Optimized for low bandwidth so payments go through, even on unstable networks.",
    icon: PatchyInternet,
  },
  {
    title: "Full Compliance",
    description:
      "Fully compliant infrastructure with fair access for African businesses.",
    icon: FullCompliance,
  },
  {
    title: "Mobile-first",
    description:
      "Designed for accessibility and effortless reach wherever you are",
    icon: MobileFirst,
  },
];

export default function BuiltForAfricanReality() {
  const topRowFeatures = features.slice(0, 3);
  const bottomRowFeatures = features.slice(3);

  const renderFeatureCard = (feature: Feature) => (
    <article
      key={feature.title}
      className="mx-auto flex w-full max-w-[360px] flex-col items-center rounded-2xl text-center"
    >
      <div className="mb-5 inline-flex size-[204px] items-center justify-center rounded-full border border-[#DCE9F7] bg-white">
        <Image
          src={feature.icon}
          alt={feature.title}
          width={88}
          height={88}
          className="mx-auto h-[88px] w-[88px] object-contain object-center"
        />
      </div>
      <h3 className="text-[26px] leading-[1.25] font-bold text-[#121733]">
        {feature.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.75] text-[#505A6E]">
        {feature.description}
      </p>
    </article>
  );

  return (
    <section className="mx-auto mt-16 max-w-[1292px] px-5 sm:px-6 xl:mt-20 xl:min-h-[90vh] xl:px-0 xl:flex xl:flex-col xl:justify-center">
      <div className="mb-10">
        <h2 className="text-[35px] leading-[1.1] font-bold text-[#121733] sm:text-[44px]">
          Built for African <span className="text-xenon">Reality</span>
        </h2>
      </div>

      <div className="mb-16 space-y-12">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
          {topRowFeatures.map((feature) => renderFeatureCard(feature))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
          {bottomRowFeatures.map((feature) => renderFeatureCard(feature))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="h-11 rounded-lg bg-xenon px-7 text-[15px] font-semibold text-white transition-colors hover:bg-xenon-600">
          Schedule a Demo
        </button>
      </div>
    </section>
  );
}
