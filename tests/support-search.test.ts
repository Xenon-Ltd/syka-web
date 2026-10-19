import { describe, expect, it } from "vitest";
import { highlight, searchSupport, snippet, stem } from "@/lib/support-search";

const top = (query: string) => searchSupport(query)[0]?.slug;
const slugs = (query: string) => searchSupport(query).map((result) => result.slug);

describe("searchSupport", () => {
  it("finds exact questions first", () => {
    expect(top("How do I send money?")).toBe("how-do-i-send-money");
    expect(top("can i cancel a payment")).toBe("can-i-cancel-a-payment");
  });

  it("matches words people use instead of ours", () => {
    expect(top("fees")).toBe("how-much-does-it-cost");
    expect(top("charges")).toBe("how-much-does-it-cost");
    expect(slugs("refund")).toContain("can-i-cancel-a-payment");
    expect(slugs("kyc")).toContain("why-do-i-need-to-verify-my-identity");
    expect(top("scam")).toBe("how-do-i-avoid-scams");
    expect(top("payment stuck")).toBe("my-payment-is-still-processing");
    expect(top("which currencies")).toBe("which-countries-and-currencies-can-i-use");
  });

  it("finds words while they are still being typed", () => {
    expect(slugs("verif")).toContain("why-do-i-need-to-verify-my-identity");
    expect(slugs("recip")).toContain("does-my-recipient-need-a-syka-account");
  });

  it("forgives typos", () => {
    expect(top("verifcation")).toMatch(/verif/);
    expect(slugs("recipeint")).toContain("does-my-recipient-need-a-syka-account");
    expect(top("limt")).toBe("is-there-a-limit-on-how-much-i-can-send");
  });

  it("ranks partial matches when not every word appears", () => {
    expect(top("sent to the wrong account")).toBe("i-entered-the-wrong-recipient-details");
    expect(top("how long does a transfer take")).toBe("how-long-will-it-take");
  });

  it("matches stop-word-only queries as a phrase", () => {
    expect(slugs("how do i")).toContain("how-do-i-send-money");
    expect(slugs("how do i")).not.toContain("what-is-syka");
  });

  it("drops weak matches that trail the best one", () => {
    expect(slugs("how much")).toEqual(["how-much-does-it-cost", "is-there-a-limit-on-how-much-i-can-send"]);
  });

  it("returns nothing for empty, one-letter or unrelated queries", () => {
    expect(searchSupport("s")).toEqual([]);
    expect(searchSupport("")).toEqual([]);
    expect(searchSupport("   ")).toEqual([]);
    expect(searchSupport("zebra xylophone")).toEqual([]);
  });

  it("caps the number of results", () => {
    expect(searchSupport("payment", 3)).toHaveLength(3);
  });
});

describe("helpers", () => {
  it("stems common endings", () => {
    expect(stem("payments")).toBe("payment");
    expect(stem("currencies")).toBe("currency");
    expect(stem("sending")).toBe("send");
    expect(stem("fees")).toBe(stem("fee"));
  });

  it("highlights matching words", () => {
    const [result] = searchSupport("fees");
    const marked = highlight("The fee and the exact amount", result.terms).filter((part) => part.match);
    expect(marked.map((part) => part.text)).toEqual(["fee"]);
  });

  it("centres the snippet on the first match", () => {
    const [result] = searchSupport("supplier invoices");
    const text = snippet(result.answer, result.terms);
    expect(text).toMatch(/supplier/);
    expect(text.length).toBeLessThanOrEqual(124);
  });
});
