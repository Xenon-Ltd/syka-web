"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";

import SykaLogo from "@/assets/images/syka-logo.svg";
import MerchantWatermark from "@/assets/images/merchant-watermark.png";
import MerchantSuccess from "@/assets/images/merchant-success.svg";
import applicantActive from "@/assets/icons/merchant/applicant-active.svg";
import applicantMuted from "@/assets/icons/merchant/applicant-muted.svg";
import docsMuted from "@/assets/icons/merchant/docs-muted.svg";
import chevronDown from "@/assets/icons/merchant/chevron-down.svg";
import uploadIcon from "@/assets/icons/merchant/upload.svg";
import editIcon from "@/assets/icons/merchant/edit.svg";
import chevronIcon from "@/assets/icons/merchant/chevron.svg";

type RegistrationData = {
  firstName: string;
  lastName: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  country: string;
  audience: string;
};

type RegistrationErrors = Partial<Record<keyof RegistrationData, string>>;
type DocumentFiles = Record<string, File>;

const registrationSteps = ["Applicant Information", "Background Documents", "Review & Submit"];

const registrationIcons = [applicantActive, docsMuted, applicantMuted];

const documentItems = [
  "Business Registration Certificate",
  "Tax ID Certificate",
  "Owner / Director Government-Issued ID",
  "Proof of Address (utility bill <3 months)",
];

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

