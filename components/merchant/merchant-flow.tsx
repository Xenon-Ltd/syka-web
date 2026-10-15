"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";

import SykaLogo from "@/assets/images/syka-logo.svg";
import MerchantWatermark from "@/assets/images/merchant-watermark.png";
import MerchantSuccess from "@/assets/images/merchant-success.svg";
import applicantActive from "@/assets/icons/merchant/applicant-active.svg";
import applicantMuted from "@/assets/icons/merchant/applicant-muted.svg";
import docsMuted from "@/assets/icons/merchant/docs-muted.svg";
import uploadIcon from "@/assets/icons/merchant/upload.svg";
import editIcon from "@/assets/icons/merchant/edit.svg";
import chevronIcon from "@/assets/icons/merchant/chevron.svg";
import { CountryCombobox } from "@/components/merchant/country-combobox";
import { DropdownSelect } from "@/components/merchant/dropdown";
import {
  ApiError,
  ERROR_MESSAGES,
  RECOVERY_PATH,
  countryName,
  createApplication,
  describeAccepts,
  dialCode,
  formatBytes,
  getApplication,
  getRequirements,
  isAbort,
  isConnectionError,
  loadStoredToken,
  registrationPath,
  statusPagePath,
  storeToken,
  submitApplication,
  updateApplication,
  uploadDocument,
  userMessage,
  type ApplicationStatus,
  type DocumentRequirement,
  type RequirementOption,
  type Requirements,
} from "@/lib/merchant-applications";
import {
  emptyRegistration,
  fieldErrorsFromApi,
  fieldLabels,
  fieldOrder,
  fromStatus,
  sameRegistration,
  toRequest,
  validateRegistration,
  type RegistrationData,
  type RegistrationErrors,
} from "@/lib/merchant-registration";

type FormError = {
  message: string;
  link?: { href: string; label: string };
  /** Invalid fields, listed so keyboard and screen-reader users can jump to each one. */
  fields?: Array<{ id: string; label: string }>;
};

const recoverLink = { href: RECOVERY_PATH, label: "Recover your application" };

const registrationSteps = ["Applicant Information", "Background Documents", "Review & Submit"];

const registrationIcons = [applicantActive, docsMuted, applicantMuted];

const withoutKey = <T,>(record: Record<string, T>, key: string) => Object.fromEntries(Object.entries(record).filter(([code]) => code !== key));

function uploadErrorMessage(error: unknown, document: DocumentRequirement) {
  if (error instanceof ApiError && error.code === "TIMEOUT") return ERROR_MESSAGES.uploadTimeout;
  // The backend rejected the file itself (type, size or content).
  if (error instanceof ApiError && [400, 413, 415, 422].includes(error.status)) {
    return `We couldn't accept this file. Upload a ${describeAccepts(document.accepts)} file smaller than ${formatBytes(document.max_bytes)}.`;
  }
  return userMessage(error);
}

function IconImage({ src, alt = "", className = "size-4" }: { src: StaticImageData | string; alt?: string; className?: string }) {
  return <Image src={src} alt={alt} width={20} height={20} className={className} />;
}

function MerchantBackground({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f7fa] font-sans text-[#1f1a0b]">
      <div className="relative flex min-h-screen w-full flex-col lg:flex-row">
        <Image
          src={MerchantWatermark}
          alt=""
          aria-hidden="true"
          fill
          sizes="375px"
          className="pointer-events-none absolute bottom-0 right-0 z-0 h-[425px] w-[375px] object-cover object-top opacity-20"
        />
        {children}
      </div>
    </main>
  );
}

