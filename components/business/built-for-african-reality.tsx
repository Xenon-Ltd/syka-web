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
      "Move value in minutes with stable settlement and predictable treasury movement.",
    icon: InstantSettlement,
  },
  {
    title: "WhatsApp and SMS Native",
    description:
      "Approve and track payouts through channels teams already use every day.",
    icon: WhatsappSMSNative,
  },
  {
    title: "Patchy Internet Friendly",
    description:
      "Operational flows are designed for low bandwidth and unstable network zones.",
    icon: PatchyInternet,
  },
  {
    title: "Full Compliance",
    description:
      "Policy controls and auditable records that support regulated operations.",
    icon: FullCompliance,
  },
  {
    title: "Mobile-first",
    description:
      "Built for finance teams and operators working from mobile workflows.",
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
