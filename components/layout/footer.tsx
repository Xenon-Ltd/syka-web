"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./site-footer";

export default function Footer() {
  const pathname = usePathname();
  return <SiteFooter variant={pathname.startsWith("/business") ? "business" : "personal"} />;
}
