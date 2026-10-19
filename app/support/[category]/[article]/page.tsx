import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqLayout, { withSupportEmailLink } from "@/components/support/faq-layout";
import { CONTACT_SUPPORT_HREF, getSupportArticle, SUPPORT_CATEGORIES, supportArticleHref } from "@/lib/support-content";

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

export default async function SupportArticlePage({ params }: { params: Params }) {
  const { category: categorySlug, article: articleSlug } = await params;
  const match = getSupportArticle(categorySlug, articleSlug);
  if (!match) notFound();
  const { category, article } = match;
  const index = category.articles.findIndex((item) => item.slug === article.slug);
  const previous = category.articles[index - 1];
  const next = category.articles[index + 1];

  return (
    <FaqLayout
      variant="article"
      navLabel={`${category.title} articles`}
      navItems={category.articles.map((item) => ({
        label: item.question,
        href: supportArticleHref(category.slug, item.slug),
        active: item.slug === article.slug,
      }))}
      breadcrumbs={[
        { label: "Support", href: "/support" },
        { label: category.title, href: `/support/${category.slug}` },
      ]}
      title={article.question}
    >
      <div className="legal-intro">
        <p>{withSupportEmailLink(article.answer)}</p>
      </div>

      <section className="legal-section is-sub faq-help">
        <h2>Still need help?</h2>
        <p>
          <Link href={CONTACT_SUPPORT_HREF} className="legal-link">
            Contact support
          </Link>{" "}
          and our team will get back to you.
        </p>
      </section>

      {(previous || next) && (
        <nav aria-label="More in this topic" className="faq-pager">
          {previous ? (
            <Link href={supportArticleHref(category.slug, previous.slug)} rel="prev">
              <span>Previous</span>
              {previous.question}
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next && (
            <Link href={supportArticleHref(category.slug, next.slug)} rel="next" className="is-next">
              <span>Next</span>
              {next.question}
            </Link>
          )}
        </nav>
      )}
    </FaqLayout>
  );
}
