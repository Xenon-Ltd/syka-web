"use client";

import Link from "next/link";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-brand";

// Shown when a page fails while rendering. It says nothing about saved data,
// because at this point nothing is known about it.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-20 text-center sm:px-6 lg:py-32">
      <p className="text-sm font-semibold tracking-[0.14em] text-xenon-brand uppercase">Something went wrong</p>
      <h1 className="mt-4 text-3xl leading-tight font-bold text-xenon-gray md:text-[40px] md:leading-[52px]">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#8893A4] lg:text-lg">
        Try again, or contact support if it keeps happening.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className={`${buttonBase} bg-xenon-brand text-white hover:bg-xenon-700`}>
          Try again
        </button>
        <Link href="/support" className={`${buttonBase} border border-xenon-brand text-xenon-brand hover:bg-xenon-brand/5`}>
          Contact support
        </Link>
        <Link href="/" className={`${buttonBase} text-xenon-brand hover:bg-xenon-brand/5`}>
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
