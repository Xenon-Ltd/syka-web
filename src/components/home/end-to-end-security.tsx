import { EndToEndSecurityImage } from "@/assets/images";
import Image from "next/image";
import React from "react";

function EndToEndSecurity() {
  return (
    <div>
      <div>
        <Image src={EndToEndSecurityImage} alt="endtoend" />
      </div>
      <div>
        <p>END</p>
      </div>
    </div>
  );
}

export default EndToEndSecurity;
