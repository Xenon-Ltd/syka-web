import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqLayout, { withSupportEmailLink } from "@/components/support/faq-layout";
import { CONTACT_SUPPORT_HREF, getSupportCategory, SUPPORT_CATEGORIES, supportArticleHref } from "@/lib/support-content";

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
    <FaqLayout
      variant="topic"
      navLabel="Support topics"
      navItems={SUPPORT_CATEGORIES.map(({ slug, title }) => ({ label: title, href: `/support/${slug}`, active: slug === category.slug }))}
      breadcrumbs={[{ label: "Support", href: "/support" }]}
      title={category.title}
    >
      <div className="legal-intro">
        <p>
          {category.articles.length} answers about {category.title.toLowerCase()} with Syka. Select a question to open it on its own page.
        </p>
      </div>

      {category.articles.map((article) => (
        <section key={article.slug} className="legal-section is-sub faq-entry">
          <h2>
            <Link href={supportArticleHref(category.slug, article.slug)}>{article.question}</Link>
          </h2>
          <p>{withSupportEmailLink(article.answer)}</p>
        </section>
      ))}

      <section className="legal-section is-sub faq-help">
        <h2>Still need help?</h2>
        <p>
          <Link href={CONTACT_SUPPORT_HREF} className="legal-link">
            Contact support
          </Link>{" "}
          and our team will get back to you.
        </p>
      </section>
    </FaqLayout>
  );
}