function Sidebar({ step }: { step: number }) {
  return (
    <aside className="relative z-10 flex w-full shrink-0 flex-col bg-[#edf5fb] px-6 py-7 sm:px-8 sm:py-10 lg:min-h-screen lg:w-[401px]">
      <Link href="/" aria-label="Go to Syka home" className="w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c3283]">
        <Image src={SykaLogo} alt="Syka" width={94} height={38} className="h-[38px] w-[94px] object-contain object-left" priority />
      </Link>

      <div className="mt-10 max-w-[337px] lg:mt-[100px]">
        <h1 className="max-w-[337px] text-[30px] leading-[1.17] tracking-[1px] text-[#1f1a0b] sm:text-[32px]">
          Just a little more information needed to complete your company registration.
        </h1>
        <p className="mt-3 text-base tracking-[0.5px] text-[#1f1a0b]">Start your company in minutes.</p>
      </div>

      <nav aria-label="Registration progress" className="mt-9 lg:mt-7">
        <ol className="relative space-y-2">
          {registrationSteps.map((label, index) => {
            const isActive = index <= step;
            const icon = registrationIcons[index];
            return (
              <li key={label} className="relative flex min-h-[48px] items-center gap-3 px-3 py-2">
                {index < registrationSteps.length - 1 && (
                  <span className={`absolute left-[24px] top-[42px] h-8 border-l-2 border-dashed ${index < step ? "border-[#0c3283]" : "border-[#d1d5dc]"}`} aria-hidden="true" />
                )}
                <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full ${isActive ? "bg-[#0c3283]" : "border border-[#ececf0] bg-[#d1d5dc]"}`}>
                  <IconImage src={icon} className="size-3" />
                </span>
                <span className={`text-[13px] leading-5 ${isActive ? "font-semibold text-[#0c3283]" : "text-[#3d4756]"}`}>{label}</span>
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
      <div className="flex h-[75px] items-start justify-end px-6 pt-7 sm:px-8 lg:px-8">
        <p className="text-right text-[13px] tracking-[0.5px] text-[#3d4756]">Having troubles? <a href="mailto:support@sykabank.com" className="font-semibold text-[#0c3283] hover:underline">Get Help</a></p>
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

function Field({ id, label, value, onChange, placeholder, type = "text", required = false, error }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: InputHTMLAttributes<HTMLInputElement>["type"]; required?: boolean; error?: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
      <span>{label}{required ? "*" : ""}</span>
      <input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="h-12 rounded-[10px] border-0 bg-white px-3 text-sm font-normal text-[#1f1a0b] outline-none ring-0 placeholder:text-[#717182] focus:ring-2 focus:ring-[#0c3283]/20" />
      {error && <span id={`${id}-error`} role="alert" className="text-xs font-normal text-red-700">{error}</span>}
    </label>
  );
}

function SelectField({ id, label, value, onChange, options, placeholder, required = false, error }: { id: string; label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string; required?: boolean; error?: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
      <span>{label}{required ? "*" : ""}</span>
      <span className="relative">
        <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="h-12 w-full appearance-none rounded-[10px] border-0 bg-white px-3 pr-10 text-sm font-normal text-[#717182] outline-none focus:ring-2 focus:ring-[#0c3283]/20">
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <IconImage src={chevronDown} className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2" />
      </span>
      {error && <span id={`${id}-error`} role="alert" className="text-xs font-normal text-red-700">{error}</span>}
    </label>
  );
}

function ApplicantForm({ data, setData, errors, onBack, onNext }: { data: RegistrationData; setData: (data: RegistrationData) => void; errors: RegistrationErrors; onBack: () => void; onNext: () => void }) {
  const update = (key: keyof RegistrationData) => (value: string) => setData({ ...data, [key]: value });
  return (
    <form noValidate onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onNext(); }} className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label="First Name" required value={data.firstName} error={errors.firstName} onChange={update("firstName")} placeholder="e.g., John" />
        <Field id="lastName" label="Last Name" required value={data.lastName} error={errors.lastName} onChange={update("lastName")} placeholder="e.g., Doe" />
        <Field id="businessName" label="Business Name" required value={data.businessName} error={errors.businessName} onChange={update("businessName")} />
        <SelectField id="businessType" label="Business Type" required value={data.businessType} error={errors.businessType} onChange={update("businessType")} options={["LLC", "Sole proprietorship", "Partnership", "Corporation"]} placeholder="Select category" />
        <Field id="email" label="Email Address" required value={data.email} error={errors.email} onChange={update("email")} type="email" />
        <Field id="phone" label="Phone Number" required value={data.phone} error={errors.phone} onChange={update("phone")} />
        <Field id="country" label="Country" required value={data.country} error={errors.country} onChange={update("country")} />
        <SelectField id="audience" label="Target Audience Type" required value={data.audience} error={errors.audience} onChange={update("audience")} options={["Businesses", "Individuals", "Businesses and individuals"]} placeholder="Select type" />
      </div>
      <FlowActions onBack={onBack} onNext={onNext} backDisabled />
    </form>
  );
}

const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
const ACCEPTED_DOCUMENT_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);

function DocumentsStep({ files, setFiles, error, setError, onBack, onNext }: { files: DocumentFiles; setFiles: (files: DocumentFiles) => void; error?: string; setError: (error?: string) => void; onBack: () => void; onNext: () => void }) {
  const uploaded = Object.keys(files).length;
  const handleUpload = (label: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_DOCUMENT_TYPES.has(file.type) || file.size > MAX_DOCUMENT_SIZE) {
      setError("Upload a PDF, JPG, or PNG file smaller than 10MB.");
      event.target.value = "";
      return;
    }

    setFiles({ ...files, [label]: file });
    setError(undefined);
  };
  return (
    <form noValidate onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (uploaded < documentItems.length) { setError("Upload all four required documents before continuing."); return; } onNext(); }} className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-base text-[#101828]">{uploaded} of 4 required documents uploaded</p>
        <p className="text-xs text-[#8893a4]">{uploaded * 25}% complete</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5e7eb]" role="progressbar" aria-label="Document upload progress" aria-valuemin={0} aria-valuemax={documentItems.length} aria-valuenow={uploaded}>
        <div className="h-full rounded-full bg-[#3b82f6] transition-[width]" style={{ width: `${uploaded * 25}%` }} />
      </div>
      <div className="mt-5 space-y-3">
        {documentItems.map((label, index) => (
          <div key={label} className="flex items-center justify-between gap-4 rounded-[10px] bg-white p-4">
            <div><p className="text-sm font-semibold text-[#101828]">{label}</p><p className="mt-1 text-xs text-[#717182]">{files[label]?.name ?? "PDF, JPG, PNG · Max 10MB"}</p></div>
            <label className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-black/10 bg-white px-4 py-2 text-xs text-[#0a0a0a] transition hover:bg-[#f7f7f7]">
              <IconImage src={uploadIcon} className="size-3" />
              {files[label] ? "Replace" : "Upload"}
              <input type="file" name={`document-${index}`} accept="application/pdf,image/jpeg,image/png" className="sr-only" onChange={handleUpload(label)} aria-label={`Upload ${label}`} />
            </label>
          </div>
        ))}
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      <FlowActions onBack={onBack} onNext={onNext} nextLabel="Review" />
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

function ReviewStep({ data, files, onBack, onEditApplicant, onEditDocuments, onSubmit }: { data: RegistrationData; files: DocumentFiles; onBack: () => void; onEditApplicant: () => void; onEditDocuments: () => void; onSubmit: () => void }) {
  const values = [["Full Name", `${data.firstName} ${data.lastName}`.trim()], ["Business Name", data.businessName], ["Business Type", data.businessType], ["Phone", data.phone], ["Email", data.email], ["Country", data.country], ["Target Audience", data.audience]];
  return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(); }} className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
      <div className="space-y-4">
        <ReviewSection title="Applicant Information" onEdit={onEditApplicant}>
          <dl className="space-y-4 text-sm">{values.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-6"><dt className="text-[#717182]">{label}</dt><dd className="text-right font-medium text-[#0a0a0a]">{value || "Not provided"}</dd></div>)}</dl>
        </ReviewSection>
        <ReviewSection title="Required Documents" onEdit={onEditDocuments}>
          <dl className="space-y-4 text-sm">{documentItems.map((label) => <div key={label} className="flex items-center justify-between gap-6"><dt className="text-[#717182]">{label.replace("Business Registration Certificate", "Business Reg").replace("Tax ID Certificate", "Tax Cert").replace("Owner / Director Government-Issued ID", "Director ID")}</dt><dd className="text-right font-medium text-[#0a0a0a]">{files[label]?.name || "Not uploaded"}</dd></div>)}</dl>
        </ReviewSection>
      </div>
      <FlowActions onBack={onBack} nextLabel="Submit" nextDisabled />
      <p className="mt-3 text-right text-xs text-[#717182]">Submission will be enabled when the registration service is connected.</p>
    </form>
  );
}

function RegistrationSuccess() {
  return (
    <div className="flex min-h-[calc(100vh-75px)] items-center justify-center px-6 py-10 sm:px-10">
      <section className="flex w-full max-w-[559px] flex-col items-center rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-6 py-8 text-center sm:px-10">
        <h2 className="text-lg font-semibold text-[#364153]">Congratulations 🎉</h2>
        <p className="mt-4 max-w-[338px] text-sm leading-[1.35] text-[#717b8e]">Your application has been successfully submitted. Our team will get in touch with you soon to guide you through the next steps.</p>
        <Image src={MerchantSuccess} alt="Celebration" width={300} height={300} className="my-8 size-[240px] rounded-[28px] object-contain sm:size-[300px]" />
        <Link href="/business" className="rounded-[14px] bg-[#0c3283] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082762]">Back to website</Link>
      </section>
    </div>
  );
}

function RegistrationFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RegistrationData>({ firstName: "", lastName: "", businessName: "", businessType: "", email: "", phone: "", country: "", audience: "" });
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [documentError, setDocumentError] = useState<string>();
  const [files, setFiles] = useState<DocumentFiles>({});

  const validateApplicant = () => {
    const nextErrors: RegistrationErrors = {};
    const requiredFields: Array<keyof RegistrationData> = ["firstName", "lastName", "businessName", "businessType", "email", "phone", "country", "audience"];

    for (const field of requiredFields) {
      if (!data[field].trim()) nextErrors[field] = "This field is required.";
    }

    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleApplicantNext = () => {
    if (validateApplicant()) setStep(1);
  };

  const handleDocumentsNext = () => {
    if (Object.keys(files).length === documentItems.length) setStep(2);
  };

  return (
    <MerchantBackground>
      <Sidebar step={step} />
      <div className="relative z-10 min-w-0 flex-1">
        <TopBar step={Math.min(step, 2)} total={3} title={step < 3 ? ["Applicant Information", "Required Documents", "Review & Submit"][step] : undefined} />
        {step === 3 ? <RegistrationSuccess /> : <div className="px-6 pb-8 pt-12 sm:px-10 lg:px-12 lg:pt-14"><div className="mx-auto max-w-[783px]">{step === 0 && <ApplicantForm data={data} setData={setData} errors={errors} onBack={() => undefined} onNext={handleApplicantNext} />}{step === 1 && <DocumentsStep files={files} setFiles={setFiles} error={documentError} setError={setDocumentError} onBack={() => { setDocumentError(undefined); setStep(0); }} onNext={handleDocumentsNext} />}{step === 2 && <ReviewStep data={data} files={files} onBack={() => setStep(1)} onEditApplicant={() => setStep(0)} onEditDocuments={() => setStep(1)} onSubmit={() => setStep(3)} />}</div></div>}
      </div>
    </MerchantBackground>
  );
}

export default function MerchantFlow() {
  return <RegistrationFlow />;
}
