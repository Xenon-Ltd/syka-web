import type { ReactNode } from "react";

type ProductHeroShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  children: ReactNode;
};

export default function ProductHeroShell({
  eyebrow,
  title,
  description,
  ctaLabel,
  children,
}: ProductHeroShellProps) {
  return (
    <section className="mt-8 flex min-h-[85vh] items-center px-5 sm:px-6 xl:mt-0 xl:px-0">
      <div className="mx-auto grid h-full w-full max-w-[1292px] items-center gap-12 xl:grid-cols-[1fr_1.12fr] xl:gap-20">
        <div className="w-full">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#7A89A2] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-[660px] text-[35px] leading-[1.05] font-semibold text-[#3E4A5E] sm:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.5] text-[#77859C]">
            {description}
          </p>
          <button className="mt-8 h-12 rounded-lg bg-xenon px-6 text-lg font-medium text-white  transition-colors hover:bg-xenon-600">
            {ctaLabel}
          </button>
        </div>

        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
