// Copy from the approved "Syka Support — Frequently asked questions" document.
// Categories and articles are addressed by slug: /support/[category]/[article].

export const SUPPORT_EMAIL = "support@sykabank.com";

export type SupportArticle = {
  slug: string;
  question: string;
  answer: string;
};

export type SupportCategory = {
  slug: string;
  title: string;
  articles: SupportArticle[];
};

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    articles: [
      {
        slug: "what-is-syka",
        question: "What is Syka?",
        answer:
          "Syka lets you send money across borders. You pay in your local currency and your recipient receives theirs. Every payment is verified and screened, and you see the exact amount your recipient will get before you confirm.",
      },
      {
        slug: "which-countries-and-currencies-can-i-use",
        question: "Which countries and currencies can I use right now?",
        answer:
          "You can pay in Ghanaian cedi (GHS), Nigerian naira (NGN), Kenyan shilling (KES), Ugandan shilling (UGX) or Tanzanian shilling (TZS), and send to accounts in over 80 countries. More currencies and destinations are being added, and we will announce each one.",
      },
      {
        slug: "does-my-recipient-need-a-syka-account",
        question: "Does my recipient need a Syka account?",
        answer:
          "No. Your recipient receives the money in their bank account and does not need to sign up for anything.",
      },
    ],
  },
  {
    slug: "verification",
    title: "Verification",
    articles: [
      {
        slug: "why-do-i-need-to-verify-my-identity",
        question: "Why do I need to verify my identity?",
        answer:
          "Verification is a legal requirement for payment providers, and it protects you and everyone else on the platform from fraud. You cannot send money until it is complete.",
      },
      {
        slug: "what-do-i-need-to-verify",
        question: "What do I need to verify?",
        answer:
          "A valid government-issued ID and some basic personal details. We may ask for more information if your payment is large or if our checks require it.",
      },
      {
        slug: "what-if-my-verification-is-declined",
        question: "What if my verification is declined?",
        answer:
          "We will tell you what we can. Legal obligations sometimes limit how much detail we are able to share. You can contact support to ask what the next steps are.",
      },
    ],
  },
  {
    slug: "sending-money",
    title: "Sending money",
    articles: [
      {
        slug: "how-do-i-send-money",
        question: "How do I send money?",
        answer:
          "Choose the amount and currency, enter your recipient's bank details, state the reason for the payment, review the exact amount your recipient will receive, and confirm.",
      },
      {
        slug: "what-can-i-send-money-for",
        question: "What can I send money for?",
        answer:
          "Personal payments only: supporting family members abroad, school and university fees, medical expenses, relocation or travel costs, moving your own savings, and personal purchases from an individual or small seller. Business payments, such as supplier invoices, go through our business channel and not through personal transfers.",
      },
      {
        slug: "why-do-you-ask-for-the-reason-for-my-payment",
        question: "Why do you ask for the reason for my payment?",
        answer:
          "We are required by law to record the purpose of every cross-border payment, and it helps us spot fraud. Please give an accurate reason, because a wrong one can delay or block your payment.",
      },
      {
        slug: "how-much-does-it-cost",
        question: "How much does it cost?",
        answer:
          "The fee and the exact amount your recipient receives are shown before you confirm. There are no hidden charges.",
      },
      {
        slug: "how-long-will-it-take",
        question: "How long will it take?",
        answer:
          "We aim to deliver within minutes, but timing depends on your payment method, the destination bank and any compliance review. An estimate is shown before you confirm.",
      },
      {
        slug: "is-there-a-limit-on-how-much-i-can-send",
        question: "Is there a limit on how much I can send?",
        answer:
          "Yes. Your limit depends on your verification level and is shown in your account. It can be raised by completing additional verification.",
      },
    ],
  },
  {
    slug: "if-something-goes-wrong",
    title: "If something goes wrong",
    articles: [
      {
        slug: "my-payment-is-still-processing",
        question: "My payment is still processing. Why?",
        answer:
          "Some payments are held briefly for a routine compliance check, and most are released within one business day. If yours is delayed beyond the estimate shown, contact support with your payment reference.",
      },
      {
        slug: "i-entered-the-wrong-recipient-details",
        question: "I entered the wrong recipient details. What should I do?",
        answer:
          "Contact support immediately. If the payment has not yet been paid out, we will try to stop or correct it. Once the recipient has the money, recovery depends on the receiving bank and the recipient.",
      },
      {
        slug: "can-i-cancel-a-payment",
        question: "Can I cancel a payment?",
        answer: "Usually only before it has been paid out. Once it reaches your recipient, it cannot be reversed.",
      },
      {
        slug: "what-happens-if-my-payment-fails",
        question: "What happens if my payment fails?",
        answer:
          "If your money was taken but the recipient was not paid, contact support with your payment reference. We will investigate and either complete the payment or return your money.",
      },
      {
        slug: "why-was-my-payment-blocked",
        question: "Why was my payment blocked?",
        answer:
          "Payments can be stopped for security or legal reasons. We cannot always give the specific reason, but we will tell you what we can and what happens next.",
      },
    ],
  },
  {
    slug: "safety-and-support",
    title: "Safety and support",
    articles: [
      {
        slug: "is-my-money-safe",
        question: "Is my money safe?",
        answer:
          "We work with regulated partners to collect and pay out funds, verify every customer, and screen every transaction against sanctions lists.",
      },
      {
        slug: "how-do-i-avoid-scams",
        question: "How do I avoid scams?",
        answer:
          "Syka will never ask for your password, PIN or one-time codes. Only send money to people you know and trust, and never to someone you have met only online who is pressuring you to pay.",
      },
      {
        slug: "how-do-i-contact-support",
        question: "How do I contact support?",
        answer: `Use the Help section in the app or email ${SUPPORT_EMAIL}. Please include your payment reference so we can respond faster.`,
      },
    ],
  },
];

export type SupportSearchEntry = SupportArticle & { categorySlug: string; categoryTitle: string; href: string };

export const supportArticleHref = (categorySlug: string, articleSlug: string) => `/support/${categorySlug}/${articleSlug}`;

export const SUPPORT_SEARCH_INDEX: SupportSearchEntry[] = SUPPORT_CATEGORIES.flatMap((category) =>
  category.articles.map((article) => ({
    ...article,
    categorySlug: category.slug,
    categoryTitle: category.title,
    href: supportArticleHref(category.slug, article.slug),
  })),
);

export function getSupportCategory(slug: string) {
  return SUPPORT_CATEGORIES.find((category) => category.slug === slug);
}

export function getSupportArticle(categorySlug: string, articleSlug: string) {
  const category = getSupportCategory(categorySlug);
  const article = category?.articles.find((item) => item.slug === articleSlug);
  return category && article ? { category, article } : undefined;
}
