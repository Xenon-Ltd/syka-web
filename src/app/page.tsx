import { GrowthPartner, LineGridPattern, WomanStanding } from "@/assets/images";
import OurBusinessOfferings from "@/components/home/ourBusinessOfferings";
import WhyYouShouldChooseSyka from "@/components/home/whyYouShouldChooseSyka";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-[200px] min-h-screen">
      <section className="relative flex flex-row items-center justify-between gap-14 h-[572px] w-[1211px] mx-auto">
        <div className="flex flex-col z-10">
          <h1 className="font-dmSans mb-6 font-bold text-4.5xl text-xenon-gray leading-[50px] text-balance">
            <span className="text-xenon">Elevate Your Business</span> with Syka,
            Where Financial Excellence Meets{" "}
            <span className="text-xenon">Seamless Operations</span>.
          </h1>
          <p className="text-lg w-[85%] mb-12">
            Syka Business Banking offers you more than just financial tools. It
            provides a comprehensive suite that propels your business forward.{" "}
          </p>
          <button className="h-12 w-fit px-8 bg-xenon hover:bg-xenon-600 rounded-lg text-white duration-100">
            Open an account in 10 minutes
          </button>
        </div>
        <div
          style={{
            borderTopLeftRadius: "60%",
          }}
          className="w-[626px] h-full overflow-clip shrink-0 z-10"
        >
          <Image
            src={WomanStanding}
            className="w-full h-full object-cover"
            alt="hero-image"
          />
        </div>
        <Image
          className="absolute top-[80%] right-[90%] h-[358px] z-0"
          src={LineGridPattern}
          alt="line-grid"
        />
        <Image
          className="absolute bottom-[50%] left-[90%] h-[358px] z-0"
          src={LineGridPattern}
          alt="line-grid"
        />
      </section>
      <OurBusinessOfferings />
      <section className="relative rounded-[32px] h-[470px] bg-xenon flex flex-row w-[1211px] mx-auto">
        <div className="flex flex-col justify-between text-white h-full p-14 z-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-dmSans font-bold text-4.5xl w-[520px]">
              Syka Business Banking, Your Growth Partner.
            </h3>
            <p className="w-[600px] text-lg">
              In a world that never stops, your business needs a financial
              partner that keeps pace. Syka Business Banking is designed to
              empower entrepreneurs like you. Join us in reshaping the future of
              digital business finance.
            </p>
          </div>
          <button className="h-12 bg-white hover:bg-white/90 rounded-lg text-xenon w-fit px-8 duration-75">
            Get Started Now
          </button>
        </div>
        <Image
          src={GrowthPartner}
          alt="growth-partner"
          className="absolute w-[610px] h-[432px] bottom-0 right-8 z-10"
        />
        <Image
          className="absolute top-[90%] left-[90%] h-[358px] z-0"
          src={LineGridPattern}
          alt="line-grid"
        />
      </section>
      <WhyYouShouldChooseSyka />
      <section className="h-32"></section>
    </main>
  );
}
