// Form-side model of the merchant registration step: field data, validation,
// and translation to and from the public application API.

import { ApiError, dialCode, type ApplicationRequest, type ApplicationStatus } from "@/lib/merchant-applications";

export type RegistrationData = {
  firstName: string;
  lastName: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  country: string;
  audience: string;
};

export type RegistrationErrors = Partial<Record<keyof RegistrationData, string>>;

export const emptyRegistration: RegistrationData = { firstName: "", lastName: "", businessName: "", businessType: "", email: "", phone: "", country: "", audience: "" };

// Also the on-screen order, used to focus the first invalid field.
export const fieldOrder: Array<keyof RegistrationData> = ["firstName", "lastName", "businessName", "businessType", "email", "country", "phone", "audience"];

export const fieldLabels: Record<keyof RegistrationData, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  businessName: "Business Name",
  businessType: "Business Type",
  email: "Email Address",
  country: "Country",
  phone: "Phone Number",
  audience: "Target Audience Type",
};

const apiFieldToFormField: Record<string, keyof RegistrationData> = {
  first_name: "firstName",
  last_name: "lastName",
  business_name: "businessName",
  business_type: "businessType",
  email: "email",
  phone: "phone",
  country: "country",
  target_audience: "audience",
};

const validatorTagMessages: Record<string, string> = {
  required: "This field is required.",
  email: "Enter a valid email address.",
  len: "Select an option from the list.",
  oneof: "Select an option from the list.",
  e164: "Enter a valid phone number, including the country code.",
  max: "This is too long.",
  min: "This is too short.",
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

/** Every field is required: Syka collects the fullest picture of each applicant. */
export function validateRegistration(data: RegistrationData): RegistrationErrors {
  const errors: RegistrationErrors = {};

  for (const field of fieldOrder) {
    if (!data[field].trim()) errors[field] = "This field is required.";
  }

  if (data.email && !EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  const phone = data.phone.trim();
  if (phone && (!phone.startsWith("+") || !PHONE_PATTERN.test(phone) || phone === dialCode(data.country))) {
    errors.phone = "Enter your full number, starting with the country code (e.g. +233).";
  }

  return errors;
}

/** Field errors from a backend validation failure, in form terms. */
export function fieldErrorsFromApi(error: unknown): RegistrationErrors {
  const errors: RegistrationErrors = {};
  if (!(error instanceof ApiError)) return errors;
  for (const [field, tag] of Object.entries(error.fieldTags)) {
    const formField = apiFieldToFormField[field];
    if (formField) errors[formField] = validatorTagMessages[tag] ?? "Check this field.";
  }
  return errors;
}

export function toRequest(data: RegistrationData): ApplicationRequest {
  return {
    first_name: data.firstName.trim(),
    last_name: data.lastName.trim(),
    business_name: data.businessName.trim(),
    business_type: data.businessType,
    email: data.email.trim(),
    phone: data.phone.replace(/[\s()-]/g, "") || undefined,
    country: data.country,
    target_audience: data.audience || undefined,
  };
}

export function fromStatus(status: ApplicationStatus): RegistrationData {
  const [firstName = "", ...rest] = status.contact_name.trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
    businessName: status.business_name,
    businessType: status.business_type,
    email: status.contact_email,
    phone: status.contact_phone ?? "",
    country: status.country,
    audience: status.target_audience ?? "",
  };
}

export const sameRegistration = (a: RegistrationData, b: RegistrationData) => JSON.stringify(toRequest(a)) === JSON.stringify(toRequest(b));
