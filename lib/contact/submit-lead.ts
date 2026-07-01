import type { ContactApiResponse, ContactLeadPayload } from "./types";

export async function submitContactLead(
  payload: ContactLeadPayload
): Promise<ContactApiResponse> {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      success: false,
      message:
        "We couldn't reach our server. Please check your connection and try again.",
    };
  }

  let data: ContactApiResponse;

  try {
    data = (await response.json()) as ContactApiResponse;
  } catch {
    return {
      success: false,
      message: "We received an unexpected response. Please try again.",
    };
  }

  if (!response.ok && data.success === false) {
    return data;
  }

  if (!response.ok) {
    return {
      success: false,
      message: "Something went wrong while submitting your request. Please try again.",
    };
  }

  return data;
}
