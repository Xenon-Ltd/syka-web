import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import BuiltOnStability from "@/components/home/built-on-stability";
import CountriesSupported from "@/components/home/countries-supported";
import EndToEndSecurity from "@/components/home/end-to-end-security";
import GetAPersonalAccount from "@/components/home/get-a-personal";
import Hero from "@/components/home/hero";
import MoreThanTransfers from "@/components/home/more-than-transfers";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-28 xl:gap-[200px] min-h-screen">
      <Hero />

      <div className="text-center">
        <p className="text-4xl font-semibold">
          Move digital dollars across borders in minutes.
        </p>
        <p className="text-xl mt-4">
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

      <CountriesSupported />

      <section className="xl:h-32 h-[28rem]"></section>
    </main>
  );
}
