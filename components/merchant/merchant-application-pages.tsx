"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { Download } from "lucide-react";

import SykaLogo from "@/assets/images/syka-logo.svg";
import { LoadState, MerchantBackground } from "@/components/merchant/merchant-flow";
import { merchantAppDownloads } from "@/lib/business-links";
import {
  ApiError,
  ERROR_MESSAGES,
  RECOVERY_PATH,
  countryName,
  getApplication,
  registrationPath,
  requestRecoveryCode,
  statusPagePath,
  storeToken,
  userMessage,
  verifyRecoveryCode,
  type ApplicationStatus,
} from "@/lib/merchant-applications";

const inputClass = "h-12 rounded-[10px] border-0 bg-white px-3 text-sm font-normal text-[#1f1a0b] outline-none placeholder:text-[#717182] focus:ring-2 focus:ring-[#0c3283]/20";
const primaryButtonClass = "rounded-[14px] bg-[#0c3283] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082762] disabled:cursor-not-allowed disabled:opacity-40";

function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <MerchantBackground>
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <header className="flex items-start justify-between gap-4 px-6 pt-7 sm:px-8">
          <Link href="/" aria-label="Go to Syka home" className="w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c3283]">
            <Image src={SykaLogo} alt="Syka" width={94} height={38} className="h-[38px] w-[94px] object-contain object-left" priority />
          </Link>
          <p className="text-right text-[13px] tracking-[0.5px] text-[#3d4756]">Having troubles? <a href="mailto:support@sykabank.com" className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">Get Help</a></p>
        </header>
        <div className="flex flex-1 items-start justify-center px-6 py-12 sm:px-10 lg:py-20">
          <div className="w-full max-w-[559px]">
            <h1 className="text-[26px] leading-[1.2] tracking-[0.5px] text-[#1f1a0b] sm:text-[30px]">{title}</h1>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </MerchantBackground>
  );
}

const RESEND_COOLDOWN_MS = 60_000;

const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

const formatTime = (value: Date) => value.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

/**
 * Who acts next, worked out from what the API returns rather than from status
 * names, so a new backend status still gets an accurate explanation.
 */
function nextStep(application: ApplicationStatus): { owner: string; text: string } {
  if (application.editable && application.missing_documents.length) {
    const count = application.missing_documents.length;
    return { owner: "Action needed from you", text: `Upload ${count} more required document${count === 1 ? "" : "s"}, then review and submit your application.` };
  }
  if (application.editable) {
    return { owner: "Action needed from you", text: "Your application is ready. Review it and submit it for our team to assess." };
  }
  return { owner: "With Syka", text: "Our team is reviewing your application. We'll email you when there's an update." };
}

