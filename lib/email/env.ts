export interface EmailEnvConfig {
  user: string;
  pass: string;
  recipients: string[];
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Loads Gmail + recipient configuration from environment variables. */
export function getEmailEnvConfig(): EmailEnvConfig {
  const user = readRequiredEnv("EMAIL_USER");
  const pass = readRequiredEnv("EMAIL_PASS").replace(/\s/g, "");
  const primary = readRequiredEnv("CONTACT_RECEIVER");
  const secondary = readRequiredEnv("CONTACT_RECEIVER_2nd");

  const recipients = [primary, secondary].filter(
    (email, index, list) => list.indexOf(email) === index
  );

  return { user, pass, recipients };
}
