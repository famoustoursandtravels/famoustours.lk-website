import nodemailer from 'nodemailer';

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Email is not configured: missing ${name}. Set it in .env.local (see .env.example).`
    );
  }
  return value;
}

export function getTransporter() {
  const host = requireEnv('SMTP_HOST');
  const user = requireEnv('EMAIL_USER');
  const pass = requireEnv('EMAIL_PASS');
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';

  if (Number.isNaN(port) || port <= 0) {
    throw new Error('Email is not configured: SMTP_PORT must be a valid number.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export function fromHeader() {
  return process.env.EMAIL_FROM?.trim() || requireEnv('EMAIL_USER');
}

/** Destination inbox for booking + contact notifications */
export function getEmailTo() {
  return requireEnv('EMAIL_TO');
}
