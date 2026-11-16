import Image from "next/image";
import BusinessAction from "@/components/business/business-action";
import { CareerPhoto } from "@/components/company/shared";
import { Reveal } from "@/components/dropdown-pages/shared";
import styles from "@/components/company/company.module.css";
import { metadataForPage } from "@/lib/page-metadata";

export const metadata = metadataForPage({
  title: "Careers",
  description: "Help make paying across borders clear. Learn how the Syka team works, what we value, and how we hire. There are no open roles at the moment.",
}, "/careers");

const hiringSteps = [
  { title: "Apply", icon: "apply", description: "When a role is open, send your CV and a short note on why you would like to work at Syka using the details in the listing." },
  { title: "Conversation", icon: "conversation", description: "A call with us about you, the role, and what we are building. It is a chance for us to get to know each other." },
  { title: "Assessment", icon: "assessment", description: "A practical exercise related to the role, so you see the work and we see yours." },
  { title: "Decision", icon: "decision", description: "We will share our decision and let you know the outcome within two weeks, whether the answer is yes or no." },
];

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.container} ${styles.row}`} aria-labelledby="careers-heading">
        <div className={styles.careerCopy}>
          <h1 id="careers-heading" className={styles.title}>Work With Us</h1>
          <p className={styles.tagline}>Help make paying across borders clear.</p>
          <BusinessAction href="#open-roles" className={styles.button}>View opportunities</BusinessAction>
        </div>
        <CareerPhoto src="/company/careers-1.jpg" alt="Two colleagues smiling at their laptops in an office" priority />
      </section>

      <Reveal>
        <section className={`${styles.container} ${styles.row} ${styles.reverseRow}`} aria-labelledby="working-heading">
          <CareerPhoto src="/company/careers-2.jpg" alt="Four colleagues gathered around a desk, laughing at a screen" />
          <div className={styles.careerCopy}>
            <h2 id="working-heading" className={styles.title}>How We Work</h2>
            <p>We are open with customers and each other, clear about the reasons behind our decisions, and careful before we ship or move money. As a small team, we trust each other to make decisions and own the outcomes.</p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={`${styles.container} ${styles.row}`} aria-labelledby="people-heading">
          <div className={styles.careerCopy}>
            <h2 id="people-heading" className={styles.title}>Who We Look For</h2>
            <div>
              <p>We value people who raise problems early, while they are small. Spotting risks or mistakes the same day matters more than hiding them.</p>
              <p>In payments, early issues mean quick talks; late ones cause incidents. We appreciate clear communication: explain what you know, what you don’t, and what you need, in plain words. Share your work, ask for and offer help, and treat teammates globally as one team.</p>
              <p>Take ownership, follow problems to the end, and update others. Care about the person behind each payment. Some roles need payments experience, but not all.</p>
            </div>
          </div>
          <CareerPhoto src="/company/careers-3.jpg" alt="Four colleagues reviewing work on a laptop in a server room" />
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.hiring} aria-labelledby="hiring-heading">
          <div className={styles.container}>
            <h2 id="hiring-heading" className={styles.title}>How we hire</h2>
            <p className={`${styles.body} ${styles.hiringIntro}`}>Xenon welcomes applicants of all backgrounds and does not discriminate based on race, gender, age, disability, or any protected status. If you need an adjustment during the process, let us know and we’ll arrange it.</p>
            <ol className={styles.hiringSteps}>
              {hiringSteps.map(({ title, icon, description }) => (
                <li key={title} className={styles.hiringCard}>
                  <Image src={`/company/hiring-${icon}.svg`} alt="" width={32} height={32} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="open-roles" className={`${styles.container} ${styles.roles}`} aria-labelledby="roles-heading">
          <h2 id="roles-heading" className={styles.title}>Open roles</h2>
          <div className={styles.emptyRoles}>
            <h3>No open roles at the moment</h3>
            <p className={styles.body}>Thank you for your interest in joining Syka. We are not hiring right now. Please check back here for future opportunities to help us make paying across borders clear.</p>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