function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the value stays visible and selectable.
    }
  };
  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-2">
      <span className="break-all select-all">{value}</span>
      <button type="button" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`} aria-live="polite" className="rounded-md border border-black/10 bg-white px-2 py-0.5 text-xs font-normal text-[#0a0a0a] transition hover:bg-[#f7f7f7]">{copied ? "Copied" : "Copy"}</button>
    </span>
  );
}

export function ApplicationStatusPage({ token }: { token: string }) {
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationStatus>();
  const [error, setError] = useState<ApiError | Error>();
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>();

  useEffect(() => {
    let cancelled = false;
    getApplication(token)
      .then((result) => {
        if (cancelled) return;
        storeToken(token);
        setApplication(result);
        setLastChecked(new Date());
      })
      .catch((loadError: Error) => {
        if (!cancelled) setError(loadError);
      })
      .finally(() => {
        if (!cancelled) setRefreshing(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token, attempt]);

  const refresh = () => {
    setRefreshing(true);
    setAttempt((value) => value + 1);
  };

  const removeFromDevice = () => {
    storeToken(null);
    router.push("/business");
  };

  if (error) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <PageShell title="Application status">
        {notFound ? (
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
            <p role="alert" className="text-sm text-red-700">{ERROR_MESSAGES.linkUnavailable}</p>
            <Link href={RECOVERY_PATH} className={`mt-5 inline-block ${primaryButtonClass}`}>Recover your application</Link>
          </div>
        ) : (
          <LoadState message={userMessage(error)} onRetry={() => { setError(undefined); setAttempt((value) => value + 1); }} />
        )}
      </PageShell>
    );
  }

  if (!application) {
    return (
      <PageShell title="Application status">
        <LoadState message="Loading your application…" />
      </PageShell>
    );
  }

  const step = nextStep(application);
  const rows = [
    ["Business", application.business_name],
    ["Contact", application.contact_name],
    ["Email", application.contact_email],
    ["Country", countryName(application.country)],
    ["Started", formatDate(application.created_at)],
    ["Submitted", formatDate(application.submitted_at)],
  ].filter(([, value]) => value);

  return (
    <PageShell title="Application status">
      <section className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#717182]">Current status</p>
          <span className="rounded-full bg-[#edf5fb] px-3 py-1 text-sm font-semibold text-[#0c3283]">{application.status_label}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#717182]">
          <p aria-live="polite">{refreshing ? "Checking…" : lastChecked && `Last checked ${formatTime(lastChecked)}`}</p>
          <button type="button" onClick={refresh} disabled={refreshing} className="-my-2 py-2 font-semibold text-[#0c3283] hover:underline disabled:opacity-40">Refresh status</button>
        </div>
        <div className="mt-5 rounded-[10px] bg-white p-4 text-sm text-[#364153]">
          <p className="font-semibold text-[#101828]">{step.owner}</p>
          <p className="mt-1">{step.text}</p>
          {application.editable && application.missing_documents.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {application.missing_documents.map((code) => (
                <li key={code}>{application.required_documents.find((document) => document.code === code)?.label ?? code}</li>
              ))}
            </ul>
          )}
        </div>
        {application.decision_note && (
          <div className="mt-5 rounded-[10px] bg-white p-4 text-sm text-[#364153]">
            <p className="font-semibold text-[#101828]">Note from our team</p>
            <p className="mt-1">{application.decision_note}</p>
          </div>
        )}
        <dl className="mt-5 space-y-4 rounded-[10px] bg-white p-5 text-sm sm:p-6">
          <div className="flex items-start justify-between gap-6"><dt className="shrink-0 text-[#717182]">Reference</dt><dd className="min-w-0 text-right font-medium text-[#0a0a0a]"><CopyValue label="Reference" value={application.reference} /></dd></div>
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-6"><dt className="shrink-0 text-[#717182]">{label}</dt><dd className="min-w-0 break-words text-right font-medium text-[#0a0a0a]">{value}</dd></div>
          ))}
        </dl>
        {application.uploaded_documents.length > 0 && (
          <div className="mt-4 rounded-[10px] bg-white p-5 text-sm sm:p-6">
            <p className="font-medium text-[#0a0a0a]">Documents</p>
            <ul className="mt-3 space-y-2">
              {application.uploaded_documents.map((document) => (
                <li key={document.code} className="flex items-start justify-between gap-6"><span className="shrink-0 text-[#717182]">{document.label}</span><span className="min-w-0 break-all text-right text-[#0a0a0a]">{document.filename}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {application.editable && <Link href={registrationPath(token)} className={primaryButtonClass}>Continue application</Link>}
          <Link href="/business" className="rounded-[14px] border border-[#0c3283] px-6 py-3 text-sm font-semibold text-[#0c3283] transition hover:bg-[#edf5fb]">Back to website</Link>
        </div>
        <div className="mt-6 border-t border-[#e5e7eb] pt-4 text-xs text-[#717182]">
          <p>On a shared computer? Remove this application from this browser. Your application isn&apos;t deleted, and you can open it again from the link in your email.</p>
          <button type="button" onClick={removeFromDevice} className="-my-2 mt-1 py-2 font-semibold text-[#0c3283] hover:underline">Remove from this device</button>
        </div>
      </section>
    </PageShell>
  );
}

export function RecoverApplicationPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [expiresInMinutes, setExpiresInMinutes] = useState<number>();
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [resent, setResent] = useState(false);
  const resendIn = Math.max(0, Math.ceil((resendAt - now) / 1000));

  useEffect(() => {
    if (!resendAt) return;
    const timer = setInterval(() => {
      setNow(Date.now());
      if (Date.now() >= resendAt) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendAt]);

  const sendCode = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy(true);
    setError(undefined);
    try {
      const result = await requestRecoveryCode(email.trim());
      setResent(codeSent);
      setCodeSent(true);
      setExpiresInMinutes(result?.expires_in_seconds ? Math.round(result.expires_in_seconds / 60) : undefined);
      setNow(Date.now());
      setResendAt(Date.now() + RESEND_COOLDOWN_MS);
    } catch (sendError) {
      setError(userMessage(sendError));
    } finally {
      setBusy(false);
    }
  };

  const verify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setBusy(true);
    setError(undefined);
    try {
      const recovered = await verifyRecoveryCode(email.trim(), code.trim());
      storeToken(recovered.tracking_token);
      router.push(statusPagePath(recovered.tracking_token));
    } catch (verifyError) {
      const rejected = verifyError instanceof ApiError && [400, 404, 410, 422].includes(verifyError.status);
      setError(rejected ? ERROR_MESSAGES.invalidCode : userMessage(verifyError));
      setBusy(false);
    }
  };

  return (
    <PageShell title="Recover your application">
      <section className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
        {!codeSent ? (
          <form noValidate onSubmit={sendCode} className="flex flex-col gap-5">
            <p className="text-sm text-[#717b8e]">Enter the email address you applied with. We&apos;ll send a 6-digit code so you can get back to your application.</p>
            <label className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
              <span>Email Address*</span>
              <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={busy} className={`self-end ${primaryButtonClass}`}>{busy ? "Sending…" : "Send code"}</button>
          </form>
        ) : (
          <form noValidate onSubmit={verify} className="flex flex-col gap-5">
            <p className="text-sm text-[#717b8e]">If an application exists for <span className="font-medium text-[#364153]">{email.trim()}</span>, we&apos;ve {resent ? "sent a new" : "emailed a"} 6-digit code to it.{expiresInMinutes ? ` It expires in ${expiresInMinutes} minutes.` : ""}</p>
            <label className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
              <span>Verification code*</span>
              <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} className={`${inputClass} tracking-[0.4em]`} />
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col items-start gap-1">
                <button type="button" disabled={busy || resendIn > 0} onClick={() => sendCode()} className="text-sm text-[#0c3283] hover:underline disabled:text-[#717182] disabled:no-underline">{resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}</button>
                <button type="button" disabled={busy} onClick={() => { setCode(""); setError(undefined); setResent(false); setCodeSent(false); }} className="text-sm text-[#0c3283] hover:underline disabled:opacity-40">Use a different email</button>
              </div>
              <button type="submit" disabled={busy} className={primaryButtonClass}>{busy ? "Verifying…" : "Verify"}</button>
            </div>
          </form>
        )}
      </section>
      <p className="mt-4 text-center text-xs text-[#717182]">New to Syka? <Link href="/business/merchant/registration" className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">Start an application</Link></p>
    </PageShell>
  );
}

type OperatingSystem = keyof typeof merchantAppDownloads;

const operatingSystems: { id: OperatingSystem; label: string }[] = [
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
  { id: "linux", label: "Linux" },
];

const installSteps = [
  "Download the build for your computer's operating system.",
  "Install the Syka Merchant app and open it.",
  "Complete onboarding in the app to set up your merchant account.",
];

function detectOperatingSystem(): OperatingSystem | null {
  const platform = navigator.userAgent.toLowerCase();
  if (platform.includes("win")) return "windows";
  if (platform.includes("mac") && !/iphone|ipad/.test(platform)) return "macos";
  if (platform.includes("linux") && !platform.includes("android")) return "linux";
  return null;
}

const noSubscription = () => () => {};

/** Shown to approved merchants. Not linked from the status page until the builds are published. */
export function MerchantAppDownloadPage() {
  // Read on the client only, so the server render never guesses the visitor's device.
  const currentOs = useSyncExternalStore(noSubscription, detectOperatingSystem, () => null);

  return (
    <PageShell title="Download the Syka Merchant app">
      <section className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
        <p className="text-sm text-[#717b8e]">Your merchant application has been approved. Download the app for your computer to finish setting up your account.</p>

        <ol className="mt-6 space-y-3">
          {installSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm text-[#364153]">
              <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0c3283] text-xs font-semibold text-white">{index + 1}</span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <ul className="mt-6 space-y-3">
          {operatingSystems.map(({ id, label }) => {
            const href = merchantAppDownloads[id];
            return (
              <li key={id} className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-[#101828]">{label}</p>
                  {id === currentOs && <p className="mt-1 text-xs text-[#717182]">Detected on this device</p>}
                </div>
                {href ? (
                  <a href={href} className={`inline-flex items-center gap-2 ${primaryButtonClass}`}>
                    <Download aria-hidden="true" className="size-4" />
                    Download for {label}
                  </a>
                ) : (
                  <p className="text-xs text-[#717182]">Download available soon</p>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-[#717182]">Need help installing the app? Email <a href="mailto:support@sykabank.com" className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">support@sykabank.com</a>.</p>
        <Link href="/business" className="mt-6 inline-block rounded-[14px] border border-[#0c3283] px-6 py-3 text-sm font-semibold text-[#0c3283] transition hover:bg-[#edf5fb]">Back to website</Link>
      </section>
    </PageShell>
  );
}
