import { CONTACT_SUPPORT_HREF, SUPPORT_CATEGORIES, SUPPORT_SEARCH_INDEX, supportArticleHref } from "@/lib/support-content";
import { ArrowRight, ChevronRight, CircleAlert, IdCard, MessageCircleQuestion, Rocket, Send, ShieldCheck, type LucideIcon } from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, LucideIcon> = {
  "getting-started": Rocket,
  verification: IdCard,
  "sending-money": Send,
  "if-something-goes-wrong": CircleAlert,
  "safety-and-support": ShieldCheck,
};

// Questions listed on each card before "View all".
const PREVIEW_COUNT = 4;

const linkFocus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-xenon-brand";

export default function QuickAnswers() {
  return (
    <section id="quick-answers" aria-labelledby="quick-answers-heading" className="mx-auto mt-16 max-w-[1268px] scroll-mt-8 px-5 pb-16 sm:px-6 lg:mt-4 lg:pb-[93px]">
      <div className="border-t border-black pt-10">
        <h2 id="quick-answers-heading" className="text-[32px] leading-[1.2] font-bold text-black lg:text-[40px] lg:leading-[52px]">
          Quick Answers
        </h2>
        <p className="mt-3 max-w-[560px] text-base leading-[1.6] text-[#667185] lg:text-lg">
          {SUPPORT_SEARCH_INDEX.length} answers across {SUPPORT_CATEGORIES.length} topics. Pick a question, or search above.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
        {SUPPORT_CATEGORIES.map(({ slug, title, articles }) => {
          const Icon = categoryIcons[slug] ?? Send;
          const preview = articles.slice(0, PREVIEW_COUNT);
          return (
            <li key={slug} className="flex flex-col rounded-2xl bg-[#F7F7F7] p-6 lg:p-8">
              <div className="flex items-center gap-4">
                <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-[#93C6DC] text-white">
                  <Icon className="size-7" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-xl leading-7 font-semibold text-[#1F1A0B] lg:text-2xl lg:leading-8">
                    <Link href={`/support/${slug}`} className={`rounded transition-colors hover:text-xenon-brand ${linkFocus}`}>
                      {title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#8893A4]">
                    {articles.length} {articles.length === 1 ? "article" : "articles"}
                  </p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-black/[0.06] border-y border-black/[0.06]">
                {preview.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={supportArticleHref(slug, article.slug)}
                      className={`group flex items-center justify-between gap-3 rounded py-3.5 text-base leading-6 text-xenon-gray transition-colors hover:text-xenon-brand ${linkFocus}`}
                    >
                      <span>{article.question}</span>
                      <ChevronRight aria-hidden className="size-4 shrink-0 text-[#98A2B3] transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-xenon-brand" />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/support/${slug}`}
                aria-label={`View all ${title.toLowerCase()} articles`}
                className={`group mt-auto inline-flex items-center gap-2 self-start rounded pt-6 text-base font-semibold text-xenon-brand ${linkFocus}`}
              >
                {articles.length > PREVIEW_COUNT ? `View all ${articles.length} articles` : "View topic"}
                <ArrowRight aria-hidden className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}

        <li className="flex flex-col justify-between gap-8 rounded-2xl bg-xenon-primary p-6 text-white lg:p-8">
          <div>
            <span aria-hidden className="flex size-14 items-center justify-center rounded-[18px] bg-white/10">
              <MessageCircleQuestion className="size-7" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-xl leading-7 font-semibold lg:text-2xl lg:leading-8">Still need help?</h3>
            <p className="mt-2 text-base leading-[1.6] text-white/75">
              Send our support team a message. Include your payment reference if you have one so we can respond faster.
            </p>
          </div>
          <Link
            href={CONTACT_SUPPORT_HREF}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-semibold text-xenon-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contact support
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </li>
      </ul>
    </section>
  );
}