function Sidebar({ step, canVisit, onSelect }: { step: number; canVisit: (index: number) => boolean; onSelect: (index: number) => void }) {
  return (
    <aside className="relative z-10 flex w-full shrink-0 flex-col bg-[#edf5fb] px-6 py-5 sm:px-8 lg:min-h-screen lg:w-[401px] lg:py-10">
      <Link href="/" aria-label="Go to Syka home" className="w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c3283]">
        <Image src={SykaLogo} alt="Syka" width={94} height={38} className="h-[38px] w-[94px] object-contain object-left" priority />
      </Link>

      {/* Below lg the top bar's progress and "Step x of 3" carry this, so the form starts on the first screen. */}
      <div className="mt-[100px] hidden max-w-[337px] lg:block">
        <h1 className="max-w-[337px] text-[30px] leading-[1.17] tracking-[1px] text-[#1f1a0b] sm:text-[32px]">
          Apply for a Syka merchant account.
        </h1>
        <p className="mt-3 text-base tracking-[0.5px] text-[#1f1a0b]">Tell us about your business, upload your documents, then review and submit for our team to assess.</p>
      </div>

      <nav aria-label="Registration progress" className="mt-7 hidden lg:block">
        <ol className="relative space-y-2">
          {registrationSteps.map((label, index) => {
            const isActive = index <= step;
            const isCurrent = index === step;
            const clickable = !isCurrent && step < 3 && canVisit(index);
            const icon = registrationIcons[index];
            const content = (
              <>
                <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full ${isActive ? "bg-[#0c3283]" : "border border-[#ececf0] bg-[#d1d5dc]"}`}>
                  <IconImage src={icon} className="size-3" />
                </span>
                <span className={`text-[13px] leading-5 ${isActive ? "font-semibold text-[#0c3283]" : "text-[#3d4756]"}`}>{label}</span>
              </>
            );
            return (
              <li key={label} className="relative">
                {index < registrationSteps.length - 1 && (
                  <span className={`absolute left-[24px] top-[42px] h-8 border-l-2 border-dashed ${index < step ? "border-[#0c3283]" : "border-[#d1d5dc]"}`} aria-hidden="true" />
                )}
                {clickable ? (
                  <button type="button" onClick={() => onSelect(index)} className="flex min-h-[48px] w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-[#0c3283]">
                    {content}
                  </button>
                ) : (
                  <div aria-current={isCurrent ? "step" : undefined} className="flex min-h-[48px] items-center gap-3 px-3 py-2">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}

function TopBar({ step, total, title }: { step: number; total: number; title?: string }) {
  return (
    <div className="relative z-10 border-b border-transparent">
      <div className="flex items-start justify-end px-6 pt-5 sm:px-8 lg:h-[75px] lg:pt-7">
        <p className="text-right text-[13px] tracking-[0.5px] text-[#3d4756]">
          Having troubles? <a href="mailto:support@sykabank.com" className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">Get Help</a>
          <span aria-hidden="true" className="mx-2 text-[#99a1af]">·</span>
          <Link href={RECOVERY_PATH} className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">Recover application</Link>
        </p>
      </div>
      <div
        className="absolute left-0 right-0 top-0 h-1 bg-[#e5e7eb]"
        role="progressbar"
        aria-label="Registration progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
      >
        <div className="h-full bg-[#0c3283] transition-[width] duration-300" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <div className="px-6 pt-2 sm:px-8 lg:px-12">
        <p className="text-[13px] leading-5 text-[#99a1af]">Step {step + 1} of {total}</p>
        {title && <h2 className="mt-2 text-[18px] font-normal leading-7 text-[#0a0a0a]">{title}</h2>}
      </div>
    </div>
  );
}

function FlowActions({ onBack, onNext, nextLabel = "Continue", backDisabled = false, nextDisabled = false, nextType = "submit" }: { onBack: () => void; onNext?: () => void; nextLabel?: string; backDisabled?: boolean; nextDisabled?: boolean; nextType?: "button" | "submit" }) {
  return (
    <div className="flex items-center justify-between gap-4 pt-5">
      <button type="button" onClick={onBack} disabled={backDisabled} className="rounded-lg bg-white px-5 py-3 text-sm text-[#0a0a0a] transition hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-30">Back</button>
      <button type={nextType} onClick={nextType === "button" ? onNext : undefined} disabled={nextDisabled} className="min-w-[125px] rounded-[14px] bg-[#0c3283] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082762] disabled:cursor-not-allowed disabled:opacity-40">{nextLabel}</button>
    </div>
  );
}

function Field({ id, label, value, onChange, placeholder, type = "text", required = false, error, hint, autoComplete, inputMode }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: InputHTMLAttributes<HTMLInputElement>["type"]; required?: boolean; error?: string; hint?: string; autoComplete?: string; inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"] }) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
      <span>{label}{required ? "*" : ""}</span>
      <input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} autoComplete={autoComplete} inputMode={inputMode} aria-invalid={Boolean(error)} aria-describedby={describedBy} className="h-12 rounded-[10px] border-0 bg-white px-3 text-sm font-normal text-[#1f1a0b] outline-none ring-0 placeholder:text-[#717182] focus:ring-2 focus:ring-[#0c3283]/20" />
      {error ? <span id={`${id}-error`} role="alert" className="text-xs font-normal text-red-700">{error}</span> : hint && <span id={`${id}-hint`} className="text-xs font-normal text-[#717182]">{hint}</span>}
    </label>
  );
}

function FormAlert({ error }: { error?: FormError }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const message = error?.message;

  useEffect(() => {
    if (message) ref.current?.scrollIntoView({ block: "nearest" });
  }, [message]);

  if (!error) return null;
  return (
    <div ref={ref} role="alert" className="mt-4 text-sm text-red-700">
      <p>
        {error.message}
        {error.link && <> <Link href={error.link.href} className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">{error.link.label}</Link></>}
      </p>
      {error.fields && error.fields.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {error.fields.map((field) => (
            <li key={field.id}>
              <button type="button" onClick={() => document.getElementById(field.id)?.focus()} className="font-semibold text-[#0c3283] underline-offset-2 hover:underline">{field.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ResumeBanner({ reference, email, onStartOver }: { reference: string; email: string; onStartOver: () => void }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-[10px] bg-[#edf5fb] px-4 py-3 text-xs text-[#364153]">
      <p>Continuing application <span className="font-semibold">{reference}</span> for {email}.</p>
      <button type="button" onClick={onStartOver} className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">Not you? Start over</button>
    </div>
  );
}

function ApplicantForm({ data, onChange, errors, requirements, formError, busy, confirmingEmail, onConfirmEmail, onChangeEmail, onNext }: { data: RegistrationData; onChange: (data: RegistrationData) => void; errors: RegistrationErrors; requirements: Requirements; formError?: FormError; busy: boolean; confirmingEmail: boolean; onConfirmEmail: () => void; onChangeEmail: () => void; onNext: () => void }) {
  const update = (key: keyof RegistrationData) => (value: string) => onChange({ ...data, [key]: value });

  const updateCountry = (country: string) => {
    // Prefill the dialling code, but never overwrite a number the applicant has typed.
    const previousCode = dialCode(data.country);
    const untouched = !data.phone.trim() || data.phone.trim() === previousCode;
    onChange({ ...data, country, phone: untouched && dialCode(country) ? `${dialCode(country)} ` : data.phone });
  };

  return (
    <form noValidate onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onNext(); }} className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label="First Name" required value={data.firstName} error={errors.firstName} onChange={update("firstName")} placeholder="e.g., John" autoComplete="given-name" />
        <Field id="lastName" label="Last Name" required value={data.lastName} error={errors.lastName} onChange={update("lastName")} placeholder="e.g., Doe" autoComplete="family-name" />
        <Field id="businessName" label="Business Name" required value={data.businessName} error={errors.businessName} onChange={update("businessName")} autoComplete="organization" />
        <DropdownSelect id="businessType" label="Business Type" required value={data.businessType} error={errors.businessType} onChange={update("businessType")} options={requirements.business_types} placeholder="Select category" />
        <Field id="email" label="Email Address" required value={data.email} error={errors.email} onChange={update("email")} type="email" autoComplete="email" inputMode="email" hint="We'll send your application link here." />
        <CountryCombobox id="country" label="Country" required value={data.country} error={errors.country} onChange={updateCountry} />
        <Field id="phone" label="Phone Number" required value={data.phone} error={errors.phone} onChange={update("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder={`${dialCode(data.country) || "+233"} 54 570 7532`} hint="Include your country code, starting with +." />
        <DropdownSelect id="audience" label="Target Audience Type" required value={data.audience} error={errors.audience} onChange={update("audience")} options={requirements.target_audiences} placeholder="Select type" hint="Who your business mainly sells to, for example individual customers or other businesses." />
      </div>
      <FormAlert error={formError} />
      {confirmingEmail ? (
        <div role="alertdialog" aria-labelledby="confirm-email-title" className="mt-5 rounded-[10px] bg-white p-4 sm:p-5">
          <p id="confirm-email-title" className="text-sm text-[#364153]">We&apos;ll send your application link and any recovery codes to <span className="font-semibold text-[#101828]">{data.email.trim()}</span>. Is that right?</p>
          <div className="mt-4 flex flex-wrap justify-end gap-3">
            <button type="button" onClick={onChangeEmail} disabled={busy} className="rounded-lg bg-[#f3f4f6] px-5 py-3 text-sm text-[#0a0a0a] transition hover:bg-[#e5e7eb] disabled:opacity-40">Change email</button>
            <button type="button" onClick={onConfirmEmail} disabled={busy} autoFocus className="rounded-[14px] bg-[#0c3283] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082762] disabled:opacity-40">{busy ? "Saving…" : "Yes, continue"}</button>
          </div>
        </div>
      ) : (
        <FlowActions onBack={() => undefined} backDisabled nextLabel={busy ? "Saving…" : "Continue"} nextDisabled={busy} />
      )}
    </form>
  );
}

function RegistrationIntro({ documents }: { documents: DocumentRequirement[] }) {
  return (
    <section aria-labelledby="registration-intro-heading" className="mb-4 rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">
      <h2 id="registration-intro-heading" className="text-base font-semibold text-[#101828]">Before you start</h2>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[#364153]">
        <li>Tell us about you and your business. We save your details as soon as you continue.</li>
        <li>Upload your business documents.</li>
        <li>Review everything and submit. Our team assesses every application and contacts you by email.</li>
      </ol>
      {documents.length > 0 && (
        <>
          <p className="mt-4 text-sm font-semibold text-[#101828]">Documents you&apos;ll need</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#364153]">
            {documents.map((document) => (
              <li key={document.code}>{document.label}{document.required ? "" : " (optional)"}</li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-4 text-xs text-[#717182]">You can leave and come back at any time with the application link we email you.</p>
    </section>
  );
}

function TrackingLink({ token, email }: { token: string; email: string }) {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}${statusPagePath(token)}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      inputRef.current?.select();
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-5 rounded-[10px] bg-white p-4">
      <p className="text-sm font-semibold text-[#101828]">Save your application link</p>
      <p className="mt-1 text-xs text-[#717182]">Use it to come back at any time. We&apos;ve also emailed it to {email}.</p>
      <div className="mt-3 flex gap-2">
        <input ref={inputRef} readOnly value={link} aria-label="Application link" onFocus={(event) => event.target.select()} className="h-10 min-w-0 flex-1 rounded-lg bg-[#f3f7fa] px-3 text-xs text-[#364153] outline-none focus:ring-2 focus:ring-[#0c3283]/20" />
        <button type="button" onClick={copy} className="shrink-0 rounded-lg border border-black/10 bg-white px-4 text-xs text-[#0a0a0a] transition hover:bg-[#f7f7f7]" aria-live="polite">{copied ? "Copied" : "Copy"}</button>
      </div>
    </div>
  );
}

function DocumentPreview({ file, fallbackName }: { file?: File; fallbackName?: string }) {
  const [preview, setPreview] = useState<{ file: File; url: string }>();
  const isImage = file?.type.startsWith("image/");
  const url = preview && preview.file === file ? preview.url : undefined;

  useEffect(() => {
    if (!file || !isImage) return;
    const reader = new FileReader();
    reader.onload = () => setPreview({ file, url: String(reader.result) });
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file, isImage]);

  const name = file?.name ?? fallbackName;
  if (!name) return null;
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not optimisable
    return <img src={url} alt="" className="size-12 shrink-0 rounded-md object-cover" />;
  }
  const extension = name.split(".").pop()?.toUpperCase().slice(0, 4) ?? "FILE";
  return <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#edf5fb] text-[10px] font-semibold text-[#0c3283]">{extension}</span>;
}

function DocumentRow({ document, uploaded, localFile, progress, error, onFile, onCancel, onRetry }: { document: DocumentRequirement; uploaded?: ApplicationStatus["uploaded_documents"][number]; localFile?: File; progress?: number; error?: string; onFile: (file: File) => void; onCancel: () => void; onRetry?: () => void }) {
  const [dragging, setDragging] = useState(false);
  const busy = progress !== undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) onFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && !busy) onFile(file);
  };

  const detail = busy
    ? `Uploading… ${Math.round(progress * 100)}%`
    : uploaded
      ? `${uploaded.filename} · ${formatBytes(uploaded.size_bytes)}`
      : `${describeAccepts(document.accepts)} · Max ${formatBytes(document.max_bytes)} · or drag a file here`;

  return (
    <div
      onDragOver={(event) => { event.preventDefault(); if (!busy) setDragging(true); }}
      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false); }}
      onDrop={handleDrop}
      className={`rounded-[10px] bg-white p-4 outline-2 outline-offset-[-2px] transition ${dragging ? "outline-dashed outline-[#3b82f6]" : "outline-transparent"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <DocumentPreview file={localFile} fallbackName={uploaded?.filename} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#101828]">{document.label}{document.required ? "" : " (optional)"}</p>
            {document.hint && <p className="mt-1 text-xs text-[#717182]">{document.hint}</p>}
            <p className="mt-1 break-all text-xs text-[#717182]">{dragging ? "Drop to upload" : detail}</p>
          </div>
        </div>
        {busy ? (
          <button type="button" onClick={onCancel} className="shrink-0 rounded-lg border border-black/10 bg-white px-4 py-2 text-xs text-[#0a0a0a] transition hover:bg-[#f7f7f7]">Cancel</button>
        ) : (
        <label className={`inline-flex shrink-0 items-center gap-1 rounded-lg border border-black/10 bg-white px-4 py-2 text-xs text-[#0a0a0a] transition ${busy ? "cursor-wait opacity-50" : "cursor-pointer hover:bg-[#f7f7f7]"}`}>
          <IconImage src={uploadIcon} className="size-3" />
          {uploaded ? "Replace" : "Upload"}
          <input type="file" name={document.code} accept={document.accepts.join(",")} disabled={busy} className="sr-only" onChange={handleChange} aria-label={`Upload ${document.label}`} />
        </label>
        )}
      </div>
      {busy && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#e5e7eb]" role="progressbar" aria-label={`Uploading ${document.label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <div className="h-full rounded-full bg-[#3b82f6] transition-[width]" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
          {onRetry && <> <button type="button" onClick={onRetry} className="font-semibold text-[#0c3283] hover:underline">Try again</button></>}
        </p>
      )}
    </div>
  );
}

function DocumentsStep({ token, documents, application, localFiles, failedFiles, progress, rowErrors, onFile, onCancel, onBack, onNext }: { token: string; documents: DocumentRequirement[]; application: ApplicationStatus; localFiles: Record<string, File>; failedFiles: Record<string, File>; progress: Record<string, number>; rowErrors: Record<string, string | undefined>; onFile: (document: DocumentRequirement, file: File) => void; onCancel: (document: DocumentRequirement) => void; onBack: () => void; onNext: () => void }) {
  const [error, setError] = useState<string>();
  const required = documents.filter((document) => document.required);
  const uploadedCodes = new Set(application.uploaded_documents.map((document) => document.code));
  const uploaded = required.filter((document) => uploadedCodes.has(document.code)).length;
  const percent = required.length ? Math.round((uploaded / required.length) * 100) : 100;
  const isUploading = Object.keys(progress).length > 0;

  return (
    <form noValidate onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (application.missing_documents.length) { setError(`Upload all ${required.length} required documents before continuing.`); return; } onNext(); }} className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
      <TrackingLink token={token} email={application.contact_email} />
      <div className="flex items-center justify-between gap-4">
        <p className="text-base text-[#101828]">{uploaded} of {required.length} required documents uploaded</p>
        <p className="text-xs text-[#8893a4]">{percent}% complete</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5e7eb]" role="progressbar" aria-label="Document upload progress" aria-valuemin={0} aria-valuemax={required.length} aria-valuenow={uploaded}>
        <div className="h-full rounded-full bg-[#3b82f6] transition-[width]" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-5 space-y-3">
        {documents.map((document) => (
          <DocumentRow
            key={document.code}
            document={document}
            uploaded={application.uploaded_documents.find((item) => item.code === document.code)}
            localFile={localFiles[document.code]}
            progress={progress[document.code]}
            error={rowErrors[document.code]}
            onFile={(file) => { setError(undefined); onFile(document, file); }}
            onCancel={() => onCancel(document)}
            onRetry={failedFiles[document.code] ? () => onFile(document, failedFiles[document.code]) : undefined}
          />
        ))}
      </div>
      <FormAlert error={error ? { message: error } : undefined} />
      <FlowActions onBack={onBack} nextLabel="Review" nextDisabled={isUploading} />
    </form>
  );
}

function ReviewSection({ title, children, onEdit }: { title: string; children?: ReactNode; onEdit: () => void }) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white">
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <p className="text-base font-medium text-[#0a0a0a]">{title}</p>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-3 text-xs text-[#99a1af] hover:text-[#0c3283]"><span className="inline-flex items-center gap-1"><IconImage src={editIcon} className="size-5" />Edit</span><IconImage src={chevronIcon} className="size-5" /></button>
      </div>
      {children && <div className="border-t border-[#e5e7eb] p-5 sm:p-6">{children}</div>}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <dt className="shrink-0 text-[#717182]">{label}</dt>
      <dd className="min-w-0 break-words font-medium text-[#0a0a0a] sm:text-right">{value}</dd>
    </div>
  );
}

