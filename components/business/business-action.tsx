import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BusinessActionProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Shown beside the label while there's no destination; null hides it (tight spaces). */
  unavailableLabel?: string | null;
};

export default function BusinessAction({ href, children, className, unavailableLabel = null, ...props }: BusinessActionProps) {
  const styles = cn(
    "inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
    className,
  );

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={cn(styles, "cursor-not-allowed gap-2 opacity-75")}
        title={unavailableLabel ?? undefined}
        {...props}
      >
        {children}
        {/* Says why it can't be pressed; a faded button alone reads as broken. */}
        {unavailableLabel && (
          <span className="rounded-full bg-black/15 px-2 py-0.5 text-[11px] leading-4 font-semibold tracking-wide uppercase">
            {unavailableLabel}
          </span>
        )}
      </button>
    );
  }

  return <Link href={href} className={styles} {...props}>{children}</Link>;
}
