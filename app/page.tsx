import BuiltOnStability from "@/components/built-on-stability";
import CountriesSupported from "@/components/countries-supported";
import {
  DEVELOPER_COMPONENTS,
  parseDeveloperSlug,
} from "@/components/dropdown-pages/developer-config";
import {
  parseProductSlug,
  PRODUCT_COMPONENTS,
} from "@/components/dropdown-pages/product-config";
import EndToEndSecurity from "@/components/end-to-end-security";
import GetAPersonalAccount from "@/components/get-a-personal";
import Hero from "@/components/hero";
import MoreThanTransfers from "@/components/more-than-transfers";
import SocialProof from "@/components/social-proof";
import SolutionsThatFit from "@/components/solutions-that-fit";

type HomePageProps = {
  searchParams?: Promise<{
    developer?: string | string[];
    product?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedProduct = parseProductSlug(resolvedSearchParams?.product);
  const selectedDeveloper = parseDeveloperSlug(resolvedSearchParams?.developer);
  const SelectedProductComponent = selectedProduct
    ? PRODUCT_COMPONENTS[selectedProduct]
    : null;
  const SelectedDeveloperComponent = selectedDeveloper
    ? DEVELOPER_COMPONENTS[selectedDeveloper]
    : null;
  const SelectedTopComponent =
    SelectedProductComponent ?? SelectedDeveloperComponent;

  return (
    <main className="overflow-x-clip">
      {SelectedTopComponent ? (
        <SelectedTopComponent />
      ) : (
        <>
          <Hero />
          <GetAPersonalAccount />
          <MoreThanTransfers />
          <EndToEndSecurity />
        </>
      )}
      <BuiltOnStability />
      <SolutionsThatFit />
      <SocialProof />
      <CountriesSupported />
    </main>
  );
}
