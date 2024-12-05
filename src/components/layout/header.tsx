"use client";
import { MenuIcon } from "@/assets/icons";
import { SykaLogo } from "@/assets/images";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const links = [
  {
    label: "Personal",
    href: "/",
  },
  {
    label: "Business",
    href: "/business",
  },
  {
    label: "Pay",
    href: "/pay",
  },
];

const Header = () => {
  const [isSheetOpen, setisSheetOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative my-3 xl:my-5 mb-24 flex flex-row items-center justify-between w-full xl:max-w-[1211px] mx-auto">
      <div className="flex flex-row items-center gap-16">
        <Image
          src={SykaLogo}
          height={192}
          width={486}
          className="w-auto h-14 xl:h-16"
          alt="Syka Logo"
        />
        <nav>
          <ul className="hidden xl:flex flex-row items-center gap-8 text-xenon-gray">
            {links.map((link) => (
              <li
                className={cn(
                  pathname === link.href && "text-xenon-primary font-bold"
                )}
                key={link.href}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Link href={"/signup"}>
        <button className="hidden xl:block h-12 px-8 bg-xenon hover:bg-xenon-600 rounded-lg text-white duration-100">
          Get Started
        </button>
      </Link>
      <button
        onClick={() => setisSheetOpen((prev) => !prev)}
        className="xl:hidden block text-xenon"
      >
        <MenuIcon />
      </button>
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300",
          isSheetOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-row items-center justify-between px-4 py-4">
          <Image
            src={SykaLogo}
            className="w-auto h-14 xl:h-16"
            alt="Syka Logo"
          />
          <button onClick={() => setisSheetOpen(false)} className="text-xenon">
            <MenuIcon />
          </button>
        </div>
        <nav className="flex flex-col gap-8 px-8 py-4">
          {links.map((link) => (
            <Link
              onClick={() => setisSheetOpen(false)}
              href={link.href}
              key={link.href}
            >
              <p className="text-xenon-gray">{link.label}</p>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
