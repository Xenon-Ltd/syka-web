import { SykaLogo } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="my-5 mb-24 flex flex-row items-center justify-between max-w-[1211px] mx-auto">
      <div className="flex flex-row items-center gap-16">
        <Image src={SykaLogo} className="w-auto h-16" alt="Syka Logo" />
        <nav>
          <ul className="flex flex-row items-center gap-8 text-xenon-gray">
            <li>
              <Link href="/">Personal</Link>
            </li>
            <li>
              <Link href="/business">Business</Link>
            </li>
            <li>
              <Link href="/pay">Company</Link>
            </li>
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
