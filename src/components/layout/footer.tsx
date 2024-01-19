import {
  AppStoreBadgeIcon,
  PlayStoreBadgeIcon,
  SykaLogoWhite,
} from "@/assets/icons";
import { GetSykaFooter } from "@/assets/images";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative flex flex-col justify-between h-[560px] w-full bg-xenon-primary">
      <div className="absolute bottom-[80%] flex-1 left-1/2 -translate-x-1/2 h-[370px] items-center rounded-3xl w-[1211px] mx-auto flex flex-row bg-white shadow-xenon_sh">
        <div className="flex flex-col gap-11 ml-[138px]">
          <p className="font-dmSans text-4.5xl font-bold w-[580px] text-xenon-gray leading-[46px]">
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
          className="absolute w-[468px] h-[298px] bottom-0 right-8 z-10"
        />
      </div>
      <div className="w-[1211px] mx-auto pt-[190px] flex flex-row gap-[170px] pb-11">
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
      <div className="w-[1211px] mx-auto h-[72px] flex-1 flex items-center justify-center border-t border-white/20">
        <p className="text-white text-center">© 2023 Xenon Fintech Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
