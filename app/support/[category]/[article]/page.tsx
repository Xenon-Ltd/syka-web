import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SupportBackLink from "@/components/support/support-back-link";
import { cn } from "@/lib/utils";
import { getSupportArticle, SUPPORT_CATEGORIES, SUPPORT_EMAIL, supportArticleHref } from "@/lib/support-content";

type Params = Promise<{ category: string; article: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORT_CATEGORIES.flatMap((category) =>
    category.articles.map((article) => ({ category: category.slug, article: article.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, article } = await params;
  const match = getSupportArticle(category, article);
  if (!match) return {};
  return {
    title: `${match.article.question} | Support`,
    description: match.article.answer,
    alternates: { canonical: supportArticleHref(match.category.slug, match.article.slug) },
  };
}

function withSupportEmailLink(text: string) {
  const [before, after] = text.split(SUPPORT_EMAIL);
  if (after === undefined) return text;
  return (
    <>
      {before}
      <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-xenon-brand underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>
      {after}
    </>
  );
}

export default async function SupportArticlePage({ params }: { params: Params }) {
  const { category: categorySlug, article: articleSlug } = await params;
  const match = getSupportArticle(categorySlug, articleSlug);
  if (!match) notFound();
  const { category, article } = match;

  return (
    <main className="mx-auto flex max-w-[1268px] flex-col px-5 pb-20 sm:px-6 lg:grid lg:grid-cols-[385px_minmax(0,1fr)] lg:gap-x-[45px] lg:pb-[170px]">
      <aside className="order-2 mt-14 lg:order-none lg:mt-0">
        <SupportBackLink href="/support" className="hidden lg:inline-block">Back to home</SupportBackLink>
        <nav aria-label={`${category.title} articles`} className="bg-[#F7F7F7] px-4 py-2 lg:mt-6">
          <ul className="flex flex-col gap-0.5 pt-4">
            {category.articles.map((item) => {
              const isCurrent = item.slug === article.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={supportArticleHref(category.slug, item.slug)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "block rounded-lg border-l-2 border-transparent px-3 py-4 text-lg leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-xenon-brand lg:text-xl",
                      isCurrent ? "font-semibold text-xenon-brand" : "text-[#6B7280] hover:text-xenon-gray",
                    )}
                  >
                    {item.question}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <article className="lg:pt-5">
        <SupportBackLink href={`/support/${category.slug}`}>Back to {category.title.toLowerCase()}</SupportBackLink>
        <h1 className="max-w-[640px] pt-6 font-poppins text-[34px] leading-[1.15] font-medium text-[#1F1A0B] sm:text-5xl lg:pt-[26px] lg:text-[62px] lg:leading-[68px]">
          {article.question}
        </h1>
        <p className="max-w-[768px] pt-8 text-base leading-[1.65] text-xenon-gray lg:pt-14">
          {withSupportEmailLink(article.answer)}
        </p>
        <p className="max-w-[768px] pt-8 text-base leading-[1.65] text-xenon-gray lg:pt-10">
          Still need help?{" "}
          <Link href="/support#contact-support" className="font-semibold text-xenon-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-brand">
            Contact support
          </Link>
        </p>
      </article>
    </main>
  );
}
