import Image from "next/image";
import { GH, NG, GB, US, MORE } from "@/assets/icons/countries";
import Header from "@/components/layout/header";
import HeroGlobe from "@/components/business/hero-globe";
import { CompanyFAQ, DemoButton } from "@/components/company/shared";
import { Reveal } from "@/components/dropdown-pages/shared";
import styles from "@/components/company/company.module.css";
import { supportedCountries } from "@/lib/countries";
import { metadataForPage } from "@/lib/page-metadata";

export const metadata = metadataForPage({
  title: "Coverage",
  description: "Explore Syka’s supported countries and currencies, and speak to our team about the payment corridors your business needs.",
}, "/coverage");

const flags = [
  { image: GH, name: "Ghana" }, { image: NG, name: "Nigeria" },
  { image: GB, name: "United Kingdom" }, { image: US, name: "United States" },
  { image: MORE, name: "and more countries" },
];

// The existing site list is approved coverage data. It does not classify
// live versus on-request rails; do not infer those statuses from Figma's
// repeated placeholder tables. Keep enquiries separate until that split exists.
const countries = [...supportedCountries].sort((a, b) => a.name.localeCompare(b.name));

export default function CoveragePage() {
  return (
    <main className={`${styles.page} ${styles.coveragePage}`}>
      <section className={styles.coverageHero} aria-labelledby="coverage-heading">
        <div className={styles.heroArtwork} aria-hidden="true">
          <div className={styles.coverageGlobe}>
            <HeroGlobe framing="full" className="h-full" />
          </div>
        </div>
        <Header tone="dark" />
        <div className={`${styles.container} ${styles.heroCopy}`}>
          <div className={styles.socialProof}>
            <div className={styles.flags}>{flags.map(({ image, name }) => <Image key={name} src={image} alt={name} width={36} height={36} />)}</div>
            <p>Over 3000 businesses in 7 countries use SYKA</p>
          </div>
          <h1 id="coverage-heading">Global reach.<br />Local payments.<br />With Syka.</h1>
          <p>Receive USD through ACH, Fedwire, and SWIFT virtual accounts with Syka. Pay locally in 80+ currencies, explore emerging markets on request, and use USD SWIFT delivery for destinations beyond local coverage.</p>
        </div>
      </section>

      <div className={`${styles.container} ${styles.coverageBody}`}>
        <Reveal>
          <section className={styles.coverageRow} aria-labelledby="corridors-heading">
            <div className={styles.coverageIntro}>
              <h2 id="corridors-heading">Supported corridors <sup aria-label={`${countries.length} country and region entries`}>{countries.length}</sup></h2>
              <p>Explore the countries, regions, and currencies supported by Syka. Availability depends on your account, payment route, and compliance review.</p>
              <DemoButton />
            </div>
            <ul className={styles.countryGrid}>
              {countries.map(({ code, name, currency, icon }) => (
                <li key={code} className={styles.countryCard}>
                  <Image src={icon} alt="" width={40} height={40} />
                  <h3>{name}</h3>
                  <p>{currency}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.coverageRow} aria-labelledby="request-heading">
            <div className={styles.coverageIntro}>
              <h2 id="request-heading">On-request</h2>
              <p>Talk to our team about the countries, currencies, and payment volumes your business needs.</p>
              <DemoButton />
            </div>
            <div className={styles.requestPanel}>
              <h3>Need a different payment corridor?</h3>
              <p className={styles.body}>Tell us where you need to send or receive payments, the currencies involved, and your expected payment volumes. Our team can discuss the available options and requirements for your business.</p>
              <p className={styles.body}>Book a demo to review your payment routes with us before planning your next market.</p>
            </div>
          </section>
        </Reveal>
      </div>
      <CompanyFAQ />
    </main>
  );
}
