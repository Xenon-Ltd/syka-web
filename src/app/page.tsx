import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import BuiltOnStability from "@/components/home/built-on-stability";
import CountriesSupported from "@/components/home/countries-supported";
import EndToEndSecurity from "@/components/home/end-to-end-security";
import GetAPersonalAccount from "@/components/home/get-a-personal";
import Hero from "@/components/home/hero";
import MoreThanTransfers from "@/components/home/more-than-transfers";
import SocialProof from "@/components/home/social-proof";
import SolutionsThatFit from "@/components/home/solutions-that-fit";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 xl:gap-32 min-h-screen">
      <Hero />

      <div className="max-w-[1092px] mx-auto px-6 xl:px-0 text-center">
        <p className="text-3xl xl:text-4xl font-bold text-gray-900">
          Move digital dollars across borders in minutes.
        </p>
        <p className="text-xl mt-4 text-gray-600">
          Simple, fast and transparent global payments.
        </p>

        <div className="flex flex-row mt-6 gap-4 justify-center">
          <button>
            <Image
              src={PlayStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="play-store-badge"
            />
          </button>
          <button>
            <Image
              src={AppStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="app-store-badge"
            />
          </button>
        </div>
      </div>

      <GetAPersonalAccount />

      <MoreThanTransfers />

      <EndToEndSecurity />

      <BuiltOnStability />

      <SolutionsThatFit />

      <SocialProof />

      <CountriesSupported />

      <div className="h-24 xl:h-32" />
    </main>
  );
}
