import BuiltForAfricanReality from "@/components/business/built-for-african-reality";
import PowerYourBusiness from "@/components/business/power-your-business";
import Security from "@/components/business/security";
import Solutions from "@/components/business/solutions";
import SolutionsThatFit from "@/components/business/solutions-that-fit";
import CountriesSupported from "@/components/countries-supported";
import SocialProof from "@/components/social-proof";

export default function BusinessPage() {
  return (
    <main>
      <PowerYourBusiness />
      <Solutions />
      <BuiltForAfricanReality />
      <SolutionsThatFit />
      <Security />
      <SocialProof />
      <CountriesSupported />
    </main>
  );
}
