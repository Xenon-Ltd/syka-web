import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SupportBackLink from "@/components/support/support-back-link";
import { getSupportCategory, SUPPORT_CATEGORIES, supportArticleHref } from "@/lib/support-content";

type Params = Promise<{ category: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORT_CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const category = getSupportCategory((await params).category);
  if (!category) return {};
  return {
    title: `${category.title} | Support`,
    description: `Answers to common questions about ${category.title.toLowerCase()} with Syka.`,
    alternates: { canonical: `/support/${category.slug}` },
  };
}

export default async function SupportCategoryPage({ params }: { params: Params }) {
  const category = getSupportCategory((await params).category);
  if (!category) notFound();

  return (
    <main className="mx-auto max-w-[1268px] px-5 pb-20 sm:px-6 lg:pb-[260px]">
      <SupportBackLink href="/support">Back to home</SupportBackLink>
      <h1 className="mt-8 text-[34px] leading-[1.2] font-bold text-black lg:mt-10 lg:text-[44px] lg:leading-[52px]">{category.title}</h1>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {category.articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={supportArticleHref(category.slug, article.slug)}
              className="block h-full min-h-[106px] rounded-2xl bg-[#F7F7F7] p-6 text-xl leading-[1.25] font-semibold text-black transition-colors hover:bg-[#EEF0F3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-brand lg:text-2xl"
            >
              {article.question}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
