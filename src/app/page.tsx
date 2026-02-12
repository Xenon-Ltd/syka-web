import BuiltOnStability from "@/components/home/built-on-stability";
import CountriesSupported from "@/components/home/countries-supported";
import EndToEndSecurity from "@/components/home/end-to-end-security";
import GetAPersonalAccount from "@/components/home/get-a-personal";
import Hero from "@/components/home/hero";
import MoreThanTransfers from "@/components/home/more-than-transfers";

export default function Home() {
  return (
    <main className="flex flex-col gap-28 xl:gap-[200px] min-h-screen">
      <Hero />

      <GetAPersonalAccount />

      <MoreThanTransfers />

      <EndToEndSecurity />

      <BuiltOnStability />

      <CountriesSupported />

      <section className="xl:h-32 h-[28rem]"></section>
    </main>
  );
}
