import BuiltForAfricanReality from "@/components/business/built-for-african-reality";
import PowerYourBusiness from "@/components/business/power-your-business";
import Security from "@/components/business/security";
import Solutions from "@/components/business/solutions";
import SolutionsThatFit from "@/components/business/solutions-that-fit";
import CountriesSupported from "@/components/countries-supported";
import {
  parseProductSlug,
  PRODUCT_COMPONENTS,
} from "@/components/dropdown-pages/product-config";
import SocialProof from "@/components/social-proof";

type BusinessPageProps = {
  searchParams?: Promise<{
    product?: string | string[];
  }>;
};

export default async function BusinessPage({ searchParams }: BusinessPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedProduct = parseProductSlug(resolvedSearchParams?.product);
  const SelectedProductComponent = selectedProduct
    ? PRODUCT_COMPONENTS[selectedProduct]
    : null;

  return (
    <main>
      {SelectedProductComponent ? (
        <SelectedProductComponent />
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
