"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const appOnlyRoutes = ["/business/merchant"];

function useIsAppOnlyRoute() {
  const pathname = usePathname();
  return appOnlyRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// Pages whose hero renders its own header so the hero background runs behind it.
const ownHeaderRoutes = ["/support"];

export function SiteHeader() {
  const pathname = usePathname();
  if (useIsAppOnlyRoute() || ownHeaderRoutes.includes(pathname)) return null;
  return <Header />;
}

export function SiteFooter() {
  if (useIsAppOnlyRoute()) return null;
  return <Footer />;
}
