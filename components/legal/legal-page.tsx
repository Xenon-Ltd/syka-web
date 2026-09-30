import Link from "next/link";

export const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/privacy-policy", title: "Privacy Policy" },
  { label: "Terms of use", href: "/terms-and-conditions", title: "Terms and Conditions" },
  { label: "Cookies", href: "/cookies", title: "Cookies and Tracking Technologies" },
  { label: "Security", href: "/data-security", title: "Data Security" },
] as const;

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    table?: { headings: string[]; rows: string[][] };
  }[];
  table?: { headings: string[]; rows: string[][] };
  note?: string;
};

export default function LegalPage({
  title,
  intro,
  notice,
  closing,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  notice?: string;
  closing?: string;
  updated?: string;
  sections: LegalSection[];
}) {
  const current = LEGAL_PAGES.find((page) => page.title === title);

  return (
    <main className="legal-page">
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
          <p className="legal-intro">{intro}</p>
          {notice && <p className="legal-warning">{notice}</p>}
          {closing && <p className="legal-closing">{closing}</p>}
        </header>

        <div className="legal-sections">
          {sections.map((section, index) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.subsections?.map((subsection) => (
                <div className="legal-subsection" key={subsection.title}>
                  <h3>{subsection.title}</h3>
                  {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {subsection.bullets && (
                    <ul>{subsection.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  )}
                  {subsection.table && (
                    <div className="legal-table-wrap">
                      <table className="legal-table">
                        <thead><tr>{subsection.table.headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
                        <tbody>
                          {subsection.table.rows.map((row) => (
                            <tr key={row.join("|")}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
              {section.table && (
                <div className="legal-table-wrap">
                  <table className="legal-table">
                    <thead><tr>{section.table.headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.note && <p className="legal-note">{section.note}</p>}
              {index < sections.length - 1 && <span className="legal-section-rule" aria-hidden="true" />}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
