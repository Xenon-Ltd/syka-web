"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./site-footer";

export default function Footer() {
  const pathname = usePathname();
  const legalRoute = pathname.startsWith("/privacy-policy") || pathname.startsWith("/terms-and-conditions") || pathname.startsWith("/cookies") || pathname.startsWith("/data-security");
  const businessStyle = pathname.startsWith("/business");
  return <SiteFooter variant={legalRoute ? "legal" : businessStyle ? "business" : "personal"} />;
}
