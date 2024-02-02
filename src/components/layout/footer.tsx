import {
  AppStoreBadgeIcon,
  PlayStoreBadgeIcon,
  SykaLogoWhite,
} from "@/assets/icons";
import { GetSykaFooter } from "@/assets/images";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex flex-col justify-between xl:h-[560px] w-full bg-xenon-primary">
      <div className="absolute bottom-[80%] flex-1 left-1/2 -translate-x-1/2 xl:h-[370px] items-center rounded-3xl w-[calc(100vw-48px)] xl:w-[1211px] xl:mx-auto flex flex-col xl:flex-row gap-20 xl:gap-0 bg-white shadow-xenon_sh">
        <div className="flex flex-col gap-11 xl:ml-[138px] px-6 xl:px-0 pt-14">
          <p className="font-dmSans text-4.5xl font-bold xl:w-[580px] text-xenon-gray leading-[46px]">
            Get the app <span className="text-xenon">now</span>, take control of
            your financial wealth
          </p>
          <div className="flex flex-row gap-4">
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
          className="xl:absolute xl:w-[468px] xl:h-[298px] bottom-0 right-8 z-10"
        />
      </div>
      <div className="xl:w-[1211px] mx-auto pt-[200px] flex flex-col-reverse xl:flex-row gap-20 xl:gap-[170px] pb-11">
        <div className="flex flex-col gap-3 w-[366px]">
          <div className="w-[190px] h-[82px] p-2.5">
            <Image
              src={SykaLogoWhite}
              className="w-full h-full"
              alt="Syka Logo"
            />
          </div>
          <p className="text-white leading-[27.36px]">
            Syka is a product of Xenon Ltd,which is a financial technology
            company and not a bank. Our services are provided by our partner
            banks and other financial institutions that are duly licensed by
            BOG.
          </p>
        </div>
        <div className="flex flex-row gap-20">
          <div className="flex flex-col gap-5">
            <p className="text-[#8893A3] font-bold text-2xl">Products</p>
            <div className="flex flex-col gap-4 text-white">
              <p>Digital Account</p>
              <p>Syka Card</p>
              <p>Invoicing</p>
              <p>Loans</p>
              <p>Investments</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[#8893A3] font-bold text-2xl">Company</p>
            <div className="flex flex-col gap-4 text-white">
              <p>Community</p>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[1211px] shrink-0 w-screen mx-auto py-4 xl:h-[72px] flex-1 flex items-center justify-center border-t border-white/20">
        <p className="text-white text-center">© {year} Xenon Fintech Ltd.</p>
      </div>
      <p className="hidden opacity-0">
        Code was painstakenly written by Brian Newton. github/CozyBrian
      </p>
    </footer>
  );
};

export default Footer;
