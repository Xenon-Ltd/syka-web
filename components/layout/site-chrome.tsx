"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const appOnlyRoutes = ["/business/merchant/registration"];

function useIsAppOnlyRoute() {
  const pathname = usePathname();
  return appOnlyRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function SiteHeader() {
  if (useIsAppOnlyRoute()) return null;
  return <Header />;
}

export function SiteFooter() {
  if (useIsAppOnlyRoute()) return null;
  return <Footer />;
}