function ReviewStep({ data, requirements, documents, application, busy, formError, onBack, onEditApplicant, onEditDocuments, onSubmit }: { data: RegistrationData; requirements: Requirements; documents: DocumentRequirement[]; application: ApplicationStatus; busy: boolean; formError?: FormError; onBack: () => void; onEditApplicant: () => void; onEditDocuments: () => void; onSubmit: () => void }) {
  const labelFor = (options: RequirementOption[], code: string) => options.find((option) => option.code === code)?.label ?? code;
  const values = [
    ["Full Name", `${data.firstName} ${data.lastName}`.trim()],
    ["Business Name", data.businessName],
    ["Business Type", labelFor(requirements.business_types, data.businessType)],
    ["Phone", data.phone.trim()],
    ["Email", data.email],
    ["Country", data.country ? countryName(data.country) : ""],
    ["Target Audience", labelFor(requirements.target_audiences, data.audience)],
  ];
  return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(); }} className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
      <div className="space-y-4">
        <ReviewSection title="Applicant Information" onEdit={onEditApplicant}>
          <dl className="space-y-4 text-sm">{values.map(([label, value]) => <ReviewRow key={label} label={label} value={value || "Not provided"} />)}</dl>
        </ReviewSection>
        <ReviewSection title="Required Documents" onEdit={onEditDocuments}>
          <dl className="space-y-4 text-sm">{documents.map((document) => <ReviewRow key={document.code} label={document.label} value={application.uploaded_documents.find((item) => item.code === document.code)?.filename || "Not uploaded"} />)}</dl>
        </ReviewSection>
      </div>
      <FormAlert error={formError} />
      <FlowActions onBack={onBack} nextLabel={busy ? "Submitting…" : "Submit"} nextDisabled={busy || !application.can_submit} />
      {!application.can_submit && <p className="mt-3 text-right text-xs text-[#717182]">Upload every required document to enable submission.</p>}
    </form>
  );
}

