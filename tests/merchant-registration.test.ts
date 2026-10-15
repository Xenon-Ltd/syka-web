import { describe, expect, it } from "vitest";

import { ApiError, type ApplicationStatus } from "@/lib/merchant-applications";
import {
  emptyRegistration,
  fieldErrorsFromApi,
  fieldOrder,
  fromStatus,
  sameRegistration,
  toRequest,
  validateRegistration,
  type RegistrationData,
} from "@/lib/merchant-registration";

const valid: RegistrationData = {
  firstName: "Ama",
  lastName: "Mensah",
  businessName: "Mensah Traders",
  businessType: "sole_proprietor",
  email: "ama@example.com",
  phone: "+233 54 570 7532",
  country: "GH",
  audience: "consumers",
};

describe("validateRegistration", () => {
  it("accepts a complete application", () => {
    expect(validateRegistration(valid)).toEqual({});
  });

  it("requires every field", () => {
    const errors = validateRegistration(emptyRegistration);
    expect(Object.keys(errors).sort()).toEqual([...fieldOrder].sort());
  });

  it("treats whitespace as empty", () => {
    expect(validateRegistration({ ...valid, businessName: "   " }).businessName).toBe("This field is required.");
  });

  it("rejects a malformed email", () => {
    expect(validateRegistration({ ...valid, email: "ama@example" }).email).toBe("Enter a valid email address.");
  });

  it.each([
    ["no country code", "054 570 7532"],
    ["only the dialling code", "+233"],
    ["letters", "+233 call me"],
  ])("rejects a phone number with %s", (_, phone) => {
    expect(validateRegistration({ ...valid, phone }).phone).toMatch(/country code/);
  });
});

describe("fieldErrorsFromApi", () => {
  it("maps backend validator tags to form fields", () => {
    const error = new ApiError(
      "Key: 'PublicApplicationRequest.Phone' Error:Field validation for 'Phone' failed on the 'e164' tag",
      400,
      "VALIDATION_ERROR",
    );
    expect(fieldErrorsFromApi(error)).toEqual({ phone: "Enter a valid phone number, including the country code." });
  });

  it("ignores fields the form doesn't have and non-API errors", () => {
    const error = new ApiError("Key: 'PublicApplicationRequest.City' failed on the 'max' tag", 400, "VALIDATION_ERROR");
    expect(fieldErrorsFromApi(error)).toEqual({});
    expect(fieldErrorsFromApi(new Error("boom"))).toEqual({});
  });
});

describe("toRequest and fromStatus", () => {
  it("trims text and strips phone formatting", () => {
    expect(toRequest({ ...valid, firstName: " Ama ", phone: "+233 (54) 570-7532" })).toMatchObject({ first_name: "Ama", phone: "+233545707532" });
  });

  it("round-trips through a status response", () => {
    const status = {
      contact_name: "Ama Serwaa Mensah",
      business_name: valid.businessName,
      business_type: valid.businessType,
      contact_email: valid.email,
      contact_phone: "+233545707532",
      country: valid.country,
      target_audience: valid.audience,
    } as ApplicationStatus;
    const data = fromStatus(status);
    expect(data).toMatchObject({ firstName: "Ama", lastName: "Serwaa Mensah" });
    expect(sameRegistration(data, { ...data, phone: "+233 54 570 7532" })).toBe(true);
    expect(sameRegistration(data, { ...data, email: "other@example.com" })).toBe(false);
  });
});
