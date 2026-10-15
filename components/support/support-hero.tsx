import { ContourPattern } from "@/assets/images";
import Header from "@/components/layout/header";
import SupportSearch from "./support-search";

// The hero renders the header itself (see ownHeaderRoutes in site-chrome) so
// the navy contour background runs behind the navigation, as in the design.
export default function SupportHero() {
  return (
    <section aria-labelledby="support-hero-heading" className="relative z-10 isolate flow-root bg-xenon-primary">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${ContourPattern.src})`, backgroundSize: "1200px 1200px" }}
        />
      </div>

      <Header tone="dark" />

      <div className="mx-auto max-w-[1077px] px-5 pt-10 pb-20 text-center sm:px-6 lg:pt-[85px] lg:pb-[195px]">
        <h1 id="support-hero-heading" className="pt-3 font-poppins text-[34px] leading-[1.15] font-medium text-white sm:text-5xl lg:text-[62px] lg:leading-[68px]">
          Hi, how can we help you?
        </h1>
        <p className="mt-4 text-base leading-6 text-[#FDFDFD] lg:mt-8 lg:text-xl">Advice and answers from the Syka Team</p>
        <div className="mt-10 lg:mt-[65px]">
          <SupportSearch />
        </div>
      </div>
    </section>
  );
}
