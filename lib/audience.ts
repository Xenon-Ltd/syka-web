export type Audience = "personal" | "business";

// Only the two landing pages decide the audience. Every other page serves
// both, so it keeps the side the visitor last chose.
export function routeAudience(pathname: string): Audience | null {
  if (pathname === "/") return "personal";
  if (pathname === "/business" || pathname.startsWith("/business/")) return "business";
  return null;
}

export function resolveAudience(pathname: string, stored: Audience | null): Audience {
  return routeAudience(pathname) ?? stored ?? "personal";
}
