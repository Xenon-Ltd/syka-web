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
  {
    title: "Transparency",
    sublinks: [
      { label: "Contact Us", link: "" },
      { label: "FAQs", link: "" },
      { label: "Get Help", link: "" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isBusinessRoute = pathname.startsWith("/business");

  return (
    <footer className="relative mt-14 flex w-full flex-col bg-xenon-primary xl:mt-28 xl:min-h-[560px]">
      <div className="mx-auto flex w-[calc(100vw-32px)] flex-col items-center gap-10 rounded-3xl bg-white px-5 pt-8 pb-5 shadow-xenon_sh sm:w-[calc(100vw-48px)] sm:px-6 sm:pt-10 sm:pb-6 xl:absolute xl:top-0 xl:left-1/2 xl:h-[370px] xl:w-[1211px] xl:-translate-x-1/2 xl:-translate-y-[22%] xl:flex-row xl:gap-0 xl:px-0 xl:pt-0 xl:pb-0">
        <div className="flex flex-col gap-8 xl:ml-[86px] xl:py-12">
          <p className="font-dmSans text-[31px] leading-[1.1] font-bold text-xenon-gray sm:text-[36px] xl:w-[560px] xl:text-[40px]">
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
          <div className="flex flex-row gap-3">
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
        <Image
          src={GetSykaFooter}
          alt="growth-partner"
          className="w-full max-w-[430px] xl:h-[290px] xl:w-[430px] xl:self-end"
        />
      </div>
      <div className="mt-28 mx-auto flex flex-col-reverse gap-12 px-5 pb-10 pt-10 sm:px-6 xl:w-[1211px] xl:flex-row xl:justify-between xl:px-0 xl:pt-[210px]">
        <div className="flex w-full max-w-[366px] flex-col items-center gap-3 xl:items-start">
          <div className="w-[190px] h-[82px] p-2.5 ">
            <Image
              src={SykaLogoWhite}
              className="w-full h-full"
              alt="Syka Logo"
            />
          </div>
          <p className="text-white leading-[27.36px] text-center xl:text-start">
            Syka. The Smarter Bridge Between Borders.
          </p>
        </div>
        <div className="hidden xl:grid grid-cols-4 w-full">
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
        <div className="xl:hidden grid grid-cols-2 w-full">
          {FooterLinks.slice(0, 2).map((section, i) => (
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
      </div>
      <p className="px-4 pb-2 text-center text-white">© {year} Syka Ltd.</p>

      <div className="mx-auto flex w-full shrink-0 flex-1 items-center justify-center border-t border-white/20 px-5 py-4 text-center text-sm text-white sm:px-6 xl:h-[72px] xl:w-[1211px] xl:px-0">
        <p className="max-w-[980px]">
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
