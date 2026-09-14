import type { Metadata } from "next";
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
import MarketingCTA from "@/components/marketing-cta";
import FrequentlyAskedQuestions from "@/components/frequently-asked-questions";
import { developerPageMetadata, metadataForPage, productPageMetadata } from "@/lib/page-metadata";

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
  if (SelectedProductComponent) {
    return <main className={`marketing-page product-page product-${selectedProduct}`}><SelectedProductComponent /></main>;
  }

  if (SelectedDeveloperComponent) {
    return <main className="overflow-x-clip"><SelectedDeveloperComponent /></main>;
  }

  return (
    <main className="marketing-page personal-page">
      <Hero />
      <GetAPersonalAccount />
      <MoreThanTransfers />
      <EndToEndSecurity />
      <BuiltOnStability />
      <SolutionsThatFit />
      <SocialProof headingClassName="md:text-[36px] lg:text-[40px] lg:leading-[48px]" />
      <CountriesSupported variant="personal" headingClassName="md:text-[36px] lg:text-[40px] lg:leading-[50px]" />
      <MarketingCTA />
      <FrequentlyAskedQuestions />
    </main>
  );
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const selectedProduct = parseProductSlug(resolvedSearchParams?.product);
  const selectedDeveloper = parseDeveloperSlug(resolvedSearchParams?.developer);
  const selectedMetadata = selectedProduct
    ? productPageMetadata[selectedProduct]
    : selectedDeveloper
      ? developerPageMetadata[selectedDeveloper]
      : null;

  if (selectedMetadata) return metadataForPage(selectedMetadata);

  return {
    title: "Payment infrastructure for African entrepreneurs",
    description: "Send, receive, and store value globally with Syka's modern payment infrastructure.",
  };
}
