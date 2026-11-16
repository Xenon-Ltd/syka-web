import Image from "next/image";
import BusinessAction from "@/components/business/business-action";
import FrequentlyAskedQuestions from "@/components/frequently-asked-questions";
import { businessLinks } from "@/lib/business-links";
import { cardFaqItems } from "@/lib/card-faq";
import styles from "./company.module.css";

export function DemoButton() {
  return <BusinessAction href={businessLinks.sales} className={styles.button}>Book a demo</BusinessAction>;
}

export function CompanyFAQ() {
  return (
    <div className={styles.faq}>
      <FrequentlyAskedQuestions variant="business" items={cardFaqItems} appearance="product" />
    </div>
  );
}

export function CareerPhoto({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className={styles.careerPhoto}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 608px, (min-width: 1024px) 50vw, 100vw" priority={priority} />
    </div>
  );
}
