import { WomanExcitedOnPhone } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FewSimpleSteps = () => {
  return (
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
          If you’re a small business owner with just your ID, we’ll get you set
          up with a Syka business account in no time. No extra documents, no
          phone calls and no long wait times.
        </p>
        <div className="w-fit hidden xl:block">
          <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Get Started
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
        <Link href={"/signup"}>
          <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FewSimpleSteps;
