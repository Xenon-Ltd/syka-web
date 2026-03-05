import type { ComponentType } from "react";
import InvoicingPage from "@/components/dropdown-pages/invoicing";
import PaymentsPage from "@/components/dropdown-pages/payments";
import TreasuryManagementPage from "@/components/dropdown-pages/treasury-management";
import VirtualAccountPage from "@/components/dropdown-pages/virtual-account";
import VirtualCardPage from "@/components/dropdown-pages/virtual-card";

export const PRODUCT_SLUGS = [
  "virtual-account",
  "virtual-card",
  "invoicing",
  "payments",
  "treasury-management",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export type ProductItem = {
  label: string;
  slug: ProductSlug;
};

export const PRODUCT_ITEMS: ProductItem[] = [
  { label: "Virtual Accounts", slug: "virtual-account" },
  { label: "Virtual Cards", slug: "virtual-card" },
  { label: "Invoicing", slug: "invoicing" },
  { label: "Payments", slug: "payments" },
  { label: "Treasury Management", slug: "treasury-management" },
];

export const PRODUCT_COMPONENTS: Record<ProductSlug, ComponentType> = {
  "virtual-account": VirtualAccountPage,
  "virtual-card": VirtualCardPage,
  invoicing: InvoicingPage,
  payments: PaymentsPage,
  "treasury-management": TreasuryManagementPage,
};

export function parseProductSlug(
  value: string | string[] | undefined,
): ProductSlug | null {
  if (typeof value !== "string") {
    return null;
  }

  return PRODUCT_SLUGS.includes(value as ProductSlug)
    ? (value as ProductSlug)
    : null;
}

