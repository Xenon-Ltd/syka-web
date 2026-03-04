import BuiltOnStability from "@/components/built-on-stability";
import CountriesSupported from "@/components/countries-supported";
import EndToEndSecurity from "@/components/end-to-end-security";
import GetAPersonalAccount from "@/components/get-a-personal";
import Hero from "@/components/hero";
import MoreThanTransfers from "@/components/more-than-transfers";
import SocialProof from "@/components/social-proof";
import SolutionsThatFit from "@/components/solutions-that-fit";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <GetAPersonalAccount />
      <MoreThanTransfers />
      <EndToEndSecurity />
      <BuiltOnStability />
      <SolutionsThatFit />
      <SocialProof />
      <CountriesSupported />
    </main>
  );
}