function RegistrationSuccess({ token, application }: { token: string; application: ApplicationStatus }) {
  return (
    <div className="flex min-h-[calc(100vh-75px)] items-center justify-center px-6 py-10 sm:px-10">
      <section className="flex w-full max-w-[559px] flex-col items-center rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-6 py-8 text-center sm:px-10">
        <h2 className="text-lg font-semibold text-[#364153]">Application submitted</h2>
        <p className="mt-4 max-w-[380px] text-sm leading-[1.35] text-[#717b8e]">We&apos;ve received your application. Our team will review it and email {application.contact_email} about next steps. Submitting doesn&apos;t mean your account is approved yet.</p>
        <p className="mt-3 text-sm text-[#364153]">Status: <span className="font-semibold">{application.status_label}</span></p>
        <p className="mt-1 text-sm text-[#364153]">Reference: <span className="font-semibold">{application.reference}</span></p>
        <Image src={MerchantSuccess} alt="" width={300} height={300} className="my-8 size-[240px] rounded-[28px] object-contain sm:size-[300px]" />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={statusPagePath(token)} className="rounded-[14px] border border-[#0c3283] px-6 py-3 text-sm font-semibold text-[#0c3283] transition hover:bg-[#edf5fb]">Track application</Link>
          <Link href="/business" className="rounded-[14px] bg-[#0c3283] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082762]">Back to website</Link>
        </div>
      </section>
    </div>
  );
}

