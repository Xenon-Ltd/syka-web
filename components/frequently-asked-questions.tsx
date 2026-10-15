import { FaqArrowIcon } from "@/assets/icons";
import { businessStyles } from "@/lib/business-styles";
import { SUPPORT_SEARCH_INDEX } from "@/lib/support-content";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FAQItem = { question: string; answer: string };

// Personal transfers: a selection from the support FAQ; the full set lives at /support.
const personalQuestionSlugs = [
  "what-is-syka",
  "which-countries-and-currencies-can-i-use",
  "does-my-recipient-need-a-syka-account",
  "how-much-does-it-cost",
  "how-long-will-it-take",
  "is-my-money-safe",
];
const personalQuestions: FAQItem[] = personalQuestionSlugs.flatMap((slug) =>
  SUPPORT_SEARCH_INDEX.filter((entry) => entry.slug === slug).map(({ question, answer }) => ({ question, answer })),
);

const businessQuestions: FAQItem[] = [
  {
    question: "Is this a real bank account?",
    answer: "It functions as one for receiving purposes — your business is issued genuine account details in its own name, held through our regulated banking partners.",
  },
  {
    question: "How long does it take to open an account?",
    answer: "Most verified businesses are approved and issued account details within two working days.",
  },
  {
    question: "Can I receive payments in more than one currency?",
    answer: "Yes. Enable US dollar, British pound, and euro accounts individually, each with its own dedicated details.",
  },
  {
    question: "What happens to the money once it arrives?",
    answer: "It lands in your Syka balance, where you can hold it, convert it to another currency, or pay it out.",
  },
  {
    question: "Do my clients need to do anything unusual to pay me?",
    answer: "No. From their side, it is an ordinary domestic payment to a local account.",
  },
];

type FrequentlyAskedQuestionsProps = {
  variant?: "personal" | "business";
  items?: FAQItem[];
  /** "product": the product-page design — circled arrow toggle, roomier cards. */
  appearance?: "default" | "product";
};

export default function FrequentlyAskedQuestions({ variant = "personal", items, appearance = "default" }: FrequentlyAskedQuestionsProps) {
  const isProduct = appearance === "product";
  const headingId = `${variant}-faq-heading`;
  // A question without an answer would open onto nothing, so it stays hidden until its copy is supplied.
  const questions = (items ?? (variant === "personal" ? personalQuestions : businessQuestions)).filter(({ answer }) => answer);
  return (
    <section id="faq" aria-labelledby={headingId} className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] scroll-mt-8 px-5 sm:px-6")}>
      <h2 id={headingId} className={"faq-title text-xenon-gray"}>
        Frequently Asked<br />Questions
      </h2>
      <div className={cn("mt-10", isProduct ? "space-y-4" : "space-y-6")}>
        {questions.map(({ question, answer }, index) => (
          <details key={question} name={`${variant}-faq`} open={index === 1} className={cn("group bg-[#fcfbf1] px-5 text-xenon-primary sm:px-8", isProduct ? "rounded-2xl lg:px-[60px]" : "rounded-lg lg:px-10")}>
            <summary className={"faq-question cursor-pointer list-none marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-primary [&::-webkit-details-marker]:hidden"}>
              {question}
              {isProduct ? (
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-current lg:size-10">
                  <Image src={FaqArrowIcon} alt="" className="rotate-90 transition-transform group-open:-rotate-90 motion-reduce:transition-none" />
                </span>
              ) : (
                <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current">
                  <Plus className="size-4 transition-transform group-open:rotate-45 motion-reduce:transition-none" strokeWidth={1.4} />
                </span>
              )}
            </summary>
            <p className={"faq-answer"}>{answer}</p>
          </details>
        ))}
      </div>
      {variant === "personal" && (
        <Link href="/support" className="mt-8 inline-block text-lg font-semibold text-xenon-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-primary">
          See all questions
        </Link>
      )}
    </section>
  );
}
