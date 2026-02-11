import EndToEnd from "@/components/_home/end-to-end";
import EverythingYouGet from "@/components/_home/everything-you-get";
import Features from "@/components/_home/features";
import FewSimpleSteps from "@/components/_home/few-simple-steps";
import GetAPersonalAccount from "@/components/_home/get-a-personal";
import GetMoreDone from "@/components/_home/get-more-done";
import HeroSection from "@/components/_home/hero-section";
import InvestInGlobal from "@/components/_home/invest-in-global";
import ManageBothAccounts from "@/components/_home/manage-both-accounts";
import OpenABusinessAccount from "@/components/_home/open-a-business-account";

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