function LoadState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 text-center sm:p-8">
      <p role={onRetry ? "alert" : "status"} className={`text-sm ${onRetry ? "text-red-700" : "text-[#717182]"}`}>{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="mt-4 rounded-[14px] bg-[#0c3283] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082762]">Try again</button>}
    </div>
  );
}

function RegistrationFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RegistrationData>(emptyRegistration);
  const [savedData, setSavedData] = useState<RegistrationData>();
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [focusRequest, setFocusRequest] = useState(0);
  const [formError, setFormError] = useState<FormError>();
  const [requirements, setRequirements] = useState<Requirements>();
  const [loadError, setLoadError] = useState<string>();
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [token, setToken] = useState<string>();
  const [application, setApplication] = useState<ApplicationStatus>();
  const [resumed, setResumed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmingEmail, setConfirmingEmail] = useState(false);
  const [pendingStep, setPendingStep] = useState(1);
  const [localFiles, setLocalFiles] = useState<Record<string, File>>({});
  // Files whose upload failed, kept so "Try again" doesn't need the file picked again.
  const [failedFiles, setFailedFiles] = useState<Record<string, File>>({});
  const uploadControllers = useRef<Record<string, AbortController>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [rowErrors, setRowErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    let cancelled = false;
    const urlToken = new URLSearchParams(window.location.search).get("token");
    const savedToken = urlToken || loadStoredToken();
    // The token is a credential: keep it in storage, not in the address bar, history or referrers.
    if (urlToken) window.history.replaceState(null, "", registrationPath());

    (async () => {
      try {
        const nextRequirements = await getRequirements();
        if (cancelled) return;
        if (savedToken) {
          try {
            const existing = await getApplication(savedToken);
            if (cancelled) return;
            if (!existing.editable) {
              router.replace(statusPagePath(savedToken));
              return;
            }
            const existingData = fromStatus(existing);
            storeToken(savedToken);
            setToken(savedToken);
            setApplication(existing);
            setData(existingData);
            setSavedData(existingData);
            setResumed(true);
            setStep(existing.missing_documents.length ? 1 : 2);
          } catch (error) {
            // A stale saved token just means starting fresh; a bad link should say so.
            if (!(error instanceof ApiError && error.status === 404)) throw error;
            storeToken(null);
            if (urlToken) setFormError({ message: ERROR_MESSAGES.linkUnavailable, link: recoverLink });
          }
        }
        setRequirements(nextRequirements);
      } catch (error) {
        if (!cancelled) setLoadError(userMessage(error, ERROR_MESSAGES.requirements));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, loadAttempt]);

  useEffect(() => {
    if (!focusRequest) return;
    const firstInvalid = fieldOrder.find((field) => errors[field]);
    const element = firstInvalid && document.getElementById(firstInvalid);
    if (!element) return;
    element.focus();
    // Only re-run when a new focus is requested, not on every edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest]);

  const dirty = step === 0 && (savedData ? !sameRegistration(data, savedData) : Object.values(data).some((value) => value.trim()));
  const uploading = Object.keys(progress).length > 0;

  useEffect(() => {
    if (!dirty && !uploading) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, uploading]);

  // In-app links skip beforeunload, so ask before they discard unsaved work.
  useEffect(() => {
    if (!dirty && !uploading) return;
    const guard = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.origin !== window.location.origin) return;
      if (anchor.pathname === window.location.pathname) return;
      const message = uploading ? "An upload is still in progress. Leave this page and cancel it?" : "You have unsaved changes. Leave this page without saving?";
      if (!window.confirm(message)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("click", guard, true);
    return () => document.removeEventListener("click", guard, true);
  }, [dirty, uploading]);

  // Leaving the page cancels any upload still running.
  useEffect(() => {
    const controllers = uploadControllers.current;
    return () => Object.values(controllers).forEach((controller) => controller.abort());
  }, []);

  const updateData = (next: RegistrationData) => {
    if (next.email !== data.email) setConfirmingEmail(false);
    setData(next);
  };

  const showFieldErrors = (nextErrors: RegistrationErrors) => {
    setErrors(nextErrors);
    const invalid = fieldOrder.filter((field) => nextErrors[field]);
    if (!invalid.length) return false;
    setFormError({ message: ERROR_MESSAGES.validation, fields: invalid.map((field) => ({ id: field, label: fieldLabels[field] })) });
    setFocusRequest((request) => request + 1);
    return true;
  };

  const validateApplicant = () => {
    if (showFieldErrors(validateRegistration(data))) return false;
    setFormError(undefined);
    return true;
  };

  /** Saves step 1 if anything changed. Resolves true when it is safe to leave the step. */
  const saveApplicant = async (target: number, emailConfirmed = false) => {
    if (!validateApplicant() || busy) return false;
    if (token && savedData && sameRegistration(data, savedData)) return true;

    const emailChanged = !savedData || savedData.email.trim().toLowerCase() !== data.email.trim().toLowerCase();
    if (emailChanged && !emailConfirmed) {
      setPendingStep(target);
      setConfirmingEmail(true);
      return false;
    }

    setBusy(true);
    setFormError(undefined);
    try {
      if (token) {
        setApplication(await updateApplication(token, toRequest(data)));
      } else {
        const created = await createApplication(toRequest(data));
        storeToken(created.tracking_token);
        setToken(created.tracking_token);
        setApplication(await getApplication(created.tracking_token));
      }
      setSavedData(data);
      setConfirmingEmail(false);
      return true;
    } catch (error) {
      setConfirmingEmail(false);
      if (showFieldErrors(fieldErrorsFromApi(error))) return false;
      if (error instanceof ApiError && error.code === "APPLICATION_EXISTS") {
        setFormError({ message: ERROR_MESSAGES.applicationExists, link: recoverLink });
      } else if (error instanceof ApiError && error.status === 404) {
        storeToken(null);
        setToken(undefined);
        setSavedData(undefined);
        setFormError({ message: ERROR_MESSAGES.linkUnavailable, link: recoverLink });
      } else if (!token && isConnectionError(error)) {
        // The application may exist even though no answer came back. Creating
        // again would start a second one, so point to recovery instead.
        setFormError({ message: ERROR_MESSAGES.creationUnconfirmed, link: recoverLink });
      } else {
        setFormError({ message: userMessage(error) });
      }
      return false;
    } finally {
      setBusy(false);
    }
  };

  const goTo = (nextStep: number) => {
    setFormError(undefined);
    setStep(nextStep);
  };

  const navigate = async (target: number) => {
    if (target === step || busy) return;
    if (step === 0 && !(await saveApplicant(target))) return;
    goTo(target);
  };

  const confirmEmail = async () => {
    if (await saveApplicant(pendingStep, true)) goTo(pendingStep);
  };

  const changeEmail = () => {
    setConfirmingEmail(false);
    const input = document.getElementById("email") as HTMLInputElement | null;
    input?.focus();
    input?.select();
  };

  const canVisit = (index: number) => index === 0 || Boolean(token && application && (index === 1 || application.missing_documents.length === 0));

  const handleFile = async (document: DocumentRequirement, file: File) => {
    if (!token) return;
    if ((document.accepts.length && !document.accepts.includes(file.type)) || file.size > document.max_bytes) {
      setRowErrors((current) => ({ ...current, [document.code]: `Upload a ${describeAccepts(document.accepts)} file smaller than ${formatBytes(document.max_bytes)}.` }));
      return;
    }

    setRowErrors((current) => ({ ...current, [document.code]: undefined }));
    setFailedFiles((current) => withoutKey(current, document.code));
    setProgress((current) => ({ ...current, [document.code]: 0 }));
    const controller = new AbortController();
    uploadControllers.current[document.code] = controller;
    try {
      const status = await uploadDocument(token, document.code, file, {
        signal: controller.signal,
        onProgress: (fraction) => setProgress((current) => ({ ...current, [document.code]: fraction })),
      });
      setApplication(status);
      setLocalFiles((current) => ({ ...current, [document.code]: file }));
    } catch (error) {
      if (!isAbort(error)) {
        setFailedFiles((current) => ({ ...current, [document.code]: file }));
        setRowErrors((current) => ({ ...current, [document.code]: uploadErrorMessage(error, document) }));
      }
    } finally {
      delete uploadControllers.current[document.code];
      setProgress((current) => withoutKey(current, document.code));
    }
  };

  const cancelUpload = (document: DocumentRequirement) => uploadControllers.current[document.code]?.abort();

  const handleSubmit = async () => {
    if (!token || busy) return;
    setBusy(true);
    setFormError(undefined);
    try {
      setApplication(await submitApplication(token));
      setStep(3);
    } catch (error) {
      if (error instanceof ApiError && error.code === "MISSING_DOCUMENTS") {
        setApplication(await getApplication(token).catch(() => application));
        const missing = (error.details.missing_documents as string[] | undefined) ?? [];
        const labels = missing.map((code) => requirements?.documents.find((document) => document.code === code)?.label ?? code);
        setFormError({ message: `Still missing: ${labels.join(", ")}.` });
      } else if (isConnectionError(error)) {
        // No answer came back, so the submission may have gone through. Check before offering a retry.
        try {
          const current = await getApplication(token);
          setApplication(current);
          if (current.submitted_at || !current.editable) setStep(3);
          else setFormError({ message: userMessage(error) });
        } catch {
          setFormError({ message: ERROR_MESSAGES.submissionUnconfirmed, link: { href: statusPagePath(token), label: "Check application status" } });
        }
      } else {
        setFormError({ message: userMessage(error) });
      }
    } finally {
      setBusy(false);
    }
  };

  const startOver = () => {
    storeToken(null);
    window.history.replaceState(null, "", registrationPath());
    setToken(undefined);
    setApplication(undefined);
    setData(emptyRegistration);
    setSavedData(undefined);
    setResumed(false);
    setErrors({});
    setFormError(undefined);
    setConfirmingEmail(false);
    setLocalFiles({});
    setFailedFiles({});
    setRowErrors({});
    setStep(0);
  };

  const documents = application?.required_documents.length ? application.required_documents : requirements?.documents ?? [];

  let content: ReactNode;
  if (loadError) content = <LoadState message={loadError} onRetry={() => { setLoadError(undefined); setLoadAttempt((attempt) => attempt + 1); }} />;
  else if (!requirements) content = <LoadState message="Loading application form…" />;
  else if (step === 0 || !token || !application) content = <ApplicantForm data={data} onChange={updateData} errors={errors} requirements={requirements} formError={formError} busy={busy} confirmingEmail={confirmingEmail} onConfirmEmail={confirmEmail} onChangeEmail={changeEmail} onNext={() => navigate(1)} />;
  else if (step === 1) content = <DocumentsStep token={token} documents={documents} application={application} localFiles={localFiles} failedFiles={failedFiles} progress={progress} rowErrors={rowErrors} onFile={handleFile} onCancel={cancelUpload} onBack={() => goTo(0)} onNext={() => goTo(2)} />;
  else content = <ReviewStep data={data} requirements={requirements} documents={documents} application={application} busy={busy} formError={formError} onBack={() => goTo(1)} onEditApplicant={() => goTo(0)} onEditDocuments={() => goTo(1)} onSubmit={handleSubmit} />;

  return (
    <MerchantBackground>
      <Sidebar step={step} canVisit={canVisit} onSelect={navigate} />
      <div className="relative z-10 min-w-0 flex-1">
        <TopBar step={Math.min(step, 2)} total={3} title={step < 3 ? ["Applicant Information", "Required Documents", "Review & Submit"][step] : undefined} />
        {step === 3 && token && application ? (
          <RegistrationSuccess token={token} application={application} />
        ) : (
          <div className="px-6 pb-8 pt-6 sm:px-10 lg:px-12 lg:pt-14">
            <div className="mx-auto max-w-[783px]">
              {resumed && application && <ResumeBanner reference={application.reference} email={application.contact_email} onStartOver={startOver} />}
              {step === 0 && !token && requirements && !loadError && <RegistrationIntro documents={requirements.documents} />}
              {content}
              {step === 0 && !token && requirements && <p className="mt-4 text-center text-xs text-[#717182]">Already started an application? <Link href={RECOVERY_PATH} className="-my-2 inline-block py-2 font-semibold text-[#0c3283] hover:underline">Continue where you left off</Link></p>}
            </div>
          </div>
        )}
      </div>
    </MerchantBackground>
  );
}

export default function MerchantFlow() {
  return <RegistrationFlow />;
}

export { MerchantBackground, LoadState };
