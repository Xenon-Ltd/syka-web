import { SUPPORT_CATEGORIES } from "@/lib/support-content";
import { CircleAlert, IdCard, Rocket, Send, ShieldCheck, type LucideIcon } from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, LucideIcon> = {
  "getting-started": Rocket,
  verification: IdCard,
  "sending-money": Send,
  "if-something-goes-wrong": CircleAlert,
  "safety-and-support": ShieldCheck,
};

export default function QuickAnswers() {
  return (
    <section aria-labelledby="quick-answers-heading" className="mx-auto mt-16 max-w-[1268px] px-5 pb-16 sm:px-6 lg:mt-4 lg:pb-[93px]">
      <div className="border-t border-black pt-10">
        <h2 id="quick-answers-heading" className="text-[32px] leading-[1.2] font-bold text-black lg:text-[40px] lg:leading-[52px]">
          Quick Answers
        </h2>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-[72px] lg:grid-cols-3">
        {SUPPORT_CATEGORIES.map(({ slug, title }) => {
          const Icon = categoryIcons[slug] ?? Send;
          return (
            <li key={slug} className="flex min-h-[280px] flex-col items-start justify-center gap-8 rounded-2xl bg-[#F7F7F7] p-8 lg:min-h-[354px] lg:gap-10 lg:px-10">
              <span aria-hidden className="flex size-20 items-center justify-center rounded-[25px] bg-[#93C6DC] text-white lg:size-[100px]">
                <Icon className="size-10 lg:size-[50px]" strokeWidth={1.5} />
              </span>
              <h3 className="text-2xl leading-[1.45] font-semibold text-[#8893A4]">{title}</h3>
              <Link
                href={`/support/${slug}`}
                aria-label={`View ${title} articles`}
                className="inline-flex w-[140px] items-center justify-center rounded-lg bg-xenon-primary px-5 py-3 text-base leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#1B1747] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-primary"
              >
                View article
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
