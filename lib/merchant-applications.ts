// Public merchant self-registration API (`/api/v1/merchant-applications/*`).
// No authentication: the tracking token addresses the application.

const API_BASE = (process.env.NEXT_PUBLIC_SYKA_API_BASE_URL || "/api/syka").replace(/\/$/, "");
const TOKEN_STORAGE_KEY = "syka.merchantApplication.token";

export type RequirementOption = { code: string; label: string };

export type DocumentRequirement = {
  code: string;
  label: string;
  hint?: string;
  required: boolean;
  accepts: string[];
  max_bytes: number;
};

export type Requirements = {
  business_types: RequirementOption[];
  target_audiences: RequirementOption[];
  documents: DocumentRequirement[];
};

export type ApplicationRequest = {
  first_name: string;
  last_name: string;
  business_name: string;
  business_type: string;
  country: string;
  email: string;
  phone?: string;
  city?: string;
  trading_name?: string;
  target_audience?: string;
};

export type ApplicationCreated = {
  reference: string;
  tracking_token: string;
  status_url_path: string;
  required_documents: DocumentRequirement[];
  message: string;
};

export type UploadedDocument = {
  code: string;
  label: string;
  filename: string;
  size_bytes: number;
  uploaded_at: string;
};

export type ApplicationStatus = {
  reference: string;
  business_name: string;
  business_type: string;
  trading_name?: string;
  target_audience?: string;
  country: string;
  city?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  stage: string;
  status: string;
  status_label: string;
  decision_note?: string;
  created_at: string;
  submitted_at?: string;
  required_documents: DocumentRequirement[];
  uploaded_documents: UploadedDocument[];
  missing_documents: string[];
  can_submit: boolean;
  editable: boolean;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * Field -> validator tag, parsed from a Go validator message, e.g.
   * "Key: 'PublicApplicationRequest.Country' Error:... failed on the 'len' tag" -> { country: "len" }.
   */
  get fieldTags(): Record<string, string> {
    if (this.code !== "VALIDATION_ERROR") return {};
    const tags: Record<string, string> = {};
    for (const [, name, tag] of this.message.matchAll(/PublicApplicationRequest\.(\w+)'.*?failed on the '(\w+)' tag/g)) {
      tags[name.replace(/(?<!^)([A-Z])/g, "_$1").toLowerCase()] = tag;
    }
    return tags;
  }
}

const NETWORK_ERROR_MESSAGE = "We couldn't reach Syka. Check your connection and try again.";

type Envelope = { success?: boolean; data?: unknown; error?: { code?: string; message?: string; details?: Record<string, unknown> } } | null;

function unwrap<T>(status: number, ok: boolean, body: Envelope): T {
  if (!ok || !body?.success) {
    const error = body?.error ?? {};
    const message = status === 429 ? "Too many attempts. Please wait a moment and try again." : error.message || "Something went wrong. Please try again.";
    throw new ApiError(message, status, error.code ?? `HTTP_${status}`, error.details ?? {});
  }
  return body.data as T;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...init, headers: { Accept: "application/json", ...init.headers } });
  } catch {
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0, "NETWORK_ERROR");
  }
  return unwrap<T>(response.status, response.ok, await response.json().catch(() => null));
}

