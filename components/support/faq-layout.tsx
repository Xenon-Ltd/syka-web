import Link from "next/link";
import type { ReactNode } from "react";
import { SUPPORT_EMAIL } from "@/lib/support-content";

type NavItem = { label: string; href: string; active?: boolean };

/**
 * Support FAQ pages share the legal pages' structure and styles
 * (app/legal-pages.css): a sticky sidebar of sibling pages beside the article.
 */
export default function FaqLayout({
  navLabel,
  navItems,
  breadcrumbs,
  title,
  variant,
  children,
}: {
  navLabel: string;
  navItems: NavItem[];
  breadcrumbs: { label: string; href: string }[];
  title: string;
  /** "article" lists long questions in the sidebar, so it stacks below the answer on phones. */
  variant: "topic" | "article";
  children: ReactNode;
}) {
  return (
    <main className={`legal-page faq-page is-${variant}`}>
      <aside className="legal-sidebar" aria-label={navLabel}>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={item.active ? "legal-nav-link is-active" : "legal-nav-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <article className="legal-content">
        <header className="legal-heading">
          <nav aria-label="Breadcrumb" className="faq-breadcrumb">
            <ol>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.href}>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
          <h1>{title}</h1>
        </header>

        <div className="legal-body">{children}</div>
      </article>
    </main>
  );
}

/** Turns the support address in answer copy into a mail link. */
export function withSupportEmailLink(text: string) {
  const [before, after] = text.split(SUPPORT_EMAIL);
  if (after === undefined) return text;
  return (
    <>
      {before}
      <a href={`mailto:${SUPPORT_EMAIL}`} className="legal-link">
        {SUPPORT_EMAIL}
      </a>
      {after}
    </>
  );
}
