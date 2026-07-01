import type { ContactLeadPayload } from "@/lib/contact/types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Denver",
  }).format(date);
}

function renderRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #ece5d8;vertical-align:top;width:38%;">
        <span style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B7355;">
          ${escapeHtml(label)}
        </span>
      </td>
      <td style="padding:14px 0 14px 16px;border-bottom:1px solid #ece5d8;vertical-align:top;color:#1A1714;font-size:15px;line-height:1.5;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

export function buildLeadNotificationSubject(lead: ContactLeadPayload): string {
  return `New Lead: ${lead.name} — ${lead.propertyType}`;
}

export function buildLeadNotificationHtml(
  lead: ContactLeadPayload,
  submittedAt = new Date()
): string {
  const features =
    lead.features.length > 0 ? lead.features.join(", ") : "None selected";

  const rows = [
    renderRow("Full Name", lead.name),
    renderRow("Email Address", lead.email),
    renderRow("Phone Number", lead.phone),
    renderRow("Property Type", lead.propertyType),
    renderRow("Timeline", lead.timeline),
    renderRow("Bedrooms", lead.bedrooms),
    renderRow("Preferred Area", lead.area),
    renderRow("Target Budget", lead.budget),
    renderRow("Desired Features", features),
  ].join("");

  const commentsSection = lead.comments
    ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
        <tr>
          <td style="padding:18px 20px;background:#faf7f1;border:1px solid #e8dcc6;border-radius:14px;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B7355;">
              Comments
            </p>
            <p style="margin:0;color:#1A1714;font-size:15px;line-height:1.6;white-space:pre-wrap;">
              ${escapeHtml(lead.comments)}
            </p>
          </td>
        </tr>
      </table>
    `
    : "";

  const ctaSection = `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:32px;">
        <tr>
          <td align="center">
            <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
              <tr>
                <td align="center" style="border-radius:12px; background-color:#1A1714; border:1px solid #A9803E; box-shadow:0 4px 12px rgba(26,23,20,0.15);">
                  <a href="mailto:${escapeHtml(lead.email)}?subject=Re: ${encodeURIComponent(buildLeadNotificationSubject(lead))}"
                     style="display:inline-block;padding:16px 36px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:12px;letter-spacing:0.04em;font-family:Arial,Helvetica,sans-serif;text-align:center;">
                    Reply to ${escapeHtml(lead.email)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Lead Received</title>
  </head>
  <body style="margin:0;padding:0;background:#f3efe7;font-family:Arial,Helvetica,sans-serif;color:#1A1714;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3efe7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e8dcc6;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(26,23,20,0.08);">
            <tr>
              <td style="padding:28px 28px 22px;background:linear-gradient(135deg,#1A1714 0%,#2A2218 100%);">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#DDC7A1;">
                  Daeluxe Real Estate
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;">
                  New Lead Received
                </h1>
                <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.78);">
                  Submitted ${escapeHtml(formatSubmittedAt(submittedAt))}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#5C5954;">
                  A new consultation request was submitted through the landing page form.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${rows}
                </table>
                ${commentsSection}
                ${ctaSection}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;border-top:1px solid #ece5d8;background:#faf7f1;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#8B7355;">
                  This notification was generated automatically by the Daeluxe website lead form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export function buildLeadNotificationText(
  lead: ContactLeadPayload,
  submittedAt = new Date()
): string {
  const lines = [
    "New Lead Received",
    `Submitted: ${formatSubmittedAt(submittedAt)}`,
    "",
    `Full Name: ${lead.name}`,
    `Email Address: ${lead.email}`,
    `Phone Number: ${lead.phone}`,
    `Property Type: ${lead.propertyType}`,
    `Timeline: ${lead.timeline}`,
    `Bedrooms: ${lead.bedrooms}`,
    `Preferred Area: ${lead.area}`,
    `Target Budget: ${lead.budget}`,
    `Desired Features: ${lead.features.length > 0 ? lead.features.join(", ") : "None selected"}`,
  ];

  if (lead.comments) {
    lines.push("", "Comments:", lead.comments);
  }

  lines.push("", "---", `Reply to this lead: ${lead.email}`);

  return lines.join("\n");
}
