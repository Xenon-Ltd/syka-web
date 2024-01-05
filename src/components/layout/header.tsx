"use client";
import { SykaLogo } from "@/assets/images";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
    label: "Company",
    href: "/pay",
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="my-5 mb-24 flex flex-row items-center justify-between max-w-[1211px] mx-auto">
      <div className="flex flex-row items-center gap-16">
        <Image src={SykaLogo} className="w-auto h-16" alt="Syka Logo" />
        <nav>
          <ul className="flex flex-row items-center gap-8 text-xenon-gray">
            {links.map((link) => (
              <li
                className={cn(
                  pathname === link.href && "text-xenon-primary font-bold",
                )}
                key={link.href}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button className="h-12 px-8 bg-xenon hover:bg-xenon-600 rounded-lg text-white duration-100">
        Join the Waitlist
      </button>
    </header>
  );
};

export default Header;
