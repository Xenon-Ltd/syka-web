"use client";

import { SUPPORT_SEARCH_INDEX, type SupportSearchEntry } from "@/lib/support-content";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

const MAX_RESULTS = 6;

function findArticles(query: string): SupportSearchEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const words = needle.split(/\s+/);
  const matches = SUPPORT_SEARCH_INDEX.filter((entry) => {
    const haystack = `${entry.question} ${entry.answer} ${entry.categoryTitle}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
  // Questions that start with, then contain, the typed text rank above answer-only matches.
  const rank = (entry: SupportSearchEntry) => {
    const question = entry.question.toLowerCase();
    if (question.startsWith(needle)) return 0;
    if (question.includes(needle)) return 1;
    return words.every((word) => question.includes(word)) ? 2 : 3;
  };
  return matches.sort((a, b) => rank(a) - rank(b)).slice(0, MAX_RESULTS);
}

export default function SupportSearch() {
  const router = useRouter();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const results = useMemo(() => findArticles(query), [query]);
  const hasQuery = query.trim().length > 0;
  const isOpen = isFocused && hasQuery;
  const isActive = isFocused || hasQuery;

  const updateQuery = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
  };

  const openArticle = (entry: SupportSearchEntry | undefined) => {
    if (!entry) return;
    setIsFocused(false);
    router.push(entry.href);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      if (hasQuery) updateQuery("");
      else inputRef.current?.blur();
      return;
    }
    if (!results.length || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
    event.preventDefault();
    setIsFocused(true);
    setActiveIndex((index) => {
      if (event.key === "ArrowDown") return index + 1 >= results.length ? 0 : index + 1;
      return index <= 0 ? results.length - 1 : index - 1;
    });
  };

  return (
    <form
      role="search"
      className="relative mx-auto w-full max-w-[1029px] text-left"
      onSubmit={(event) => {
        event.preventDefault();
        openArticle(results[activeIndex] ?? results[0]);
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
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          value={query}
          placeholder="Search for articles..."
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

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-[#FDFDFD] shadow-[0px_10px_18px_-2px_rgba(16,25,40,0.07)]">
          {results.length ? (
            <div id={listboxId} role="listbox" aria-label="Suggested articles" className="flex flex-col p-3 lg:p-4">
              {results.map((entry, index) => (
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
                    "rounded-xl px-3 py-2.5 text-base font-semibold text-xenon-gray transition-colors lg:px-4 lg:py-[12.5px] lg:text-2xl lg:leading-[26px]",
                    index === activeIndex && "bg-[#F2F4F7]",
                  )}
                >
                  {entry.question}
                </Link>
              ))}
            </div>
          ) : (
            <p id={listboxId} role="status" className="p-5 text-base text-xenon-gray lg:p-8 lg:text-xl">
              No articles match &ldquo;{query.trim()}&rdquo;.{" "}
              <a href="#contact-support" onClick={() => setIsFocused(false)} className="font-semibold text-xenon-brand underline-offset-4 hover:underline">
                Contact support
              </a>{" "}
              and we&apos;ll help you directly.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
