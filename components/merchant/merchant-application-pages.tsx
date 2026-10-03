"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import SykaLogo from "@/assets/images/syka-logo.svg";
import { LoadState, MerchantBackground } from "@/components/merchant/merchant-flow";
import {
  ApiError,
  RECOVERY_PATH,
  countryName,
  getApplication,
  registrationPath,
  requestRecoveryCode,
  statusPagePath,
  storeToken,
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
          <p className="text-right text-[13px] tracking-[0.5px] text-[#3d4756]">Having troubles? <a href="mailto:support@sykabank.com" className="font-semibold text-[#0c3283] hover:underline">Get Help</a></p>
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

export function ApplicationStatusPage({ token }: { token: string }) {
  const [application, setApplication] = useState<ApplicationStatus>();
  const [error, setError] = useState<ApiError | Error>();
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getApplication(token)
      .then((result) => {
        if (cancelled) return;
        storeToken(token);
        setApplication(result);
      })
      .catch((loadError: Error) => {
        if (!cancelled) setError(loadError);
      });
    return () => {
      cancelled = true;
    };
  }, [token, attempt]);

  if (error) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <PageShell title="Application status">
        {notFound ? (
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
            <p role="alert" className="text-sm text-red-700">{error.message}</p>
            <Link href={RECOVERY_PATH} className={`mt-5 inline-block ${primaryButtonClass}`}>Recover your application</Link>
          </div>
        ) : (
          <LoadState message={error.message} onRetry={() => { setError(undefined); setAttempt((value) => value + 1); }} />
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

  const rows = [
    ["Reference", application.reference],
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
        {application.decision_note && (
          <div className="mt-5 rounded-[10px] bg-white p-4 text-sm text-[#364153]">
            <p className="font-semibold text-[#101828]">Note from our team</p>
            <p className="mt-1">{application.decision_note}</p>
          </div>
        )}
        <dl className="mt-5 space-y-4 rounded-[10px] bg-white p-5 text-sm sm:p-6">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-6"><dt className="text-[#717182]">{label}</dt><dd className="min-w-0 truncate text-right font-medium text-[#0a0a0a]">{value}</dd></div>
          ))}
        </dl>
        {application.uploaded_documents.length > 0 && (
          <div className="mt-4 rounded-[10px] bg-white p-5 text-sm sm:p-6">
            <p className="font-medium text-[#0a0a0a]">Documents</p>
            <ul className="mt-3 space-y-2">
              {application.uploaded_documents.map((document) => (
                <li key={document.code} className="flex items-center justify-between gap-6"><span className="text-[#717182]">{document.label}</span><span className="min-w-0 truncate text-right text-[#0a0a0a]">{document.filename}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {application.editable && <Link href={registrationPath(token)} className={primaryButtonClass}>Continue application</Link>}
          <Link href="/business" className="rounded-[14px] border border-[#0c3283] px-6 py-3 text-sm font-semibold text-[#0c3283] transition hover:bg-[#edf5fb]">Back to website</Link>
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
      setError(sendError instanceof Error ? sendError.message : "Something went wrong. Please try again.");
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
      setError(verifyError instanceof ApiError && verifyError.status === 404 ? "That code is incorrect or has expired." : verifyError instanceof Error ? verifyError.message : "Something went wrong. Please try again.");
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
      <p className="mt-4 text-center text-xs text-[#717182]">New to Syka? <Link href="/business/merchant/registration" className="font-semibold text-[#0c3283] hover:underline">Start an application</Link></p>
    </PageShell>
  );
}
