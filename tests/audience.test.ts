import { describe, expect, it } from "vitest";
import { resolveAudience, routeAudience } from "@/lib/audience";

describe("routeAudience", () => {
  it("fixes the audience on the two landing pages", () => {
    expect(routeAudience("/")).toBe("personal");
    expect(routeAudience("/business")).toBe("business");
    expect(routeAudience("/business/merchant/registration")).toBe("business");
  });

  it("leaves pages for both audiences open", () => {
    for (const path of ["/about", "/careers", "/coverage", "/privacy-policy", "/terms-and-conditions", "/cookies", "/data-security", "/support", "/support/getting-started"]) {
      expect(routeAudience(path)).toBeNull();
    }
  });

  it("does not treat paths that only start with business as business", () => {
    expect(routeAudience("/businesses")).toBeNull();
  });
});

describe("resolveAudience", () => {
  it("keeps the last chosen side on pages for both audiences", () => {
    expect(resolveAudience("/about", "business")).toBe("business");
    expect(resolveAudience("/privacy-policy", "personal")).toBe("personal");
    expect(resolveAudience("/support", "business")).toBe("business");
  });

  it("uses the landing page side over the stored side", () => {
    expect(resolveAudience("/", "business")).toBe("personal");
    expect(resolveAudience("/business", "personal")).toBe("business");
  });

  it("defaults to personal when nothing is stored", () => {
    expect(resolveAudience("/coverage", null)).toBe("personal");
  });
});