const json = (method: string, data: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

const tokenPath = (token: string) => `/merchant-applications/${encodeURIComponent(token)}`;

export const getRequirements = () => request<Requirements>("/merchant-applications/requirements");

export const createApplication = (data: ApplicationRequest) => request<ApplicationCreated>("/merchant-applications", json("POST", data));

export const getApplication = (token: string) => request<ApplicationStatus>(tokenPath(token), { cache: "no-store" });

export const updateApplication = (token: string, data: ApplicationRequest) => request<ApplicationStatus>(tokenPath(token), json("PUT", data));

/** Uses XHR rather than fetch so large files on slow connections can report progress (0-1). */
export function uploadDocument(token: string, documentType: string, file: File, onProgress?: (fraction: number) => void) {
  const form = new FormData();
  form.append("document_type", documentType);
  form.append("file", file);

  return new Promise<ApplicationStatus>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}${tokenPath(token)}/documents`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total);
    };
    xhr.onload = () => {
      let body: Envelope = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        // Non-JSON (e.g. a proxy error page); unwrap reports it by status.
      }
      try {
        resolve(unwrap<ApplicationStatus>(xhr.status, xhr.status >= 200 && xhr.status < 300, body));
      } catch (error) {
        reject(error);
      }
    };
    xhr.onerror = () => reject(new ApiError(NETWORK_ERROR_MESSAGE, 0, "NETWORK_ERROR"));
    xhr.send(form);
  });
}

export const submitApplication = (token: string) => request<ApplicationStatus>(`${tokenPath(token)}/submit`, { method: "POST" });

/** Always resolves the same way whether or not an application exists for the address. */
export const requestRecoveryCode = (email: string) => request<{ email: string; expires_in_seconds?: number }>("/merchant-applications/recover", json("POST", { email }));

export const verifyRecoveryCode = (email: string, code: string) =>
  request<ApplicationCreated>("/merchant-applications/recover/verify", json("POST", { email, code }));

export function loadStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode); the token is still in the URL and the applicant's email.
  }
}

export const statusPagePath = (token: string) => `/business/merchant/application/${encodeURIComponent(token)}`;
export const registrationPath = (token?: string) => (token ? `/business/merchant/registration?token=${encodeURIComponent(token)}` : "/business/merchant/registration");
export const RECOVERY_PATH = "/business/merchant/recover";

const ISO_COUNTRY_CODES =
  "AD AE AF AG AI AL AM AO AR AS AT AU AW AZ BA BB BD BE BF BG BH BI BJ BM BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CK CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FM FR GA GB GD GE GH GI GM GN GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP KE KG KH KI KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MK ML MM MN MO MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NR NZ OM PA PE PG PH PK PL PR PS PT PW PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VC VE VN VU WS YE ZA ZM ZW".split(" ");

export const COUNTRY_OPTIONS: RequirementOption[] = (() => {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  return ISO_COUNTRY_CODES.map((code) => ({ code, label: names.of(code) ?? code })).sort((a, b) => a.label.localeCompare(b.label));
})();

export const POPULAR_COUNTRY_CODES = ["GH", "NG", "KE", "CA", "US", "GB"];

const DIAL_CODES: Record<string, string> = Object.fromEntries(
  "AD376 AE971 AF93 AG1 AI1 AL355 AM374 AO244 AR54 AS1 AT43 AU61 AW297 AZ994 BA387 BB1 BD880 BE32 BF226 BG359 BH973 BI257 BJ229 BM1 BN673 BO591 BR55 BS1 BT975 BW267 BY375 BZ501 CA1 CD243 CF236 CG242 CH41 CI225 CK682 CL56 CM237 CN86 CO57 CR506 CU53 CV238 CY357 CZ420 DE49 DJ253 DK45 DM1 DO1 DZ213 EC593 EE372 EG20 ER291 ES34 ET251 FI358 FJ679 FM691 FR33 GA241 GB44 GD1 GE995 GH233 GI350 GM220 GN224 GQ240 GR30 GT502 GU1 GW245 GY592 HK852 HN504 HR385 HT509 HU36 ID62 IE353 IL972 IN91 IQ964 IR98 IS354 IT39 JM1 JO962 JP81 KE254 KG996 KH855 KI686 KM269 KN1 KR82 KW965 KY1 KZ7 LA856 LB961 LC1 LI423 LK94 LR231 LS266 LT370 LU352 LV371 LY218 MA212 MC377 MD373 ME382 MG261 MH692 MK389 ML223 MM95 MN976 MO853 MR222 MT356 MU230 MV960 MW265 MX52 MY60 MZ258 NA264 NE227 NG234 NI505 NL31 NO47 NP977 NR674 NZ64 OM968 PA507 PE51 PG675 PH63 PK92 PL48 PR1 PS970 PT351 PW680 PY595 QA974 RO40 RS381 RU7 RW250 SA966 SB677 SC248 SD249 SE46 SG65 SI386 SK421 SL232 SM378 SN221 SO252 SR597 SS211 ST239 SV503 SY963 SZ268 TD235 TG228 TH66 TJ992 TL670 TM993 TN216 TO676 TR90 TT1 TV688 TW886 TZ255 UA380 UG256 US1 UY598 UZ998 VC1 VE58 VN84 VU678 WS685 YE967 ZA27 ZM260 ZW263"
    .split(" ")
    .map((entry) => [entry.slice(0, 2), `+${entry.slice(2)}`]),
);

export const dialCode = (countryCode: string) => DIAL_CODES[countryCode] ?? "";

export const countryName = (code: string) => COUNTRY_OPTIONS.find((option) => option.code === code)?.label ?? code;

export function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${Math.round(bytes / (1024 * 1024))}MB` : `${Math.round(bytes / 1024)}KB`;
}

export function describeAccepts(accepts: string[]) {
  return accepts.map((type) => (type === "image/jpeg" ? "JPG" : type.split("/")[1]?.toUpperCase() ?? type)).join(", ");
}
