import {
  CircleGridPattern,
  SecureAccounts,
  TransferToLocal,
} from "@/assets/images";
import Image from "next/image";
import React from "react";

const EndToEnd = () => {
  return (
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
  );
};

export default EndToEnd;
