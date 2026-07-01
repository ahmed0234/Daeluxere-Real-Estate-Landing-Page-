import type { ContactLeadPayload } from "@/lib/contact/types";
import { getEmailEnvConfig } from "./env";
import {
  buildLeadNotificationHtml,
  buildLeadNotificationSubject,
  buildLeadNotificationText,
} from "./templates/lead-notification";
import { getMailTransporter } from "./transporter";

interface SendResult {
  recipient: string;
  messageId: string;
}

/**
 * Sends the lead notification email to all configured recipients in parallel.
 * Throws if any recipient delivery fails after logging detailed errors.
 */
export async function sendLeadNotificationEmail(
  lead: ContactLeadPayload
): Promise<SendResult[]> {
  const { user, recipients } = getEmailEnvConfig();
  const transporter = getMailTransporter();
  const submittedAt = new Date();

  const subject = buildLeadNotificationSubject(lead);
  const html = buildLeadNotificationHtml(lead, submittedAt);
  const text = buildLeadNotificationText(lead, submittedAt);

  const results = await Promise.allSettled(
    recipients.map(async (recipient) => {
      const info = await transporter.sendMail({
        from: `"${lead.name.replace(/"/g, '\\"')}" <${user}>`,
        to: recipient,
        replyTo: lead.email,
        subject,
        text,
        html,
      });

      return {
        recipient,
        messageId: info.messageId,
      };
    })
  );

  const successes: SendResult[] = [];
  const failures: Array<{ recipient: string; error: unknown }> = [];

  results.forEach((result, index) => {
    const recipient = recipients[index];

    if (result.status === "fulfilled") {
      successes.push(result.value);
      console.info(
        `[email] Lead notification sent to ${recipient} (${result.value.messageId})`
      );
      return;
    }

    failures.push({ recipient, error: result.reason });
    console.error(
      `[email] Failed to send lead notification to ${recipient}:`,
      result.reason
    );
  });

  if (failures.length > 0) {
    const failedRecipients = failures.map(({ recipient }) => recipient).join(", ");
    throw new Error(
      `Lead notification partially failed. Delivered: ${successes.length}/${recipients.length}. Failed recipients: ${failedRecipients}`
    );
  }

  return successes;
}
