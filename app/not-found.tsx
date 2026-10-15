import Link from "next/link";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-brand";

// Sits between the site header and footer, so it uses normal section spacing
// rather than a full-viewport block (which left a tall empty band on phones).
export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-20 text-center sm:px-6 lg:py-32">
      <p className="text-sm font-semibold tracking-[0.14em] text-xenon-brand uppercase">404 error</p>
      <h1 className="mt-4 text-3xl leading-tight font-bold text-xenon-gray md:text-[40px] md:leading-[52px]">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#8893A4] lg:text-lg">
        The link may be broken, or the page may have moved. Head back to the homepage to keep exploring Syka.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={`${buttonBase} bg-xenon-brand text-white hover:bg-xenon-700`}>
          Go to homepage
        </Link>
        <Link href="/business" className={`${buttonBase} border border-xenon-brand text-xenon-brand hover:bg-xenon-brand/5`}>
          Syka for Business
        </Link>
        <Link href="/support" className={`${buttonBase} text-xenon-brand hover:bg-xenon-brand/5`}>
          Get help
        </Link>
      </div>
    </main>
  );
}
