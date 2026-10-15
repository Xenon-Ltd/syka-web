import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  ApiError,
  ERROR_MESSAGES,
  getApplication,
  getRequirements,
  isAbort,
  isConnectionError,
  loadStoredToken,
  requestRecoveryCode,
  storeToken,
  submitApplication,
  uploadDocument,
  userMessage,
  verifyRecoveryCode,
} from "@/lib/merchant-applications";

const ok = (data: unknown) => ({ ok: true, status: 200, json: async () => ({ success: true, data }) });
const fail = (status: number, error: { code?: string; message?: string; details?: Record<string, unknown> } = {}) => ({
  ok: false,
  status,
  json: async () => ({ success: false, error }),
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("userMessage", () => {
  it("never shows the backend's own text", () => {
    const error = new ApiError("pq: duplicate key value violates unique constraint", 500, "INTERNAL");
    expect(userMessage(error)).toBe(ERROR_MESSAGES.unexpected);
  });

  it.each([
    [new ApiError("", 0, "NETWORK_ERROR"), ERROR_MESSAGES.network],
    [new ApiError("", 0, "TIMEOUT"), ERROR_MESSAGES.timeout],
    [new ApiError("slow down", 429, "HTTP_429"), ERROR_MESSAGES.rateLimited],
    [new ApiError("exists", 409, "APPLICATION_EXISTS"), ERROR_MESSAGES.applicationExists],
    [new ApiError("Key: ...", 400, "VALIDATION_ERROR"), ERROR_MESSAGES.validation],
    [new ApiError("not found", 404, "NOT_FOUND"), ERROR_MESSAGES.linkUnavailable],
  ])("maps %o to controlled copy", (error, message) => {
    expect(userMessage(error)).toBe(message);
  });

  it("uses the caller's fallback for unknown errors", () => {
    expect(userMessage(new Error("boom"), ERROR_MESSAGES.requirements)).toBe(ERROR_MESSAGES.requirements);
  });

  it("classifies connection failures and cancellations", () => {
    expect(isConnectionError(new ApiError("", 0, "NETWORK_ERROR"))).toBe(true);
    expect(isConnectionError(new ApiError("", 0, "TIMEOUT"))).toBe(true);
    expect(isConnectionError(new ApiError("", 500, "INTERNAL"))).toBe(false);
    expect(isAbort(new ApiError("", 0, "ABORTED"))).toBe(true);
  });
});

describe("ApiError.fieldTags", () => {
  it("parses Go validator messages into snake_case fields", () => {
    const message =
      "Key: 'PublicApplicationRequest.Country' Error:Field validation for 'Country' failed on the 'len' tag\n" +
      "Key: 'PublicApplicationRequest.TargetAudience' Error:Field validation for 'TargetAudience' failed on the 'oneof' tag";
    expect(new ApiError(message, 400, "VALIDATION_ERROR").fieldTags).toEqual({ country: "len", target_audience: "oneof" });
  });

  it("is empty for other error codes", () => {
    expect(new ApiError("Key: 'PublicApplicationRequest.Country' failed on the 'len' tag", 400, "OTHER").fieldTags).toEqual({});
  });
});

describe("request", () => {
  it("returns the envelope's data", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ok({ business_types: [], target_audiences: [], documents: [] })));
    await expect(getRequirements()).resolves.toEqual({ business_types: [], target_audiences: [], documents: [] });
  });

  it("raises ApiError with status, code and details", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => fail(422, { code: "MISSING_DOCUMENTS", details: { missing_documents: ["id"] } })));
    await expect(submitApplication("tok")).rejects.toMatchObject({ status: 422, code: "MISSING_DOCUMENTS", details: { missing_documents: ["id"] } });
  });

  it("reports a network failure", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); }));
    await expect(getRequirements()).rejects.toMatchObject({ code: "NETWORK_ERROR" });
  });

  it("times out a request that never answers", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => new Promise((_, reject) => {
      init.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    })));
    const result = expect(getApplication("tok")).rejects.toMatchObject({ code: "TIMEOUT" });
    await vi.advanceTimersByTimeAsync(20_000);
    await result;
  });

  it("reports a caller cancellation as ABORTED, not a failure", async () => {
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => new Promise((_, reject) => {
      init.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    })));
    const controller = new AbortController();
    const result = expect(getApplication("tok", controller.signal)).rejects.toMatchObject({ code: "ABORTED" });
    controller.abort();
    await result;
  });

  it("encodes the token in the path", async () => {
    const fetchMock = vi.fn(async () => ok({}));
    vi.stubGlobal("fetch", fetchMock);
    await getApplication("a/b c");
    expect(fetchMock).toHaveBeenCalledWith("/api/syka/merchant-applications/a%2Fb%20c", expect.anything());
  });
});

