"use client";

import { CONTACT_SUPPORT_HREF, SUPPORT_SEARCH_INDEX, type SupportSearchEntry } from "@/lib/support-content";
import { highlight, searchSupport, snippet, type HighlightPart } from "@/lib/support-search";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

const MAX_RESULTS = 6;

// Shown when the box is focused but empty.
const POPULAR_SLUGS = [
  "how-do-i-send-money",
  "how-much-does-it-cost",
  "how-long-will-it-take",
  "which-countries-and-currencies-can-i-use",
  "my-payment-is-still-processing",
];
const POPULAR = POPULAR_SLUGS.map((slug) => SUPPORT_SEARCH_INDEX.find((entry) => entry.slug === slug)).filter(
  (entry): entry is SupportSearchEntry => Boolean(entry),
);

type Option = { entry: SupportSearchEntry; question: HighlightPart[]; excerpt?: HighlightPart[] };

function Highlighted({ parts }: { parts: HighlightPart[] }) {
  return parts.map((part, index) =>
    part.match ? (
      <mark key={index} className="bg-transparent font-bold text-xenon-brand">
        {part.text}
      </mark>
    ) : (
      part.text
    ),
  );
}

export default function SupportSearch() {
  const router = useRouter();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const hasQuery = query.trim().length > 0;

  const options = useMemo<Option[]>(() => {
    if (!hasQuery) return POPULAR.map((entry) => ({ entry, question: [{ text: entry.question, match: false }] }));
    return searchSupport(query, MAX_RESULTS).map((result) => ({
      entry: result,
      question: highlight(result.question, result.terms),
      excerpt: highlight(snippet(result.answer, result.terms), result.terms),
    }));
  }, [query, hasQuery]);

  const isOpen = isFocused;
  const isActive = isFocused || hasQuery;
  const noResults = hasQuery && options.length === 0 && query.trim().length >= 2;

  const updateQuery = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
  };

  const openArticle = (entry: SupportSearchEntry | undefined) => {
    if (!entry) return;
    setIsFocused(false);
    inputRef.current?.blur();
    router.push(entry.href);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      if (hasQuery) updateQuery("");
      else inputRef.current?.blur();
      return;
    }
    if (!options.length || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
    event.preventDefault();
    setIsFocused(true);
    setActiveIndex((index) => {
      if (event.key === "ArrowDown") return index + 1 >= options.length ? 0 : index + 1;
      return index <= 0 ? options.length - 1 : index - 1;
    });
  };

  return (
    <form
      role="search"
      className="relative mx-auto w-full max-w-[1029px] text-left"
      onSubmit={(event) => {
        event.preventDefault();
        if (hasQuery) openArticle((options[activeIndex] ?? options[0])?.entry);
        else if (activeIndex >= 0) openArticle(options[activeIndex]?.entry);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
      }}
    >
      <label htmlFor={`${listboxId}-input`} className="sr-only">
        Search help articles
      </label>
      <div
        className={cn(
          "relative flex h-16 items-center rounded-2xl border border-[#FDFDFD] transition-colors duration-200 lg:h-[95px]",
          isActive ? "bg-white/[0.87] backdrop-blur-[175px]" : "bg-transparent",
        )}
      >
        <input
          ref={inputRef}
          id={`${listboxId}-input`}
          type="search"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          aria-autocomplete="list"
          aria-expanded={isOpen && options.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          value={query}
          placeholder="Search for articles, e.g. fees, verification, refund"
          onChange={(event) => updateQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "size-full rounded-2xl bg-transparent pr-14 pl-5 text-base outline-none lg:pr-[70px] lg:pl-[23px] [&::-webkit-search-cancel-button]:hidden",
            isActive
              ? "font-semibold text-xenon-gray placeholder:font-normal placeholder:text-xenon-gray/60 lg:text-2xl lg:leading-[26px]"
              : "text-white placeholder:text-white lg:text-xl",
          )}
        />
        <button
          type="submit"
          aria-label="Search"
          className={cn(
            "absolute right-4 flex size-10 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:right-[15px]",
            isActive ? "text-xenon-gray focus-visible:outline-xenon-gray" : "text-white focus-visible:outline-white",
          )}
        >
          <Search className="size-5 lg:size-6" strokeWidth={1.5} />
        </button>
      </div>

      <p role="status" className="sr-only">
        {isOpen && hasQuery ? (noResults ? "No matching articles" : `${options.length} matching articles`) : ""}
      </p>

      {isOpen && (options.length > 0 || noResults) && (
        // Mouse down here would blur the input and close the panel before the
        // click lands (Safari doesn't focus links on click), so keep focus put.
        <div
          onMouseDown={(event) => event.preventDefault()}
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-[#FDFDFD] shadow-[0px_10px_18px_-2px_rgba(16,25,40,0.07),0px_24px_48px_-12px_rgba(16,25,40,0.18)]"
        >
          {options.length > 0 ? (
            <>
              <p className="px-5 pt-4 text-xs font-semibold tracking-[0.12em] text-[#8893A4] uppercase lg:px-7 lg:pt-5">
                {hasQuery ? "Top results" : "Popular questions"}
              </p>
              <div id={listboxId} role="listbox" aria-label={hasQuery ? "Matching articles" : "Popular questions"} className="flex flex-col p-2 lg:p-3">
                {options.map(({ entry, question, excerpt }, index) => (
                  <Link
                    key={entry.href}
                    id={`${listboxId}-${index}`}
                    href={entry.href}
                    role="option"
                    aria-selected={index === activeIndex}
                    tabIndex={-1}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setIsFocused(false)}
                    className={cn(
                      "group flex items-start gap-4 rounded-xl px-3 py-3 transition-colors lg:px-4 lg:py-3.5",
                      index === activeIndex && "bg-[#F2F4F7]",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-base leading-6 font-semibold text-xenon-gray lg:text-xl lg:leading-7">
                        <Highlighted parts={question} />
                      </span>
                      {excerpt && (
                        <span className="mt-1 line-clamp-2 block text-sm leading-5 text-[#667185] lg:text-[15px] lg:leading-6">
                          <Highlighted parts={excerpt} />
                        </span>
                      )}
                      <span className="mt-1.5 block text-xs font-medium text-[#8893A4]">{entry.categoryTitle}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "mt-1 size-5 shrink-0 text-xenon-brand transition-[opacity,transform] duration-150",
                        index === activeIndex ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                      )}
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p id={listboxId} className="p-5 text-base text-xenon-gray lg:p-8 lg:text-xl">
              No articles match &ldquo;{query.trim()}&rdquo;. Try another word, browse the topics below, or{" "}
              <Link href={CONTACT_SUPPORT_HREF} onClick={() => setIsFocused(false)} className="font-semibold text-xenon-brand underline-offset-4 hover:underline">
                contact support
              </Link>
              .
            </p>
          )}

          {options.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/5 px-5 py-3 text-sm text-[#667185] lg:px-7">
              <span className="hidden sm:inline">
                <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to move · <kbd className="font-sans">Enter</kbd> to open · <kbd className="font-sans">Esc</kbd> to clear
              </span>
              <Link href={CONTACT_SUPPORT_HREF} onClick={() => setIsFocused(false)} className="font-semibold text-xenon-brand underline-offset-4 hover:underline">
                Can&apos;t find it? Contact support
              </Link>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
