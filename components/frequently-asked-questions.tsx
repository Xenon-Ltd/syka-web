import { businessStyles } from "@/lib/business-styles";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type FAQItem = { question: string; answer: string };

// Only the answer visible in the supplied design is populated; remaining copy is pending.
const accountQuestions: FAQItem[] = [
  {
    question: "Is this a real bank account?",
    answer: "",
  },
  {
    question: "How long does it take to open an account?",
    answer: "Most verified businesses are approved and issued account details within two working days.",
  },
  {
    question: "Can I receive payments in more than one currency?",
    answer: "",
  },
  {
    question: "What happens to the money once it arrives?",
    answer: "",
  },
  {
    question: "Do my clients need to do anything unusual to pay me?",
    answer: "",
  },
];

type FrequentlyAskedQuestionsProps = {
  variant?: "personal" | "business";
  items?: FAQItem[];
};

export default function FrequentlyAskedQuestions({ variant = "personal", items }: FrequentlyAskedQuestionsProps) {
  const headingId = `${variant}-faq-heading`;
  const questions = items ?? accountQuestions;
  return (
    <section id="faq" aria-labelledby={headingId} className={cn(businessStyles.sectionSpacing, "mx-auto max-w-[1268px] scroll-mt-8 px-5 sm:px-6")}>
      <h2 id={headingId} className={"faq-title text-xenon-gray"}>
        Frequently Asked<br />Questions
      </h2>
      <div className="mt-10 space-y-6">
        {questions.map(({ question, answer }, index) => (
          <details key={question} name={`${variant}-faq`} open={index === 1} className="group rounded-lg bg-[#fcfbf1] px-5 text-xenon-primary sm:px-8 lg:px-10">
            <summary className={"faq-question cursor-pointer list-none marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-primary [&::-webkit-details-marker]:hidden"}>
              {question}
              <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current">
                <Plus className="size-4 transition-transform group-open:rotate-45 motion-reduce:transition-none" strokeWidth={1.4} />
              </span>
            </summary>
            {answer && <p className={"faq-answer"}>{answer}</p>}
          </details>
        ))}
      </div>
    </section>
  );
}
