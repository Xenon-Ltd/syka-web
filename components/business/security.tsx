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
    <section className="mt-16 bg-[#26216F] py-14 xl:mt-20 xl:min-h-[90vh] xl:py-16 xl:flex xl:items-center">
      <div className="mx-auto flex max-w-[1292px] flex-col items-center gap-10 px-5 sm:px-6 xl:flex-row xl:justify-between xl:gap-16 xl:px-0 w-full">
        <div className="w-full xl:w-[570px]">
          <p className="text-center text-[13px] font-semibold tracking-[0.18em] text-[#B4B8F7] uppercase">
            SECURITY
          </p>
          <h2 className="mt-3 text-center text-[35px] leading-[1.1] font-bold text-white sm:text-[44px]">
            Your Assets and Data Are Always{" "}
            <span className="text-[#8FE0FF]">Safe</span>
          </h2>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {securityPoints.map((point, index) => (
              <article
                key={point.title}
                className="rounded-2xl  px-4 py-4 text-center backdrop-blur-sm sm:text-left"
              >
                <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-white/12 text-[#8FE0FF] sm:mx-0">
                  {index === 0 ? (
                    <ShieldCheck size={24} />
                  ) : (
                    <LockKeyhole size={24} />
                  )}
                </div>
                <h3 className="text-[15px] font-bold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#D7DBFF]">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex h-[380px] w-full max-w-[520px] items-center justify-center rounded-2xl bg-[#1D1856] p-6">
          <Image
            src={SecurityLock}
            alt="security-lock"
            sizes="(max-width: 1280px) 100vw, 520px"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
