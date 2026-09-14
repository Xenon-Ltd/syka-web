type PageMetadata = {
  title: string;
  description: string;
};

export const productPageMetadata: Record<string, PageMetadata> = {
  "virtual-account": {
    title: "Virtual Accounts",
    description: "Receive international payments with local account details and settle into your Syka balance.",
  },
  "virtual-card": {
    title: "Virtual Cards",
    description: "Create controllable virtual cards for subscriptions, campaigns, and international spending.",
  },
  invoicing: {
    title: "Invoicing",
    description: "Send professional invoices with international payment details built in.",
  },
  payments: {
    title: "Payments",
    description: "Send cross-border payments to suppliers, contractors, and clients with Syka.",
  },
  "treasury-management": {
    title: "Treasury Management",
    description: "Hold, convert, and manage multi-currency balances with real-time treasury tools.",
  },
};

export const developerPageMetadata: Record<string, PageMetadata> = {
  "api-documentation": {
    title: "API Documentation",
    description: "Build global payment, wallet, payout, and virtual account experiences with Syka APIs.",
  },
};

export function metadataForPage(metadata: PageMetadata) {
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website" as const,
    },
  };
}
