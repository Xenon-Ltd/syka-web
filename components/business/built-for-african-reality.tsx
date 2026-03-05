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
  return (
    <section className="mx-auto mt-16 max-w-[1092px] px-5 sm:px-6 xl:mt-20 xl:px-0">
      <div className="mb-10">
        <h2 className="text-[30px] leading-[1.1] font-bold text-[#121733] sm:text-[35px]">
          Built for African <span className="text-xenon">Reality</span>
        </h2>
      </div>

      <div className="grid place-items-center justify-center gap-8 sm:grid-cols-1 lg:grid-cols-3">
        {features.map((feature) => {
          return (
            <article key={feature.title} className="rounded-2xl text-center">
              <div className="mb-4 inline-flex size-[84px] items-center justify-center rounded-full border border-[#DCE9F7] bg-white">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={44}
                  height={44}
                  className="size-11 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-[#121733]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.7] text-[#505A6E]">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button className="h-11 rounded-lg bg-xenon px-7 text-sm font-semibold text-white transition-colors hover:bg-xenon-600">
          Schedule a Demo
        </button>
      </div>
    </section>
  );
}
