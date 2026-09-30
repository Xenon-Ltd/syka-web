import Link from "next/link";
import type { ReactNode } from "react";

export const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/privacy-policy", title: "Privacy Policy" },
  { label: "Terms of use", href: "/terms-and-conditions", title: "Terms and Conditions" },
  { label: "Cookies", href: "/cookies", title: "Cookies and Tracking Technologies" },
  { label: "Security", href: "/data-security", title: "Data Security" },
] as const;

export type LegalTable = {
  headings: string[];
  rows: string[][];
  /** table: striped grid · definitions: term/definition list · rows: tinted key/value rows · cards: one card per column */
  layout?: "table" | "definitions" | "rows" | "cards";
  /** Zero-based column rendered in the brand colour. */
  highlightColumn?: number;
};

export type LegalSubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LegalTable;
  warning?: boolean;
};

export type LegalSection = {
  title: string;
  /** Render the section title as a subheading rather than a numbered section heading. */
  level?: "sub";
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalSubsection[];
  table?: LegalTable;
  details?: { label: string; value: string }[];
  infoCard?: { label: string; items: { title: string; text: string }[] };
  note?: string;
  footnote?: string;
};

const EMAIL_PATTERN = /([\w.+-]+@[\w-]+\.[\w.]+[a-z])/gi;
const HAS_EMAIL = /[\w.+-]+@[\w-]+\.[a-z]/i;

function withEmailLinks(text: string): ReactNode {
  const parts = text.split(EMAIL_PATTERN);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <a key={`${index}-${part}`} className="legal-link" href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Paragraphs({ items }: { items?: string[] }) {
  return items?.map((paragraph) => <p key={paragraph}>{withEmailLinks(paragraph)}</p>);
}

function Bullets({ items }: { items?: string[] }) {
  if (!items) return null;
  return (
    <ul className="legal-list">
      {items.map((bullet) => <li key={bullet}>{bullet}</li>)}
    </ul>
  );
}

function Table({ table }: { table: LegalTable }) {
  const layout = table.layout ?? "table";

  if (layout === "definitions" || layout === "rows") {
    return (
      <dl className={layout === "rows" ? "legal-rows" : "legal-definitions"}>
        {table.rows.map(([term, definition]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{withEmailLinks(definition)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (layout === "cards") {
    return (
      <div className="legal-cards">
        {table.headings.map((heading, columnIndex) => (
          <div className="legal-card" key={heading}>
            <p className="legal-card-label">{heading}</p>
            {table.rows.map((row) =>
              row[columnIndex].split(" · ").map((line) => (
                <p key={line} className={HAS_EMAIL.test(line) ? "legal-card-line has-email" : "legal-card-line"}>
                  {withEmailLinks(line)}
                </p>
              )),
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead><tr>{table.headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`} className={cellIndex === table.highlightColumn ? "is-highlight" : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LegalPage({
  title,
  intro,
  notice,
  closing,
  updated,
  sections,
  flat = false,
}: {
  title: string;
  intro: string;
  notice?: string;
  closing?: string;
  updated?: string;
  sections: LegalSection[];
  /** Pages whose sections are all numbered sub-clauses (e.g. "8.1 …") render them as subheadings. */
  flat?: boolean;
}) {
  const current = LEGAL_PAGES.find((page) => page.title === title);

  return (
    <main className={flat ? "legal-page is-flat" : "legal-page"}>
      <aside className="legal-sidebar" aria-label="Legal pages">
        <nav>
          {LEGAL_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              aria-current={page.href === current?.href ? "page" : undefined}
              className={page.href === current?.href ? "legal-nav-link is-active" : "legal-nav-link"}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </aside>

      <article className="legal-content">
        <header className="legal-heading">
          <h1>{title}</h1>
          {updated && <p className="legal-updated">{updated}</p>}
        </header>

        <div className="legal-body">
          <div className="legal-intro">
            <p>{intro}</p>
            {notice && <p>{notice}</p>}
            {closing && <p>{closing}</p>}
          </div>

          {sections.map((section) => (
            <section
              className={flat || section.level === "sub" ? "legal-section is-sub" : "legal-section"}
              key={section.title}
            >
              <h2>{section.title}</h2>
              <Paragraphs items={section.paragraphs} />
              <Bullets items={section.bullets} />
              {section.subsections?.map((subsection) => (
                <div className="legal-subsection" key={subsection.title}>
                  <h3>{subsection.title}</h3>
                  {subsection.warning ? (
                    <div className="legal-warning">
                      <Paragraphs items={subsection.paragraphs} />
                    </div>
                  ) : (
                    <Paragraphs items={subsection.paragraphs} />
                  )}
                  <Bullets items={subsection.bullets} />
                  {subsection.table && <Table table={subsection.table} />}
                </div>
              ))}
              {section.table && <Table table={section.table} />}
              {section.details && (
                <dl className="legal-details">
                  {section.details.map((detail) => (
                    <div key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {section.infoCard && (
                <div className="legal-info-card">
                  <p className="legal-card-label">{section.infoCard.label}</p>
                  <ul className="legal-offices">
                    {section.infoCard.items.map((item) => (
                      <li key={item.title}>
                        <p className="legal-office-name">{item.title}</p>
                        <p className="legal-office-address">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {section.note && <p className="legal-note">{withEmailLinks(section.note)}</p>}
              {section.footnote && <p className="legal-footnote">{section.footnote}</p>}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
