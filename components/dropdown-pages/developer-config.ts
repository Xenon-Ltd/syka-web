import type { ComponentType } from "react";
import ApiDocumentationPage from "@/components/dropdown-pages/api-documentation";

export const DEVELOPER_SLUGS = ["api-documentation"] as const;

export type DeveloperSlug = (typeof DEVELOPER_SLUGS)[number];

export type DeveloperItem = {
  label: string;
  slug: DeveloperSlug;
};

export const DEVELOPER_ITEMS: DeveloperItem[] = [
  { label: "API Documentation", slug: "api-documentation" },
];

export const DEVELOPER_COMPONENTS: Record<DeveloperSlug, ComponentType> = {
  "api-documentation": ApiDocumentationPage,
};

export function parseDeveloperSlug(
  value: string | string[] | undefined,
): DeveloperSlug | null {
  if (typeof value !== "string") {
    return null;
  }

  return DEVELOPER_SLUGS.includes(value as DeveloperSlug)
    ? (value as DeveloperSlug)
    : null;
}
