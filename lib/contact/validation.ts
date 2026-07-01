import type { ContactFieldErrors, ContactLeadPayload } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const INVALID_PHONE_PATTERNS = [
  /^0+$/,
  /^1+$/,
  /^(\d)\1{9}$/,
  /^1234567890$/,
  /^0123456789$/,
];

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }

  return digits;
}

export function formatPhoneForDisplay(digits: string): string {
  if (digits.length !== 10) return digits;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

export function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value);

  if (digits.length !== 10) return false;

  const areaCode = digits.slice(0, 3);
  if (areaCode.startsWith("0") || areaCode.startsWith("1")) return false;

  return !INVALID_PHONE_PATTERNS.some((pattern) => pattern.test(digits));
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateContactLead(
  data: Partial<ContactLeadPayload>
): { valid: boolean; errors: ContactFieldErrors; payload?: ContactLeadPayload } {
  const errors: ContactFieldErrors = {};

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const propertyType = data.propertyType?.trim() ?? "";
  const timeline = data.timeline?.trim() ?? "";
  const bedrooms = data.bedrooms?.trim() ?? "";
  const area = data.area?.trim() ?? "";
  const budget = data.budget?.trim() ?? "";
  const comments = data.comments?.trim() ?? "";
  const features = Array.isArray(data.features)
    ? data.features.filter((item) => typeof item === "string" && item.trim())
    : [];

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidPhone(phone)) {
    errors.phone = "Please enter a valid 10-digit US phone number.";
  }

  if (!propertyType) errors.propertyType = "Please select a property type.";
  if (!timeline) errors.timeline = "Please select a timeline.";
  if (!bedrooms) errors.bedrooms = "Please select a bedroom count.";
  if (!area) errors.area = "Please select a preferred area.";
  if (!budget) errors.budget = "Please select a target budget.";

  if (comments.length > 2000) {
    errors.comments = "Comments must be 2,000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const normalizedPhone = normalizePhone(phone);

  return {
    valid: true,
    errors,
    payload: {
      name,
      email: email.toLowerCase(),
      phone: formatPhoneForDisplay(normalizedPhone),
      propertyType,
      timeline,
      bedrooms,
      area,
      features,
      budget,
      ...(comments ? { comments } : {}),
    },
  };
}
