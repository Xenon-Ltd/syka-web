"use client";

import { SUPPORT_EMAIL } from "@/lib/support-content";
import { useState } from "react";

const fieldClass =
  "w-full rounded-[14px] border-[0.667px] border-black/10 bg-[#F9F4F1] px-[16.667px] text-[15px] text-[#1D2739] outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] focus:border-xenon-brand focus:ring-2 focus:ring-xenon-brand/20";
const labelClass = "text-[13px] leading-[19.5px] font-medium text-[#344054]";

// There is no public support-ticket endpoint, so the form composes an email
// to the support inbox in the visitor's mail app.
export default function ContactSupport() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const subject = `Support request from ${value("name")}`;
    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Country: ${value("country")}`,
      "",
      value("message"),
    ].join("\n");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact-support" aria-labelledby="contact-support-heading" className="mx-auto mt-16 max-w-[1268px] scroll-mt-8 px-5 sm:px-6 lg:mt-[84px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[525px] flex-col gap-[15px]">
          <h2 id="contact-support-heading" className="text-[34px] leading-[1.1] font-bold tracking-[0.72px] text-[#344054] lg:text-5xl lg:leading-[48px]">
            Contact Support
          </h2>
          <p className="max-w-[445px] text-base leading-[1.7] font-light text-[#667185] lg:text-lg lg:leading-[30.6px]">
            Tell us how we can help and our support team can help you find the right solution.
          </p>
        </div>

        <div className="w-full rounded-3xl border-[0.667px] border-black/5 bg-white p-6 sm:p-[40.667px] lg:w-[633px] lg:shrink-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="pb-1 text-[22px] leading-[33px] font-bold text-[#1D2739]">Send us a message</h3>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="support-name" className={labelClass}>*Full Name</label>
                <input id="support-name" name="name" required autoComplete="name" placeholder="Jane" className={`${fieldClass} h-12`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="support-email" className={labelClass}>*Email</label>
                <input id="support-email" name="email" type="email" required autoComplete="email" placeholder="jane@yourbank.com" className={`${fieldClass} h-12`} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="support-country" className={labelClass}>*Country</label>
              <input id="support-country" name="country" required autoComplete="country-name" placeholder="Please enter your country" className={`${fieldClass} h-12`} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="support-message" className={labelClass}>How can we help?</label>
              <textarea
                id="support-message"
                name="message"
                rows={4}
                placeholder="Tell us what you need help with. Include your payment reference if you have one."
                className={`${fieldClass} h-[115px] resize-y py-[12.667px] leading-[22.5px]`}
              />
            </div>

            <button
              type="submit"
              className="w-[140px] rounded-lg bg-xenon-primary px-5 py-3 text-base leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#1B1747] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-primary"
            >
              Submit
            </button>

            <p role="status" className="text-sm leading-relaxed text-[#667185]">
              {sent ? (
                <>
                  Your email app should now open with your message ready to send. If it didn&apos;t, email us at{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-xenon-brand underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>.
                </>
              ) : null}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
