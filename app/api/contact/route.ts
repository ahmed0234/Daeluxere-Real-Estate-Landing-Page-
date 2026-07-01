import { NextResponse } from "next/server";
import { validateContactLead } from "@/lib/contact/validation";
import { sendLeadNotificationEmail } from "@/lib/email/send-lead-notification";
import type { ContactLeadPayload } from "@/lib/contact/types";

export async function POST(request: Request) {
  let body: Partial<ContactLeadPayload>;

  try {
    body = (await request.json()) as Partial<ContactLeadPayload>;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body. Please try again.",
      },
      { status: 400 },
    );
  }

  const result = validateContactLead(body);

  if (!result.valid || !result.payload) {
    return NextResponse.json(
      {
        success: false,
        message: "Please correct the highlighted fields and try again.",
        errors: result.errors,
      },
      { status: 422 },
    );
  }

  try {
    await sendLeadNotificationEmail(result.payload);
  } catch (error) {
    console.error("[contact] Lead notification email failed:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your request right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }

  // Send lead data to Leads Hub API
  try {
    const secretKey = process.env.LEADS_HUB_SECRET;
    if (!secretKey) {
      console.warn(
        "[contact] LEADS_HUB_SECRET environment variable is missing",
      );
    }

    const leadsHubResponse = await fetch(
      "https://lead-hub-gamma-gilt.vercel.app/api/leads/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secretKey,
          FormDataJson: result.payload,
        }),
      },
    );

    if (!leadsHubResponse.ok) {
      const errorText = await leadsHubResponse.text().catch(() => "");
      console.error(
        `[contact] Leads Hub API submission failed with status: ${leadsHubResponse.status} ${leadsHubResponse.statusText}. Response: ${errorText}`,
      );
    }
  } catch (error) {
    console.error("[contact] Leads Hub API submission network failure:", error);
  }

  return NextResponse.json({
    success: true,
    message: "Your consultation request has been received.",
  });
}
