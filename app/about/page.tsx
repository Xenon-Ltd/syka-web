import Image from "next/image";
import Link from "next/link";
import { CompanyFAQ, DemoButton } from "@/components/company/shared";
import { Reveal } from "@/components/dropdown-pages/shared";
import styles from "@/components/company/company.module.css";
import { metadataForPage } from "@/lib/page-metadata";

export const metadata = metadataForPage({
  title: "About Us",
  description: "Meet Syka: cross-border payments built around how Africa pays. Learn how we help people and businesses pay the world and get paid by it.",
}, "/about");

const useCases = [
  { title: "School and university fees", description: "Enter the invoice amount, attach the fee notice, and pay by mobile money or bank transfer. Keep the student and invoice details with the payment.", href: "/#tuition-heading" },
  { title: "Support family abroad", description: "See the recipient amount and fee before you pay. Send money in your local currency, and your family receives it in theirs.", href: "/?product=payments" },
  { title: "Pay hospital bills abroad fast", description: "Attach the hospital bill when making your payment, so the information needed for payment clearance is included from the start.", href: "/?product=payments" },
  { title: "Paying foreign suppliers", description: "Attach the invoice or purchase order from the start. Pay in your local currency while your supplier receives payment in theirs.", href: "/business?product=payments" },
  { title: "Pay overseas providers and contractors", description: "Pay one clear fee and keep a record of the payment and its purpose to share with your accountant. No foreign-currency account needed.", href: "/business?product=payments" },
  { title: "Goods and purchases", description: "Attach the invoice or receipt, pay in your local currency, and let the seller receive payment in theirs.", href: "/?product=payments" },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.container} ${styles.intro}`} aria-labelledby="about-heading">
        <div>
          <h1 id="about-heading" className={styles.title}>Payments <span>across borders</span>, built around how Africa pays.</h1>
          <DemoButton />
        </div>
        <div className={styles.body}>
          <p>Syka helps people and businesses in Africa pay the world and get paid by it, without guessing what arrives. You pay in your own currency. Your recipient is paid in theirs, straight into their bank account. One clear fee, shown before you confirm.</p>
          <p>Sending money out of Africa is slow, opaque, and often held up. Fees appear late, exchange rates are unclear, and payments get stuck when a bank asks for an invoice or a reason nobody attached. We built Syka to remove those surprises, for a parent paying school fees abroad as much as for a business paying a supplier.</p>
        </div>
      </section>

      <div className={`${styles.container} ${styles.banner}`}>
        <Image src="/company/about-banner.jpg" alt="Two colleagues in suits smiling at a phone outside an office" fill sizes="(min-width: 1280px) 1220px, 100vw" priority />
      </div>

      <Reveal>
        <section className={styles.explanation} aria-labelledby="how-syka-works-heading">
          <div className={styles.container}>
            <h2 id="how-syka-works-heading" className={styles.title}>Pay and get paid easily, wherever you live.</h2>
            <div className={styles.explanationRow}>
              <div className={styles.mediaSlot}>
                <Image src="/company/about-building.jpg" alt="The columned front of a large stone building" fill sizes="(min-width: 1024px) 604px, 100vw" />
              </div>
              <div className={styles.body}>
                <p>We enable payments in local currency, allowing customers to pay by mobile money or bank transfer from Ghana, Nigeria, Kenya, Uganda, Tanzania, and Cameroon. Recipients are then paid in more than 80 countries. We handle settlement behind the scenes, so customers do not need to convert or hold crypto.</p>
                <p>We prioritize clarity by showing the recipient amount and our fee before a payment is made. Every payment carries its purpose and, for business payments, the invoice behind it. We verify customers and recipients, screen payments, and keep a useful record. Our payment services are delivered in partnership with licensed and regulated institutions across several jurisdictions.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={`${styles.container} ${styles.row} ${styles.backing}`} aria-labelledby="backing-heading">
          <div>
            <h2 id="backing-heading" className={styles.title}>Who we’re backed by</h2>
            <p className={styles.body}>Syka is a product of Xenon Technologies Inc. and its affiliates, Xenon Technology Solutions (Canada) Inc. and Xenon Limited (Ghana).</p>
          </div>
          <div className={styles.xenonPanel}>
            <div className={styles.xenonCrop}>
              <Image src="/company/xenon-logo.png" alt="Xenon" width={1001} height={1000} sizes="(min-width: 1024px) 734px, 100vw" className={styles.xenonLogo} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={`${styles.container} ${styles.useCases}`} aria-labelledby="use-cases-heading">
          <h2 id="use-cases-heading" className={styles.title}>Ways to use it</h2>
          <p className={styles.body}>From school fees and family support to supplier invoices and team payments, Syka brings clarity to the payments that matter.</p>
          <div className={styles.cards}>
            {useCases.map(({ title, description, href }) => (
              <article key={title} className={styles.useCard}>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={href} aria-label={`Learn more: ${title}`} className={styles.cardLink}><Image src="/company/use-case-arrow.svg" alt="" width={16.125} height={16.125} className="-rotate-45" /></Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <CompanyFAQ />
    </main>
  );
}
