"use client";

import {
  AppStoreBadgeIcon,
  PlayStoreBadgeIcon,
  SykaLogoWhite,
} from "@/assets/icons";
import { GetSykaFooter } from "@/assets/images";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FooterLinks = [
  {
    title: "Products",
    sublinks: [
      { label: "Virtual Accounts", link: "" },
      { label: "Virtual Cards", link: "" },
      { label: "Invoicing", link: "" },
      { label: "Payments", link: "" },
      { label: "Treasury Management", link: "" },
    ],
  },
  {
    title: "Company",
    sublinks: [
      { label: "About Us", link: "" },
      { label: "Blog", link: "" },
      { label: "Press", link: "" },
      { label: "Join our team", link: "" },
      { label: "Community", link: "" },
    ],
  },
  {
    title: "Transparency",
    sublinks: [
      { label: "Terms & Conditions", link: "" },
      { label: "Privacy Policy", link: "" },
      { label: "Cookie Policy", link: "" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isBusinessRoute = pathname.startsWith("/business");

  return (
    <footer className="relative mt-22 flex w-full flex-col bg-xenon-primary lg:min-h-[560px] xl:mt-28">
      <div
        className={`relative z-10 mx-auto flex w-[calc(100vw-32px)] flex-col items-center gap-8 overflow-visible rounded-[32px] bg-white px-5 pt-10 pb-0 shadow-xenon_sh sm:w-[calc(100vw-48px)] sm:px-6 sm:pt-10 sm:pb-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:pb-0 xl:absolute xl:top-0 xl:left-1/2 xl:h-[370px] xl:w-[1211px] xl:-translate-x-1/2 xl:-translate-y-[22%] xl:gap-0 xl:px-0 xl:pt-0 xl:pb-0 ${
          isBusinessRoute ? "-mt-14 sm:-mt-16 lg:mt-0 xl:mt-0" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center lg:max-w-[420px] lg:items-start lg:py-10 lg:text-left xl:ml-[86px] xl:max-w-none xl:py-12">
          <p className="mobile-section-title max-w-[290px] font-dmSans text-xenon-gray sm:max-w-none lg:text-[36px] lg:leading-[1.1] xl:w-[560px] xl:text-[40px]">
            {isBusinessRoute ? (
              <>
                Ready To Transform Your{" "}
                <span className="text-xenon">Cross-Border</span> Payments?
              </>
            ) : (
              <>
                Stop Paying The{" "}
                <span className="text-xenon">Geography Tax</span>
              </>
            )}
          </p>
          <p className="mobile-body max-w-[260px] text-[#7C859A] sm:max-w-[420px]">
            Join 3,000+ African businesses using Syka to compete globally.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start xl:justify-start">
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
        <div className="pointer-events-none relative z-10 mt-auto w-[calc(100%+20px)] max-w-[320px] self-stretch sm:w-full sm:max-w-[430px] lg:mt-0 lg:w-[360px] lg:max-w-[360px] lg:self-end xl:mt-auto xl:w-[430px] xl:max-w-[430px] xl:self-end">
          <Image
            src={GetSykaFooter}
            alt="growth-partner"
            className="block w-full xl:h-[290px] xl:w-[430px]"
          />
        </div>
      </div>
      <div className="mx-auto mt-16 flex flex-col-reverse gap-12 px-5 pb-10 pt-10 sm:mt-28 sm:px-6 sm:pt-10 lg:flex-row lg:justify-between lg:pt-16 xl:w-[1211px] xl:px-0 xl:pt-[210px]">
        <div className="flex w-full max-w-[366px] flex-col items-center gap-3 lg:items-start">
          <div className="w-[190px] h-[82px] p-2.5 ">
            <Image
              src={SykaLogoWhite}
              className="w-full h-full"
              alt="Syka Logo"
            />
          </div>
          <p className="mobile-body max-w-[260px] text-center text-white lg:max-w-none lg:text-base lg:leading-[27.36px] lg:text-start">
            Syka. The Smarter Bridge Between Borders.
          </p>
        </div>
        <div className="hidden lg:grid lg:grid-cols-4 w-full">
          {FooterLinks.map((section, i) => (
            <div key={`${section.title}-${i}`} className="flex flex-col gap-5">
              <p className="text-[#8893A4] font-bold text-lg">
                {section.title}
              </p>
              <div className="flex flex-col gap-3 text-white">
                {section.sublinks.map((sublink) => (
                  <p key={sublink.label}>{sublink.label}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid w-full grid-cols-2 gap-8 lg:hidden">
          {FooterLinks.slice(0, 2).map((section, i) => (
            <div key={`${section.title}-${i}`} className="flex flex-col gap-5">
              <p className="mobile-body font-bold text-[#8893A4]">
                {section.title}
              </p>
              <div className="flex flex-col gap-3 text-white">
                {section.sublinks.map((sublink) => (
                  <p key={sublink.label} className="mobile-meta">
                    {sublink.label}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mobile-meta px-4 pb-2 text-center text-white lg:text-base lg:leading-normal">
        © {year} Syka Ltd.
      </p>

      <div className="mx-auto flex w-full shrink-0 flex-1 items-center justify-center border-t border-white/20 px-5 py-4 text-center text-white sm:px-6 xl:h-[72px] xl:w-[1211px] xl:px-0">
        <p className="mobile-meta max-w-[980px] lg:text-sm lg:leading-normal">
          Syka is a product of Xenon Ltd, which is a financial technology
          company and not a bank. Our services are provided by our partner banks
          and other financial institutions that are duly licensed by BOG.
        </p>
      </div>
      <p className="hidden">
        Code was painstakenly written by Brian Newton. github/CozyBrian
        <span>Updated in 2026 by Vincent Kwaku. github.com/thelocalgodd</span>
      </p>
    </footer>
  );
};

export default Footer;
