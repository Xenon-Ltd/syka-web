import { SecurityLock } from "@/assets/images";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";

const securityPoints = [
  {
    title: "Anti-Fraud Measures",
    description:
      "Constant monitoring to detect and prevent suspicious activity.",
  },
  {
    title: "Two-Factor Authentication",
    description: "Adds an extra layer of security to protect your account.",
  },
];

export default function Security() {
  return (
    <section className="mt-16 bg-[#E8F4FB] py-14 xl:mt-20 xl:py-16">
      <div className="mx-auto flex max-w-[1092px] flex-col items-center gap-10 px-5 sm:px-6 xl:flex-row xl:justify-between xl:gap-16 xl:px-0">
        <div className="w-full xl:w-[470px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#7A89A2] uppercase">
            SECURITY
          </p>
          <h2 className="mt-3 text-[32px] leading-[1.1] font-bold text-[#121733] sm:text-[40px]">
            Your Assets and Data Are Always{" "}
            <span className="text-xenon">Safe</span>
          </h2>

          <div className="mt-6 grid gap-10 sm:grid-cols-2">
            {securityPoints.map((point, index) => (
              <article key={point.title} className=" py-4">
                <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full border bg-xenon text-white">
                  {index === 0 ? (
                    <ShieldCheck size={18} />
                  ) : (
                    <LockKeyhole size={18} />
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#1C2740]">
                  {point.title}
                </h3>
                <p className="mt-2 text-xs leading-[1.7] text-[#546178]">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex h-[380px] w-full max-w-[520px] items-center justify-center rounded-2xl bg-[#26216F] p-6">
          <Image src={SecurityLock} alt="security-lock" className="w-full" />
        </div>
      </div>
    </section>
  );
}
