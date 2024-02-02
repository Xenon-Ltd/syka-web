import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import {
  CircleGridPattern,
  DashboardShot,
  HelloSyka,
  ManHoldingCupTalking,
  SecureAccounts,
  Switch,
  TransferToLocal,
  WavyLineMouse,
  WomanExcitedOnPhone,
  WomanSmilingAtPhone,
} from "@/assets/images";
import EverythingYouGet from "@/components/home/everything-you-get";
import Features from "@/components/home/features";
import GetMoreDone from "@/components/home/get-more-done";
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

      <section className="xl:h-[458px] h-[427px] relative flex flex-col items-center py-12 xl:py-16 px-7 xl:px-0 bg-[#E4F4FB]">
        <div className="flex flex-col items-center gap-6 xl:w-[880px]">
          <p className="text-2xl xl:text-[43px] font-dmSans font-bold text-xenon-text text-center text-balance">
            Manage <span className="text-xenon-500">both</span> your accounts
            from one app
          </p>
          <p className="text-base xl:text-2xl text-[#8893A4] xl:text-balance text-center">
            Easily switch between both accounts for a smoother experience. Track
            your spending and be notified of any activity for both accounts, all
            from your Syka app.
          </p>
        </div>
        <div className="relative w-full">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 xl:w-[600px] w-screen max-w-[600px] shrink-0">
            <Image
              src={Switch}
              className="w-full h-full xl:aspect-auto object-cover"
              alt="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="xl:w-[1112px] flex flex-col xl:flex-row items-center justify-between gap-12 py-4 xl:py-0 px-7 xl:px-0 mx-auto">
        <div className="xl:w-[514px] hidden xl:block shrink-0">
          <Image
            src={WomanExcitedOnPhone}
            className="w-full h-full xl:aspect-auto object-cover"
            alt="hero-image"
          />
        </div>
        <div className="flex flex-col gap-3 xl:w-[520px]">
          <p className="text-2xl xl:text-3xl font-dmSans font-bold ">
            Open your account in a few simple steps
          </p>
          <p className="text-base xl:text-2xl text-[#8893A4]">
            If you’re a small business owner with just your ID, we’ll get you
            set up with a Syka business account in no time. No extra documents,
            no phone calls and no long wait times.
          </p>
          <div className="w-fit hidden xl:block">
            <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
              Join the waitlist
            </button>
          </div>
        </div>
        <div className="xl:w-[514px] xl:hidden block shrink-0">
          <Image
            src={WomanExcitedOnPhone}
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

      <section className="flex flex-row items-center justify-center px-4">
        <div className="xl:w-[1110px] xl:h-[420px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-10 rounded-[32px] overflow-clip bg-gradient-to-br from-[#1377BC] via-[#434FBB] to-[#9762B8]">
          <div className="flex flex-1 h-full flex-col pt-14 px-8 xl:py-16 xl:pl-11">
            <p className="text-2xl font-bold text-white xl:w-[460px] leading-[32px]">
              Invest in global companies’ shares buy, sell, and send digital
              currencies at the touch of a button
            </p>
            <div className="xl:w-[480px] shrink-0">
              <Image
                src={WavyLineMouse}
                className="w-full h-full xl:aspect-auto object-cover"
                alt="hero-image"
              />
            </div>
          </div>
          <div className="xl:w-[480px] xl:h-full relative pl-8 xl:pl-0">
            <div className="xl:w-[480px] xl:absolute -bottom-[1px] shrink-0">
              <Image
                src={DashboardShot}
                className="w-full h-full xl:aspect-auto object-cover"
                alt="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <GetMoreDone />

      <section className="xl:h-[674px] bg-[#25205C] flex flex-col items-center py-14 xl:pt-14 px-5 xl:px-0">
        <div className="relative xl:w-[1110px] h-full mx-auto gap-14 flex flex-col items-center">
          <Image
            src={CircleGridPattern}
            alt="circle grid pattern"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[80%] w-[368px] h-[368px]"
          />
          <div className="flex flex-col items-center gap-2 text-center xl:w-[610px]">
            <p className="text-sm xl:text-lg font-lato font-semibold text-[#7688A2] uppercase">
              END-TO-END SECURITY
            </p>
            <p className="text-2xl xl:text-[32px] font-dmSans font-bold text-white">
              Secured transactions with{" "}
              <span className="text-xenon-sky">global</span> and{" "}
              <span className="text-xenon-sky">local</span> transfers
            </p>
          </div>
          <div className="flex flex-col xl:flex-row justify-between gap-10 w-full">
            <div className="relative xl:w-[508px] xl:h-[564px] aspect-[508/564] px-10 xl:px-14 py-8 xl:py-11 bg-[#E4F4FB] rounded-[32px] shadow-xenon_light shadow-[#00000014]">
              <p className="text-lg xl:text-2xl font-semibold text-xenon-text">
                Transfer to locals as secured and swift as lighting.
              </p>
              <div className="flex flex-1">
                <div className="xl:w-[444px] w-[85%] absolute bottom-0 right-0 shrink-0">
                  <Image
                    src={TransferToLocal}
                    className="w-full h-full xl:aspect-auto object-cover"
                    alt="hero-image"
                  />
                </div>
              </div>
            </div>
            <div className="relative xl:w-[508px] xl:h-[564px] aspect-[508/564] px-10 xl:px-14 py-8 xl:py-11 overflow-clip bg-gradient-to-br from-[#1377BC] via-[#434FBB] to-[#9762B8] shadow-xenon_light shadow-[#00000014] rounded-[32px]">
              <p className="text-lg xl:text-2xl font-semibold text-white">
                Secured accounts that says goodbye to financial borders
              </p>
              <div className="flex flex-1">
                <div className="xl:w-[444px] w-[85%] absolute bottom-0 right-0 shrink-0">
                  <Image
                    src={SecureAccounts}
                    className="w-full h-full xl:aspect-auto object-cover"
                    alt="hero-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EverythingYouGet />

      <section className="xl:h-32 h-[28rem]"></section>
    </main>
  );
}
