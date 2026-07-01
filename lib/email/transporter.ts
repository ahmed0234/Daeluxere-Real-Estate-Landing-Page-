import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { getEmailEnvConfig } from "./env";

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null =
  null;

/** Reuses a single Nodemailer transporter for Gmail SMTP. */
export function getMailTransporter() {
  if (transporter) return transporter;

  const { user, pass } = getEmailEnvConfig();

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    tls: {
      // Do not fail on invalid certs (e.g. self-signed certificates in local/proxy environments)
      rejectUnauthorized: false,
    },
  });

  return transporter;
}

