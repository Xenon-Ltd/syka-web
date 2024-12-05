import EndToEnd from "@/components/home/end-to-end";
import EverythingYouGet from "@/components/home/everything-you-get";
import Features from "@/components/home/features";
import FewSimpleSteps from "@/components/home/few-simple-steps";
import GetAPersonalAccount from "@/components/home/get-a-personal";
import GetMoreDone from "@/components/home/get-more-done";
import HeroSection from "@/components/home/hero-section";
import InvestInGlobal from "@/components/home/invest-in-global";
import ManageBothAccounts from "@/components/home/manage-both-accounts";
import OpenABusinessAccount from "@/components/home/open-a-business-account";

export default function Home() {
  return (
    <main className="flex flex-col gap-28 xl:gap-[200px] min-h-screen">
      <HeroSection />

      <GetAPersonalAccount />

      <Features />

      <OpenABusinessAccount />

      <ManageBothAccounts />

      <FewSimpleSteps />

      <InvestInGlobal />

      <GetMoreDone />

      <EndToEnd />

      <EverythingYouGet />

      <section className="xl:h-32 h-[28rem]"></section>
    </main>
  );
}
