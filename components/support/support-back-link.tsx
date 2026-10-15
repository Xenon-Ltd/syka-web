import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SupportBackLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block rounded text-lg leading-6 font-semibold text-xenon-brand transition-colors hover:text-xenon-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-brand lg:text-xl",
        className,
      )}
    >
      {children}
    </Link>
  );
}
