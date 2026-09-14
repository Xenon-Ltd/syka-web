import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BusinessActionProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export default function BusinessAction({ href, children, className, ...props }: BusinessActionProps) {
  const styles = cn(
    "inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
    className,
  );

  if (!href) {
    return <button type="button" disabled className={cn(styles, "cursor-not-allowed")} {...props}>{children}</button>;
  }

  return <Link href={href} className={styles} {...props}>{children}</Link>;
}
