import BuiltForAfricanReality from "@/components/business/built-for-african-reality";
import PowerYourBusiness from "@/components/business/power-your-business";
import Security from "@/components/business/security";
import Solutions from "@/components/business/solutions";
import SolutionsThatFit from "@/components/business/solutions-that-fit";
import CountriesSupported from "@/components/countries-supported";
import {
  DEVELOPER_COMPONENTS,
  parseDeveloperSlug,
} from "@/components/dropdown-pages/developer-config";
import {
  parseProductSlug,
  PRODUCT_COMPONENTS,
} from "@/components/dropdown-pages/product-config";
import SocialProof from "@/components/social-proof";

type BusinessPageProps = {
  searchParams?: Promise<{
    developer?: string | string[];
    product?: string | string[];
  }>;
};

export default async function BusinessPage({ searchParams }: BusinessPageProps) {
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
    <main>
      {SelectedTopComponent ? (
        <SelectedTopComponent />
      ) : (
        <>
          <PowerYourBusiness />
          <Solutions />
        </>
      )}
      <BuiltForAfricanReality />
      <SolutionsThatFit />
      <Security />
      <SocialProof />
      <CountriesSupported />
    </main>
  );
}
