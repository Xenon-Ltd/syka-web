import BusinessHero from "@/components/business/business-hero";
import SolutionsAndPlatform from "@/components/business/solutions-and-platform";
import PlatformShowcase from "@/components/business/platform-showcase";
import PricingComparison from "@/components/business/pricing-comparison";
import CountriesSupported from "@/components/countries-supported";
import {
  DEVELOPER_COMPONENTS,
  parseDeveloperSlug,
} from "@/components/dropdown-pages/developer-config";
import {
  parseProductSlug,
  PRODUCT_COMPONENTS,
} from "@/components/dropdown-pages/product-config";
import BusinessCTA from "@/components/business/business-cta";
import BusinessFAQ from "@/components/business/business-faq";
import { businessStyles } from "@/lib/business-styles";

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

  if (SelectedProductComponent) {
    return <main className={`marketing-page product-page product-${selectedProduct}`}><SelectedProductComponent /></main>;
  }

  return (
    <main className={SelectedDeveloperComponent ? undefined : "marketing-page business-page"}>
      {SelectedTopComponent ? (
        <SelectedTopComponent />
      ) : (
        <>
          <BusinessHero />
          <SolutionsAndPlatform />
          <PlatformShowcase />
          <PricingComparison />
        </>
      )}
      <CountriesSupported variant="business" headingClassName={businessStyles.sectionHeading} />
      {!SelectedTopComponent && (
        <>
          <BusinessCTA />
          <BusinessFAQ />
        </>
      )}
    </main>
  );
}
