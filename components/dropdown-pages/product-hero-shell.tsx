import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ProductHeroShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  frameClassName: string;
  children: ReactNode;
};

export default function ProductHeroShell({
  eyebrow,
  title,
  description,
  ctaLabel,
  frameClassName,
  children,
}: ProductHeroShellProps) {
  return (
    <section className="mx-auto mt-8 w-full max-w-[1211px] px-5 sm:px-6 xl:mt-14 xl:px-0">
      <div className="mx-auto flex w-full max-w-[1092px] flex-col items-center gap-10 xl:flex-row xl:justify-between xl:gap-16">
        <div className="w-full xl:w-[570px]">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#7A89A2] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[35px] leading-[1.05] font-semibold text-[#3E4A5E] sm:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.5] text-[#77859C]">
            {description}
          </p>
          <button className="mt-8 h-12 rounded-lg bg-xenon px-6 text-lg font-medium text-white  transition-colors hover:bg-xenon-600">
            {ctaLabel}
          </button>
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}