describe("recovery", () => {
  it("posts the email when requesting a code", async () => {
    const fetchMock = vi.fn(async () => ok({ email: "a@b.co", expires_in_seconds: 600 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(requestRecoveryCode("a@b.co")).resolves.toEqual({ email: "a@b.co", expires_in_seconds: 600 });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/syka/merchant-applications/recover");
    expect(init.method).toBe("POST");
    expect(JSON.parse(String(init.body))).toEqual({ email: "a@b.co" });
  });

  it("surfaces a rejected code as a 404 ApiError", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => fail(404, { code: "NOT_FOUND", message: "no such code" })));
    await expect(verifyRecoveryCode("a@b.co", "123456")).rejects.toMatchObject({ status: 404 });
  });
});

type ProgressHandler = ((event: { lengthComputable: boolean; loaded: number; total: number }) => void) | null;

class FakeXHR {
  static last: FakeXHR;
  upload: { onprogress: ProgressHandler } = { onprogress: null };
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onabort: (() => void) | null = null;
  status = 0;
  responseText = "";
  url = "";
  body: unknown;

  constructor() {
    FakeXHR.last = this;
  }
  open(_method: string, url: string) {
    this.url = url;
  }
  setRequestHeader() {}
  send(body: unknown) {
    this.body = body;
  }
  abort() {
    this.onabort?.();
  }
  progress(loaded: number, total: number) {
    this.upload.onprogress?.({ lengthComputable: true, loaded, total });
  }
  respond(status: number, body: unknown) {
    this.status = status;
    this.responseText = typeof body === "string" ? body : JSON.stringify(body);
    this.onload?.();
  }
}

describe("uploadDocument", () => {
  const file = new File(["%PDF"], "id.pdf", { type: "application/pdf" });

  beforeEach(() => {
    vi.stubGlobal("XMLHttpRequest", FakeXHR);
  });

  it("reports progress and resolves with the updated application", async () => {
    const onProgress = vi.fn();
    const upload = uploadDocument("tok", "id_document", file, { onProgress });
    FakeXHR.last.progress(50, 100);
    FakeXHR.last.respond(200, { success: true, data: { reference: "SYK-1" } });
    await expect(upload).resolves.toEqual({ reference: "SYK-1" });
    expect(onProgress).toHaveBeenCalledWith(0.5);
    expect(FakeXHR.last.url).toBe("/api/syka/merchant-applications/tok/documents");
    expect((FakeXHR.last.body as FormData).get("document_type")).toBe("id_document");
  });

  it("times out when the upload stalls", async () => {
    vi.useFakeTimers();
    const upload = uploadDocument("tok", "id_document", file);
    const result = expect(upload).rejects.toMatchObject({ code: "TIMEOUT" });
    await vi.advanceTimersByTimeAsync(60_000);
    await result;
  });

  it("keeps going while progress continues", async () => {
    vi.useFakeTimers();
    const upload = uploadDocument("tok", "id_document", file);
    for (let i = 1; i <= 5; i++) {
      await vi.advanceTimersByTimeAsync(50_000);
      FakeXHR.last.progress(i * 10, 100);
    }
    FakeXHR.last.respond(200, { success: true, data: { reference: "SYK-1" } });
    await expect(upload).resolves.toEqual({ reference: "SYK-1" });
  });

  it("cancels through the abort signal", async () => {
    const controller = new AbortController();
    const upload = uploadDocument("tok", "id_document", file, { signal: controller.signal });
    controller.abort();
    await expect(upload).rejects.toMatchObject({ code: "ABORTED" });
  });

  it("reports a network failure", async () => {
    const upload = uploadDocument("tok", "id_document", file);
    FakeXHR.last.onerror?.();
    await expect(upload).rejects.toMatchObject({ code: "NETWORK_ERROR" });
  });

  it("reports a non-JSON error page by status", async () => {
    const upload = uploadDocument("tok", "id_document", file);
    FakeXHR.last.respond(413, "<html>Request Entity Too Large</html>");
    await expect(upload).rejects.toMatchObject({ status: 413, code: "HTTP_413" });
  });
});

describe("token storage", () => {
  it("stores, reads and clears the token", () => {
    const data = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => void data.set(key, value),
      removeItem: (key: string) => void data.delete(key),
    });
    storeToken("tok");
    expect(loadStoredToken()).toBe("tok");
    storeToken(null);
    expect(loadStoredToken()).toBeNull();
  });

  it("degrades quietly when storage is unavailable", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => { throw new Error("SecurityError"); },
      setItem: () => { throw new Error("SecurityError"); },
      removeItem: () => { throw new Error("SecurityError"); },
    });
    expect(() => storeToken("tok")).not.toThrow();
    expect(loadStoredToken()).toBeNull();
  });
});
