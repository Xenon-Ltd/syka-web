"use client";

import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import styles from "./pricing-comparison.module.css";

import { useRef } from "react";
import BusinessAction from "./business-action";
import { businessLinks } from "@/lib/business-links";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  IN_VIEW_OPTS,
  EASE_OUT,
} from "@/lib/animation";

type PricingRow = {
  label: string;
  poweredBySyka: string;
  whiteLabel: string;
};

const rows: PricingRow[] = [
  {
    label: "Monthly subscription",
    poweredBySyka: "$1,200/month",
    whiteLabel: "$3,500/month",
  },
  {
    label: "Setup fee",
    poweredBySyka: "None",
    whiteLabel: "$5,000 one-time",
  },
  {
    label: "Transaction fee (Syka's cut)",
    poweredBySyka: "0.95% of transaction value",
    whiteLabel: "0.95% of transaction value",
  },
  {
    label: "Your markup",
    poweredBySyka: "You set it. You keep it.",
    whiteLabel: "You set it. You keep it.",
  },
  {
    label: "Merchant accounts",
    poweredBySyka: "Unlimited",
    whiteLabel: "Unlimited",
  },
  {
    label: "KYC/AML infrastructure",
    poweredBySyka: "Included",
    whiteLabel: "Included",
  },
  {
    label: "Support",
    poweredBySyka: "Standard",
    whiteLabel: "Dedicated account manager",
  },
];

export default function PricingComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, IN_VIEW_OPTS);

  return (
    <section
      ref={ref}
      aria-labelledby="pricing-heading"
      className={cn(businessStyles.sectionSpacing, "pricing-section bg-xenon-primary px-5 text-white sm:px-6")}
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-[720px] text-center"
        >
          <motion.p
            variants={fadeUp}
            className={cn(businessStyles.eyebrow, "text-white/50")}
          >
            Pricing
          </motion.p>
          <motion.h2
            id="pricing-heading"
            variants={fadeUp}
            className={cn(businessStyles.sectionHeading, "mt-3 lg:mt-5")}
          >
            Transparent pricing
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className={cn(businessStyles.body, "mx-auto mt-4 max-w-[600px] text-white/95 lg:mt-6")}
          >
            Pay a fixed monthly subscription for platform access. Transaction
            fees are deducted from the transaction value, and your institution
            keeps 100% of any markup you charge your clients.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
          className="mx-auto mt-16 max-w-[999px] xl:mt-[87px]"
        >
          <div
            role="region"
            aria-label="Pricing comparison"
            tabIndex={0}
            className={cn(styles.scrollRegion, "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white")}
          >
            <table className={cn(styles.table, "text-base leading-[20.8px] tracking-[-0.32px]")}>
              <caption className="sr-only">
                Compare Powered by Syka and White-Label pricing and features
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className={businessStyles.compactHeading}>
                    Powered by Syka
                  </th>
                  <th scope="col" className={cn(businessStyles.compactHeading, styles.featured)}>
                    White-Label
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">
                      {row.label}
                    </th>
                    <td>
                      {row.poweredBySyka}
                    </td>
                    <td className={styles.featured}>
                      {row.whiteLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td>
                    <BusinessAction
                      href={businessLinks.sales}
                      aria-label="Contact Sales about Powered by Syka"
                      className={cn(businessStyles.button, "max-w-full bg-xenon-brand text-white transition-colors hover:bg-xenon-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white")}
                    >
                      Contact Sales
                    </BusinessAction>
                  </td>
                  <td className={styles.featured}>
                    <BusinessAction
                      href={businessLinks.sales}
                      aria-label="Contact Sales about White-Label"
                      className={cn(businessStyles.button, "max-w-full bg-xenon-brand text-white transition-colors hover:bg-xenon-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-brand")}
                    >
                      Contact Sales
                    </BusinessAction>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
