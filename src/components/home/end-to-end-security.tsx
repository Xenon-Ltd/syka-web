import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
import React from "react";

function EndToEndSecurity() {
  return (
    <div className="flex">
      <div>
        <Image src={EndToEndSecurityImage} alt="endtoend" />
      </div>
      <div className="flex flex-col justify-center">
        <p>END-TO-END SECURITY</p>
        <p>
          Send Money <span>Globally</span> in Three Simple Steps
        </p>
        <p>
          Fund your Syka wallet, move money instantly across borders, convert
          currencies when needed, and manage spending or invoice payments from a
          single platform.
        </p>
        <button className="h-12 w-fit px-10 mt-6 bg-xenon-brand hover:bg-xenon-600 hover:shadow-xenon_sh hover:shadow-xenon-600/20 hover:-translate-y-1 rounded-lg text-white duration-100">
          Get Started for free
        </button>
      </div>
    </div>
  );
}

export default EndToEndSecurity;
