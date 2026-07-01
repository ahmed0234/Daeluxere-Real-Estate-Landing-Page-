export interface ContactLeadPayload {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  timeline: string;
  bedrooms: string;
  area: string;
  features: string[];
  budget: string;
  comments?: string;
}

export type ContactFieldKey = keyof ContactLeadPayload;

export type ContactFieldErrors = Partial<Record<ContactFieldKey | "form", string>>;

export interface ContactApiSuccess {
  success: true;
  message: string;
}

export interface ContactApiError {
  success: false;
  message: string;
  errors?: ContactFieldErrors;
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
