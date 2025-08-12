import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM, SMTP_TLS } = process.env;

  if (!SMTP_HOST || !SMTP_USERNAME || !SMTP_PASSWORD || !SMTP_FROM) {
    throw new Error('SMTP configuration is missing in environment variables');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false, // use STARTTLS
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: SMTP_TLS?.toLowerCase() === 'true'
    }
  });

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    text,
    html: html ?? `<pre>${text}</pre>`
  });
}
