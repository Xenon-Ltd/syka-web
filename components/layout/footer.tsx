"use client";

import {
  AppStoreBadgeIcon,
  PlayStoreBadgeIcon,
  SykaLogoWhite,
} from "@/assets/icons";
import { GetSykaFooter } from "@/assets/_images";
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
    <footer className="relative mt-28 flex w-full flex-col bg-xenon-primary xl:min-h-[560px]">
      <div className="absolute top-0 left-1/2 flex w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-[22%] flex-col items-center gap-12 rounded-3xl bg-white px-6 pt-10 pb-6 shadow-xenon_sh xl:h-[370px] xl:w-[1211px] xl:flex-row xl:gap-0 xl:px-0 xl:pt-0 xl:pb-0">
        <div className="flex flex-col gap-8 xl:ml-[86px] xl:py-12">
          <p className="font-dmSans text-[40px] leading-[1.1] font-bold xl:w-[560px] text-xenon-gray">
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
      <div className="mx-auto flex flex-col-reverse gap-16 px-6 pb-10 pt-[210px] xl:w-[1211px] xl:flex-row xl:justify-between xl:px-0 xl:pt-[210px]">
        <div className="flex flex-col items-center xl:items-start gap-3 w-[366px]">
          <div className="w-[190px] h-[82px] p-2.5">
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
      <p className="text-center text-white">© {year} Syka Ltd.</p>

      <div className="mx-auto flex w-screen shrink-0 flex-1 items-center justify-center border-t border-white/20 py-4 text-white xl:h-[72px] xl:w-[1211px]">
        Syka is a product of Xenon Ltd, which is a financial technology company
        and not a bank. Our services are provided by our partner banks and other
        financial institutions that are duly licensed by BOG.{" "}
      </div>
      <p className="hidden">
        Code was painstakenly written by Brian Newton. github/CozyBrian
        <span>Updated in 2026 by Vincent Kwaku. github.com/thelocalgodd</span>
      </p>
    </footer>
  );
};

export default Footer;
