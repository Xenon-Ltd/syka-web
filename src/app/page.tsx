import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import {
  HelloSyka,
  ManHoldingCupTalking,
  WomanSmilingAtPhone,
} from "@/assets/images";
import Features from "@/components/home/features";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-28 xl:gap-[200px] min-h-screen">
      <section className="relative flex flex-col xl:flex-row items-center justify-between gap-14 xl:h-[572px] xl:w-[1092px] mx-auto px-6 xl:px-0 xl:my-12 my-4">
        <div className="flex flex-col xl:items-start items-center w-auto xl:w-[545px] z-10">
          <h1 className="font-dmSans mb-3 xl:mb-6 font-bold text-4xl xl:text-5.5xl text-center xl:text-start text-xenon-gray leading-[49.3px] xl:leading-[76px]">
            Say <span className="text-xenon">Hello</span> to Digital Banking
          </h1>
          <div className="mb-6 xl:mb-12 flex flex-col gap-1.5">
            <p className="text-sm xl:text-lg leading-[14.74px] xl:leading-[21.6px] text-[#8893A4] text-center xl:text-start">
              Get your free bank account in just 10 minutes and manage your
              money right from your smartphone.
            </p>
            <p className="text-sm xl:text-lg leading-[14.74px] xl:leading-[21.6px] text-[#8893A4] text-center xl:text-start">
              No need for long queues anymore, discover smart features that give
              you more control over your finances.
            </p>
          </div>
          <button className="h-12 w-fit px-10 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Join the waitlist
          </button>
          <div className="hidden xl:flex flex-row gap-4 mt-8 ">
            <button>
              <Image
                src={AppStoreBadgeIcon}
                className="h-10 w-[135px]"
                alt="app-store-badge"
              />
            </button>
            <button>
              <Image
                src={PlayStoreBadgeIcon}
                className="h-10 w-[135px]"
                alt="app-store-badge"
              />
            </button>
          </div>
        </div>
        <div className="xl:w-[408px] shrink-0 z-10">
          <Image
            src={HelloSyka}
            className="w-full h-full xl:aspect-auto object-cover"
            alt="hero-image"
          />
        </div>
        <div className="flex xl:hidden flex-row gap-4 mt-8 ">
          <button>
            <Image
              src={AppStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="app-store-badge"
            />
          </button>
          <button>
            <Image
              src={PlayStoreBadgeIcon}
              className="h-10 w-[135px]"
              alt="app-store-badge"
            />
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center xl:h-[700px] py-16 xl:py-0 px-7 xl:px-0 bg-[#E4F4FB]">
        <div className="w-[1128px] flex flex-col-reverse xl:flex-row gap-20 items-center justify-between mx-auto">
          <div className="xl:w-[525px] shrink-0">
            <Image
              src={WomanSmilingAtPhone}
              className="w-full h-full xl:aspect-auto object-cover"
              alt="hero-image"
            />
          </div>
          <div className="flex flex-col gap-3 xl:w-[492px]">
            <p className="text-sm xl:text-lg font-lato font-semibold text-[#7688A2] uppercase">
              GET A SYKA PERSONAL ACCOUNT
            </p>
            <p className="text-2xl xl:text-3xl font-dmSans font-bold text-xenon-text">
              Take <span className="text-xenon-500">control</span> of your
              financial life
            </p>
            <p className="text-base xl:text-2xl text-[#8893A4] xl:w-[439px]">
              Open a free account right from your phone. Create saving jar,
              split bills and do everything you used to do in a branch on your
              phone.
            </p>
            <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
              Join the waitlist
            </button>
          </div>
        </div>
      </section>

      <Features />

      <section className="xl:w-[1163px] flex flex-col xl:flex-row items-center justify-between gap-12 py-4 xl:py-0 px-7 xl:px-0 mx-auto">
        <div className="flex flex-col gap-3 xl:w-[500px]">
          <p className="text-sm xl:text-lg font-lato font-semibold text-[#7688A2] uppercase">
            OPEN A SYKA BUSINESS ACCOUNT
          </p>
          <p className="text-2xl xl:text-3xl font-dmSans font-bold text-xenon-text">
            Your <span className="text-xenon-500">business</span>, our app, your
            financial growth
          </p>
          <p className="text-base xl:text-2xl text-[#8893A4] xl:w-[439px]">
            If you have a Ghana registered business, it’s easy to open a
            business account with Syka to keep your personal and company
            finances separate. Effortlessly manage and track your spending for
            both accounts in a single app.
          </p>
          <div className="w-fit hidden xl:block">
            <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
              Join the waitlist
            </button>
          </div>
        </div>
        <div className="xl:w-[641px] shrink-0">
          <Image
            src={ManHoldingCupTalking}
            className="w-full h-full xl:aspect-auto object-cover"
            alt="hero-image"
          />
        </div>
        <div className="w-fit xl:hidden block">
          <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Join the waitlist
          </button>
        </div>
      </section>

      <section></section>

      <section className="xl:h-32 h-80"></section>
    </main>
  );
}
